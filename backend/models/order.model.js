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
      `INSERT INTO orders (user_id, total_amount, product_id) 
       VALUES ($1, $2, $3) RETURNING *`,
      [userId, totalAmount, productId],
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
    `SELECT * FROM orders 
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId],
  );
  return result.rows;
}

async function getUserOrderStatus(userId) {
  const result = await pool.query(
    `SELECT product_id, status 
     FROM orders 
     WHERE user_id = $1`,
    [userId],
  );
  return result.rows;
}

async function getProductIdsByUser(userId) {
  const result = await pool.query(
    `SELECT product_id FROM orders WHERE user_id = $1`,
    [userId],
  );
  return result.rows.map((row) => row.product_id);
}

async function updateOrderStatus(userId, productId, status) {
  const result = await pool.query(
    `UPDATE orders 
     SET status = $1 
     WHERE user_id = $2 AND product_id = $3
     RETURNING *`,
    [status, userId, productId],
  );
  return result.rows[0];
}

module.exports = {
  createOrder,
  getOrderById,
  addOrderItem,
  getOrdersByUser,
  getUserOrderStatus,
  getProductIdsByUser,
  updateOrderStatus,
};
