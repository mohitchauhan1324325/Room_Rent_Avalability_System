import express from "express";
import upload from "../middlewares/upload.js";
import protect from "../middlewares/authMiddleware.js";

import {
    addRoom,
    deleteRoomById,
    getRoomById,
    getRooms,
    deleteAllRooms,
    roomRent,
    bookRooms,
    cancelBooking,
    getUsersBooking,
    updateRoom
} from "../controllers/room.controller.js";

const router = express.Router();

//POST methods
router.post("/rooms", protect, upload.single("image"), addRoom);
router.post("/room-rent", protect, roomRent);

//GET methods
router.get("/room-rent", protect, bookRooms);
router.get("/rooms", getRooms);
router.get("/rooms/:id", getRoomById);
router.get("/users", protect, getUsersBooking);

//Delete methods
router.delete("/rooms/:id", protect, deleteRoomById);
router.delete("/rooms", protect, deleteAllRooms);
router.delete("/bookings/:id", protect, cancelBooking);

//PUT methods
router.put("/rooms/:id", protect, upload.single("image"),updateRoom);

export default router;