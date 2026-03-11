const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
      [username, email, hash],
    );

    res.status(201).json({
      message: "User created",
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, username, email, phone, bank, upi, dob, address 
       FROM users 
       WHERE id = $1`,
      [req.user.id],
    );

    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.user.id;
  const allowedFields = [
    "username",
    "email",
    "phone",
    "bank",
    "upi",
    "dob",
    "address",
  ];
  const fieldsToUpdate = allowedFields.filter(
    (field) => req.body[field] !== undefined,
  );

  if (fieldsToUpdate.length === 0)
    return res
      .status(400)
      .json({ error: "No valid fields provided to update" });
  if (fieldsToUpdate.length > 1)
    return res
      .status(400)
      .json({ error: "Please update only one field at a time" });

  const field = fieldsToUpdate[0];
  const value = req.body[field];

  try {
    const result = await pool.query(
      `UPDATE users
       SET ${field} = $1
       WHERE id = $2
       RETURNING ${field}`,
      [value, userId],
    );
    return res.json({ message: `${field} updated`, user: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: `Failed to update ${field}` });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const result = await pool.query(
      "SELECT password_hash FROM users WHERE id = $1",
      [userId],
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(currentPassword, user.password_hash);

    if (!valid) {
      return res.status(401).json({ error: "Current password incorrect" });
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [
      newHash,
      userId,
    ]);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Password update failed" });
  }
};

exports.deleteAccount = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Account deletion failed" });
  }
};
