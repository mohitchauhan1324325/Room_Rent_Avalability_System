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
    },

    paymentId: {
        type: String,
        unique: true
    },

    orderId: {
        type: String,
        unique: true
    },

    paymentStatus: {
        type: String,
        enum: ["pending","paid","failed"],
        default: "pending"
    },

    status: {
        type: String,
        enum: ["confirmed","cancelled"],
        default: "confirmed"
    }

}, { timestamps:true });


// room booking searches
bookingSchema.index({
    roomId:1
});


// user booking history +
// confirmed booking +
// latest first
bookingSchema.index({
    user:1,
    status:1,
    createdAt:-1
});


export const Booking =
mongoose.model(
    "Booking",
    bookingSchema
);