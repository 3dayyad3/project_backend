const stockController = require('../controller/stock.js');
const authMiddleware = require('../middleware/auth.js');
<<<<<<< HEAD
const adminMiddleware = require('../middleware/admin.js');
=======

>>>>>>> 65f01171180dbfa98960e21177a546b2fc54b128
const router = require('express').Router();

router.get('/stock', authMiddleware.verifyUserToken, stockController.getStock);
router.get('/stock/id/:id', stockController.getStockId);
<<<<<<< HEAD
router.post('/stock', adminMiddleware.isAdmin, stockController.postStock);
router.put('/stock', adminMiddleware.isAdmin, stockController.putStock);
router.delete('/stock', adminMiddleware.isAdmin, stockController.deleteStock);
router.delete(
  '/stock/id/:id',
  adminMiddleware.isAdmin,
=======
router.post(
  '/stock',
  authMiddleware.verifyAdminToken,
  stockController.postStock,
);
router.put('/stock', authMiddleware.verifyAdminToken, stockController.putStock);
router.delete(
  '/stock',
  authMiddleware.verifyAdminToken,
  stockController.deleteStock,
);
router.delete(
  '/stock/id/:id',
  authMiddleware.verifyAdminToken,
>>>>>>> 65f01171180dbfa98960e21177a546b2fc54b128
  stockController.deleteStockId,
);

module.exports = router;
