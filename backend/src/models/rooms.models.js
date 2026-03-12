import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({

    image: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        // required: true
    },

    price: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        // required: true
    },

    isAvailable: {
        type: Boolean,
        required: true
    }

}, {timestamps: true});

const Room = mongoose.model("Room", roomSchema);

export default Room;