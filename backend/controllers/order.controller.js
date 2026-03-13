const pool = require("../config/db");
const Product = require("../models/product.model");
const {
  createOrder,
  getOrderById,
  addOrderItem,
  getOrdersByUser,
} = require("../models/order.model");

async function newOrder(req, res) {
  try {
    const { userId, totalAmount, productId, quantity, price } = req.body;
    const order = await createOrder(
      userId,
      totalAmount,
      productId,
      quantity,
      price,
    );
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

async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId)
      return res.status(400).json({ error: "Product ID required" });

    const insertQuery = `
      INSERT INTO orders (user_id, product_id, total_amount, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await pool.query(insertQuery, [userId, productId, 0, 1]);

    res.status(201).json({ order: result.rows[0] });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
}
module.exports = { newOrder, getOrder, addItem, userOrders, addToCart };
