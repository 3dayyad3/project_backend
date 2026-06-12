const stockController = require('../controller/stock.js');

const router = require('express').Router();

router.get('/stock', stockController.getStock);
router.get('/stock/id/:id', stockController.getStockId);
router.post('/stock', stockController.postStock);
router.put('/stock', stockController.putStock);
router.delete('/stock', stockController.deleteStock);
router.delete('/stock/id/:id', stockController.deleteStockId);

module.exports = router;
