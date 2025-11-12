import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/payments");
    console.log("✅ MongoDB connected for Payment Service");
  } catch (error) {
    console.error("❌ Mongo connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
