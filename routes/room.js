import express from 'express';
import { getAllRoom,addNewRoom } from '../controllers/room.js';

const router = express.Router();

router.get("/getAllRoom", async (req, res) => {
    try {
        const allRooms = await getAllRoom();
        if (allRooms.length > 0) {
            return res.status(200).json({
                data: allRooms
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

// add new room
router.post("/add", async (req, res) => {
    try {
        const newRoom = await addNewRoom(req);
        if (newRoom) {
            return res.status(200).json({
                data: newRoom.data,
                message:newRoom.message
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

export const roomRouter = router;