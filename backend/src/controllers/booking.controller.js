import { Booking } from "../models/booking.models.js";
import Room from "../models/rooms.models.js";

export const confirmBooking = async (req, res) => {
  try {

    const {
      roomId,
      moveInDate,
      paymentId,
      orderId,
    } = req.body;

    const userId = req.user.id;

    if (!paymentId || !orderId) {
      return res.status(400).json({
        message: "Invalid payment"
      });
    }

    const existingBooking =
      await Booking.findOne({
        user: userId,
        status: "confirmed"
      }).lean();

    if (existingBooking) {
      return res.status(400).json({
        message: "You already have an active booking"
      });
    }


    // atomic booking protection
    const roomData =
      await Room.findOneAndUpdate(
        {
          _id: roomId,
          isAvailable: true
        },
        {
          isAvailable: false
        },
        {
          new: true
        }
      );

    if (!roomData) {
      return res.status(400).json({
        message: "Room already booked or not found"
      });
    }

    const booking =
      await Booking.create({
        roomId,
        user: userId,
        moveInDate,
        paymentId,
        orderId,
        paymentStatus: "paid",
        status: "confirmed"
      });

    res.status(201).json({
      success: true,
      message: "Booking confirmed",
      booking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const getMyBooking = async (req, res) => {

  try {

    const bookings =
      await Booking.find({
        user: req.user.id,
        status: "confirmed"
      })
        .populate(
          "roomId",
          "title price images location"
        )
        .populate(
          "user",
          "name phone"
        )
        .sort({
          createdAt: -1
        })
        .lean();

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch bookings"
    });

  }

};


export const getUsersBooking = async (req, res) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit = 10;

    const bookings =
      await Booking.find()
        .populate(
          "user",
          "name phone"
        )
        .populate(
          "roomId",
          "title location"
        )
        .sort({
          createdAt: -1
        })
        .skip(
          (page - 1) * limit
        )
        .limit(limit)
        .lean();

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


export const cancelBookingByUser =
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        ).lean();

      if (!booking) {
        return res.status(404).json({
          message:
            "Booking not found"
        });
      }

      if (
        booking.user.toString()
        !== req.user.id
      ) {
        return res.status(403).json({
          message:
            "You can only cancel your own booking"
        });
      }

      await Room.findByIdAndUpdate(
        booking.roomId,
        {
          isAvailable: true
        }
      );

      await Booking.findByIdAndUpdate(
        booking._id,
        {
          status: "cancelled"
        }
      );

      res.status(200).json({
        message:
          "Booking cancelled successfully"
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  };


export const cancelBooking =
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        ).lean();

      if (!booking) {
        return res.status(404).json({
          message:
            "Booking not found"
        });
      }

      if (
        booking.status ===
        "cancelled"
      ) {
        return res.status(400).json({
          message:
            "Already cancelled"
        });
      }

      if (
        req.user.role ===
        "owner"
      ) {

        const room =
          await Room.findById(
            booking.roomId
          )
            .select("owner")
            .lean();

        if (
          !room ||
          room.owner.toString()
          !== req.user.id
        ) {
          return res.status(403).json({
            message:
              "Unauthorized"
          });
        }

      }

      await Room.findByIdAndUpdate(
        booking.roomId,
        {
          isAvailable: true
        }
      );

      await Booking.findByIdAndUpdate(
        booking._id,
        {
          status: "cancelled"
        }
      );

      res.status(200).json({
        message:
          "Booking cancelled successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };