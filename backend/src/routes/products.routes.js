const express = require('express');

const router = express.Router();

const { productController } = require('../controllers');

router.get('/', productController.getProducts);

router.get('/:id', productController.getProductsById);

router.post('/', productController.createProduct);

module.exports = router;