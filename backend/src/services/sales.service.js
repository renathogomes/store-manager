const model = require('../models');

const getSales = async () => {
  const sales = await model.salesModel.getAll();

  console.log(sales);
    
  if (!sales || sales.length === 0) {
    return { status: 404, data: { message: 'Sale not found' } };
  }
    
  return { status: 200, data: sales };
};

const getSalesById = async (saleId) => {
  const sale = await model.salesModel.getById(saleId);

  if (!sale || sale.length === 0) {
    return { status: 404, data: { message: 'Sale not found' } };
  }

  return { status: 200, data: sale };
};

const createSaleService = async (sales) => {
  const products = sales
    .map((product) => model.productModel.getById(product.productId));
  const resolveProduct = await Promise.all(products);

  if (resolveProduct.some((product) => !product || product.length === 0)) {
    return { status: 404, data: { message: 'Product not found' } };
  }

  const saleId = await model.salesModel.createSales(sales);

  return { status: 201,
    data: { 
      id: saleId,
      itemsSold: sales, 
    },
  };
};

const deleteSaleService = async (saleId) => {
  const sale = await model.salesModel.getById(saleId);

  if (!sale.length) {
    return { status: 404, data: { message: 'Sale not found' } };
  }

  await model.salesModel.deleteSale(saleId);

  return { status: 204, data: { message: 'Sale deleted successfully' } };
};

const updateSaleService = async (saleId, productId, quantity) => {
  const sale = await model.salesModel.getById(saleId);
  const product = await model.productModel.getById(productId);

  if (!sale.length) {
    return { status: 404, data: { message: 'Sale not found' } };
  }

  if (!product || product.length === 0 || quantity <= 0) {
    return { status: 422, data: { message: 'Wrong product ID or invalid quantity' } };
  }

  const updatedSale = await model.salesModel.updateSale(saleId, productId, quantity);

  return { status: 200, data: updatedSale };
};

module.exports = {
  getSales,
  getSalesById,
  createSaleService,
  deleteSaleService,
  updateSaleService,
};