const RespondFormat = require('../respondFormat.js');
const Ticket = require('../model/ticket.js');
const Counter = require('../model/counter.js');
const Stock = require('../model/stock.js');
const User = require('../model/user.js');
const Event = require('../model/event.js');

const getTicket = async (req, res) => {
  const ticketData = await Ticket.find({});
  if (ticketData.length === 0) {
    res.status(404).json(new RespondFormat(false, 'Tickets data not found'));
  }
  res
    .status(200)
    .json(new RespondFormat(true, 'Tickets data found', ticketData));
};

const getTicketId = async (req, res) => {
  try {
    const id = new Number(req.params.id);
    const ticketData = await Ticket.findOne({ id: id });
    if (ticketData === null) {
      res
        .status(404)
        .json(new RespondFormat(false, `Ticket data with id ${id} not Found`));
    }
    res
      .status(200)
      .json(
        new RespondFormat(true, `Ticket data with id ${id} Found`, [
          ticketData,
        ]),
      );
  } catch (error) {
    res.status(400).json(new RespondFormat(false, error.message));
  }
};

const postTicket = async (req, res) => {
  try {
    const refEvent = await Event.findOne({ id: req.body.ref_event_id });
    const refUser = await User.findOne({ email: req.body.ref_user_email });

    if (refEvent === null || refUser === null) {
      const temp = { ref_user_email: refUser, ref_event_id: refEvent };
      let result = '';
      Object.entries(temp).forEach(([key, value]) => {
        if (value === null) {
          result += `${key} not Found. `;
        }
      });
      res.status(404).json(new RespondFormat(false, result));
    }

    const stock = await Stock.findOne({ ref_event: refEvent._id });
    if (stock === null) {
      res.status(404).json(new RespondFormat(false, 'Event doesnt have stock'));
    }

    if (req.body.status === 'vip') {
      if (stock.amount.vip < req.body.amount) {
        res
          .status(404)
          .json(
            new RespondFormat(false, `Event doesnt have enought vip ticket`),
          );
      }
    }

    if (req.body.status === 'regular') {
      if (stock.amount.regular < req.body.amount) {
        res
          .status(404)
          .json(
            new RespondFormat(
              false,
              `Event doesnt have enought regular ticket`,
            ),
          );
      }
    }

    let ticketCounter = await Counter.findOne({ name: 'ticket' });
    if (ticketCounter === null) {
      const newTicketCounter = new Counter({ name: 'ticket' });
      ticketCounter = await newTicketCounter.save();
    }

    ticketCounter = await Counter.findOneAndUpdate(
      { name: 'ticket' },
      { seq: ticketCounter.seq + 1 },
    );
    let newTicket = new Ticket({
      id: ticketCounter.seq,
      ref_event: refEvent._id,
      ref_user: refUser._id,
      amount: req.body.amount,
      status: req.body.status,
    });

    if (newTicket.status === 'vip') {
      newTicket.total = newTicket.amount * stock.price.vip;
    }

    if (newTicket.status === 'regular') {
      newTicket.total = newTicket.amount * stock.price.regular;
    }

    const savedTicket = await newTicket.save();
    res
      .status(201)
      .json(new RespondFormat(true, `Ticket data is saved`, [savedTicket]));
  } catch (error) {
    res.status(400).json(new RespondFormat(false, error.message));
  }
};

const putTicket = async (req, res) => {
  await Ticket.findOneAndUpdate(
    { id: req.body.id },
    { amount: req.body.amount, status: req.body.status },
  );
  const ticket = await Ticket.findOne({ id: req.body.id });
  if (ticket === null) {
    res
      .status(404)
      .json(
        new RespondFormat(false, `Ticket dengan id ${req.body.id} not found`),
      );
  }
  const stock = await Stock.findOne({ ref_event: ticket.ref_event });
  if (ticket.status === 'vip') {
    ticket.total = ticket.amount * stock.price.vip;
  } else {
    ticket.total = ticket.amount * stock.price.regular;
  }
  await Ticket.findOneAndUpdate({ id: req.body.id }, { total: ticket.total });
  res
    .status(201)
    .json(
      new RespondFormat(true, `Ticket data is updated`, [
        await Ticket.findOne({ id: req.body.id }),
      ]),
    );
};

const deleteTicket = async (req, res) => {
  const deleted = await Ticket.deleteMany({});
  Counter.findOneAndUpdate({ name: 'ticket' }, { seq: 0 });
  if (deleted.deletedCount === 0) {
    res.status(404).json(new RespondFormat(false, 'Ticket data is empty'));
  }
  res
    .status(200)
    .json(new RespondFormat(true, `${deleted.deletedCount} data is deleted`));
};

const deleteTicketId = async (req, res) => {
  const deleted = await Ticket.deleteOne({ id: req.params.id });
  if (deleted.deletedCount === 0) {
    res
      .status(404)
      .json(new RespondFormat(false, `Ticket data with ${id} is empty`));
  }
  res
    .status(200)
    .json(new RespondFormat(true, `${deleted.deletedCount} data is deleted`));
};

module.exports = {
  getTicket,
  getTicketId,
  postTicket,
  putTicket,
  deleteTicket,
  deleteTicketId,
};
