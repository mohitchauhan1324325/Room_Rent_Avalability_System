import express from "express";

import { addRoom, getRooms } from "../controllers/room.controller.js";

const router = express.Router();

router.post("/rooms", addRoom);
router.get("/rooms", getRooms)

export default router;