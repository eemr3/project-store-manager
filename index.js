const express = require('express');
require('dotenv').config();
const ProductsRouter = require('./routes/ProductsRoute');
const SalesProductsRoute = require('./routes/SalesProductsRoute');

const app = express();
app.use(express.json());

app.use('/products', ProductsRouter);
app.use('/sales', SalesProductsRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
