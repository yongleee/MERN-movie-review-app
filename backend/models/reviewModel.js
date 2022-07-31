const mongoose = require("mongoose");
const Movie = require("./movieModel");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    movie: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Movie",
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
