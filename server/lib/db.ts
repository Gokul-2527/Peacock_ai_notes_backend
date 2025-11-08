import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  console.log("Missing MONGODB_URI in environment variables");
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB connected");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = !!db.connections[0].readyState;

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
