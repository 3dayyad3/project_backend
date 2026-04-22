const mongoose = require("mongoose")


const eventSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
    unique: true
  },
  description: {
    type: String,
    default: ""
  },
  start: {
    type: Date,
    required: true
  }, 
  end: {
    type: Date,
    required: true
  },
})

const Event = mongoose.model("Event", eventSchema)
module.exports = Event
