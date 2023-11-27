const express = require('express');

const router = express.Router();

const { productController } = require('../controllers');

router.get('/', productController.getProducts);

router.get('/:id', productController.getProductsById);

module.exports = router;