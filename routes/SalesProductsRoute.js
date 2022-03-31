const express = require('express');
const SalesProductsController = require('../controllers/SalesProductsController');
const validateSale = require('../middlewares/SalesMiddleware');

const routes = express.Router();

routes.get('/', SalesProductsController.getAll);
routes.get('/:id', SalesProductsController.getById);

routes.post('/', validateSale, (req, res) => {
  const { saleId, productId, quantity } = req.body[0];
  return res.status(201).json({ saleId, productId, quantity });
});

routes.put('/:id', validateSale, SalesProductsController.update);

module.exports = routes;
