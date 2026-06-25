const ticketController = require('../controller/ticket.js');
const authMiddleware = require('../middleware/auth.js');
const adminMiddleware = require('../middleware/admin.js');
const router = require('express').Router();

router.get('/ticket', authMiddleware.verifyToken, ticketController.getTicket);
router.get('/ticket/:id', ticketController.getTicketId);
router.post('/ticket', ticketController.postTicket);
router.put('/ticket', ticketController.putTicket);
router.delete('/ticket', ticketController.deleteTicket);
router.delete('/ticket/id/:id', ticketController.deleteTicketId);

module.exports = router;
