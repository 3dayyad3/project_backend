const stockController = require('../controller/stock.js');
const authMiddleware = require('../middleware/auth.js');

const router = require('express').Router();

router.get('/stock', authMiddleware.verifyUserToken, stockController.getStock);
router.get('/stock/id/:id', stockController.getStockId);
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
  stockController.getStockId,
);
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
  stockController.deleteStockId,
);

module.exports = router;
