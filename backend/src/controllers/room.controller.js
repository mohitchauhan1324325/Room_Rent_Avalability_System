import cloudinary from "../config/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
import { query } from "../db/dbConnect.js";

import {
    getCache,
    setCache,
    acquireLock,
    releaseLock,
    deleteCacheByPattern,
} from "../config/redis.js";

import {
    createRoom,
    findRooms,
    findRoomsByOwner,
    findRoomById,
    findRoomForManagement,
    findRoomForUpdate,
    deleteRoom,
    deleteAllRooms as deleteAllRoomsFromRepository,
    updateRoom as updateRoomInRepository,
    createFavorite,
    findFavoritesByUser,
} from "../repositories/room.repository.js";

const mediaFromFiles = (files = []) => ({
    images: files
        .filter((file) => file.mimetype.startsWith("image"))
        .map((file) => file.path),

    videos: files
        .filter((file) => file.mimetype.startsWith("video"))
        .map((file) => file.path),
});

const isOwnerOrAdmin = (room, user) =>
    user.role === "admin" || room.owner_id === user.id;

const removeCloudinaryMedia = async (room) => {
    for (const image of room.images || []) {
        if (image.includes("cloudinary")) {
            await cloudinary.uploader.destroy(
                `rooms/${image.split("/").pop().split(".")[0]}`
            );
        }
    }

    for (const video of room.videos || []) {
        if (video.includes("cloudinary")) {
            await cloudinary.uploader.destroy(
                `rooms/${video.split("/").pop().split(".")[0]}`,
                {
                    resource_type: "video",
                }
            );
        }
    }
};

export const addRoom = asyncHandler(async (req, res) => {
    const { images, videos } = mediaFromFiles(req.files);

    const {
        title,
        description,
        price,
        location,
        capacity,
    } = req.body;

    const room = await createRoom({
        title,
        images,
        videos,
        description,
        price,
        location,
        capacity,
        ownerId: req.user.id,
    });

    await deleteCacheByPattern("rooms:list:*");

    return res.status(201).json(room);
});

export const getRooms = async (req, res) => {
    const limit = Math.min(
        Math.max(Number(req.query.limit) || 10, 1),
        50
    );

    const cursorParam = req.query.cursor || null;

    const cacheKey = `rooms:list:${limit}:${cursorParam || "first"}`;
    const lockKey = `lock:${cacheKey}`;

    let lockToken = null;

    try {
        // --------------------------------
        // 1. Check Redis cache
        // --------------------------------
        const cached = await getCache(cacheKey);

        if (cached) {
            console.log("REDIS CACHE HIT:", cacheKey);

            return res.json(JSON.parse(cached));
        }

        console.log("REDIS CACHE MISS:", cacheKey);

        // --------------------------------
        // 2. Acquire distributed lock
        // --------------------------------
        lockToken = await acquireLock(lockKey, 5);

        // --------------------------------
        // 3. Another request is fetching
        // --------------------------------
        if (!lockToken) {
            await new Promise((resolve) => {
                setTimeout(resolve, 100);
            });

            const retryCache = await getCache(cacheKey);

            if (retryCache) {
                console.log(
                    "REDIS CACHE HIT AFTER WAIT:",
                    cacheKey
                );

                return res.json(JSON.parse(retryCache));
            }

            // Lock failed AND cache is still empty.
            // Continue with DB query rather than blocking forever.
            console.log(
                "REDIS LOCK BUSY, FETCHING FROM DB:",
                cacheKey
            );
        }

        // --------------------------------
        // 4. Parse cursor
        // --------------------------------
        let cursor = null;

        if (cursorParam) {
            try {
                cursor = JSON.parse(
                    Buffer.from(cursorParam, "base64url").toString("utf8")
                );
            } catch {
                return res.status(400).json({
                    message: "Invalid cursor",
                });
            }
        }

        // --------------------------------
        // 5. PostgreSQL query
        // --------------------------------
        let queryText;
        let queryParams;

        if (cursor) {
            queryText = `
                SELECT
                    id AS "_id",
                    title,
                    price::float AS price,
                    description,
                    images,
                    videos,
                    location,
                    is_available AS "isAvailable",
                    created_at AS "createdAt"
                FROM rooms
                WHERE (created_at, id) < ($1, $2)
                ORDER BY created_at DESC, id DESC
                LIMIT $3
            `;

            queryParams = [
                cursor.createdAt,
                cursor.id,
                limit,
            ];
        } else {
            queryText = `
                SELECT
                    id AS "_id",
                    title,
                    price::float AS price,
                    description,
                    images,
                    videos,
                    location,
                    is_available AS "isAvailable",
                    created_at AS "createdAt"
                FROM rooms
                ORDER BY created_at DESC, id DESC
                LIMIT $1
            `;

            queryParams = [limit];
        }

        const result = await query(queryText, queryParams);

        const rooms = result.rows;

        // --------------------------------
        // 6. Generate next cursor
        // --------------------------------
        let nextCursor = null;

        if (rooms.length === limit) {
            const lastRoom = rooms[rooms.length - 1];

            nextCursor = Buffer.from(
                JSON.stringify({
                    createdAt: lastRoom.createdAt,
                    id: lastRoom._id,
                })
            ).toString("base64url");
        }

        // --------------------------------
        // 7. Create response
        // --------------------------------
        const response = {
            data: rooms,
            pagination: {
                limit,
                nextCursor,
                hasMore: Boolean(nextCursor),
            },
        };

        // --------------------------------
        // 8. Save response in Redis
        // --------------------------------
        await setCache(
            cacheKey,
            JSON.stringify(response),
            30
        );

        console.log("REDIS CACHE SET:", cacheKey);

        return res.json(response);

    } catch (error) {
        console.error("GET ROOMS ERROR:", error);

        return res.status(500).json({
            message: "Failed to fetch rooms",
        });

    } finally {
        // --------------------------------
        // 9. Release ONLY our own lock
        // --------------------------------
        if (lockToken) {
            await releaseLock(lockKey, lockToken);
        }
    }
};

export const getMyRooms = asyncHandler(async (req, res) => {
    const rooms = await findRoomsByOwner(req.user.id);

    return res.json(rooms);
});

export const getRoomById = asyncHandler(async (req, res) => {
    const room = await findRoomById(req.params.id);

    if (!room) {
        return res.status(404).json({
            message: "Room not found",
        });
    }

    return res.json(room);
});

export const deleteAllRooms = asyncHandler(async (_req, res) => {
    await deleteAllRoomsFromRepository();

    await deleteCacheByPattern("rooms:list:*");

    return res.json({
        message: "All rooms are deleted successfully",
    });
});

export const addFavoriteRooms = asyncHandler(async (req, res) => {
    const favorite = await createFavorite(
        req.user.id,
        req.params.id
    );

    if (!favorite) {
        return res.status(400).json({
            message: "Already favorite",
        });
    }

    return res.status(201).json({
        message: "Added",
        favorite,
    });
});

export const getMyFavoriteRooms = asyncHandler(async (req, res) => {
    const favorites = await findFavoritesByUser(req.user.id);

    return res.json(favorites);
});

export const deleteRoomById = asyncHandler(async (req, res) => {
    const room = await findRoomForManagement(req.params.id);

    if (!room) {
        return res.status(404).json({
            message: "Room not found",
        });
    }

    if (!isOwnerOrAdmin(room, req.user)) {
        return res.status(403).json({
            message: "Unauthorized",
        });
    }

    await deleteRoom(room.id);
    await deleteCacheByPattern("rooms:list:*");
    await removeCloudinaryMedia(room);

    return res.json({
        message: "Room deleted",
    });
});

export const updateRoom = asyncHandler(async (req, res) => {
    const room = await findRoomForUpdate(req.params.id);

    if (!room) {
        return res.status(404).json({
            message: "Room not found",
        });
    }

    if (!isOwnerOrAdmin(room, req.user)) {
        return res.status(403).json({
            message: "Unauthorized",
        });
    }

    const media = req.files?.length
        ? mediaFromFiles(req.files)
        : {
            images: room.images,
            videos: room.videos,
        };

    const {
        title = room.title,
        description = room.description,
        price = room.price,
        location = room.location,
        capacity = room.capacity,
    } = req.body;

    const updatedRoom = await updateRoomInRepository({
        roomId: room.id,
        title,
        description,
        price,
        location,
        capacity,
        images: media.images,
        videos: media.videos,
    });

    await deleteCacheByPattern("rooms:list:*");

    return res.json(updatedRoom);
});