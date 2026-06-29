const RespondFormat = require('../../respondFormat.js');
const userController = require('../../controller/user.js');
const authMiddleware = require('../../middleware/auth.js');

const router = require('express').Router();

router.post('/user/login', authMiddleware.userToken);

router.get(
  '/currentUser',
  authMiddleware.verifyUserToken,
  userController.getCurrentUser,
);

router.put(
  '/currentUser',
  authMiddleware.verifyUserToken,
  userController.putCurrentUser,
);

module.exports = router;
