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
} = require("../controllers/order.controller");

const { authenticate } = require("../middleware/auth.middleware");

router.post("/", authenticate, newOrder);
router.post("/item", authenticate, addItem);
router.get("/:id", authenticate, getOrder);
router.get("/user/:userId", authenticate, userOrders);
router.post("/add-to-cart", authenticate, addToCart);
router.get("/products", authenticate, getUserProducts);
router.put("/status", authenticate, setOrderStatus);
router.put("/status", authenticate, getOrderStatus);

module.exports = router;
