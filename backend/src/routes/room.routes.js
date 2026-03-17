import express from "express";

import { addRoom, deleteRoomById, getRoomById, getRooms, deleteAllRooms, roomRent, bookRooms, cancelBooking, getBookings, updateRoom } from "../controllers/room.controller.js";

const router = express.Router();

//POST methods
router.post("/rooms", addRoom);
router.post("/room-rent", roomRent);

//GET methods
router.get("/room-rent", bookRooms);
router.get("/rooms", getRooms);
router.get("/rooms/:id", getRoomById);
router.get("/users", getBookings);

//Delete methods
router.delete("/rooms/:id", deleteRoomById);
router.delete("/rooms", deleteAllRooms);
router.delete("/bookings/:id", cancelBooking);

//PUT methods
router.put("/rooms/:id", updateRoom);

export default router;