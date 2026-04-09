import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    phone: Number
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);