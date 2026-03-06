const express = require("express");
const router = express.Router();
const {
  newOrder,
  getOrder,
  addItem,
  userOrders,
} = require("../controllers/order.controller");

router.post("/", newOrder);
router.post("/item", addItem);
router.get("/:id", getOrder);
router.get("/user/:userId", userOrders);

module.exports = router;
