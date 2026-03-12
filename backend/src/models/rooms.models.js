import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber:{
        type: Number,
        required: true
    },

    image: {
        type: String,
        // required: true
    },

    descrption: {
        type: String,
        // required: true
    },

    roomsType: {
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

    contactNumber: {
        type: Number,
        // required: true
    }

}, {timestamps: true});

const Room = mongoose.model("Room", roomSchema);

export default Room;