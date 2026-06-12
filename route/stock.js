const stockController = require('../controller/stock.js');

module.exports = (app) => {
  app.get('/api/stock', stockController.getStock);
  app.get('/api/stock/id/:id', stockController.getStockId);
  app.post('/api/stock', stockController.postStock);
  app.put('/api/stock', stockController.putStock);
  app.delete('/api/stock', stockController.deleteStock);
  app.delete('/api/stock/id/:id', stockController.deleteStockId);
};
