import rateLimit from "express-rate-limit";

const options = {
  windowMs: 15 * 60 * 1000,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again later." },
};

export const authLimiter = rateLimit({ ...options, limit: 10 });
export const paymentLimiter = rateLimit({ ...options, limit: 30 });
