const adminContoller = require('../controller/admin.js');
const authMiddleware = require('../middleware/auth.js');

const router = require('express').Router();

router.get('/admin', authMiddleware.verifyToken, adminContoller.getAdmin);
router.post('/admin', authMiddleware.verifyToken, adminContoller.postAdmin);
router.post('/admin/login', authMiddleware.adminToken);

module.exports = router;
