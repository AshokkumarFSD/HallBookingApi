import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    noOfSeats:{
        type:Number,
        required:true
    },
    pricePerHour:{
        type:Number,
        required:true
    },
    amenities:{
        type:Array,
        required:true
    },
    roomName:{
        type:String,
        required:true
    }
}, { versionKey: false });

const room = mongoose.model("room",roomSchema);
export {room};