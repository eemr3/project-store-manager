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
    return res.status(400).json({ message: error.message });
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
  const { name, quantity } = req.body;

  res.status(200).json({ n: name, q: quantity });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
