const Joi = require('joi');

const SalesSchima = Joi.object({
  productId: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = SalesSchima;
