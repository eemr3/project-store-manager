const ProductsService = require('../services/ProductsService');

const getAll = async (req, res) => {
  try {
    const result = await ProductsService.getAll();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsService.getById(Number(id));
    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
};
