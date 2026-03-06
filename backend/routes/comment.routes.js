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

router.get("/", getComments);
router.get("/product/:productId", getCommentsByProduct);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
router.post("/:id/reply", addReply);

module.exports = router;
