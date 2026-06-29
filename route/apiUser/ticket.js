const RespondFormat = require('../../respondFormat.js');
const ticketController = require('../../controller/ticket.js');
const authMiddleware = require('../../middleware/auth.js');

const router = require('express').Router();

router.get(
  '/ticket',
  authMiddleware.verifyUserToken,
  ticketController.getCurrentUserTicket,
);

// router.get(
  // '/ticket',authMiddleware.verifyUserToken,
  // ticketController.putCurrentUserTicket
// )

router.post(
  '/ticket', authMiddleware.verifyUserToken,
  ticketController.postCurrentUserTicket
)

module.exports = router;
