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
  return product;
};

const create = async ({ name, quantity }) => {
  const result = await connect.execute(`
  INSERT INTO products (name, quantity) VALUES (?, ?)`,
    [name, quantity]);
  return result;
};

const update = async ({ id, name, quantity }) => {
  await connect.execute(`UPDATE products SET name = ?, quantity = ?
  WHERE id = ?`, [name, quantity, id]);

  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
};
