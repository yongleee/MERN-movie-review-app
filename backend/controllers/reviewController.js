const Review = require("../models/reviewModel");
const mongoose = require("mongoose");

// get all reviews
const getReviews = async (req, res) => {
  const reviews = await Review.find({})
    .sort({ createdAt: -1 })
    .populate("movieId")
    .populate({ path: "userId", select: "username" });

  res.status(200).json(reviews);
};

// get a single review by review id
const getReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  const review = await Review.findById(id)
    .populate("movieId")
    .populate({ path: "userId", select: "username" });
  if (!review) {
    return res.status(404).json({ error: "No such review" });
  }

  res.status(200).json(review);
};

// get reviews by movie id
const getReviewsByMovie = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such movie id" });
  }

  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page || "0");

  const reviewsCount = await Review.countDocuments({ movieId: id });

  const reviews = await Review.find({ movieId: id })
    .sort({ createdAt: -1 })
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * (page - 1))
    .populate("movieId")
    .populate({ path: "userId", select: "username" });

  if (!reviews) {
    return res.status(404).json({ error: "Movie not registered in database" });
  }

  res
    .status(200)
    .json({ totalPages: Math.ceil(reviewsCount / PAGE_SIZE), reviews });
};

const getReviewsByUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user id" });
  }

  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page || "0");

  const reviewsCount = await Review.countDocuments({ userId: id });

  const reviews = await Review.find({ userId: id })
    .sort({ createdAt: -1 })
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * (page - 1))
    .populate("movieId")
    .populate({ path: "userId", select: "username" });

  if (!reviews) {
    return res.status(404).json({ error: "User not registered in database" });
  }

  res
    .status(200)
    .json({ totalPages: Math.ceil(reviewsCount / PAGE_SIZE), reviews });
};

// create new review
const createReview = async (req, res) => {
  const { movieId, content, rating, userId } = req.body;

  let emptyFields = [];

  if (!movieId) {
    emptyFields.push("movieId");
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

  try {
    const review = await Review.create({
      content,
      rating,
      movieId,
      userId,
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
  createReview,
  getReviews,
  getReview,
  getReviewsByMovie,
  getReviewsByUser,
  deleteReview,
  updateReview,
};
