const SalesSchima = require('../schimas/SalesSchimas');

const validateSales = (req, res, next) => {
  const { error } = SalesSchima.validate(req.body[0]);
  if (error.message.includes('is required')) {
    return res.status(400).json({ message: error.message });
  }

  if (error.message.includes('must be')) {
    return res.status(422).json({ message: error.message });
  }

  next();
};

module.exports = validateSales;
