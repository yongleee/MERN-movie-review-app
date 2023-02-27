const express = require("express");

const {
  logInUser,
  refresh,
  logOutUser,
} = require("../controllers/authController");

const router = express.Router();

router.route("/login").post(logInUser);

router.route("/refresh").get(refresh);

router.route("/logout").get(logOutUser);

module.exports = router;
