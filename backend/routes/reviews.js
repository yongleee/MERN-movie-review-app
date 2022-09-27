const express = require("express");

const {
  createReview,
  getReviews,
  getReview,
  deleteReview,
  updateReview,
  getReviewsByMovie,
} = require("../controllers/reviewController");

const router = express.Router();

router.route("/").get(getReviews).post(createReview);

router.route("/:id").get(getReview).delete(deleteReview).patch(updateReview);

router.route("/by-movie/:id").get(getReviewsByMovie);

module.exports = router;
