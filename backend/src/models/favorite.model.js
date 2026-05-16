import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }
}, {timestamps: true});

export const Favorite = mongoose.model("Favorite", favoriteSchema);