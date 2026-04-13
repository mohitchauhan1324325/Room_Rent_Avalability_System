import express from "express";
import { confirmBooking } from "../controllers/booking.controller.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/confirm", protect, confirmBooking);

export default router;