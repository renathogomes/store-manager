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

const updateProduct = async (id, name) => {
  const productExists = await model.productModel.getById(id);
  if (!productExists || productExists.length === 0) {
    return { status: 404, data: { message: 'Product not found' } };
  }

  const product = await model.productModel.update(id, name);

  const { newName } = product;

  return { status: 200,
    data: {
      id: Number(id),
      name: newName,
    },
  };
};

const deleteProduct = async (id) => {
  const productExists = await model.productModel.getById(id);
  if (!productExists || productExists.length === 0) {
    return { status: 404, data: { message: 'Product not found' } };
  }

  await model.productModel.exclude(id);

  return { status: 204 };
};

module.exports = {
  getProduct,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
