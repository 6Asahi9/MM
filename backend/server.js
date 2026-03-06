require("dotenv").config();

const express = require("express");
const connectMongo = require("./config/mongo");
const pool = require("./config/db");

const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");
const commentRoutes = require("./routes/comment.routes");

const app = express();

app.use(express.json());

connectMongo();

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
