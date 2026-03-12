const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  getProductById,
  searchProducts,
  updateProduct,
  deleteProduct,
  addRating,
} = require("../controllers/product.controller");

const { authenticate } = require("../middleware/auth.middleware");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authenticate, createProduct);
router.get("/search", searchProducts);
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);
router.post("/:id/rating", authenticate, addRating);

module.exports = router;
