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
      const response = await axiosPrivate.delete(`/api/reviews/${id}`);

      if (response.statusText === "OK") {
        dispatch({ type: "DELETE_REVIEW", payload: response.data });
      }
    }
  };

  // TODO: styling: work on edit review after learning modal
  // TODO: styling: work on double confirm delete for user using modal
  return (
    <li className="border-2 border-black">
      <Link to={`/movie/${movieTitle}`} state={{ movie }}>
        {movieTitle}
      </Link>
      <p>{content}</p>
      <p>{rating}</p>
      <p>{formatDistanceToNow(new Date(timeAdded), { addSuffix: true })}</p>
      <button onClick={handleClick}>delete</button>
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
