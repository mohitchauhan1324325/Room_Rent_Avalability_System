import express from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";
import protect from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
    "/create-order",
    protect,
    authorizeRoles("user", "admin"),
    createOrder
);

router.post(
    "/verify",
    protect,
    authorizeRoles("user", "admin"),
    verifyPayment
);

export default router;