const RespondFormat = require('../../respondFormat.js');
const paymentController = require('../../controller/payment.js');
const authMiddleware = require('../../middleware/auth.js');

const router = require('express').Router();

router.get(
  '/currentUserPayment',
  authMiddleware.verifyUserToken,
  paymentController.getCurrentUserPayment,
);

router.put('/payment', authMiddleware.verifyUserToken,
  paymentController.putPaymentId
)

module.exports = router;
