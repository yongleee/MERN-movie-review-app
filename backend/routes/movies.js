const express = require("express");
const {
  createMovie,
  getMovies,
  getMovieID,
} = require("../controllers/movieController");

const router = express.Router();

router.route("/").get(getMovies).post(createMovie);

router.route("/:title").get(getMovieID);

module.exports = router;
