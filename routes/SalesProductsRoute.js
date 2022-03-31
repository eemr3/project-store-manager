const express = require('express');
const SalesProductsController = require('../controllers/SalesProductsController');
const validateSale = require('../middlewares/SalesMiddleware');

const routes = express.Router();

routes.get('/', SalesProductsController.getAll);
routes.get('/:id', SalesProductsController.getById);

routes.post('/', validateSale, SalesProductsController.create);

routes.put('/:id', validateSale, SalesProductsController.update);

module.exports = routes;
