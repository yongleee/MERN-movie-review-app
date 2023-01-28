const Movie = require("../models/movieModel");
const mongoose = require("mongoose");

// get all movies
const getMovies = async (req, res) => {
  const movies = await Movie.find({}).sort({ createdAt: -1 });

  res.status(200).json(movies);
};

// get movie id by movie title
const getMovieID = async (req, res) => {
  const { title } = req.params;

  let hasMovie = await Movie.exists({ movieTitle: title });
  if (hasMovie) {
    const movie = await Movie.findOne({ movieTitle: title });
    res.status(200).json(movie._id);
  } else {
    res.status(200).json(null);
  }
};

const getMovieByID = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such movie" });
  }

  const movie = await Movie.findById(id);

  if (!movie) {
    return res.status(404).json({ error: "No such movie" });
  }

  res.status(200).json(movie);
};

// create new movie
const createMovie = async (req, res) => {
  const { movieTitle, posterPath, TMDBId } = req.body;

  try {
    const movie = await Movie.create({ movieTitle, posterPath, TMDBId });
    res.status(200).json(movie._id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a movie
const deleteMovie = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such movie" });
  }

  const movie = await Movie.findOneAndDelete({ _id: id });

  if (!movie) {
    return res.status(404).json({ error: "No such movie" });
  }

  res.status(200).json(movie);
};

module.exports = {
  getMovies,
  getMovieID,
  getMovieByID,
  createMovie,
  deleteMovie,
};
