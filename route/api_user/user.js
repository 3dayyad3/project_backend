const RespondFormat = require('../../respondFormat.js');
const userController = require('../../controller/user.js');
const authMiddleware = require('../../middleware/auth.js');

const router = require('express').Router();

router.post('/user/login', authMiddleware.userToken);

router.get(
  '/user/:email',
  authMiddleware.verifyUserToken,
  userController.getUserEmail,
);

router.put(
  '/user',
  authMiddleware.verifyUserToken,
  userController.putUserEmail,
);

module.exports = router;
