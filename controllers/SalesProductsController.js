const SalesProductsService = require('../services/SalesProductsService');

const getAll = async (req, res) => {
  try {
    const result = await SalesProductsService.getAll();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SalesProductsService.getById(Number(id));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
};
