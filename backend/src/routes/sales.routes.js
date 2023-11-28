const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');

router.get('/', salesController.getSales);

router.get('/:id', salesController.getSalesById);

module.exports = router;