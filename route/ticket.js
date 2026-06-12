const ticketController = require('../controller/ticket.js');
const router = require('express').Router();

router.get('/ticket', ticketController.getTicket);
router.get('/ticket/:id', ticketController.getTicketId);
router.post('/ticket', ticketController.postTicket);
router.put('/ticket', ticketController.putTicket);
router.delete('/ticket', ticketController.deleteTicket);
router.delete('/ticket/id/:id', ticketController.deleteTicketId);

module.exports = router;
