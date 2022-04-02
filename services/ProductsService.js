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

const create = async ({ name, quantity }) => {
  const [productName] = await ProductsModel.getByName(name);

  if (productName !== undefined && productName.name === name) {
    throw new Error('Product already exists');
  }

  const [{ insertId }] = await ProductsModel.create({ name, quantity });

  return {
    id: insertId,
    name,
    quantity,
  };
};

const update = async ({ id, name, quantity }) => {
  const isExist = await ProductsModel.getById(id);

  if (isExist.length === 0) throw new Error('Product not found');

  const result = await ProductsModel.update({ id, name, quantity });

  return result;
};

const destroy = async (id) => {
  const isExist = await ProductsModel.getById(id);

  if (isExist.length === 0) throw new Error('Product not found');

  await ProductsModel.destroy(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
};
