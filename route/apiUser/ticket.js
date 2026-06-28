const RespondFormat = require('../../respondFormat.js');
const ticketController = require('../../controller/ticket.js');
const authMiddleware = require('../../middleware/auth.js');

const router = require('express').Router();

router.get(
  '/ticket',
  authMiddleware.verifyUserToken,
  ticketController.getTicketUserEmail,
);

module.exports = router;
