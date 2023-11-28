const serviceProduct = require('../services/products.service');

const getProducts = async (_req, res) => {
  const { status, data } = await serviceProduct.getProduct();
  res.status(status).json(data);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await serviceProduct.getProductsById(id);
  res.status(status).json(data);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await serviceProduct.createProduct(name);
  res.status(status).json(data);
};

module.exports = {
  getProducts,
  getProductsById,
  createProduct,
};