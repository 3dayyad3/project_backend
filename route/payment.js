const paymentController = require('../controller/payment.js');
const router = require('express').Router();

router.get('/payment', paymentController.getPayment);
router.get('/payment/:id', paymentController.getPaymentId);
router.post('/payment', paymentController.postPayment);
router.put('/payment/pay/:id', paymentController.putPaymentId);
router.delete('/payment', paymentController.deletePayment);
router.delete('/payment/:id', paymentController.deletePaymentId);

module.exports = router;
