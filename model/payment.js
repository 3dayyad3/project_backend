const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const autopopulate = require('mongoose-autopopulate');

const paymentSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  ref_ticket: {
    type: ObjectId,
    required: true,
    autopopulate: true,
  },
  status_payment: {
    type: String,
    enum: ['success', 'pending', 'fail'],
    default: 'pending',
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

paymentSchema.plugin(autopopulate);

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
