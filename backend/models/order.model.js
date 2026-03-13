const pool = require("../config/db");

async function createOrder(
  userId,
  totalAmount = 0,
  productId = null,
  quantity = 1,
  price = 0,
) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING *`,
      [userId, totalAmount],
    );
    const order = result.rows[0];

    if (productId) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [order.id, productId, quantity, price],
      );
    }

    await client.query("COMMIT");
    return order;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
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
