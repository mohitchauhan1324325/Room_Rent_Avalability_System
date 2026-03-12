import express from "express";

import { addRoom, deleteRoom, getRoomById, getRooms } from "../controllers/room.controller.js";

const router = express.Router();

router.post("/rooms", addRoom);
router.get("/rooms", getRooms);
router.get("/rooms/:id", getRoomById);
router.delete("/rooms/:id", deleteRoom);

                        
export default router;