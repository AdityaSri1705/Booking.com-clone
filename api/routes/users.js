const express = require("express");
const {
  updateUser,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/userController");

const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

const router = express.Router();

// checkauthentication miidleware

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user, You are logged in!");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user, You are logged in and You can delete your account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send(
//     "Hello Admin, You are logged in and You can delete all the accounts"
//   );
// });

// CREATE

// UPDATE
router.put("/:id", verifyUser, updateUser);

// GET ALL Hotels
router.get("/", verifyAdmin, getUsers);

// GET one hotel
router.get("/:id", verifyUser, getUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

module.exports = router;
