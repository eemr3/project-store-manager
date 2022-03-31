const ProductsSchimass = require('../schimas/ProductsSchimas');
const ProductsService = require('../services/ProductsService');

const validateProducts = async (req, res, next) => {
  const { name } = req.body;
  const teste = ProductsSchimass.validate(req.body);
  console.log(teste);
  if (teste) return res.status(400).json({ message: '' });
  const nameExist = await ProductsService.getByName(name);

  if (nameExist === undefined && nameExist === name) {
    return res
    .status(400).json({ message: 'Nome já cadastrado!' });
  }
  next();
};

module.exports = validateProducts;
