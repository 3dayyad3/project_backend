const pageControler = require('../controller/page.js');
const router = require('express').Router();

router.get('/', pageControler.loginPage);
router.get('/login', pageControler.loginPage);
router.get('/register', pageControler.registerPage);

module.exports = router;
