const ProductsSchimass = require('../schimas/ProductsSchimas');

const validateProducts = async (req, res, next) => {
  const { error } = ProductsSchimass.validate(req.body);
  if (error && error.message.includes('is required')) {
    return res.status(400).json({ message: error.message });
  }

  if (error && error.message.includes('must be')) {
    return res.status(422).json({ message: error.message });
  }

  next();
};

module.exports = validateProducts;
