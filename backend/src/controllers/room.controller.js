import { query } from "../db/dbConnect.js";
import cloudinary from "../config/cloudinary.js";

const listingColumns = `id AS "_id", title, price::float AS price, description, images, location,
  is_available AS "isAvailable", created_at AS "createdAt"`;
const mediaFromFiles = (files = []) => ({
    images: files.filter((file) => file.mimetype.startsWith("image")).map((file) => file.path),
    videos: files.filter((file) => file.mimetype.startsWith("video")).map((file) => file.path),
});
const isOwnerOrAdmin = (room, user) => user.role === "admin" || room.owner_id === user.id;

export const addRoom = async (req, res) => {
    try {
        const { images, videos } = mediaFromFiles(req.files);
        const { title, description, price, location, capacity } = req.body;
        const result = await query(
            `INSERT INTO rooms (title, images, videos, description, price, location, capacity, owner_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING ${listingColumns}`,
            [title, images, videos, description, price, location, capacity, req.user.id],
        );
        return res.status(201).json(result.rows[0]);
    } catch (error) { return res.status(400).json({ message: error.message }); }
};

export const getRooms = async (req, res) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const result = await query(`SELECT ${listingColumns} FROM rooms ORDER BY created_at DESC LIMIT 10 OFFSET $1`, [(page - 1) * 10]);
        return res.json(result.rows);
    } catch (error) { return res.status(500).json({ message: error.message }); }
};

export const getMyRooms = async (req, res) => {
    try {
        const result = await query(`SELECT ${listingColumns} FROM rooms WHERE owner_id = $1 ORDER BY created_at DESC`, [req.user.id]);
        return res.json(result.rows);
    } catch (error) { return res.status(500).json({ message: error.message }); }
};

export const getRoomById = async (req, res) => {
    try {
        const result = await query(
            `SELECT r.id AS "_id", r.title, r.images, r.videos, r.description, r.price::float AS price, r.location,
        r.capacity, r.is_available AS "isAvailable", r.created_at AS "createdAt",
        json_build_object('_id', u.id, 'name', u.name, 'email', u.email, 'phone', u.phone) AS owner
       FROM rooms r JOIN users u ON u.id = r.owner_id WHERE r.id = $1`, [req.params.id]);
        if (!result.rows[0]) return res.status(404).json({ message: "Room not found" });
        return res.json(result.rows[0]);
    } catch { return res.status(400).json({ message: "Invalid room id" }); }
};

export const deleteAllRooms = async (_req, res) => {
    try { await query("DELETE FROM rooms"); return res.json({ message: "All rooms are deleted successfully" }); }
    catch (error) { return res.status(500).json({ message: error.message }); }
};

export const addFavoriteRooms = async (req, res) => {
    try {
        const result = await query(
            `INSERT INTO favorites (user_id, room_id) VALUES ($1, $2)
       ON CONFLICT (user_id, room_id) DO NOTHING RETURNING id AS "_id", user_id AS user, room_id AS room`, [req.user.id, req.params.id]);
        if (!result.rows[0]) return res.status(400).json({ message: "Already favorite" });
        return res.status(201).json({ message: "Added", favorite: result.rows[0] });
    } catch { return res.status(400).json({ message: "Invalid room id" }); }
};

export const getMyFavoriteRooms = async (req, res) => {
    try {
        const result = await query(
            `SELECT f.id AS "_id", f.user_id AS user,
        json_build_object('_id', r.id, 'title', r.title, 'price', r.price::float, 'images', r.images, 'location', r.location) AS room
       FROM favorites f JOIN rooms r ON r.id = f.room_id WHERE f.user_id = $1 ORDER BY f.created_at DESC`, [req.user.id]);
        return res.json(result.rows);
    } catch (error) { return res.status(500).json({ message: error.message }); }
};

const removeCloudinaryMedia = async (room) => {
    for (const image of room.images || []) if (image.includes("cloudinary")) await cloudinary.uploader.destroy(`rooms/${image.split("/").pop().split(".")[0]}`);
    for (const video of room.videos || []) if (video.includes("cloudinary")) await cloudinary.uploader.destroy(`rooms/${video.split("/").pop().split(".")[0]}`, { resource_type: "video" });
};

export const deleteRoomById = async (req, res) => {
    try {
        const found = await query("SELECT id, owner_id, images, videos FROM rooms WHERE id = $1", [req.params.id]);
        const room = found.rows[0];
        if (!room) return res.status(404).json({ message: "Room not found" });
        if (!isOwnerOrAdmin(room, req.user)) return res.status(403).json({ message: "Unauthorized" });
        await query("DELETE FROM rooms WHERE id = $1", [room.id]);
        await removeCloudinaryMedia(room);
        return res.json({ message: "Room deleted" });
    } catch (error) { return res.status(500).json({ message: error.message }); }
};

export const updateRoom = async (req, res) => {
    try {
        const found = await query("SELECT * FROM rooms WHERE id = $1", [req.params.id]);
        const room = found.rows[0];
        if (!room) return res.status(404).json({ message: "Room not found" });
        if (!isOwnerOrAdmin(room, req.user)) return res.status(403).json({ message: "Unauthorized" });
        const media = req.files?.length ? mediaFromFiles(req.files) : { images: room.images, videos: room.videos };
        const { title = room.title, description = room.description, price = room.price, location = room.location, capacity = room.capacity } = req.body;
        const result = await query(
            `UPDATE rooms SET title=$1, description=$2, price=$3, location=$4, capacity=$5, images=$6, videos=$7, updated_at=now()
       WHERE id=$8 RETURNING ${listingColumns}`,
            [title, description, price, location, capacity, media.images, media.videos, room.id]);
        return res.json(result.rows[0]);
    } catch (error) { return res.status(400).json({ message: error.message }); }
};
