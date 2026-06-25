const eventController = require('../controller/event.js');
const authMiddleware = require('../middleware/auth.js');
<<<<<<< HEAD
<<<<<<< HEAD
const adminMiddleware = require('../middleware/admin.js');
=======

>>>>>>> 65f01171180dbfa98960e21177a546b2fc54b128
=======

>>>>>>> 65f01171180dbfa98960e21177a546b2fc54b128
const router = require('express').Router();

router.get('/event', eventController.getEvent);
router.get('/event/id/:id', eventController.getEventId);
<<<<<<< HEAD
<<<<<<< HEAD
router.post('/event', adminMiddleware.isAdmin, eventController.postEvent);
router.put('/event', adminMiddleware.isAdmin, eventController.putEvent);
router.delete('/event', adminMiddleware.isAdmin, eventController.deleteEvent);
router.delete(
  '/event/id/:id',
  adminMiddleware.isAdmin,
=======
=======
>>>>>>> 65f01171180dbfa98960e21177a546b2fc54b128
router.post('/event', authMiddleware.adminToken, eventController.postEvent);
router.put('/event', authMiddleware.adminToken, eventController.putEvent);
router.delete('/event', authMiddleware.adminToken, eventController.deleteEvent);
router.delete(
  '/event/id/:id',
  authMiddleware.adminToken,
<<<<<<< HEAD
>>>>>>> 65f01171180dbfa98960e21177a546b2fc54b128
=======
>>>>>>> 65f01171180dbfa98960e21177a546b2fc54b128
  eventController.deleteEventId,
);

module.exports = router;
