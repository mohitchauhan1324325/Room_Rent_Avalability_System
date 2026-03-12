import express from "express";

import { addRoom, deleteRoomById, getRoomById, getRooms, deleteAllRooms } from "../controllers/room.controller.js";

const router = express.Router();

router.post("/rooms", addRoom);
router.get("/rooms", getRooms);
router.get("/rooms/:id", getRoomById);
router.delete("/rooms/:id", deleteRoomById);
router.delete("/rooms", deleteAllRooms);

export default router;