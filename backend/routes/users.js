const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");
const {
  createNewUser,
  getAllUsers,
  getUserByUsername,
  updatePassword,
  updateUsername,
  updateWatchlist,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers);

router.route("/username/:username").get(getUserByUsername);

router.route("/sign-up").post(createNewUser);

router.route("/edit-user-info/:id").delete(deleteUser).patch(updateUsername);
router.use(verifyJWT);

router.route("/update-password/:id").patch(updatePassword);

router.route("/update-watchlist/:id").patch(updateWatchlist);

module.exports = router;
