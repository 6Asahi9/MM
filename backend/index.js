// ------------------------TEST-----------------------------
import authRoutes from "./Test/routes/auth.js";
app.use("/api/auth", authRoutes);
// ------------------------TEST-----------------------------

import connectDB from "./db.js";

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
