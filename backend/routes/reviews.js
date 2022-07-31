const express = require("express");
const {
  createReviewAndMovie,
  getReviews,
  getReview,
  deleteReview,
  updateReview,
  getReviewByMovie,
} = require("../controllers/reviewController");

const router = express.Router();

router.route("/").get(getReviews).post(createReviewAndMovie);

router
  .route("/:id")
  .get(getReview)
  .get(getReviewByMovie)
  .delete(deleteReview)
  .patch(updateReview);

module.exports = router;
