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

},{timestamps:true});


// get user's favorites
favoriteSchema.index({ user:1 });


// check room favorite
favoriteSchema.index({ room:1 });


// prevent duplicate favorites
favoriteSchema.index(
   { user:1, room:1 },
   { unique:true }
);


// newest favorites
favoriteSchema.index({
   createdAt:-1
});

export const Favorite =
mongoose.model(
   "Favorite",
   favoriteSchema
);