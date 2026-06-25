const adminContoller = require('../controller/admin.js');
const authMiddleware = require('../middleware/auth.js');

const router = require('express').Router();

router.get('/admin', authMiddleware.verifyAdminToken, adminContoller.getAdmin);
router.post(
  '/admin',
  authMiddleware.verifyAdminToken,
  adminContoller.postAdmin,
);
router.post('/admin/login', authMiddleware.adminToken);

module.exports = router;
