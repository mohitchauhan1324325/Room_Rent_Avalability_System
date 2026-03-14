import Room from "../models/rooms.models.js";
import { Booking } from "../models/booking.models.js";

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

export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(400).json({ message: "Room not found" });
        }

        if (!room.isAvailable) {
            return res.json({ message: "Room already rented" });
        }

        res.json(room);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAllRooms = async (req, res) => {
    try {
        const room = await Room.deleteMany({});

        res.json({ message: "All rooms are deleted successfully" });
    }
    catch (error) {
        res.statu(500).json({ message: error.message });
    }
};

export const deleteRoomById = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);

        if (!room) {
            return res.status(400).json({ message: "Room not found" });
        }

        res.json({ message: "Room deleted successfully" })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const roomRent = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);

        await Room.findByIdAndUpdate(
            booking.roomId, { isAvailable: false }
        );

        res.status(200).json(booking);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const bookRooms = async (req, res) => {
    try {
        const room = await Booking.find();

        res.status(200).json(room);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const cancelBooking = async (req, res) => {
    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const a = await Room.findByIdAndUpdate(
            booking.roomId, { isAvailable: true }
        )

        const b = await Booking.findByIdAndDelete(booking.id);
        
        res.status(200).json({ message: "Booking cancelled successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}