const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const validateProducts = require('../middlewares/ProductsMiddleware');

const routes = express.Router();

routes.get('/', ProductsController.getAll);

routes.get('/:id', ProductsController.getById);

routes.post('/', validateProducts, ProductsController.create);

routes.put('/:id', validateProducts, ProductsController.update);
module.exports = routes;
