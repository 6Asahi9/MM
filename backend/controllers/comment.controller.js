const Comment = require("../models/comment.model");

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentsByProduct = async (req, res) => {
  try {
    const comments = await Comment.find({ product_id: req.params.productId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { product_id, content, rating } = req.body;

    const newComment = new Comment({
      product_id,
      content,
      rating,
      user_id: req.user.id,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user_id !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    comment.content = req.body.content ?? comment.content;
    comment.rating = req.body.rating ?? comment.rating;
    comment.updated_at = Date.now();

    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user_id !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await comment.remove();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addReply = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({
      user_id: req.user.id,
      content: req.body.content,
    });

    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
