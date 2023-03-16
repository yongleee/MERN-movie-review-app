const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");

const {
  createNewUser,
  getAllUsers,
  getUserByUsername,
  getUserWatchlist,
  updatePassword,
  updateUsername,
  updateWatchlist,
  deleteUser,
} = require("../controllers/userController");

const {
  forgotPassword,
  resetPassword,
} = require("../controllers/forgotPasswordController");

const router = express.Router();

router.route("/").get(getAllUsers);

router.route("/username/:username").get(getUserByUsername);

router.route("/sign-up").post(createNewUser);

router.route("/forgot-password").post(forgotPassword);

router.use(verifyJWT);

router.route("/user-watchlist/:username").get(getUserWatchlist);

router.route("/edit-user-info/:id").delete(deleteUser).patch(updateUsername);

router.route("/update-watchlist/:id").patch(updateWatchlist);

router.route("/update-password/:id").patch(updatePassword);

router.route("/reset-password").post(resetPassword);

module.exports = router;
