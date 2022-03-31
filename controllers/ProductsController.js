const ProductsService = require('../services/ProductsService');

const getAll = async (_req, res) => {
    const result = await ProductsService.getAll();
    return res.status(200).json(result);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsService.getById(Number(id));
    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const product = await ProductsService.create({ name, quantity });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await ProductsService.update({ id, name, quantity });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
