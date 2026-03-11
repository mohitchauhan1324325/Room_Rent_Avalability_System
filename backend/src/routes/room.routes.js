import express from "express";
import Room from "../models/rooms.models.js";

const router = express.Router();

router.post("/add-room", async (req, res) => {
    const room = await Room.create({
        name: 101,
        price: 2000
    });

    res.json(room);
});

export default router;