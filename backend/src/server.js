import dotenv from "dotenv";
dotenv.config();

import express from "express";

import dbConnect from "./db/dbConnect.js";
import roomRoutes from "./routes/room.routes.js";
import { PORT } from "./constants.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { releaseExpiredPaymentReservations } from "./services/paymentReservation.service.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import healthRoutes from "./routes/health.routes.js";
import { connectRedis } from "./config/redis.js";
import redisClient from "./config/redis.js";

const app = express();
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json({ limit: "100kb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 600, standardHeaders: "draft-8", legacyHeaders: false }));

app.use("/api", healthRoutes);
app.use("/api", paymentRoutes);
app.use("/api", bookingRoutes);

app.get("/api/test", (req, res) => {
  res.json({
    message: "API route working",
  });
});

app.use("/api", authRoutes);
app.use("/api", roomRoutes);
app.use("/api", adminRoutes);
app.use(errorHandler);

const start = async () => {
  await dbConnect();
  await connectRedis();

  await releaseExpiredPaymentReservations();

  const reservationCleanup = setInterval(
    releaseExpiredPaymentReservations,
    60_000
  );

  const server = app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );

  const shutdown = () => {
    clearInterval(reservationCleanup);

    server.close(async () => {
      await redisClient.quit();
      process.exit(0);
    });
  };

  process.once("SIGTERM", shutdown);
  process.once("SIGINT", shutdown);
};

start().catch((error) => {
  console.error("Unable to start server:", error);
  process.exit(1);
});
