const express = require("express");
const connectMongo = require("./config/mongo");

const app = express();
app.use(express.json());
connectMongo();

// app.use('/api/products', require('./routes/product.routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
