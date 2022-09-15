import { useEffect } from "react";
import axios from "axios";
import { useReviewsContext } from "../hooks/useReviewsContext";
import ReviewCards from "./ReviewCards";

export default function ReviewList({ movieIdForDB }) {
  const { reviews, dispatch } = useReviewsContext();

  // TODO: update to context after getting data from database (done)
  useEffect(() => {
    const fetchReviewsByMovieId = async () => {
      if (movieIdForDB) {
        const response = await axios.get(
          `/api/reviews/by-movie/${movieIdForDB}`
        );
        if (response.statusText === "OK") {
          dispatch({ type: "SET_REVIEWS", payload: response.data });
        }
      } else {
        dispatch({ type: "SET_REVIEWS", payload: [] });
      }
    };

    fetchReviewsByMovieId();
  }, [movieIdForDB, dispatch]);

  return (
    <ul>
      {reviews &&
        reviews.map((review) => (
          <ReviewCards
            key={review._id}
            id={review._id}
            content={review.content}
            rating={review.rating}
          />
        ))}
    </ul>
  );
}
