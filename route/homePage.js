const homePageControler = require('../controller/homePage.js');
const router = require('express').Router();

router.get('/', homePageControler.rootPage);
router.get('/login', homePageControler.homePage);
router.get('/register', homePageControler.registerPage);

module.exports = router;
