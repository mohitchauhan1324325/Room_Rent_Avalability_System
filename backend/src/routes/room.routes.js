import express from "express";
import upload from "../middlewares/upload.js";
import protect from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

import {
    addRoom,
    deleteRoomById,
    getRoomById,
    getRooms,
    deleteAllRooms,
    cancelBooking,
    getUsersBooking,
    updateRoom
} from "../controllers/room.controller.js";

const router = express.Router();

// add rooms by owner and admin
router.post(
    "/rooms",
    protect,
    authorizeRoles("owner", "admin"),
    upload.single("image"),
    addRoom
);

// get all rooms data
router.get(
    "/rooms",
    getRooms
);

// get room data by their id
router.get(
    "/rooms/:id",
    getRoomById
);

// get all booking rooms user data
router.get(
    "/users",
    protect,
    authorizeRoles("admin"),
    getUsersBooking
);


// delete room by their id
router.delete(
    "/rooms/:id",
    protect,
    authorizeRoles("owner", "admin"),
    deleteRoomById
);

// delete all rooms
router.delete(
    "/rooms",
    protect,
    authorizeRoles("admin"),
    deleteAllRooms
);

// cancel booking by id
router.delete(
    "/bookings/:id",
    protect,
    cancelBooking
);

// update the existing room data
router.put(
    "/rooms/:id",
    protect,
    authorizeRoles("owner", "admin"),
    upload.single("image"),
    updateRoom
);

export default router;