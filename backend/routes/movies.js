const express = require("express");
const {
  createMovie,
  getMovies,
  getMovieID,
  deleteMovie,
  getMovieByID,
} = require("../controllers/movieController");

const router = express.Router();

router.route("/").get(getMovies).post(createMovie);

router.route("/:id").get(getMovieByID).delete(deleteMovie);

router.route("/:title").get(getMovieID);

module.exports = router;
