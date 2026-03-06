const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  getProductById,
  searchProducts,
} = require("../controllers/product.controller");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.get("/search", searchProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/:id/rating", addRating);

module.exports = router;
