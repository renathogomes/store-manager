const serviceProduct = require('../services/products.service');

const getProducts = async (_req, res) => {
  const { status, data } = await serviceProduct.getProduct();
  return res.status(status).json(data);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await serviceProduct.getProductsById(id);
  return res.status(status).json(data);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await serviceProduct.createProduct(name);
  return res.status(status).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await serviceProduct.updateProduct(id, name);
  return res.status(status).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await serviceProduct.deleteProduct(id);
  return res.status(status).json(data);
};

module.exports = {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};