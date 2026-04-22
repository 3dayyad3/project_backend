const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

const autopopulate = require("mongoose-autopopulate")

const ticketSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  ref_user: {
    type: ObjectId,
    ref: "User",
    required: true,
    autopopulate: true
  },
  ref_event: {
    type: ObjectId,
    ref: "Event",
    required: true,
    autopopulate: true
  },
  amount: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["vip", "regular"],
    required: true
  }
})

ticketSchema.plugin(autopopulate)

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket
