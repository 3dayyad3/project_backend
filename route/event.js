const eventController = require('../controller/event.js');
const authMiddleware = require('../middleware/auth.js');
const adminMiddleware = require('../middleware/admin.js');
const router = require('express').Router();

router.get('/event', eventController.getEvent);
router.get('/event/id/:id', eventController.getEventId);
router.post('/event', adminMiddleware.isAdmin, eventController.postEvent);
router.put('/event', adminMiddleware.isAdmin, eventController.putEvent);
router.delete('/event', adminMiddleware.isAdmin, eventController.deleteEvent);
router.delete(
  '/event/id/:id',
  adminMiddleware.isAdmin,
  eventController.deleteEventId,
);

module.exports = router;
