import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      trim: true
    },

    role: {
      type: String,
      enum: ["user", "owner", "admin"],
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model(
  "User",
  userSchema
);