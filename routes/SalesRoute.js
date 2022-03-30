const express = require('express');
const SalesController = require('../controllers/SalesController');

const routes = express.Router();

routes.get('/', SalesController.getAll);
routes.get('/:id', SalesController.getById);

module.exports = routes;
