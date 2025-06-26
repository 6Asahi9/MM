import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/yourDBname", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🟢 MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
  }
};

export default connectDB;
