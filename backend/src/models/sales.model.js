const camelize = require('camelize');

const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT SP.sale_id, SP.product_id, SP.quantity, S.date
        FROM StoreManager.sales_products AS SP
        INNER JOIN StoreManager.products AS P 
        ON SP.product_id = P.id 
        INNER JOIN StoreManager.sales AS S 
        ON S.id = SP.sale_id
        ORDER BY sale_id, product_id;`,
  );
  return camelize(sales);
};

const getById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT S.date, SP.product_id, SP.quantity
        FROM StoreManager.sales_products AS SP
        INNER JOIN StoreManager.products AS P 
        ON SP.product_id = P.id 
        INNER JOIN StoreManager.sales AS S 
        ON S.id = SP.sale_id
        WHERE S.id = ?;`,
    [id],
  );
  return camelize(sale);
};

const createSales = async (sales) => {
  const [response] = await connection.execute(`
  INSERT INTO StoreManager.sales () VALUES ()`);
  
  const salesPromises = sales.map(({ productId, quantity }) => connection.execute(
    `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
    [response.insertId, productId, quantity],
  ));
    
  await Promise.all(salesPromises);

  return response.insertId;
};

module.exports = {
  getAll,
  getById,
  createSales,
};