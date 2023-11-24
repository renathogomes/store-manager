const express = require('express');

const routerProducts = require('./routes/products.routes');
const routerSales = require('./routes/sales.routes');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', routerProducts);
app.use('/sales', routerSales);

module.exports = app;
