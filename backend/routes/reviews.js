const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");

const {
  createReview,
  getReviews,
  getReview,
  deleteReview,
  updateReview,
  getReviewsByMovie,
  getReviewsByUser,
} = require("../controllers/reviewController");

const router = express.Router();

router.route("/").get(getReviews).post(createReview);

router
  .route("/:id")
  .get(getReview)
  .delete(verifyJWT, deleteReview)
  .patch(verifyJWT, updateReview);

router.route("/by-movie/:id").get(getReviewsByMovie);

router.route("/by-user/:id").get(getReviewsByUser);

module.exports = router;
