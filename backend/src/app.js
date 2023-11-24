const express = require('express');

const productsModel = require('./models/productsModule');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', async (_request, response) => {
  const products = await productsModel.getAll();
  response.status(200).json(products);
});

module.exports = app;
