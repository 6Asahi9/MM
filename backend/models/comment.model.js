const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  product_id: String,
  user_id: String,
  content: String,
  rating: Number,
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
