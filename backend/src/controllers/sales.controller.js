const serviceSales = require('../services/sales.service');

const getSales = async (_req, res) => {
  const { status, data } = await serviceSales.getSales();
  return res.status(status).json(data);
};

const getSalesById = async (req, res) => {
  const { saleId } = req.params;
  const { status, data } = await serviceSales.getSalesById(saleId);
  return res.status(status).json(data);
};

const createSaleController = async (req, res) => {
  const sales = req.body;
  const { status, data } = await serviceSales.createSaleService(sales);
  return res.status(status).json(data);
};

const deleteSaleController = async (req, res) => {
  const { saleId } = req.params;
  const { status, data } = await serviceSales.deleteSaleService(saleId);
  return res.status(status).json(data);
};

const updateSaleController = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const { status, data } = await serviceSales.updateSaleService(saleId, productId, quantity);
  return res.status(status).json(data);
};

module.exports = {
  getSales,
  getSalesById,
  createSaleController, 
  deleteSaleController,
  updateSaleController,
};
