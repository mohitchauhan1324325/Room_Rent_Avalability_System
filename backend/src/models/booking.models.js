import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      index: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    moveInDate: {
      type: Date,
      required: true
    },

    paymentId: {
      type: String,
      unique: true,
      sparse: true
    },

    orderId: {
      type: String,
      unique: true,
      sparse: true
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
      index: true
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Room bookings
bookingSchema.index({
  roomId: 1,
  status: 1
});

// User booking history
bookingSchema.index({
  user: 1,
  createdAt: -1
});

export const Booking = mongoose.model(
  "Booking",
  bookingSchema
);