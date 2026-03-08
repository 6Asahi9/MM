require("dotenv").config();

const express = require("express");
const connectMongo = require("./config/mongo");
const pool = require("./config/db");

const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");
const commentRoutes = require("./routes/comment.routes");
const paymentRoutes = require("./routes/payment.routes");
const { errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(express.json());
app.get("/healthz", (req, res) => res.send("OK"));

connectMongo();

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/payments", paymentRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 500;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
