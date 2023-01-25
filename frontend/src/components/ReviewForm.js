import { useState } from "react";
import { useReviewsContext } from "../hooks/useReviewsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

export default function ReviewForm({ movieTitle, movieIdForDB }) {
  const { dispatch } = useReviewsContext();
  const { auth } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();

  const userId = auth?.userId;

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [errorReview, setErrorReview] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [hasAddedToWL, setHasAddedToWL] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    let movieId = "";
    if (!movieIdForDB) {
      const newMovieId = await axios.post("/api/movies", {
        movieTitle,
      });
      movieId = newMovieId.data;
    } else {
      movieId = movieIdForDB;
    }

    if (movieId) {
      const review = { movieId, content, rating, userId };

      try {
        const response = await axios.post("/api/reviews", review);
        setErrorReview(null);
        if (response.statusText === "OK") {
          dispatch({ type: "CREATE_REVIEW", payload: response.data });
        }
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
    let movieId = "";
    if (!movieIdForDB) {
      const newMovieId = await axios.post("/api/movies", {
        movieTitle,
      });
      movieId = newMovieId.data;
    } else {
      movieId = movieIdForDB;
    }

    if (userId) {
      try {
        const response = await axiosPrivate.patch(
          `/api/users/update-watchlist/${userId}`,
          {
            movieId,
          }
        );
        if (response.statusText === "OK") {
          setHasAddedToWL((prev) => !prev);
        }
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // TODO: Stying: Add modal when working on design (check chrome bookmark for reference)
  // TODO: Stying: Work on: "if empty fields when submit show error messages with tailwind" when working on styling
  return (
    <>
      {auth ? (
        <>
          <button onClick={handleClickWatchlist}>
            {!hasAddedToWL ? (
              <p>Add To Watchlist</p>
            ) : (
              <p>Remove From Watchlist</p>
            )}
          </button>
        </>
      ) : (
        <>
          <p>Sign up or log in to add this movie to your watchlist.</p>
          <p>
            Continue leaving a review anonymously or
            <Link to={"/sign-up"}> Sign Up.</Link>
          </p>
          <p>
            Already registered?
            <Link to={"/log-in"}> Log In here.</Link>
          </p>
        </>
      )}
      <form
        onSubmit={handleSubmitReview}
        className="font-OpenSans text-sm text-neutral-300"
      >
        <p>
          I watched <span className="text-neutral-50">{movieTitle}</span>:
        </p>
        <label htmlFor="content">Add Your Review: </label>
        <input
          type="text"
          id="content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          maxLength={1000}
        />
        <br />
        <p>Add Your Rating: </p>
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
        <button>post</button>
        {errorReview && (
          <p>
            {errorReview}: {emptyFields.join(", ")}
          </p>
        )}
      </form>
    </>
  );
}
