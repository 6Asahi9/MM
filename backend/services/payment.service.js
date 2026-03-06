const pool = require("../config/db");
const { createPayment } = require("../models/payment.models");
const { updateOrderStatus } = require("../models/order.model");

async function processPayment(orderId, amount, paymentMethod, transactionId) {
  // 1. Create the payment record
  const payment = await createPayment(
    orderId,
    amount,
    paymentMethod,
    transactionId,
  );

  await updateOrderStatus(orderId, "paid");

  return payment;
}

module.exports = { processPayment };
