import { pool, query } from "../db/dbConnect.js";

const bookingSelect = `b.id AS "_id", b.move_in_date AS "moveInDate", b.payment_id AS "paymentId",
  b.order_id AS "orderId", b.payment_status AS "paymentStatus", b.status, b.created_at AS "createdAt",
  json_build_object('_id', r.id, 'title', r.title, 'price', r.price::float, 'images', r.images, 'location', r.location) AS "roomId",
  json_build_object('_id', u.id, 'name', u.name, 'email', u.email, 'phone', u.phone) AS user`;

export const confirmBooking = async (req, res) => {
  const client = await pool.connect();
  try {
    const { roomId, moveInDate, paymentId, orderId } = req.body;
    if (!roomId || !moveInDate || !paymentId || !orderId) return res.status(400).json({ message: "Invalid payment or booking data" });
    await client.query("BEGIN");
    const room = await client.query(
      `UPDATE rooms SET is_available = false, updated_at = now()
       WHERE id = $1 AND is_available = true RETURNING id`, [roomId]);
    if (!room.rows[0]) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "Room already booked or not found" });
    }
    const booking = await client.query(
      `INSERT INTO bookings (room_id, user_id, move_in_date, payment_id, order_id, payment_status, status)
       VALUES ($1,$2,$3,$4,$5,'paid','confirmed')
       RETURNING id AS "_id", room_id AS "roomId", user_id AS user, move_in_date AS "moveInDate",
       payment_id AS "paymentId", order_id AS "orderId", payment_status AS "paymentStatus", status, created_at AS "createdAt"`,
      [roomId, req.user.id, moveInDate, paymentId, orderId]);
    await client.query("COMMIT");
    return res.status(201).json({ success: true, message: "Booking confirmed", booking: booking.rows[0] });
  } catch (error) {
    await client.query("ROLLBACK");
    if (error.code === "23505") return res.status(409).json({ message: "Booking already exists" });
    return res.status(400).json({ message: "Unable to confirm booking" });
  } finally { client.release(); }
};

export const getMyBooking = async (req, res) => {
  try {
    const result = await query(`SELECT ${bookingSelect} FROM bookings b JOIN rooms r ON r.id=b.room_id JOIN users u ON u.id=b.user_id
      WHERE b.user_id=$1 AND b.status='confirmed' ORDER BY b.created_at DESC`, [req.user.id]);
    return res.json(result.rows);
  } catch (error) { return res.status(500).json({ message: error.message }); }
};

export const getUsersBooking = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const result = await query(`SELECT ${bookingSelect} FROM bookings b JOIN rooms r ON r.id=b.room_id JOIN users u ON u.id=b.user_id
      WHERE r.owner_id=$1 ORDER BY b.created_at DESC LIMIT 10 OFFSET $2`, [req.user.id, (page - 1) * 10]);
    return res.json(result.rows);
  } catch (error) { return res.status(500).json({ message: error.message }); }
};

const cancel = async (req, res, requireOwner) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const found = await client.query(
      `SELECT b.id, b.room_id, b.user_id, b.status, r.owner_id FROM bookings b JOIN rooms r ON r.id=b.room_id WHERE b.id=$1 FOR UPDATE`,
      [req.params.id]);
    const booking = found.rows[0];
    if (!booking) { await client.query("ROLLBACK"); return res.status(404).json({ message: "Booking not found" }); }
    if ((requireOwner && req.user.role !== "admin" && booking.owner_id !== req.user.id) || (!requireOwner && booking.user_id !== req.user.id)) {
      await client.query("ROLLBACK"); return res.status(403).json({ message: "Unauthorized" });
    }
    if (booking.status === "cancelled") { await client.query("ROLLBACK"); return res.status(400).json({ message: "Already cancelled" }); }
    await client.query("UPDATE bookings SET status='cancelled', updated_at=now() WHERE id=$1", [booking.id]);
    await client.query("UPDATE rooms SET is_available=true, updated_at=now() WHERE id=$1", [booking.room_id]);
    await client.query("COMMIT");
    return res.json({ message: "Booking cancelled successfully" });
  } catch (error) { await client.query("ROLLBACK"); return res.status(500).json({ message: error.message }); }
  finally { client.release(); }
};

export const cancelBookingByUser = (req, res) => cancel(req, res, false);
export const cancelBooking = (req, res) => cancel(req, res, true);
