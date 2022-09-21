import { useEffect } from "react";
import axios from "axios";
import { useReviewsContext } from "../hooks/useReviewsContext";
import ReviewCards from "./ReviewCards";

export default function ReviewList({ movieIdForDB, hasCheckedMovieId }) {
  const { reviews, dispatch } = useReviewsContext();

  useEffect(() => {
    const fetchReviewsByMovieId = async () => {
      if (hasCheckedMovieId && movieIdForDB) {
        const response = await axios.get(
          `/api/reviews/by-movie/${movieIdForDB}`
        );
        if (response.statusText === "OK") {
          dispatch({ type: "SET_REVIEWS", payload: response.data });
        }
      } else if (hasCheckedMovieId) {
        dispatch({ type: "SET_REVIEWS", payload: [] });
      }
    };

    fetchReviewsByMovieId();
  }, [hasCheckedMovieId, movieIdForDB, dispatch]);

  return (
    <ul>
      {reviews &&
        reviews.map((review) => (
          <ReviewCards
            key={review._id}
            id={review._id}
            content={review.content}
            rating={review.rating}
            timeAdded={review.createdAt}
          />
        ))}
    </ul>
  );
}
