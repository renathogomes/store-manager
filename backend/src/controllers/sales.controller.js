const serviceSales = require('../services/sales.service');

const getSales = async (_req, res) => {
  const { status, data } = await serviceSales.getSales();
  res.status(status).json(data);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await serviceSales.getSalesById(id);
  res.status(status).json(data);
};

module.exports = {
  getSales,
  getSalesById,
};
