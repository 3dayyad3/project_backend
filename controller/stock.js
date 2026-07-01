const Stock = require('../model/stock.js');
const Event = require('../model/event.js');
const RespondFormat = require('../respondFormat.js');

const getStock = async (req, res) => {
  const stockData = await Stock.find({});
  if (stockData.length === 0) {
    res.status(404).send(new RespondFormat(false, 'Stocks data is empty'));
  }
  res.status(200).send(new RespondFormat(true, 'Stocks data found', stockData));
};

const getStockId = async (req, res) => {
  try {
    const id = new Number(req.params.id);
    const refEvent = await Event.findOne({ id: id });
    const stockData = await Stock.findOne({ ref_event: refEvent._id });
    if (stockData === null) {
      res
        .status(404)
        .json(new RespondFormat(false, `Stock with Event id ${id} not found`));
    }
    res
      .status(200)
      .json(
        new RespondFormat(true, `Stock with Event id ${id} found`, stockData),
      );
  } catch (error) {
    res.status(404).json(new RespondFormat(false, error.message));
  }
};

const postStock = async (req, res) => {
  try {
    const refEvent = await Event.findOne({ id: req.body.ref_event_id });
    if (refEvent === null) {
      res
        .send(404)
        .json(
          new RespondFormat(false, `${req.body.ref_event_id} is not found`),
        );
    }

    const newStock = new Stock({
      ref_event: refEvent._id,
      amount: {
        vip: req.body.amount.vip,
        regular: req.body.amount.regular,
      },
      price: {
        vip: req.body.price.vip,
        regular: req.body.price.regular,
      },
    });
    res
      .status(200)
      .json(new RespondFormat(true, 'Data save', [await newStock.save()]));
  } catch (error) {
    res.status(400).json(new RespondFormat(false, error.message));
  }
};

const putStock = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(200).json(new RespondFormat(true, 'Nothing to Update'));
    }

    const eventRef = await Event.findOne({ id: req.body.ref_event_id });
    if (eventRef === null) {
      res
        .status(404)
        .json(
          new RespondFormat(
            false,
            `Stock with event id ${req.body.ref_event_id} not found`,
          ),
        );
    }

    const currentStock = await Stock.findOne({ ref_event: eventRef });

    if (currentStock === null || currentStock === undefined) {
      res
        .status(404)
        .json(
          new RespondFormat(
            false,
            'no stock with event id ' + new String(eventRef.id),
          ),
        );
    }

    let updatePart = {};

    if (req.body.amount !== null && req.body.amount !== undefined) {
      let amountPart = {};
      if (req.body.amount.vip !== null && req.body.amount.vip !== undefined) {
        Object.assign(amountPart, { vip: req.body.amount.vip });
      } else {
        Object.assign(amountPart, { vip: currentStock.amount.vip });
      }

      if (
        req.body.amount.regular !== null &&
        req.body.amount.regular !== undefined
      ) {
        Object.assign(amountPart, { regular: req.body.amount.regular });
      } else {
        Object.assign(amountPart, { regular: req.body.amount.regular });
      }

      if (Object.keys(amountPart).length !== 0) {
        Object.assign(updatePart, { amount: amountPart });
      }
    }

    if (req.body.price !== null && req.body.price !== undefined) {
      let pricePart = {};
      if (
        req.body.price.regular !== null &&
        req.body.price.regular !== undefined
      ) {
        Object.assign(pricePart, { regular: req.body.price.regular });
      } else {
        Object.assign(pricePart, { regular: currentStock.price.regular });
      }

      if (req.body.price.vip !== null && req.body.price.vip !== undefined) {
        Object.assign(pricePart, { vip: req.body.price.vip });
      } else {
        Object.assign(pricePart, { vip: currentStock.price.vip });
      }

      if (Object.keys(pricePart).length !== 0) {
        Object.assign(updatePart, { price: pricePart });
      }
      console.log(pricePart);
    }

    const updatedStock = await Stock.findOneAndUpdate(
      { ref_event: eventRef._id },
      updatePart,
    );

    if (updatedStock === null) {
      res.status(400).json(new RespondFormat(false, 'Failed to Update'));
    }

    res
      .status(201)
      .json(
        new RespondFormat(true, 'Data Saved', [
          await Stock.findOne({ ref_event: eventRef._id }),
        ]),
      );
  } catch (error) {
    res.status(400).json(new RespondFormat(false, error.message));
  }
};

const deleteStock = async (req, res) => {
  const deleted = await Stock.deleteMany({});
  if (deleted.deletedCount === 0) {
    res
      .status(404)
      .json(new RespondFormat(true, `${deleted.deletedCount} deleted`));
  }
  res
    .status(200)
    .json(new RespondFormat(true, `${deleted.deletedCount} data deleted`));
};

const deleteStockId = async (req, res) => {
  try {
    const id = new Number(req.params.id);
    const refEvent = await Event.findOne({ id: id });
    const deleted = await Stock.deleteOne({ ref_event: refEvent._id });
    if (deleted.deletedCount === 0) {
      res
        .status(404)
        .json(new RespondFormat(true, `Stock data with id ${id} not avaible`));
    }
    res
      .status(200)
      .json(new RespondFormat(true, `${deleted.deletedCount} data deleted`));
  } catch (error) {
    res.status(404).json(new RespondFormat(false, error.message));
  }
};

module.exports = {
  getStock,
  getStockId,
  postStock,
  putStock,
  deleteStock,
  deleteStockId,
};
