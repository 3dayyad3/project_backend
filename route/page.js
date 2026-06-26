const pageControler = require('../controller/page.js');
const authMiddleware = require('../middleware/auth.js');
const router = require('express').Router();

router.get('/', pageControler.rootPage);
router.get('/login', pageControler.loginPage);
router.get('/register', pageControler.registerPage);
router.get('/admin', pageControler.adminPage);
router.get('/user', authMiddleware.verifyUserToken, pageControler.userPage);

module.exports = router;
