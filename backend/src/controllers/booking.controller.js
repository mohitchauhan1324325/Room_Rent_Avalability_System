import { Booking } from "../models/booking.models.js";
import Room from "../models/rooms.models.js";

export const confirmBooking = async (req, res) => {
    try {
        const {
            roomId,
            user,
            moveInDate,
            paymentId,
            orderId,
        } = req.body;

        const roomData = await Room.findById(roomId);

        if (!roomData) {
            return res.status(404).json({ message: "Room not found" });
        }

        if (!roomData.isAvailable) {
            return res.status(400).json({ message: "Room already booked" });
        }

        const booking = new Booking({
            roomId,
            user,
            moveInDate,
            paymentId,
            orderId,
            paymentStatus: "paid",
        });

        if (!paymentId || !orderId) {
            return res.status(400).json({ message: "Invalid payment" });
        }

        await booking.save();

        roomData.isAvailable = false;
        await roomData.save();

        res.status(201).json({
            success: true,
            message: "Booking confirmed",
            booking,
        });

    } catch (error) {
        res.status(500).json({ message: "Booking failed" });
    }
};