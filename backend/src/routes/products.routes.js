const express = require('express');

const router = express.Router();

const { productController } = require('../controllers');

const { createProductValidation } = require('../middlewares/createProductValidation');

router.get('/', productController.getProducts);

router.get('/:id', productController.getProductsById);

router.post('/', createProductValidation, productController.createProduct);

router.put('/:id', createProductValidation, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;