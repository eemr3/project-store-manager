const SalesProductsModel = require('../models/SalesProductsModel');
const ProductsModel = require('../models/ProductsModel');

const getAll = async () => {
  const result = await SalesProductsModel.getAll();

  return result;
};

const getById = async (id) => {
  const result = await SalesProductsModel.getById(id);

  if (result.length === 0) throw new Error('Sale not found');
  return result;
};

const create = async (values) => {
  await Promise.all(values.map(async (saleItem) => {
    const [{ id, name, quantity: qtd }] = await ProductsModel.getById(
      saleItem.productId,
    );

    if (qtd <= 0 || qtd < saleItem.quantity) {
      throw new Error('Such amount is not permitted to sell');
    }

    const quantity = qtd - saleItem.quantity;
    await ProductsModel.update({ id, name, quantity });
  }));

  const result = await SalesProductsModel.create(values);

  return result;
};

const update = async ({ id, productId, quantity }) => {
  const saleId = await SalesProductsModel.getById(id);

  if (!saleId) throw new Error('Sale not found');
  const result = await SalesProductsModel.update({ id, productId, quantity });

  return result;
};

const destroy = async (id) => {
  const [idProdSl] = await SalesProductsModel.getById(id);
  console.log(idProdSl);
  if (!idProdSl) throw new Error('Sale not found');

  await SalesProductsModel.destroy(id);
  const [getProduct] = await ProductsModel.getById(idProdSl.productId);

  getProduct.quantity = Number(getProduct.quantity) + Number(idProdSl.quantity);

  await ProductsModel.update(getProduct);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
};
