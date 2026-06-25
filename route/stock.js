const stockController = require('../controller/stock.js');
const authMiddleware = require('../middleware/auth.js');
const adminMiddleware = require('../middleware/admin.js');
const router = require('express').Router();

router.get('/stock', stockController.getStock);
router.get('/stock/id/:id', stockController.getStockId);
router.post('/stock', adminMiddleware.isAdmin, stockController.postStock);
router.put('/stock', adminMiddleware.isAdmin, stockController.putStock);
router.delete('/stock', adminMiddleware.isAdmin, stockController.deleteStock);
router.delete(
  '/stock/id/:id',
  adminMiddleware.isAdmin,
  stockController.deleteStockId,
);

module.exports = router;
