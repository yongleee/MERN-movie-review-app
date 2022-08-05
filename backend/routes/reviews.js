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

router
  .route("/:id")
  .get(getReview)
  .get(getReviewsByMovie)
  .delete(deleteReview)
  .patch(updateReview);

module.exports = router;
