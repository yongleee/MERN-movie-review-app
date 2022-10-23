const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");
const {
  createNewUser,
  deleteUser,
  getAllUsers,
  updatePassword,
  updateUsername,
  updateWatchlist,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers);

router.route("/signup").post(createNewUser);

router.use(verifyJWT);

router.route("/:id").delete(deleteUser).patch(updateUsername);

router.route("/update-password/:id").patch(updatePassword);

router.route("/update-watchlist/:id").patch(updateWatchlist);

module.exports = router;
