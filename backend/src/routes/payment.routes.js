import express from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";
import protect from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { paymentLimiter } from "../middlewares/rateLimiters.js";
import { validate } from "../middlewares/validate.js";
import { createOrderSchema, verifyPaymentSchema } from "../validation/schemas.js";

const router = express.Router();

router.post(
    "/create-order",
    paymentLimiter,
    protect,
    authorizeRoles("user"),
    validate(createOrderSchema),
    createOrder
);

router.post(
    "/verify",
    paymentLimiter,
    protect,
    authorizeRoles("user"),
    validate(verifyPaymentSchema),
    verifyPayment
);

export default router;
