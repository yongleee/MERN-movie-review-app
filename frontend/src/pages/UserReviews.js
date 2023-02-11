import { useEffect } from "react";
import axios from "../api/axios";
import UserReviewCards from "../components/UserReviewCards";
import { useAuthContext } from "../hooks/useAuthContext";
import { useReviewsContext } from "../hooks/useReviewsContext";

const UserReviews = () => {
  const { auth } = useAuthContext();
  const { reviews, dispatch } = useReviewsContext();

  useEffect(() => {
    const fetchReviewsByUserId = async (id) => {
      const response = await axios.get(`/api/reviews/by-user/${id}`);
      console.log(response.data);
      if (response.statusText === "OK") {
        dispatch({ type: "SET_REVIEWS", payload: response.data });
      }
    };

    if (auth) {
      fetchReviewsByUserId(auth?.userId);
    }
  }, [auth, dispatch]);

  return (
    <ul>
      {reviews &&
        reviews.map((review) => (
          <UserReviewCards
            key={review._id}
            id={review._id}
            content={review.content}
            rating={review.rating}
            timeAdded={review.createdAt}
            movieTitle={review.movieId.movieTitle}
            TMDBId={review.movieId.TMDBId}
          />
        ))}
    </ul>
  );
};

export default UserReviews;
