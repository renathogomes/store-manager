const service = require('../services/products.service');

const getProducts = async (_req, res) => {
  const { status, data } = await service.getProducts();
  res.status(status).json(data);
};

module.exports = {
  getProducts,
};