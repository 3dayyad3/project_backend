const paymentController = require('../controller/payment.js');

module.exports = (app) => {
  app.get('/api/payment', paymentController.getPayment);
  app.get('/api/payment/:id', paymentController.getPaymentId);
  app.post('/api/payment', paymentController.postPayment);
  app.put('/api/payment/pay/:id', paymentController.putPaymentId);
  app.delete('/api/payment', paymentController.deletePayment);
  app.delete('/api/payment/:id', paymentController.deletePaymentId);
};
