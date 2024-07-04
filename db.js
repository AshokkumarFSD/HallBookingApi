import mongoose from "mongoose";

export function dbConnection(MONGO_URL) {
    try {
        mongoose.connect(MONGO_URL)
        console.log("-- db connected -------");
    } catch (error) {
        console.log("Db Connection error: ", error);
    }
}