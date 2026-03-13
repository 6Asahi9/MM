const express = require("express");
const router = express.Router();
const {
  newOrder,
  getOrder,
  addItem,
  userOrders,
  addToCart,
} = require("../controllers/order.controller");

const { authenticate } = require("../middleware/auth.middleware");

router.post("/", authenticate, newOrder);
router.post("/item", authenticate, addItem);
router.get("/:id", authenticate, getOrder);
router.get("/user/:userId", authenticate, userOrders);
router.post("/add-to-cart", authenticate, addToCart);

module.exports = router;
