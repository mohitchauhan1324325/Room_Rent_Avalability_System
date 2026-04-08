import express from "express";
import upload from "../middlewares/upload.js";

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
router.post("/rooms", upload.single("image"), addRoom);
router.post("/room-rent", roomRent);

//GET methods
router.get("/room-rent", bookRooms);
router.get("/rooms", getRooms);
router.get("/rooms/:id", getRoomById);
router.get("/users", getUsersBooking);

//Delete methods
router.delete("/rooms/:id", deleteRoomById);
router.delete("/rooms", deleteAllRooms);
router.delete("/bookings/:id", cancelBooking);

//PUT methods
router.put("/rooms/:id", upload.single("image"),updateRoom);

export default router;