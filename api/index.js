require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users.js");
const hotelsRoute = require("./routes/hotels.js");
const roomsRoute = require("./routes/rooms.js");

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to DB");
  } catch (error) {
    throw error;
  }
};

// middlewares
app.use(
  cors({
    origin: ["https://booking-com-clone-admin.vercel.app"],
    method: ["POST", "GET"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something, went wrong !";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Listening on port

app.listen(process.env.PORT, () => {
  connect();
  console.log("Listening on PORT:", process.env.PORT);
});
