import { Booking } from "../models/booking.models.js";
import Room from "../models/rooms.models.js";
import { User } from "../models/user.models.js";

export const confirmBooking = async (req, res) => {
  try {
    const {
      roomId,
      moveInDate,
      paymentId,
      orderId,
    } = req.body;

    const userId = req.user.id;

    const existingBooking = await Booking.findOne({
      user: userId,
      paymentStatus: "paid",
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "You already have an active booking",
      });
    }

    const roomData = await Room.findById(roomId);

    if (!roomData) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (!roomData.isAvailable) {
      return res.status(400).json({ message: "Room already booked" });
    }

    if (!paymentId || !orderId) {
      return res.status(400).json({ message: "Invalid payment" });
    }

    const booking = new Booking({
      roomId,
      user: userId,
      moveInDate,
      paymentId,
      orderId,
      paymentStatus: "paid",
    });

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

export const getMyBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("REQ.USER:", req.user);
    
    const bookings = await Booking.find({ user: userId })
      .populate("roomId")
      .populate("user");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};