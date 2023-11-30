const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');

const { productIdSalesValidation,
  // quantitySalesValidation,
  // quantitySalesValidation2,
} = require('../middlewares/createSalesValidation');

router.get('/', salesController.getSales);

router.get('/:saleId', salesController.getSalesById);

router.post(
  '/',
  productIdSalesValidation,
  salesController.createSaleController,
);

module.exports = router;