const eventController = require('../controller/event.js');

module.exports = (app) => {
  app.get('/api/event', eventController.getEvent);
  app.get('/api/event/id/:id', eventController.getEventId);
  app.post('/api/event', eventController.postEvent);
  app.put('/api/event', eventController.putEvent);
  app.delete('/api/event', eventController.deleteEvent);
  app.delete('/api/event/id/:id', eventController.deleteEventId);
};
