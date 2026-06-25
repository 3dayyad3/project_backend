const User = require('../model/user.js');
const RespondFormat = require('../respondFormat.js');
const userController = require('../controller/user.js');
const authMiddleware = require('../middleware/auth.js');

const router = require('express').Router();

router.get('/user', userController.getUser);
router.get('/user/email/:email', userController.getUserEmail);
router.get('/user/name/:name', userController.getUserEmail);
router.post('/user', authMiddleware.verifyAdminToken, userController.postUser);
router.put('/user', authMiddleware.verifyAdminToken, userController.putUser);
router.delete(
  '/user',
  authMiddleware.verifyAdminToken,
  userController.deleteUser,
);
router.delete(
  '/user/name/:name',
  authMiddleware.verifyAdminToken,
  userController.deleteUserName,
);
router.delete(
  '/user/name',
  authMiddleware.verifyAdminToken,
  userController.deleteUserWithEmptyName,
);
router.delete(
  '/user/email/:email',
  authMiddleware.verifyAdminToken,
  userController.deleteUserEmail,
);

module.exports = router;
