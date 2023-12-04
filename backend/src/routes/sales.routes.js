const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');

const { productIdSalesValidation,
  quantitySalesValidation,
  quantitySalesValidation2,
} = require('../middlewares/createSalesValidation');

router.get('/', salesController.getSales);

router.get('/:saleId', salesController.getSalesById);

router.post(
  '/',
  productIdSalesValidation,
  quantitySalesValidation,
  quantitySalesValidation2,
  salesController.createSaleController,
);

router.delete('/:saleId', salesController.deleteSaleController);

router.put('/:saleId/products/:productId/quantity', salesController.updateSaleController);

module.exports = router;