import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
    customerName:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    roomId:{
        type:Schema.Types.ObjectId,
        ref:"room",
        required:true
    },
    status:{
        type:String,
        required:true
    },
    bookingDate:{
        type:Date,
        required:true
    }
}, { versionKey: false });

const booking = mongoose.model("booking",bookingSchema);
export {booking};