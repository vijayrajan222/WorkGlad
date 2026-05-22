import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("database connected");
  });
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("database connection failed", error.message);
    throw error;
  }
};

export default connectDB;
