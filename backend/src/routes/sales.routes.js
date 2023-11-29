const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');

const { createSalesValidation } = require('../middlewares/createSalesValidation');

router.get('/', salesController.getSales);

router.get('/:saleId', salesController.getSalesById);

router.post('/', createSalesValidation, salesController.createSaleController);

module.exports = router;