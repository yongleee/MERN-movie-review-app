const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: (v) => v % 0.5 === 0,
        message: (props) => `${props.value} should be a multiple of 0.5`,
      },
    },
    movieId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Movie",
      required: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
