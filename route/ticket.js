const ticketController = require('../controller/ticket.js');
const authMiddleware = require('../middleware/auth.js');
const router = require('express').Router();

router.get('/ticket', ticketController.getTicket);
router.get('/ticket/:id', ticketController.getTicketId);
router.post(
  '/ticket',
  authMiddleware.verifyAdminToken,
  ticketController.postTicket,
);
router.put(
  '/ticket',
  authMiddleware.verifyAdminToken,
  ticketController.putTicket,
);
router.delete(
  '/ticket',
  authMiddleware.verifyAdminToken,
  ticketController.deleteTicket,
);
router.delete(
  '/ticket/id/:id',
  authMiddleware.verifyAdminToken,
  ticketController.deleteTicketId,
);

module.exports = router;
