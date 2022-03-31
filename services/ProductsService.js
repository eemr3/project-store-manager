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

const create = async ({ name, quantity }) => {
  const productName = await getByName(name);
  const [{ insertId }] = await ProductsModel.create({ name, quantity });

  if (productName !== undefined && productName.name === name) {
    throw new Error('Product already exists');
  }

  return {
    id: insertId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
};
