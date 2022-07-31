const express = require("express");
const { createMovie, getMovies } = require("../controllers/movieController");

const router = express.Router();

router.route("/").get(getMovies).post(createMovie);

module.exports = router;
