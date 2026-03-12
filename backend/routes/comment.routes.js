const express = require("express");
const router = express.Router();
const {
  getComments,
  getCommentsByProduct,
  createComment,
  updateComment,
  deleteComment,
  addReply,
} = require("../controllers/comment.controller");

const { authenticate } = require("../middleware/auth.middleware");

router.get("/", getComments);
router.get("/product/:productId", getCommentsByProduct);
router.post("/", authenticate, createComment);
router.put("/:id", authenticate, updateComment);
router.delete("/:id", authenticate, deleteComment);
router.post("/:id/reply", authenticate, addReply);

module.exports = router;
