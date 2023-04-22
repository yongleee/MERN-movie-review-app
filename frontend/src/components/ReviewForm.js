import { useState, useEffect } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { useReviewsContext } from "../hooks/useReviewsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

export default function ReviewForm({ movieTitle, movieIdForDB, hasAddedToWL }) {
  const { dispatch } = useReviewsContext();
  const { auth } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();

  const userId = auth?.userId;

  const movieId = movieIdForDB;

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [errorReview, setErrorReview] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [toggleWL, setToggleWL] = useState(false);

  useEffect(() => {
    if (hasAddedToWL) {
      setToggleWL(true);
    }
  }, [hasAddedToWL]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (movieId !== "NO_ID" && movieId) {
      const review = { movieId, content, rating, userId };

      try {
        const response = await axios.post("/api/reviews", review);
        setErrorReview(null);
        dispatch({ type: "CREATE_REVIEW", payload: response.data });
      } catch (err) {
        const {
          response: { data },
        } = err;
        setErrorReview(data.error);
        setEmptyFields(data.emptyFields);
      }
    }
  };

  const handleClickWatchlist = async () => {
    if (userId && movieId !== "NO_ID" && movieId) {
      try {
        await axiosPrivate.patch(`/api/users/update-watchlist/${userId}`, {
          movieId,
        });
        setToggleWL((prev) => !prev);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // TODO: Stying: Work on: "if empty fields when submit show error messages with tailwind" when working on styling
  return (
    <div className="py-4 px-5 mb-5 md:w-11/12 w-full border border-neutral-500 bg-neutral-600/50 rounded drop-shadow-lg">
      {auth?.email ? (
        <button onClick={handleClickWatchlist} className="mb-3">
          {!toggleWL ? (
            <div className="flex text-neutral-300 hover:text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>Add Watchlist</p>
            </div>
          ) : (
            <div className="flex text-lime-400 hover:text-lime-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>Remove Watchlist</p>
            </div>
          )}
        </button>
      ) : (
        <div className="mb-3 text-green-200 text-sm">
          <p>Sign up or log in to add this movie to your watchlist.</p>
          <p>
            You can continue leaving a review anonymously or
            <span className="text-green-50 hover:text-green-300">
              <Link to={"/sign-up"}> sign up here</Link>
            </span>
            .
          </p>
          <p>
            Already registered?
            <span className="text-green-50 hover:text-green-300">
              <Link to={"/log-in"}> Log In here</Link>
            </span>
            .
          </p>
        </div>
      )}
      <form
        onSubmit={handleSubmitReview}
        className="font-OpenSans text-sm text-neutral-300 font-thin"
      >
        <p>
          I watched <span className="text-neutral-200">{movieTitle}</span>:
        </p>
        <textarea
          id="content"
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
          placeholder="Add your review here..."
          rows={5}
          value={content}
          className="resize-none w-full outline-0 rounded-sm py-0.5 px-1 mt-1 text-neutral-100 focus:text-black bg-neutral-600 border border-neutral-500 focus:bg-neutral-200"
        ></textarea>
        <div className="flex">
          <p className="pt-2.5 mr-1">Add Your Rating: </p>
          <div className="flex flex-row-reverse justify-end">
            <input
              type="radio"
              id="star5"
              name="rate"
              value="5"
              onChange={(e) => setRating(e.target.value)}
              className="hidden peer"
            />
            <label
              htmlFor="star5"
              title="text"
              className="peer-hover:text-blue-400 hover:text-blue-400 peer-checked:text-green-400 text-3xl"
            >
              ★
            </label>
            <input
              type="radio"
              id="star4"
              name="rate"
              value="4"
              onChange={(e) => setRating(e.target.value)}
              className="hidden peer"
            />
            <label
              htmlFor="star4"
              title="text"
              className="peer-hover:text-blue-400 hover:text-blue-400 peer-checked:text-green-400 text-3xl"
            >
              ★
            </label>
            <input
              type="radio"
              id="star3"
              name="rate"
              value="3"
              onChange={(e) => setRating(e.target.value)}
              className="hidden peer"
            />
            <label
              htmlFor="star3"
              title="text"
              className="peer-hover:text-blue-400 hover:text-blue-400 peer-checked:text-green-400 text-3xl"
            >
              ★
            </label>
            <input
              type="radio"
              id="star2"
              name="rate"
              value="2"
              onChange={(e) => setRating(e.target.value)}
              className="hidden peer"
            />
            <label
              htmlFor="star2"
              title="text"
              className="peer-hover:text-blue-400 hover:text-blue-400 peer-checked:text-green-400 text-3xl"
            >
              ★
            </label>
            <input
              type="radio"
              id="star1"
              name="rate"
              value="1"
              onChange={(e) => setRating(e.target.value)}
              className="hidden peer"
            />
            <label
              htmlFor="star1"
              title="text"
              className="peer-hover:text-blue-400 hover:text-blue-400 peer-checked:text-green-400 text-3xl"
            >
              ★
            </label>
          </div>
          <button className="ml-auto w-12 h-7 mt-2 bg-green-500 text-neutral-50 font-semibold tracking-wide rounded-sm">
            post
          </button>
        </div>
        {errorReview && (
          <p className="text-xs pt-1 text-red-500 font-semibold">
            {errorReview}: {emptyFields.join(", ")}
          </p>
        )}
      </form>
    </div>
  );
}
