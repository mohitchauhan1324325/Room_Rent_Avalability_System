import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },

    tenantName: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    moveInDate: {
        type: Date,
        required: true
    }

}, {timestamps: true});

export const Booking = mongoose.model("Booking", bookingSchema);