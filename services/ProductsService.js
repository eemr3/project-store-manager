const ProductsModel = require('../models/ProductsModel');

const getAll = async () => {
  const result = await ProductsModel.getAll();

  return result;
};

const getById = async (id) => {
  const [product] = await ProductsModel.getById(id);
  console.log(product);
  if (product === undefined) throw new Error('Product not found');

  return product;
};

module.exports = {
  getAll,
  getById,
};
