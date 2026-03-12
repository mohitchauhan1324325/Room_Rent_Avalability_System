import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({

    title: String,
    description: String,
    price: Number,
    location: String,
    capacity: Number,

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    isAvailable: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);

export default Room;