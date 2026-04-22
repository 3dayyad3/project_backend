const mongoose = require("mongoose")
const autopopulate = require("mongoose-autopopulate")
const ObjectId = mongoose.Types.ObjectId

const stockSchema = new mongoose.Schema({
  ref_event: {
    type: ObjectId,
    ref: "Event",
    required: true,
    unique: true,
    autopopulate: true
  },
  amount: {
    vip: {
      type: Number,
      required: true
    },
    regular: {
      type: Number,
      required: true
    }
  },
  price: {
    vip: {
      type: Number,
      required: true
    },
    regular: {
      type: Number,
      required: true
    }
  }
})

stockSchema.plugin(autopopulate)

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock
