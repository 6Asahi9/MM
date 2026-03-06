const pool = require("../config/db");

async function createPayment(
  orderId,
  amount,
  paymentMethod,
  transactionId = null,
) {
  const result = await pool.query(
    `INSERT INTO payments (order_id, amount, payment_method, transaction_id) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [orderId, amount, paymentMethod, transactionId],
  );
  return result.rows[0];
}

async function getPaymentById(paymentId) {
  const result = await pool.query(`SELECT * FROM payments WHERE id=$1`, [
    paymentId,
  ]);
  return result.rows[0];
}

async function getPaymentsByOrder(orderId) {
  const result = await pool.query(
    `SELECT * FROM payments WHERE order_id=$1 ORDER BY created_at DESC`,
    [orderId],
  );
  return result.rows;
}

module.exports = { createPayment, getPaymentById, getPaymentsByOrder };
