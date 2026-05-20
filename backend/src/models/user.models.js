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

    phone: Number,

    role: {
        type: String,
        enum: ["user", "owner", "admin"],
        default: "user"
    }

}, { timestamps: true });


userSchema.index({ role: 1 });

userSchema.index({ createdAt: -1 });


export const User = mongoose.model(
    "User",
    userSchema
);