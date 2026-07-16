import mongoose from "mongoose";
import dns from "dns";

// Use Google DNS to resolve MongoDB Atlas SRV records
// (fixes ECONNREFUSED on networks with restrictive DNS like college/office WiFi)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/roomapp`
    );

    console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};


export default dbConnect;
