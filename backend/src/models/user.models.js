import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    // email: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // password: String,
    phone: Number,
    role: {
        type: String,
        enum: ["landlord", "tenant"],
        required: true
    }
});

export const User = mongoose.model("User", userSchema);