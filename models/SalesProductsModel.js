const connect = require('./connection');

const salesAndProductsSerialize = (data) => ({
  saleId: data.sale_id,
  productId: data.product_id,
  quantity: data.quantity,
  date: data.date,
});

const getAll = async () => {
  const result = await connect.execute(`SELECT * FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id ORDER BY sp.sale_id`);

  return result[0].map(salesAndProductsSerialize);
};

const getById = async (id) => {
  const result = await connect.execute(
  `SELECT s.date, sp.product_id, sp.quantity
   FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  WHERE s.id = ?;`, [id],
  );

  return result[0].map(salesAndProductsSerialize);
};

module.exports = {
  getAll,
  getById,
};
