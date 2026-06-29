const RespondFormat = require('../../respondFormat.js');
const userController = require('../../controller/user.js');
const ticketController = require('../../controller/ticket.js')
const authMiddleware = require('../../middleware/auth.js');

const router = require('express').Router();

router.post('/user/login', authMiddleware.userToken);

router.get(
  '/currentUser',
  authMiddleware.verifyUserToken,
  userController.getCurrentUser,
);

router.put(
  '/currentUser/name',
  authMiddleware.verifyUserToken,
  userController.putCurrentUserName,
);

router.put(
  '/currentUser/password',
  authMiddleware.verifyUserToken,
  userController.putCurrentUserPassword
)

module.exports = router;
