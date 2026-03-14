const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: [String],
  tags: [String],
  created_by: {
    type: Number,
    required: true,
  },
  ratings: [Number],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("products", SalesSchema);
