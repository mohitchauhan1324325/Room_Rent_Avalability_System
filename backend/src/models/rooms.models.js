import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    images: {
      type: [String],
      default: [],
      required: true
    },

    videos: {
      type: [String],
      default: []
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    capacity: {
      type: Number,
      required: true,
      min: 1
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Owner dashboard
roomSchema.index({
  owner: 1,
  createdAt: -1
});

// Newest rooms
roomSchema.index({
  createdAt: -1
});

// Search/filter rooms
roomSchema.index({
  location: 1,
  isAvailable: 1,
  price: 1
});

const Room = mongoose.model(
  "Room",
  roomSchema
);

export default Room;