const express = require("express");
const router = express.Router();
const {
  newPayment,
  getPayment,
  orderPayments,
} = require("../controllers/payment.controller");

router.post("/", newPayment);
router.get("/:id", getPayment);
router.get("/order/:orderId", orderPayments);

module.exports = router;
