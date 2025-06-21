require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./config/config');
const { handleTypeError } = require('./middlewares/errors');
const app = express();
const PORT = process.env.PORT;
const swaggerUI = require('swagger-ui-express');
const docs = require('./docs/index');

dbConnection();

// MIDDLEWARE
app.use(express.json());

// ENDPOINTS
app.use('/products', require('./routes/productRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/categories', require('./routes/categoryRoutes'));
app.use('/orders', require('./routes/orderRoutes'));
app.use('/reviews', require('./routes/reviewRoutes'));

app.use(handleTypeError);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

// SERVER
app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
