const express = require("express");
const router = express.Router();

const passport = require("../config/passport-google");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.json({
      message: "Google login successful",
      user: req.user,
    });
  },
);

const {
  register,
  login,
  getUser,
  updateUser,
  changePassword,
  deleteAccount,
  findUser,
} = require("../controllers/auth.controller");

const { authenticate } = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", findUser);
router.put("/user", authenticate, updateUser);
router.get("/user", authenticate, getUser);
router.put("/change-password", authenticate, changePassword);
router.delete("/delete-account", authenticate, deleteAccount);

module.exports = router;
