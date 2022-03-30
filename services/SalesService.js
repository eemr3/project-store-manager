const SalesModel = require('../models/SalesModel');

const getAll = async () => {
  const result = await SalesModel.getAll();

  return result;
};

const getById = async (id) => {
  const [sale] = await SalesModel.getById(id);

  if (sale === undefined) throw new Error('Product not found');

  return sale;
};

module.exports = {
  getAll,
  getById,
};
