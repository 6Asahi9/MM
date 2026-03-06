const pool = require("../config/db");

async function createOrder(userId, totalAmount = 0) {
  const result = await pool.query(
    `INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING *`,
    [userId, totalAmount],
  );
  return result.rows[0];
}

async function getOrderById(orderId) {
  const result = await pool.query(
    `SELECT o.*, json_agg(oi.*) AS items
     FROM orders o
     LEFT JOIN order_items oi ON o.id = oi.order_id
     WHERE o.id = $1
     GROUP BY o.id`,
    [orderId],
  );
  return result.rows[0];
}

async function addOrderItem(orderId, productId, quantity, price) {
  const result = await pool.query(
    `INSERT INTO order_items (order_id, product_id, quantity, price)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [orderId, productId, quantity, price],
  );
  return result.rows[0];
}

async function getOrdersByUser(userId) {
  const result = await pool.query(
    `SELECT o.*, json_agg(oi.*) AS items
     FROM orders o
     LEFT JOIN order_items oi ON o.id = oi.order_id
     WHERE o.user_id = $1
     GROUP BY o.id
     ORDER BY o.created_at DESC`,
    [userId],
  );
  return result.rows;
}

module.exports = { createOrder, getOrderById, addOrderItem, getOrdersByUser };
