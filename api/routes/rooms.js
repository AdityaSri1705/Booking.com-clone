const express = require("express");

const {
  createRoom,
  updateRoom,
  getRooms,
  getRoom,
  deleteRoom,
  updateRoomAvailability,
} = require("../controllers/roomController");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

// DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// GET one hotel
router.get("/:id", getRoom);

// GET ALL Hotels
router.get("/", getRooms);

module.exports = router;
