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
    const order = await getOrderById(req.user.id);
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

    const result = await pool.query(
      `INSERT INTO orders (user_id, product_id) VALUES ($1, $2) RETURNING *`,
      [userId, productId],
    );

    res.status(201).json({ order: result.rows[0] });
  } catch (err) {
    console.error("Add to cart error:", err.message);
    res.status(500).json({ error: "Failed to add to cart" });
  }
}

async function getUserProducts(req, res) {
  try {
    const userId = req.user.id;
    const productIds = await getProductIdsByUser(userId);
    res.json({ productIds });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

async function setOrderStatus(req, res) {
  try {
    const userId = req.user.id;
    const { productId, status } = req.body;

    if (!productId || !status)
      return res.status(400).json({ error: "Product ID and status required" });

    const updatedOrder = await updateOrderStatus(userId, productId, status);
    if (!updatedOrder)
      return res.status(404).json({ error: "Order not found" });

    res.json({ order: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update order status" });
  }
}

async function getOrderStatus(req, res) {
  try {
    const userId = req.user.id;
    const orders = await getUserOrderStatus(userId);
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch order status" });
  }
}

module.exports = {
  newOrder,
  getOrder,
  addItem,
  userOrders,
  addToCart,
  getOrderStatus,
  getUserProducts,
  setOrderStatus,
};
