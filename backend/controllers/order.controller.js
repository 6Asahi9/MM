const {
  createOrder,
  getOrderById,
  addOrderItem,
  getOrdersByUser,
} = require("../models/order.model");

async function newOrder(req, res) {
  try {
    const { userId, totalAmount } = req.body;
    const order = await createOrder(userId, totalAmount);
    res.status(201).json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
}

async function getOrder(req, res) {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
}

async function addItem(req, res) {
  try {
    const { orderId, productId, quantity, price } = req.body;
    const item = await addOrderItem(orderId, productId, quantity, price);
    res.status(201).json({ item });
  } catch (err) {
    res.status(500).json({ error: "Failed to add item" });
  }
}

async function userOrders(req, res) {
  try {
    const orders = await getOrdersByUser(req.params.userId);
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}

module.exports = { newOrder, getOrder, addItem, userOrders };
