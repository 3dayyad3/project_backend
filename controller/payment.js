const Payment = require('../model/payment.js');
const Counter = require('../model/counter.js');
const Ticket = require('../model/ticket.js');
const Stock = require('../model/stock.js');
const User = require('../model/user.js');
const RespondFormat = require('../respondFormat.js');
const { listeners } = require('../model/user.js');

const getPayment = async (req, res) => {
  const dataPayment = await Payment.find({});
  if (dataPayment.length === 0) {
    res.status(404).json(new RespondFormat(false, 'Payments not found'));
  }
  res.status(200).json(new RespondFormat(true, 'Payments found', dataPayment));
};

const getPaymentId = async (req, res) => {
  try {
    const id = new Number(req.params.id);
    const dataPayment = await Payment.findOne({ id: id });
    if (dataPayment === null) {
      res
        .status(404)
        .json(new RespondFormat(false, `Payment with id ${id} found`));
    }
    res
      .status(200)
      .json(new RespondFormat(true, 'Payments found', [dataPayment]));
  } catch (error) {
    res.status(400).json(new RespondFormat(false, error.message));
  }
};

const getCurrentUserPayment = async (req, res) => {
  const ticket = await Ticket.find({
    ref_user: await User.find({ email: req.user.email }),
  });
  if (ticket === null) {
    res.status(404).json(new RespondFormat(false, 'Current User have no ticket'));
  }
  let currentUserPaymentData = [];
  ticket.forEach(async (val) => {
    const data = await Payment.find({ ref_ticket: val._id });
    currentUserPaymentData.push(data);
  });
  if (currentUserPaymentData.length === 0) {
    res.status(404).json(new RespondFormat(false, 'Current User have no Payment Data'))
  }
  res
    .status(200)
    .json(new RespondFormat(true, 'Payment Found', currentUserPaymentData));
};

const postPayment = async (req, res) => {
  try {
    const refTicket = await Ticket.findOne({ id: req.body.ref_ticket_id });
    if (refTicket === null) {
      res
        .status(404)
        .json(
          new RespondFormat(
            false,
            `Ticket with id ${req.body.ref_ticket_id} not found`,
          ),
        );
    }
    const refStock = await Stock.findOne({ ref_event: refTicket.ref_event });
    if (refStock === null) {
      res
        .status(404)
        .json(
          new RespondFormat(
            false,
            `ticket with id ${refTicket.id} have null stock`,
          ),
        );
    }

    let counter = await Counter.findOne({ name: 'payment' });
    if (counter === null) {
      const newCounter = new Counter({ name: 'payment', seq: 0 });
      await newCounter.save();
    }

    counter = await Counter.findOneAndUpdate(
      { name: 'payment' },
      { seq: counter.seq + 1 },
    );
    const newPayment = new Payment({
      id: counter.seq,
      ref_ticket: refTicket._id,
    });
    res
      .status(200)
      .json(new RespondFormat(true, `Data saved`, [await newPayment.save()]));
  } catch (error) {
    res.status(400).json(new RespondFormat(false, error.message));
  }
};

const putPaymentId = async (req, res) => {
  try {
    const id = new Number(req.params.id);

    const paymentData = await Payment.findOneAndUpdate({ id: id });
    const ticketData = await Ticket.findOne({ _id: paymentData.ref_ticket });
    const stockData = await Stock.findOne({
      ref_event: ticketData.ref_event,
    });
    const status = ticketData.status;

    if (status === 'vip') {
      if (stockData.amount.regular < ticketData.amount) {
        await Payment.findOneAndUpdate({ id: id }, { status_payment: 'fail' });
        res
          .status(400)
          .send(
            new RespondFormat(
              false,
              `Stock only have enough ${stockData.amount.regular} regular ticket`,
            ),
          );
      } else {
        const temp = stockData.amount.vip - ticketData.amount;
        await Stock.findOneAndUpdate(
          { ref_event: ticketData.ref_event },
          { amount: { vip: temp } },
        );
      }
    }
    if (status === 'regular ') {
      if (stockData.amount.regular < ticketData.amount) {
        await Payment.findOneAndUpdate({ id: id }, { status_payment: 'fail' });
        res
          .status(400)
          .send(
            new RespondFormat(
              false,
              `Stock only have enough ${stockData.amount.vip} vip ticket`,
            ),
          );
      } else {
        const temp = stockData.amount.regular - ticketData.amount;
        await Stock.findOneAndUpdate(
          { ref_event: ticketData.ref_event },
          { amount: { regular: temp } },
        );
      }
    }

    await Payment.findOneAndUpdate({ id: id }, { status_payment: 'success' });
    res
      .status(201)
      .json(
        new RespondFormat(
          true,
          `Ticket with id ${id} is payed`[await Payment.findOne({ id: id })],
        ),
      );
  } catch (error) {
    res.status(400).json(new RespondFormat(false, error.message));
  }
};

const deletePayment = async (req, res) => {
  const deleted = await Payment.deleteMany({});
  Counter.findOneAndUpdate({ name: 'payment' }, { seq: 0 });
  if (deleted.deletedCount === 0) {
    res.status(404).json(new RespondFormat(false, 'Payment data is empty'));
  }
  res
    .status(200)
    .json(new RespondFormat(true, `${deleted.deletedCount} data deleted`));
};

const deletePaymentId = async (req, res) => {
  try {
    const id = new Number(req.params.id);
    const deleted = await Payment.deleteOne({ id: id });
    if (deleted.deletedCount === 0) {
      res
        .status(404)
        .json(new RespondFormat(false, `Payment with id ${id} is not avaible`));
    }
    res
      .status(200)
      .json(new RespondFormat(true, `${deleted.deletedCount} data deleted`));
  } catch (error) {
    res.status(404).json(new RespondFormat(false, error.message));
  }
};

module.exports = {
  getPayment,
  getCurrentUserPayment,
  getPaymentId,
  postPayment,
  putPaymentId,
  deletePayment,
  deletePaymentId,
};
