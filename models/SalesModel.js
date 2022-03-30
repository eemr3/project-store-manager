const connect = require('./connection');

const getAll = async () => {
  const [sales] = await connect.execute('SELECT * FROM sales');

  return sales;
};

const getById = async (id) => {
  const [sale] = await connect.execute('SELECT * FROM sales WHERE id = ?', [id]);

  return sale;
};

module.exports = {
  getAll,
  getById,
};
