import express from "express";

import { addRoom, deleteRoomById, getRoomById, getRooms, deleteAllRooms, roomRent, bookRooms, cancelBooking, getBookings } from "../controllers/room.controller.js";

const router = express.Router();

router.post("/rooms", addRoom);
router.get("/rooms", getRooms);
router.get("/rooms/:id", getRoomById);
router.delete("/rooms/:id", deleteRoomById);
router.delete("/rooms", deleteAllRooms);
router.post("/room-rent", roomRent);
router.get("/room-rent", bookRooms);
router.delete("/bookings/:id", cancelBooking);
router.get("/users", getBookings);

export default router;