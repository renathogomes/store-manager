const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');

router.get('/', salesController.getSales);

router.get('/:saleId', salesController.getSalesById);

module.exports = router;