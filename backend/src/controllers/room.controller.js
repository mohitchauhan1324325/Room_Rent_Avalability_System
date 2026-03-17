import Room from "../models/rooms.models.js";
import { Booking } from "../models/booking.models.js";
import { User } from "../models/user.models.js";

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

        const { tenantName, phone, roomId, moveInDate } = req.body;

        const room = await Room.findById(roomId);

        if(!room.isAvailable){
            return res.status(400).json({
                message: "Room already booked"
            });
        }

        const user = await User.create({
            name: tenantName,
            phone
        });

        const booking = await Booking.create({
            roomId,
            user: user._id,
            moveInDate
        });

        await Room.findByIdAndUpdate(roomId, { isAvailable: false });

        res.status(200).json({
            message: "Room booked successfully",
            user,
            booking
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const bookRooms = async (req, res) => {
    try {
        const room = await Booking.find();

        res.status(200).json(room);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelBooking = async (req, res) => {
    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const a = await Room.findByIdAndUpdate(
            booking.roomId, { isAvailable: true }
        );

        const b = await Booking.findByIdAndDelete(booking.id);
        
        res.status(200).json({ message: "Booking cancelled successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

export const getBookings = async (req, res) => {
  try {

    const bookings = await Booking
      .find()
      .populate("user");   // 👈 here

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRoom = async (req, res) => {
    try {
        
        const updatedRoom = await Room.findByIdAndUpdate()

    } catch (error) {
        
    }
}