import express from "express";
import { confirmBooking, getMyBooking } from "../controllers/booking.controller.js";
import protect from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
    "/confirm",
    protect,
    authorizeRoles("user", "admin"),
    confirmBooking
);

router.get(
    "/myBooking",
    protect,
    authorizeRoles("user", "owner", "admin"),
    getMyBooking
);

export default router;