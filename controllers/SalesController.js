const SalesService = require('../services/SalesService');

const getAll = async (req, res) => {
  try {
    const result = await SalesService.getAll();
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await SalesService.getById(Number(id));
    res.status(200).json(sale);
  } catch (error) {
    return res.satatus(400).send(error.message);
  }
};

module.exports = {
  getAll,
  getById,
};
