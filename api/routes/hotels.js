const express = require("express");

const {
  createHotel,
  updateHotel,
  getHotels,
  getHotel,
  deleteHotel,
  countByCity,
  countByType,
  getHotelRoom,
} = require("../controllers/hotelController");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET one hotel
router.get("/find/:id", getHotel);

// GET ALL Hotels
router.get("/", getHotels);

// get by counts
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRoom);

module.exports = router;
