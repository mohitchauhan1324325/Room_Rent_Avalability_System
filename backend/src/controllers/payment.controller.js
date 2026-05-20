import { razorpay } from "../config/razorpay.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
    try {

        const amount = Number(req.body.amount);

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Invalid amount"
            });
        }

        const order =
            await razorpay.orders.create({
                amount: amount * 100,
                currency: "INR",
                receipt: `receipt_${Date.now()}`
            });

        res.json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

export const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                message: "Missing payment data"
            });
        }

        const generatedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(
                    `${razorpay_order_id}|${razorpay_payment_id}`
                )
                .digest("hex");

        if (
            generatedSignature !==
            razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "Payment verified"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};