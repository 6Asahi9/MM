const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  getProductById,
} = require("../controllers/product.controller");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);

module.exports = router;
