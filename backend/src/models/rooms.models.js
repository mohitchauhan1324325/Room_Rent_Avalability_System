import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({

    title: String,
    description: String,
    price: Number,
    location: String,
    capacity: Number,
    owner: String,

    isAvailable: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);

export default Room;