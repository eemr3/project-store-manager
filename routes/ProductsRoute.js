const express = require('express');
const ProductsController = require('../controllers/ProductsController');

const routes = express.Router();

routes.get('/', ProductsController.getAll);

routes.get('/:id', ProductsController.getById);

module.exports = routes;
