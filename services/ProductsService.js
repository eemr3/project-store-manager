const ProductsModel = require('../models/ProductsModel');

const getAll = async () => {
  const result = await ProductsModel.getAll();

  return result;
};

const getById = async (id) => {
  const [product] = await ProductsModel.getById(id);
  if (product === undefined) throw new Error('Product not found');

  return product;
};

const getByName = async (productName) => {
  const [name] = await ProductsModel.getByName(productName);

  return name;
};

module.exports = {
  getAll,
  getById,
  getByName,
};
