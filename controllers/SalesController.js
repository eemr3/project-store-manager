const SalesService = require('../services/SalesService');

const getAll = async (req, res) => {
    const result = await SalesService.getAll();
    return res.status(200).json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const sale = await SalesService.getById(Number(id));
    res.status(200).json(sale);
};

module.exports = {
  getAll,
  getById,
};
