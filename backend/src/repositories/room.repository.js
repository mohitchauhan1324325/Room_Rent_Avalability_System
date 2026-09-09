import { query } from "../db/dbConnect.js";

const listingColumns = `
  id AS "_id",
  title,
  price::float AS price,
  description,
  images,
  videos,
  location,
  is_available AS "isAvailable",
  created_at AS "createdAt"
`;

export const createRoom = async ({
    title,
    images,
    videos,
    description,
    price,
    location,
    capacity,
    ownerId,
}) => {
    const result = await query(
        `INSERT INTO rooms
      (title, images, videos, description, price, location, capacity, owner_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING ${listingColumns}`,
        [
            title,
            images,
            videos,
            description,
            price,
            location,
            capacity,
            ownerId,
        ]
    );

    return result.rows[0];
};

export const findRooms = async ({ limit, cursor }) => {
  const values = [limit];

  let cursorCondition = "";

  if (cursor) {
    values.push(cursor.createdAt);
    values.push(cursor.id);

    cursorCondition = `
      WHERE (created_at, id) < ($2, $3)
    `;
  }

  const result = await query(
    `SELECT ${listingColumns}
     FROM rooms
     ${cursorCondition}
     ORDER BY created_at DESC, id DESC
     LIMIT $1`,
    values
  );

  return result.rows;
};

export const findRoomsByOwner = async (ownerId) => {
    const result = await query(
        `SELECT ${listingColumns}
     FROM rooms
     WHERE owner_id = $1
     ORDER BY created_at DESC`,
        [ownerId]
    );

    return result.rows;
};

export const findRoomById = async (roomId) => {
    const result = await query(
        `SELECT
       r.id AS "_id",
       r.title,
       r.images,
       r.videos,
       r.description,
       r.price::float AS price,
       r.location,
       r.capacity,
       r.is_available AS "isAvailable",
       r.created_at AS "createdAt",
       json_build_object(
         '_id', u.id,
         'name', u.name,
         'email', u.email,
         'phone', u.phone
       ) AS owner
     FROM rooms r
     JOIN users u ON u.id = r.owner_id
     WHERE r.id = $1`,
        [roomId]
    );

    return result.rows[0] || null;
};

export const findRoomForManagement = async (roomId) => {
    const result = await query(
        `SELECT id, owner_id, images, videos
     FROM rooms
     WHERE id = $1`,
        [roomId]
    );

    return result.rows[0] || null;
};

export const findRoomForUpdate = async (roomId) => {
    const result = await query(
        `SELECT *
     FROM rooms
     WHERE id = $1`,
        [roomId]
    );

    return result.rows[0] || null;
};

export const deleteRoom = async (roomId) => {
    await query(
        `DELETE FROM rooms
     WHERE id = $1`,
        [roomId]
    );
};

export const deleteAllRooms = async () => {
    await query(`DELETE FROM rooms`);
};

export const updateRoom = async ({
    roomId,
    title,
    description,
    price,
    location,
    capacity,
    images,
    videos,
}) => {
    const result = await query(
        `UPDATE rooms
     SET
       title = $1,
       description = $2,
       price = $3,
       location = $4,
       capacity = $5,
       images = $6,
       videos = $7,
       updated_at = now()
     WHERE id = $8
     RETURNING ${listingColumns}`,
        [
            title,
            description,
            price,
            location,
            capacity,
            images,
            videos,
            roomId,
        ]
    );

    return result.rows[0] || null;
};

export const createFavorite = async (userId, roomId) => {
    const result = await query(
        `INSERT INTO favorites (user_id, room_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, room_id)
     DO NOTHING
     RETURNING
       id AS "_id",
       user_id AS user,
       room_id AS room`,
        [userId, roomId]
    );

    return result.rows[0] || null;
};

export const findFavoritesByUser = async (userId) => {
    const result = await query(
        `SELECT
       f.id AS "_id",
       f.user_id AS user,
       json_build_object(
         '_id', r.id,
         'title', r.title,
         'price', r.price::float,
         'images', r.images,
         'location', r.location
       ) AS room
     FROM favorites f
     JOIN rooms r ON r.id = f.room_id
     WHERE f.user_id = $1
     ORDER BY f.created_at DESC`,
        [userId]
    );

    return result.rows;
};