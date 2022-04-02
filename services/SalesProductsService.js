const SalesProductsModel = require('../models/SalesProductsModel');

const getAll = async () => {
  const result = await SalesProductsModel.getAll();
  console.log(result);
  return result;
};

const getById = async (id) => {
  const result = await SalesProductsModel.getById(id);

  if (result.length === 0) throw new Error('Sale not found');
  return result;
};

const create = async (values) => {
  const result = await SalesProductsModel.create(values);
  return result;
};

const update = async ({ id, productId, quantity }) => {
  const saleId = await SalesProductsModel.getById(id);

  if (!saleId) throw new Error('Sale not found');

  const result = await SalesProductsModel.update({ id, productId, quantity });

  return result;
};

const destroy = async (id) => {
  const saleId = await getById(id);
  if (!saleId) throw new Error('Sale not found');

  await SalesProductsModel.destroy(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
};
