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

// create new movie
const createMovie = async (req, res) => {
  const { movieTitle } = req.body;

  let emptyFields = [];

  if (!movieTitle) {
    emptyFields.push("title");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const movie = await Movie.create({ movieTitle });
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getMovies, getMovieID, createMovie };
