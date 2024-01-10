const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

// CREATE hotels
const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHOtel = await newHotel.save();
    res.status(200).json(savedHOtel);
  } catch (err) {
    next(err);
  }
};

// UPDATE hotel

const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

// DELETE Hotel
const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};

// GET hotel
const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// GET All Hotels
// const getHotels = async (req, res, next) => {
//   try {
//     const hotels = await Hotel.find({ featured: req.query.featured }).limit(
//       parseInt(req.query.limit)
//     );
//     res.status(200).json(hotels);
//   } catch (err) {
//     next(err);
//   }
// };

const getHotels = async (req, res, next) => {
  try {
    const { featured, min, max } = req.query;

    let query = {};

    if (featured) {
      query.featured = featured;
    }

    if (min && max) {
      query.cheapestPrice = {
        $gt: parseInt(min || 1),
        $lt: parseInt(max || 999),
      };
    }

    const hotels = await Hotel.find(query).limit(parseInt(req.query.limit));
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

const getHotelRoom = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createHotel,
  updateHotel,
  getHotels,
  getHotel,
  deleteHotel,
  countByCity,
  countByType,
  getHotelRoom,
};
