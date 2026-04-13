import dotenv from "dotenv";
dotenv.config();

import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]); 

import express from "express";

import dbConnect from "./db/dbConnect.js";
import roomRoutes from "./routes/room.routes.js";
import { PORT } from "./constants.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use(express.json());

dbConnect();

app.use("/api", paymentRoutes);
app.use("/api", bookingRoutes);
app.use("/api", authRoutes);
app.use("/api", roomRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});