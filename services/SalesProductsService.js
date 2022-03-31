const SalesProductsModel = require('../models/SalesProductsModel');

const getAll = async () => {
  const result = await SalesProductsModel.getAll();

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

module.exports = {
  getAll,
  getById,
  create,
};
