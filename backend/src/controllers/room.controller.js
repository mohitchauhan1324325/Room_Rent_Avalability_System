import Room from "../models/rooms.models.js";

export const addRoom = async (req, res) => {
    try {
        const room = new Room(req.body);
        const savedRoom = await room.save();

        res.status(201).json(savedRoom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};