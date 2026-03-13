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
router.get("/:id", authenticate, getOrder);

router.post("/add-to-cart", authenticate, addToCart);

router.get("/products", authenticate, getUserOrdersWithProducts);

router.put("/status", authenticate, setOrderStatus);

router.get("/status", authenticate, getOrderStatus);

module.exports = router;
