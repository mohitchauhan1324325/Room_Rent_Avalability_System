import "dotenv/config";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { pool } from "./dbConnect.js";

const sourceDirectory = path.resolve(process.argv[2] || "data");
const idOf = (value) => value?.$oid || value?.toString?.() || String(value || "");
const dateOf = (value) => value?.$date || value || new Date().toISOString();
const readCollection = async (name) => {
  const content = await readFile(path.join(sourceDirectory, `${name}.json`), "utf8");
  const trimmed = content.trim();
  return trimmed.startsWith("[") ? JSON.parse(trimmed) : trimmed.split(/\r?\n/).filter(Boolean).map(JSON.parse);
};

const [users, rooms, bookings, favorites] = await Promise.all(["users", "rooms", "bookings", "favorites"].map(readCollection));
const maps = { users: new Map(), rooms: new Map() };
const client = await pool.connect();
try {
  await client.query("BEGIN");
  for (const user of users) {
    const id = randomUUID();
    maps.users.set(idOf(user._id), id);
    await client.query(`INSERT INTO users (id,name,email,password,phone,role,created_at,updated_at)
      VALUES ($1,$2,lower($3),$4,$5,$6,$7,$8)`, [id, user.name, user.email, user.password, user.phone || null, user.role || "user", dateOf(user.createdAt), dateOf(user.updatedAt)]);
  }
  for (const room of rooms) {
    const id = randomUUID();
    const ownerId = maps.users.get(idOf(room.owner));
    if (!ownerId) throw new Error(`Room ${idOf(room._id)} references a missing owner`);
    maps.rooms.set(idOf(room._id), id);
    await client.query(`INSERT INTO rooms (id,title,images,videos,description,price,location,capacity,owner_id,is_available,created_at,updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`, [id, room.title, room.images || [], room.videos || [], room.description, room.price, room.location, room.capacity, ownerId, room.isAvailable ?? true, dateOf(room.createdAt), dateOf(room.updatedAt)]);
  }
  for (const booking of bookings) {
    const roomId = maps.rooms.get(idOf(booking.roomId));
    const userId = maps.users.get(idOf(booking.user));
    if (!roomId || !userId) throw new Error(`Booking ${idOf(booking._id)} has a missing room or user`);
    await client.query(`INSERT INTO bookings (room_id,user_id,move_in_date,payment_id,order_id,payment_status,status,created_at,updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`, [roomId, userId, dateOf(booking.moveInDate), booking.paymentId || null, booking.orderId || null, booking.paymentStatus || "pending", booking.status || "confirmed", dateOf(booking.createdAt), dateOf(booking.updatedAt)]);
  }
  for (const favorite of favorites) {
    const roomId = maps.rooms.get(idOf(favorite.room));
    const userId = maps.users.get(idOf(favorite.user));
    if (!roomId || !userId) throw new Error(`Favorite ${idOf(favorite._id)} has a missing room or user`);
    await client.query("INSERT INTO favorites (user_id,room_id,created_at) VALUES ($1,$2,$3)", [userId, roomId, dateOf(favorite.createdAt)]);
  }
  await client.query("COMMIT");
  console.log(`Imported ${users.length} users, ${rooms.length} rooms, ${bookings.length} bookings, and ${favorites.length} favorites.`);
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  client.release();
  await pool.end();
}