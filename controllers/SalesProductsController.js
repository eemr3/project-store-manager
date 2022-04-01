const SalesProductsService = require('../services/SalesProductsService');

const getAll = async (req, res) => {
    const result = await SalesProductsService.getAll();
    return res.status(200).json(result);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SalesProductsService.getById(Number(id));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: 'Sale not found' });
  }
};

const create = async (req, res) => {
  const result = await SalesProductsService.create(req.body);
  res.status(201).json(result);
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, quantity } = req.body[0];

    const result = await SalesProductsService.update({ id, productId, quantity });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await SalesProductsService.destroy(Number(id));
    return res.status(204).json();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
};
