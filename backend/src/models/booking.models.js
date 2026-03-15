import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    moveInDate: {
        type: Date,
        required: true
    }

}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);