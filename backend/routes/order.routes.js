const express = require("express");
const router = express.Router();
const {
  newOrder,
  getOrder,
  addItem,
  userOrders,
} = require("../controllers/order.controller");

const { authenticate } = require("../middleware/auth.middleware");

router.post("/", authenticate, newOrder);
router.post("/item", authenticate, addItem);
router.get("/:id", authenticate, getOrder);
router.get("/user/:userId", authenticate, userOrders);

module.exports = router;
