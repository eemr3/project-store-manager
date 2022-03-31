const SalesProductsService = require('../services/SalesProductsService');

const getAll = async (req, res) => {
    const result = await SalesProductsService.getAll();
    return res.status(200).json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await SalesProductsService.getById(Number(id));
    return res.status(200).json(result);
};

const update = async (req, _res) => {
  // const { id } = req.params;
  const { productId, quantity } = req.body[0];

  console.log({ productId, quantity });
  // return res.status(200).json({ productId, quantity });
};
module.exports = {
  getAll,
  getById,
  update,
};
