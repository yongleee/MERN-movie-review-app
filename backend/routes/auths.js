const express = require("express");

const { logInUser } = require("../controllers/authController");

const router = express.Router();

router.route("/login").post(logInUser);

module.exports = router;
