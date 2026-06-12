const User = require('../model/user.js');
const RespondFormat = require('../respondFormat.js');
const userController = require('../controller/user.js');

const router = require('express').Router();

router.get('/user', userController.getUser);
router.get('/user/email/:email', userController.getUserEmail);
router.get('/user/name/:name', userController.getUserEmail);
router.post('/user', userController.postUser);
router.put('/user', userController.putUser);
router.delete('/user', userController.deleteUser);
router.delete('/user/name/:name', userController.deleteUserName);
router.delete('/user/name', userController.deleteUserWithEmptyName);
router.delete('/user/email/:email', userController.deleteUserEmail);

module.exports = router;
