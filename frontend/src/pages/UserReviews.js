import { useEffect, useState } from "react";
import axios from "../api/axios";
import UserReviewCards from "../components/UserReviewCards";
import { useAuthContext } from "../hooks/useAuthContext";
import { useReviewsContext } from "../hooks/useReviewsContext";

const UserReviews = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { auth } = useAuthContext();
  const { reviews, dispatch } = useReviewsContext();

  useEffect(() => {
    const fetchReviewsByUserId = async (id) => {
      try {
        const response = await axios.get(`/api/reviews/by-user/${id}`, {
          params: {
            page,
          },
        });
        dispatch({ type: "SET_REVIEWS", payload: response.data.reviews });
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    };

    if (auth) {
      fetchReviewsByUserId(auth?.userId);
    }
  }, [auth, dispatch, page]);

  const handlePrevious = () => {
    setPage(Math.max(1, page - 1));
  };

  const handleNext = () => {
    setPage(Math.min(totalPages, page + 1));
  };

  return (
    <>
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
      {totalPages > 1 && (
        <ul className="flex justify-between w-11/12 text-sm my-4">
          <li className="w-1/3">
            {page !== 1 && (
              <button
                onClick={handlePrevious}
                className="h-6 bg-neutral-500 text-neutral-200 px-2 rounded-sm hover:bg-neutral-500/75 hover:text-neutral-200/75"
              >
                previous
              </button>
            )}
          </li>
          <li className="w-1/3 self-center">
            <p className="text-neutral-300 text-center">
              {page}/{totalPages}
            </p>
          </li>
          <li className="w-1/3 text-right">
            {page !== totalPages && (
              <button
                onClick={handleNext}
                className="h-6 bg-neutral-500 text-neutral-200 px-2 rounded-sm hover:bg-neutral-500/75 hover:text-neutral-200/75"
              >
                next
              </button>
            )}
          </li>
        </ul>
      )}
    </>
  );
};

export default UserReviews;
