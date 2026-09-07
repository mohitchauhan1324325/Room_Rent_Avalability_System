import dotenv from "dotenv";
dotenv.config();

import express from "express";

import dbConnect from "./db/dbConnect.js";
import roomRoutes from "./routes/room.routes.js";
import { PORT } from "./constants.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.use("/api", paymentRoutes);
app.use("/api", bookingRoutes);
app.use("/api", authRoutes);
app.use("/api", roomRoutes);
app.use("/api", adminRoutes);

const start = async () => {
  await dbConnect();
  const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  const shutdown = () => server.close(() => process.exit(0));
  process.once("SIGTERM", shutdown);
  process.once("SIGINT", shutdown);
};

start().catch((error) => {
  console.error("Unable to start server:", error);
  process.exit(1);
});
