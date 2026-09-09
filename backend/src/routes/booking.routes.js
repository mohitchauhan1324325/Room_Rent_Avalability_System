import express from "express";
import { cancelBooking, cancelBookingByUser, confirmBooking, getUsersBooking, getMyBooking } from "../controllers/booking.controller.js";
import protect from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { confirmBookingSchema } from "../validation/schemas.js";

const router = express.Router();

router.post(
    "/confirm",
    protect,
    authorizeRoles("user", "admin"),
    validate(confirmBookingSchema),
    confirmBooking
);

//get user only booking
router.get(
    "/myBooking",
    protect,
    authorizeRoles("user"),
    getMyBooking
);

// get all booking rooms user data
router.get(
    "/booking",
    protect,
    authorizeRoles("owner", "admin"),
    getUsersBooking
);

router.delete(
  "/cancel/:id",
  protect,
  authorizeRoles("user"),
  cancelBookingByUser
);

router.delete(
    "/cancelBookings/:id",
    protect,
    authorizeRoles("owner", "admin"),
    cancelBooking
)

export default router;
