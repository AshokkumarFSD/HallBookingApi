import { booking } from "../models/booking.js"
import { room } from "../models/room.js"
import mongoose from "mongoose";

export function getAllBooking(){
    return booking.find().populate("roomId","roomName noOfSeats pricePerHour");
}

export function roomsWithBookedData(){
    return room.aggregate([
        {
          $lookup: {
            from: "bookings",
            localField: "_id",
            foreignField: "roomId",
            as: "bookings"
          }
        },
        {
          $project: {
            roomName: 1,
            noOfSeats: 1,
            pricePerHour: 1,
            bookings: {
              customerName: 1,
              date: 1,
              startTime: 1,
              endTime: 1,
              status: 1
            }
          }
        }
      ])
}

export function customerWithBooking()
{
    return booking.aggregate([
      {
        $lookup: {
          from: "rooms",
          localField: "roomId",
          foreignField: "_id",
          as: "roomDetails"
        }
      },
      {
        $unwind: "$roomDetails"
      },
        {
          $group: {
            _id: "$customerName",
            bookings: {
              $push: {
                date: "$date",
                startTime: "$startTime",
                endTime: "$endTime",
                status: "$status",
                roomId: "$roomDetails._id",
                roomName: "$roomDetails.roomName",
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            customerName: "$_id",
            bookings: 1
          }
        }
      ])
}

export function customerWithBookedTimeDetails(){
    return booking.aggregate([
        
      {
        $lookup: {
          from: "rooms",
          localField: "roomId",
          foreignField: "_id",
          as: "roomDetails"
        }
      },
      {
        $unwind: "$roomDetails"
      },
        {
          $group: {
            _id: "$customerName",
            totalBookings: { $sum: 1 },
            bookings: {
              $push: {
                bookingId: "$_id",
                roomName: "$roomDetails.roomName",
                status: "$status",
                date: "$date",
                startTime: "$startTime",
                endTime: "$endTime",
                roomId: "$roomDetails._id"
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            customerName: "$_id",
            totalBookings: 1,
            bookings: 1
          }
        }
      ])
}

const isRoomAvailable = async (roomId, date, startTime, endTime) => {
  const overlappingBooking = await booking.findOne({
    roomId: roomId,
    date: date,
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } },
      { startTime: { $lte: startTime }, endTime: { $gte: endTime } }
    ]
  });

  return !overlappingBooking;
};

export async function addNewBooking(req){

  const body = req.body;
  const isRoomAvailableResult = await isRoomAvailable(body.roomId, body.date, body.startTime, body.endTime);
  if (isRoomAvailableResult) {
    const newBookingData = await new booking({
      ...req.body,
      roomId: req.body.roomId,
      bookingDate: new Date()
    }).save();
    return { status: true, data: newBookingData, message: "Added successfully" };
  }
  else {
    return { status: false, data: [], message: "Hall already booked in that date and time" };
  }
}