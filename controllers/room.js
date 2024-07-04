import { room } from "../models/room.js"

export function getAllRoom(){
    return room.find();
}

export async function addNewRoom(req){

    const roomName = req.body.roomName;
    const roomDetails = await room.find({ roomName: roomName })
    if (!roomDetails.length) {
        const insertedData = await new room({
            ...req.body,
        }).save();
        return { status: true, data: insertedData, message: "Added successfully" };
    }
    else {
        return { status: false, data: [], message: "Room already exist with same name" };
    }
}