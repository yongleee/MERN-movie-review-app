const Movie = require("../models/movieModel");
const mongoose = require("mongoose");

// get all movies
const getMovies = async (req, res) => {
  const movies = await Movie.find({}).sort({ createdAt: -1 });

  res.status(200).json(movies);
};

// create new movie
const createMovie = async (req, res) => {
  const { title } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const movie = await Movie.create({ title });
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getMovies, createMovie };
