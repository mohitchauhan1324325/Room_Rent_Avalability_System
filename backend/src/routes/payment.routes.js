import express from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";
import protect from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
    "/create-order",
    protect,
    authorizeRoles("user"),
    createOrder
);

router.post(
    "/verify",
    protect,
    authorizeRoles("user"),
    verifyPayment
);

export default router;