const eventController = require('../controller/event.js');
const authMiddleware = require('../middleware/auth.js');

const router = require('express').Router();

router.get('/event', eventController.getEvent);
router.get('/event/id/:id', eventController.getEventId);

router.post(
  '/event',
  authMiddleware.verifyAdminToken,
  eventController.postEvent,
);

router.put('/event',
  authMiddleware.verifyAdminToken,
  eventController.putEvent);

router.delete('/event/id/:id', authMiddleware.adminToken);
router.delete(
  '/event',
  authMiddleware.verifyAdminToken,
  eventController.deleteEvent,
);
router.delete(
  '/event/id/:id',
  authMiddleware.verifyAdminToken,
  eventController.deleteEventId,
);

module.exports = router;
