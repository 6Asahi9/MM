const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  active: Boolean,
  start_date: Date,
  end_date: Date,
});

module.exports = mongoose.model("Sales", SalesSchema);
