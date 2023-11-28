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

module.exports = {
  getSales,
  getSalesById,
};