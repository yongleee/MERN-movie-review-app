const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    movieTitle: {
      type: String,
      required: true,
      unique: true,
    },
    posterPath: {
      type: String,
      required: true,
      unique: true,
    },
    TMDBId: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
