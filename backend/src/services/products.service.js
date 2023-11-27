const model = require('../models/products.model');

const getProduct = async () => {
  const products = await model.getProducts();

  if (!products) {
    return { status: 404, message: 'Products not found' };
  }

  return { status: 200, data: products };
};

const getProductById = async (id) => {
  const product = await model.getProductById(id);

  if (!product) {
    return { status: 404, message: 'Product not found' };
  }

  return { status: 200, data: product };
};

module.exports = {
  getProduct,
  getProductById,
};
