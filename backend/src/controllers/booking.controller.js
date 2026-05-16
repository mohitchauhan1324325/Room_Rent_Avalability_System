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
      status: "confirmed",
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
      status: "confirmed",
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

    const bookings = await Booking.find({
      user: userId,
      status: "confirmed"
    })
      .populate("roomId")
      .populate("user");

    res.status(201).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

export const getUsersBooking = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .populate("user", "name phone")
      .populate("roomId", "title location");

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBookingByUser = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only cancel your own booking" });
    }

    await Room.findByIdAndUpdate(booking.roomId, {
      isAvailable: true,
    });

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully" });

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

    if (booking.status === "cancelled") {
      return res.status(400).json({
        message: "Booking is already cancelled",
      });
    }

    if (req.user.role === "owner") {
      const room = await Room.findById(booking.roomId);

      if (!room || room.owner.toString() !== req.user.id) {
        return res.status(403).json({
          message: "Unauthorized",
        });
      }
    }

    if (booking.paymentStatus === "paid") {
      console.log("Refund process needed");
    }

    await Room.findByIdAndUpdate(
      booking.roomId,
      { isAvailable: true }
    );

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};