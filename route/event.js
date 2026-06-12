const eventController = require('../controller/event.js');
const router = require('express').Router();

router.get('/event', eventController.getEvent);
router.get('/event/id/:id', eventController.getEventId);
router.post('/event', eventController.postEvent);
router.put('/event', eventController.putEvent);
router.delete('/event', eventController.deleteEvent);
router.delete('/event/id/:id', eventController.deleteEventId);

module.exports = router;
