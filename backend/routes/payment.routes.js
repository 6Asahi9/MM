const express = require("express");
const router = express.Router();
const {
  newPayment,
  getPayment,
  orderPayments,
} = require("../controllers/payment.controller");

const { authenticate } = require("../middleware/auth.middleware");

router.post("/", authenticate, newPayment);
router.get("/:id", authenticate, getPayment);
router.get("/order/:orderId", authenticate, orderPayments);

module.exports = router;
