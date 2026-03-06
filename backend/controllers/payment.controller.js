const {
  createPayment,
  getPaymentById,
  getPaymentsByOrder,
} = require("../models/payment.models");

async function newPayment(req, res) {
  try {
    const { orderId, amount, paymentMethod, transactionId } = req.body;
    const payment = await createPayment(
      orderId,
      amount,
      paymentMethod,
      transactionId,
    );
    res.status(201).json({ payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create payment" });
  }
}

async function getPayment(req, res) {
  try {
    const payment = await getPaymentById(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json({ payment });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payment" });
  }
}

async function orderPayments(req, res) {
  try {
    const payments = await getPaymentsByOrder(req.params.orderId);
    res.json({ payments });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
}

module.exports = { newPayment, getPayment, orderPayments };
