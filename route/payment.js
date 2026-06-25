const paymentController = require('../controller/payment.js');
const authMiddleware = require('../middleware/auth.js');

const router = require('express').Router();

router.get(
  '/payment',
  authMiddleware.verifyAdminToken,
  paymentController.getPayment,
);
router.get(
  '/payment/:id',
  authMiddleware.verifyAdminToken,
  paymentController.getPaymentId,
);
router.post(
  '/payment',
  authMiddleware.verifyAdminToken,
  paymentController.postPayment,
);
router.put(
  '/payment/pay/:id',
  authMiddleware.verifyAdminToken,
  paymentController.putPaymentId,
);
router.delete('/payment', paymentController.deletePayment);
router.delete('/payment/:id', paymentController.deletePaymentId);

module.exports = router;
