const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  user_id: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  replies: [
    {
      user_id: String,
      content: String,
      created_at: { type: Date, default: Date.now },
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
