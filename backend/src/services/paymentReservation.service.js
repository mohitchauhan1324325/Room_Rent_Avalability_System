import { pool } from "../db/dbConnect.js";

export const releaseExpiredPaymentReservations = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const expired = await client.query(
      `UPDATE payment_orders SET status='failed'
       WHERE status='created' AND expires_at <= now()
       RETURNING room_id`);
    for (const { room_id: roomId } of expired.rows) {
      await client.query(
        `UPDATE rooms SET is_available=true, updated_at=now()
         WHERE id=$1 AND NOT EXISTS (SELECT 1 FROM bookings WHERE room_id=$1 AND status='confirmed')`, [roomId]);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Unable to release expired payment reservations", error);
  } finally { client.release(); }
};
