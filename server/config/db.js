import mongoose from "mongoose";
import dns from "node:dns";

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing in .env");
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("database connected");
  } catch (error) {
    if (error.code === "ECONNREFUSED" && error.syscall === "querySrv") {
      console.log("default DNS refused MongoDB SRV lookup, retrying with public DNS");
      dns.setServers(["1.1.1.1", "8.8.8.8"]);

      try {
        await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: 10000,
        });
        console.log("database connected");
        return;
      } catch (retryError) {
        console.log("database connection failed", retryError.message);
        throw retryError;
      }
    }

    console.log("database connection failed", error.message);
    throw error;
  }
};

export default connectDB;
