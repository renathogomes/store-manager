const connection = require('../server');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products;',
  );
  return products;
};

module.exports = {
  getAll,
};