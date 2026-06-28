const pageControler = require('../controller/page.js');
const authMiddleware = require('../middleware/auth.js');
const router = require('express').Router();

router.get('/', pageControler.rootPage);
router.get('/login', pageControler.loginPage);
router.get('/register', pageControler.registerPage);
router.get('/admin', pageControler.adminPage);
router.get(
  '/user/dashboard',
  authMiddleware.verifyUserToken,
  pageControler.userPage,
);
router.get('/change-password', (req, res) => {
  res.render('dashboard/change-password');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard/dashboard');
});
module.exports = router;
