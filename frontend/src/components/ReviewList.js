import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useReviewsContext } from "../hooks/useReviewsContext";
import ReviewCards from "./ReviewCards";

export default function ReviewList({ movieIdForDB, hasCheckedMovieId }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { reviews, dispatch } = useReviewsContext();

  useEffect(() => {
    const fetchReviewsByMovieId = async () => {
      if (hasCheckedMovieId && movieIdForDB) {
        const response = await axios.get(
          `/api/reviews/by-movie/${movieIdForDB}`,
          {
            params: {
              page,
            },
          }
        );
        dispatch({ type: "SET_REVIEWS", payload: response.data.reviews });
        setTotalPages(response.data.totalPages);
      } else if (hasCheckedMovieId) {
        dispatch({ type: "SET_REVIEWS", payload: [] });
      }
    };

    fetchReviewsByMovieId();
  }, [page, hasCheckedMovieId, movieIdForDB, dispatch]);

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
            <ReviewCards
              key={review._id}
              id={review._id}
              content={review.content}
              rating={review.rating}
              timeAdded={review.createdAt}
              userInfo={review?.userId}
            />
          ))}
      </ul>
      {totalPages > 1 && (
        <ul className="flex justify-between md:w-11/12 w-full text-sm my-4">
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
}
