import crypto from "node:crypto";
import { razorpay } from "../config/razorpay.js";
import { pool, query } from "../db/dbConnect.js";

export const createOrder = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const roomResult = await client.query(
      `UPDATE rooms SET is_available=false, updated_at=now()
       WHERE id=$1 AND is_available=true RETURNING id, price`, [req.body.roomId]);
    const room = roomResult.rows[0];
    if (!room) { await client.query("ROLLBACK"); return res.status(409).json({ message: "Room is unavailable" }); }

    const amountPaise = Math.round(Number(room.price) * 100);
    const receipt = `bk_${crypto.randomBytes(16).toString("hex")}`;
    const order = await razorpay.orders.create({ amount: amountPaise, currency: "INR", receipt });
    await client.query(
      `INSERT INTO payment_orders (razorpay_order_id, receipt, room_id, user_id, amount_paise, currency)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [order.id, receipt, room.id, req.user.id, amountPaise, order.currency],
    );
    await client.query("COMMIT");
    return res.json(order);
  } catch (error) {
    await client.query("ROLLBACK");
    return res.status(500).json({ message: "Unable to create payment order" });
  } finally { client.release(); }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body;
    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest("hex");
    if (!crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"))) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }
    const result = await query(
      `UPDATE payment_orders SET status='verified', payment_id=$1, verified_at=now()
       WHERE razorpay_order_id=$2 AND user_id=$3 AND status='created' AND expires_at > now()
       RETURNING razorpay_order_id`,
      [paymentId, orderId, req.user.id],
    );
    if (!result.rows[0]) return res.status(409).json({ success: false, message: "Payment order is invalid, already used, or belongs to another user" });
    return res.json({ success: true, message: "Payment verified", orderId });
  } catch {
    return res.status(500).json({ message: "Unable to verify payment" });
  }
};
