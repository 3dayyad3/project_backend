const RespondFormat = require('../../respondFormat.js');
const ticketController = require('../../controller/ticket.js');
const authMiddleware = require('../../middleware/auth.js');

const router = require('express').Router();

router.get(
  '/currentUserTicket',
  authMiddleware.verifyUserToken,
  ticketController.getCurrentUserTicket,
);

router.get(
  '/ticket',authMiddleware.verifyUserToken,
  ticketController.getCurrentUserTicket
)

router.post(
  '/ticket', authMiddleware.verifyUserToken,
  ticketController.postCurrentUserTicket
)

// router.put('/ticket', authMiddleware.verifyAdminToken,
  // ticketController.putCurrentUserTicket
// )

module.exports = router;
