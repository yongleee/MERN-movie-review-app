import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCards from "./ReviewCards";

export default function ReviewList({ movieIdForDB }) {
  const [reviews, setReviews] = useState([]);

  // console.log(movieIdForDB);
  useEffect(() => {
    const fetchReviewsByMovieId = async () => {
      if (movieIdForDB) {
        const { data } = await axios.get(
          `/api/reviews/by-movie/${movieIdForDB}`
        );
        console.log(data);
        setReviews(data);
      }
    };

    fetchReviewsByMovieId();
  }, [movieIdForDB]);

  return (
    <>
      {reviews &&
        reviews.map((review) => (
          <ReviewCards
            key={review._id}
            content={review.content}
            rating={review.rating}
          />
        ))}
    </>
  );
}
