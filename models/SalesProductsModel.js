const connect = require('./connection');

const salesAndProductsSerialize = (data) => ({
  saleId: data.sale_id,
  productId: data.product_id,
  quantity: data.quantity,
  date: data.date,
});

const salesByIdSerialize = (data) => ({
    productId: data.product_id,
    quantity: data.quantity,
    date: data.date,
  }
);

const getAll = async () => {
  const result = await connect.execute(`SELECT * FROM sales_products AS sp
  INNER JOIN sales AS s
  ON sp.sale_id = s.id ORDER BY sp.sale_id`);

  return result[0].map(salesAndProductsSerialize);
};

const getById = async (id) => {
  const result = await connect.execute(
  `SELECT s.date, sp.product_id, sp.quantity
   FROM sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  WHERE s.id = ?;`, [id],
  );

  return result[0].map(salesByIdSerialize);
};

const create = async (values) => {
  const [{ insertId }] = await connect.execute('INSERT INTO sales (date) VALUES(NOW())');
  const saleResult = [];
  await values.forEach(({ productId, quantity }) => {
     connect
    .execute(`INSERT INTO sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`, [insertId, productId, quantity]);
    saleResult.push({
          productId,
          quantity,
        });
  });

  return {
    id: insertId,
    itemsSold: saleResult,
  };
};

const update = async ({ id, productId, quantity }) => {
  await connect.execute(`UPDATE sales_products SET product_id = ?, quantity = ?
   WHERE sale_id = ?`, [productId, quantity, id]);

  return {
    saleId: id,
    itemUpdated: [
      {
        productId,
        quantity,
      },
    ],
  };
};

const destroy = async (id) => {
  await connect.execute('DELETE FROM sales WHERE id = ?', [id]);
};

module.exports = {
  salesAndProductsSerialize,
  getAll,
  getById,
  create,
  update,
  destroy,
};
