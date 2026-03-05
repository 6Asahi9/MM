const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo");
  } catch (err) {
    console.error("Mongo connection error ", err);
    process.exit(1);
  }
};

module.exports = connectMongo;
