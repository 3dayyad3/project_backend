const User = require('../model/user.js');
const RespondFormat = require('../respondFormat.js');
const userController = require('../controller/user.js');
const adminController = require('../controller/admin.js');
const authMiddleware = require('../middleware/auth.js');

const router = require('express').Router();

router.get('/auth/login', (req, res) =>
  res.render('auth/login', { error: null }),
);
router.get('/auth/register', (req, res) =>
  res.render('auth/register', { error: null, old: {} }),
);

router.post('/admin', adminController.login);
router.get('/user', userController.getUser);
router.get('/user/email/:email', userController.getUserEmail);
router.get('/user/name/:name', userController.getUserEmail);
router.post('/user/login', authMiddleware.userToken);
router.post('/user', userController.postUser);
router.put('/user', userController.putUser);
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
