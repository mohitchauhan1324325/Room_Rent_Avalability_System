import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({

    title: String,

    images: {
        type:[String],
        default:[],
        required:true
    },

    videos:{
        type:[String],
        default:[]
    },

    description:String,

    price:Number,

    location:String,

    capacity:Number,

    owner:String,

    isAvailable:{
        type:Boolean,
        default:true
    }

},{timestamps:true});


// find rooms by city/location
roomSchema.index({ location:1 });


// owner dashboard
roomSchema.index({ owner:1 });


// newest rooms first
roomSchema.index({ createdAt:-1 });


// room search optimization
roomSchema.index({
   location:1,
   isAvailable:1,
   price:1
});

const Room =
mongoose.model(
   "Room",
   roomSchema
);

export default Room;