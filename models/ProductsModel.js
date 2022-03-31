const connect = require('./connection');

const getAll = async () => {
  const [products] = await connect.execute('SELECT * FROM products ORDER BY id');

  return products;
};

const getById = async (id) => {
  const [product] = await connect
    .execute('SELECT * FROM products WHERE id = ?', [id]);

  return product;
};

const getByName = async (productName) => {
  const [product] = await connect
    .execute('SELECT name FROM products WHERE name = ?', [productName]);
  console.log(product);
};

module.exports = {
  getAll,
  getById,
  getByName,
};
