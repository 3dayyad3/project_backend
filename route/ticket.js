const Ticket = require('../model/ticket.js');
const Counter = require('../model/counter.js');
const Stock = require('../model/stock.js');
const User = require('../model/user.js');
const Event = require('../model/event.js');
const RespondFormat = require('../respondFormat.js');
const ticketController = require('../controller/ticket.js');

module.exports = (app) => {
  app.get('/api/ticket', ticketController.getTicket);
  app.get('/api/ticket/:id', ticketController.getTicketId);
  app.post('/api/ticket', ticketController.postTicket);
  app.put('/api/ticket', ticketController.putTicket);
  app.delete('/api/ticket', ticketController.deleteTicket);
  app.delete('/api/ticket/id/:id', ticketController.deleteTicketId);
};
