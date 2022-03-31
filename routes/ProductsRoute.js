const express = require('express');
const rescue = require('express-rescue');
const ProductsController = require('../controllers/ProductsController');
const validateProducts = require('../middlewares/ProductsMiddleware');

const routes = express.Router();

routes.get('/', rescue(ProductsController.getAll));

routes.get('/:id', rescue(ProductsController.getById));

routes.post('/', validateProducts, rescue(ProductsController.create));

routes.put('/:id', validateProducts, rescue(ProductsController.update));

module.exports = routes;
