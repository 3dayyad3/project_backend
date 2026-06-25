const eventController = require('../controller/event.js');
const authMiddleware = require('../middleware/auth.js');

const router = require('express').Router();

router.get('/event', eventController.getEvent);
router.get('/event/id/:id', eventController.getEventId);
router.post('/event', authMiddleware.adminToken, eventController.postEvent);
router.put('/event', authMiddleware.adminToken, eventController.putEvent);
router.delete('/event', authMiddleware.adminToken, eventController.deleteEvent);
router.delete(
  '/event/id/:id',
  authMiddleware.adminToken,
  eventController.deleteEventId,
);

module.exports = router;
