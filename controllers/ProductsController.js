const ProductsService = require('../services/ProductsService');

const getAll = async (req, res) => {
    const result = await ProductsService.getAll();
    return res.status(200).json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const product = await ProductsService.getById(Number(id));
    return res.status(200).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  res.status(201).json({ name, quantity });
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
