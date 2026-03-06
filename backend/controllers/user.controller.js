const bcrypt = require("bcryptjs");
const {
  createUser,
  getUserById,
  getUserByEmail,
} = require("../models/user.model");

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hashedPassword);
    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register user" });
  }
}

async function getUser(req, res) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    res.json({
      message: "Login successful",
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
}

module.exports = { registerUser, getUser, loginUser };
