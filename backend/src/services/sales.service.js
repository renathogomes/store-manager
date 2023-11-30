const model = require('../models');

const getSales = async () => {
  const sales = await model.salesModel.getAll();
    
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
  const products = sales.map((product) => model.productsModel.getById(product.productId));
  const resolveProduct = await Promise.all(products);

  if (!resolveProduct || resolveProduct.length === 0) {
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

module.exports = {
  getSales,
  getSalesById,
  createSaleService,
};