const model = require('../models');

const getProduct = async () => {
  const products = await model.productModel.getAll();

  if (!products || products.length === 0) {
    return { status: 404, data: { message: 'Product not found' } };
  }

  return { status: 200, data: products };
};

const getProductsById = async (id) => {
  const product = await model.productModel.getById(id);

  if (!product || product.length === 0) {
    return { status: 404, data: { message: 'Product not found' } };
  }

  return { status: 200, data: product };
};

const createProduct = async (name) => {
  const product = await model.productModel.create(name);

  const newProduct = await model.productModel.getById(product.id);

  return { status: 201, data: newProduct };
};

module.exports = {
  getProduct,
  getProductsById,
  createProduct,
};
