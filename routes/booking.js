import express from 'express';
import {
    getAllBooking, addNewBooking, roomsWithBookedData, customerWithBooking,
    customerWithBookedTimeDetails
} from '../controllers/booking.js';

const router = express.Router();

router.get("/getAllBooking", async (req, res) => {
    try {
        const bookings = await getAllBooking();
        if (bookings.length > 0) {
            return res.status(200).json({
                data: bookings
            })
        }
        return res.status(404).json({
            data: "No data found"
        })

    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
});

router.get("/roomWithbooking", async (req, res) => {
    try {
        const bookings = await roomsWithBookedData();
        if (bookings.length > 0) {
            return res.status(200).json({
                data: bookings
            })
        }
        return res.status(404).json({
            data: "No data found"
        })

    } catch (error) {
        res.status(500).json({
            error: `Internal server error: ${error}`
        })
    }
});

  

router.get("/customerWithBooking", async (req, res) => {
    try {
        const bookings = await customerWithBooking();
        if (bookings.length > 0) {
            return res.status(200).json({
                data: bookings
            })
        }
        return res.status(404).json({
            data: "No data found"
        })

    } catch (error) {
        res.status(500).json({
            error: `Internal server error: ${error}`
        })
    }
});

router.get("/customerBookedDetails", async (req, res) => {
    try {
        const bookings = await customerWithBookedTimeDetails();
        if (bookings.length > 0) {
            return res.status(200).json({
                data: bookings
            })
        }
        return res.status(404).json({
            data: "No data found"
        })

    } catch (error) {
        res.status(500).json({
            error: `Internal server error: ${error}`
        })
    }
});

// add new booking
router.post("/add", async (req, res) => {
    try {
        const newBooking = await addNewBooking(req);
        if (newBooking) {
            return res.status(200).json({
                data: newBooking.data,
                message: newBooking.message
            })
        }
        return res.status(400).json({
            data: "Add failed"
        })

    } catch (error) {
        res.status(500).json({
            error: `Internal server error: ${error}`
        })
    }
});

export const bookingRouter = router;