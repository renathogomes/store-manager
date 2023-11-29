const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');

router.get('/', salesController.getSales);

router.get('/:saleId', salesController.getSalesById);

router.post('/', salesController.createSaleController);

module.exports = router;