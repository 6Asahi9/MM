require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectMongo = require("./config/mongo");
const pool = require("./config/db");

const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");
const commentRoutes = require("./routes/comment.routes");
const paymentRoutes = require("./routes/payment.routes");
const { errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.options("*", cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: "Too many requests, please try again later.",
  },
});

app.use(limiter);

app.use(express.json());

connectMongo();

app.get("/healthz", (req, res) => {
  res.send("OK");
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/payments", paymentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
