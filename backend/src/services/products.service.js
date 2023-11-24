const model = require('../models/products.model');

const getProduct = async () => {
  const products = await model.getProducts();

  if (!products) {
    return { status: 404, message: 'Products not found' };
  }

  return { status: 200, data: products };
};

module.exports = {
  getProduct,
};
