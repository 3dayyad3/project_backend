const RespondFormat = require('../../respondFormat.js');
const stockController = require('../../controller/stock.js');
const authMiddleware = require('../../middleware/auth.js');

const router = require('express').Router();

router.get('/stock', authMiddleware.verifyUserToken, stockController.getStock);

module.exports = router;
