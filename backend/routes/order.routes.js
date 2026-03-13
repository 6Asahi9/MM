const express = require("express");
const router = express.Router();

const {
  newOrder,
  getOrder,
  addItem,
  userOrders,
  getUserProducts,
  setOrderStatus,
  addToCart,
  getOrderStatus,
  getUserOrdersWithProducts,
} = require("../controllers/order.controller");

const { authenticate } = require("../middleware/auth.middleware");

router.post("/", authenticate, newOrder);
router.post("/item", authenticate, addItem);

router.post("/add-to-cart", authenticate, addToCart);

router.get("/products", authenticate, getUserOrdersWithProducts);

router.get("/status", authenticate, getOrderStatus);

router.put("/status", authenticate, setOrderStatus);

router.get("/:id", authenticate, getOrder);

module.exports = router;
