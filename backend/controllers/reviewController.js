const Review = require("../models/reviewModel");
const Movie = require("../models/movieModel");
const { createMovie } = require("./movieController")
const mongoose = require("mongoose");

// get all reviews
const getReviews = async (req, res) => {
  const reviews = await Review.find({}).sort({ createdAt: -1 });

  res.status(200).json(reviews);
};

// get a single review
const getReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({ error: "No such review" });
  }

  res.status(200).json(review);
};

// get a single review by movie id
const getReviewByMovie = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  const review = await Review.findOne({ movie_id: ObjectId(id) });

  if (!review) {
    return res.status(404).json({ error: "No such review" });
  }

  res.status(200).json(review);
};

// create new review
const createReviewAndMovie = async (req, res) => {
  const { movieTitle, title, content, rating } = req.body;

  // check if the fields are empty and return the error to front end
  let emptyFields = [];

  if (!movieTitle) {
    emptyFields.push("title");
  }
  if (!content) {
    emptyFields.push("content");
  }
  if (!rating) {
    emptyFields.push("rating");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // check if the movie doc exist, if don't exit add a new movie doc
  let hasMovie = await Movie.exists({title: movieTitle}); 
  if (!hasMovie) {
    try {
      const movie = await Movie.create({ movieTitle });
      res.status(200).json(movie);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // add doc to db
  try {
    const review = await Review.create({
      title,
      content,
      rating,
      movie,
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  const review = await Review.findOneAndDelete({ _id: id });

  if (!review) {
    return res.status(404).json({ error: "No such review" });
  }

  res.status(200).json(review);
};

// update a review
const updateReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  const review = await Review.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!review) {
    return res.status(404).json({ error: "No such review" });
  }

  res.status(200).json(review);
};

module.exports = {
  createReviewAndMovie,
  getReviews,
  getReview,
  deleteReview,
  updateReview,
  getReviewByMovie,
};
