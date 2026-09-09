import { z } from "zod";

const uuid = z.string().uuid();
const emptyParams = z.object({});

export const registerSchema = z.object({ body: z.object({ name: z.string().trim().min(1).max(100), email: z.string().trim().email().max(254), password: z.string().min(8).max(128), phone: z.string().trim().max(30).optional(), role: z.enum(["user", "owner"]).optional() }), params: emptyParams, query: z.object({}) });
export const loginSchema = z.object({ body: z.object({ email: z.string().trim().email().max(254), password: z.string().min(1).max(128) }), params: emptyParams, query: z.object({}) });
export const createOrderSchema = z.object({ body: z.object({ roomId: uuid }), params: emptyParams, query: z.object({}) });
export const verifyPaymentSchema = z.object({ body: z.object({ razorpay_order_id: z.string().min(1).max(100), razorpay_payment_id: z.string().min(1).max(100), razorpay_signature: z.string().regex(/^[a-f0-9]{64}$/i) }), params: emptyParams, query: z.object({}) });
export const confirmBookingSchema = z.object({ body: z.object({ roomId: uuid, moveInDate: z.coerce.date(), orderId: z.string().min(1).max(100) }), params: emptyParams, query: z.object({}) });
