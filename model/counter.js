const mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
  name: { type: String, unique: true, require: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
