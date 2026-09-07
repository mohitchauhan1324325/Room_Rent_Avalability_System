import { pool, query } from "../db/dbConnect.js";
import cloudinary from "../config/cloudinary.js";

const recentBookingColumns = `b.id AS "_id", b.status, b.payment_status AS "paymentStatus", b.created_at AS "createdAt",
  json_build_object('_id', u.id, 'name', u.name, 'email', u.email) AS user,
  json_build_object('_id', r.id, 'title', r.title, 'location', r.location) AS "roomId"`;

export const getAdminDashboard = async (_req, res) => {
  try {
    const [userStats, roomStats, bookingStats, recentUsers, recentRooms, recentBookings] = await Promise.all([
      query(`SELECT
        count(*)::int AS "totalUsers", count(*) FILTER (WHERE role='owner')::int AS "totalOwners",
        count(*) FILTER (WHERE role='user')::int AS "totalCustomers" FROM users`),
      query(`SELECT count(*)::int AS "totalRooms", count(*) FILTER (WHERE is_available)::int AS "availableRooms",
        count(*) FILTER (WHERE NOT is_available)::int AS "bookedRooms" FROM rooms`),
      query(`SELECT count(*)::int AS "totalBookings", count(*) FILTER (WHERE status='confirmed')::int AS "confirmedBookings",
        count(*) FILTER (WHERE status='cancelled')::int AS "cancelledBookings" FROM bookings`),
      query(`SELECT id AS "_id", name, email, role, created_at AS "createdAt" FROM users ORDER BY created_at DESC LIMIT 5`),
      query(`SELECT r.id AS "_id", r.title, r.location, r.price::float AS price, r.is_available AS "isAvailable", r.created_at AS "createdAt",
        u.name AS "ownerName" FROM rooms r JOIN users u ON u.id=r.owner_id ORDER BY r.created_at DESC LIMIT 5`),
      query(`SELECT ${recentBookingColumns} FROM bookings b JOIN users u ON u.id=b.user_id JOIN rooms r ON r.id=b.room_id ORDER BY b.created_at DESC LIMIT 5`),
    ]);
    const stats = { ...userStats.rows[0], ...roomStats.rows[0], ...bookingStats.rows[0] };
    const recentActivity = [
      ...recentUsers.rows.map((user) => ({ type: "user", title: `${user.name} joined`, description: `${user.role} account created`, createdAt: user.createdAt })),
      ...recentRooms.rows.map((room) => ({ type: "room", title: room.title, description: `${room.isAvailable ? "Available" : "Booked"} • ${room.location}`, createdAt: room.createdAt })),
      ...recentBookings.rows.map((booking) => ({ type: "booking", title: booking.roomId?.title || "Booking", description: `${booking.user?.name || "User"} • ${booking.status}`, createdAt: booking.createdAt })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
    return res.json({ stats, recentUsers: recentUsers.rows, recentRooms: recentRooms.rows, recentBookings: recentBookings.rows, recentActivity });
  } catch (error) { return res.status(500).json({ message: error.message }); }
};

export const getAdminManagementData = async (req, res) => {
  try {
    const { tab = "users", search = "", filter = "all" } = req.query;
    const term = `%${search}%`;
    if (tab === "users") {
      const result = await query(`SELECT id AS "_id", name, email, phone, role, created_at AS "createdAt" FROM users
        WHERE ($1='' OR name ILIKE $2 OR email ILIKE $2 OR role ILIKE $2) ORDER BY created_at DESC`, [search, term]);
      return res.json({ users: result.rows });
    }
    if (tab === "rooms") {
      const result = await query(`SELECT r.id AS "_id", r.title, r.location, r.price::float AS price, r.is_available AS "isAvailable", r.created_at AS "createdAt",
        json_build_object('_id',u.id,'name',u.name,'email',u.email) AS owner FROM rooms r JOIN users u ON u.id=r.owner_id
        WHERE ($1='' OR r.title ILIKE $2 OR r.location ILIKE $2) AND ($3='all' OR r.is_available = ($3='available')) ORDER BY r.created_at DESC`, [search, term, filter]);
      return res.json({ rooms: result.rows });
    }
    const result = await query(`SELECT ${recentBookingColumns} FROM bookings b JOIN users u ON u.id=b.user_id JOIN rooms r ON r.id=b.room_id
      WHERE ($1='' OR b.status ILIKE $2 OR b.payment_status ILIKE $2) AND ($3='all' OR b.status=$3) ORDER BY b.created_at DESC`, [search, term, filter]);
    return res.json({ bookings: result.rows });
  } catch (error) { return res.status(500).json({ message: error.message }); }
};

export const deleteUserByAdmin = async (req, res) => {
  try { await query("DELETE FROM users WHERE id=$1", [req.params.id]); return res.json({ message: "User deleted" }); }
  catch (error) { return res.status(400).json({ message: error.message }); }
};

export const deleteRoomByAdmin = async (req, res) => {
  try {
    const found = await query("SELECT id, images FROM rooms WHERE id=$1", [req.params.id]);
    const room = found.rows[0];
    if (!room) return res.status(404).json({ message: "Room not found" });
    await query("DELETE FROM rooms WHERE id=$1", [room.id]);
    await Promise.all((room.images || []).filter((url) => url.includes("cloudinary")).map((url) => cloudinary.uploader.destroy(`rooms/${url.split("/").pop().split(".")[0]}`)));
    return res.json({ message: "Room deleted" });
  } catch (error) { return res.status(500).json({ message: error.message }); }
};

export const cancelBookingByAdmin = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query("UPDATE bookings SET status='cancelled', updated_at=now() WHERE id=$1 AND status='confirmed' RETURNING room_id", [req.params.id]);
    if (!result.rows[0]) { await client.query("ROLLBACK"); return res.status(404).json({ message: "Booking not found or already cancelled" }); }
    await client.query("UPDATE rooms SET is_available=true, updated_at=now() WHERE id=$1", [result.rows[0].room_id]);
    await client.query("COMMIT");
    return res.json({ message: "Booking cancelled" });
  } catch (error) { await client.query("ROLLBACK"); return res.status(500).json({ message: error.message }); }
  finally { client.release(); }
};
