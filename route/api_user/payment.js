const RespondFormat = require('../../respondFormat.js');
const payment = require('../../controller/payment.js');
const authMiddleware = require('../../middleware/auth.js');

const router = require('express').Router();

router.get(
  '/payment',
  authMiddleware.verifyUserToken,
  payment.getCurrentUserPayment,
);

module.exports = router;
