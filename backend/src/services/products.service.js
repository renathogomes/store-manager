const model = require('../models/index');

const getProduct = async () => {
  const products = await model.productModel.getAll();

  if (!products) {
    return { status: 404, message: 'Products not found' };
  }

  return { status: 200, data: products };
};

const getProductsById = async (id) => {
  const product = await model.productModel.getById(id);

  if (!product) {
    return { status: 404, message: 'Product not found' };
  }

  return { status: 200, data: product };
};

module.exports = {
  getProduct,
  getProductsById,
};
