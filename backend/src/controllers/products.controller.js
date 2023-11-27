const service = require('../services/products.service');

const getProducts = async (_req, res) => {
  const { status, data } = await service.getProducts();
  res.status(status).json(data);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await service.getProductsById(id);
  res.status(status).json(data);
};

module.exports = {
  getProducts,
  getProductsById,
};