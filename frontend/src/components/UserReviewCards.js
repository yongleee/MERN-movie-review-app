import { useEffect, useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useFetchTMDB } from "../hooks/useFetchTMDB";
import { useReviewsContext } from "../hooks/useReviewsContext";

export default function UserReviewCards({
  id,
  content,
  rating,
  timeAdded,
  movieTitle,
  TMDBId,
}) {
  const [movie, setMovie] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const { dispatch } = useReviewsContext();
  const fetchMovieByID = useFetchTMDB();

  const axiosPrivate = useAxiosPrivate();

  const ratingStars = "★★★★★";

  useEffect(() => {
    const fetchMovieData = async () => {
      const movieData = await fetchMovieByID(TMDBId);
      setMovie(movieData);
    };

    if (TMDBId) {
      fetchMovieData();
    }
    // eslint-disable-next-line
  }, [TMDBId]);

  const handleClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = async (result) => {
    setShowConfirm(false);

    if (result) {
      try {
        const response = await axiosPrivate.delete(`/api/reviews/${id}`);

        dispatch({ type: "DELETE_REVIEW", payload: response.data });
      } catch (err) {
        console.error(err);
      }
    }
  };

  // TODO: styling: work on edit review after learning modal
  // TODO: styling: work on double confirm delete for user using modal
  return (
    <li>
      <div className="py-4 px-5 md:w-11/12 w-full border border-neutral-500 bg-neutral-600/50 rounded drop-shadow-lg my-3">
        <div className="flex">
          <p className="text-neutral-400">
            <span className="text-neutral-200 hover:text-neutral-200/75">
              <Link to={`/movie/${movieTitle}`} state={{ movie }}>
                {movieTitle}
              </Link>{" "}
            </span>
            {formatDistanceToNow(new Date(timeAdded), { addSuffix: true })}
          </p>
          <button
            onClick={handleClick}
            className="w-14 h-6 ml-auto mt-0.5 text-red-600 hover:text-red-700 border border-amber-500 hover:border-amber-600 bg-neutral-700 font-semibold rounded text-sm"
          >
            delete
          </button>
        </div>
        <p className="text-green-500">{ratingStars.slice(0, rating)}</p>
        <p className="text-neutral-300">{content}</p>
      </div>

      {showConfirm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 z-50">
          <div className="w-64 mx-auto mt-16 p-4 bg-white rounded-lg shadow-lg">
            <p className="text-lg">Are you sure you want to proceed?</p>
            <div className="mt-4 flex">
              <button
                onClick={() => handleConfirm(false)}
                className="px-4 py-2 bg-red-500 text-white mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirm(true)}
                className="px-4 py-2 bg-green-500 text-white"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
