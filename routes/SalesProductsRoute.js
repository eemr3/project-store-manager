const express = require('express');
const SalesProductsController = require('../controllers/SalesProductsController');

const routes = express.Router();

routes.get('/', SalesProductsController.getAll);
routes.get('/:id', SalesProductsController.getById);

module.exports = routes;
