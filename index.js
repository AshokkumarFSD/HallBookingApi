import express from "express";
import dotenv from "dotenv";
import { roomRouter } from "./routes/room.js";
import { dbConnection } from "./db.js";
import { bookingRouter } from "./routes/booking.js";

//init express
const app = express();

//to accept the json
app.use(express.json());

dotenv.config();

dbConnection(process.env.MONGO_URL);

app.listen(process.env.PORT,()=>{
    console.log("Server listening at port: ",process.env.PORT);
})

app.use("/api/room",roomRouter);
app.use("/api/booking",bookingRouter);