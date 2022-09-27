import { useState } from "react";
import axios from "axios";
import { useReviewsContext } from "../hooks/useReviewsContext";

export default function ReviewForm({ movieTitle, movieIdForDB }) {
  const { dispatch } = useReviewsContext();

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [errorReview, setErrorReview] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
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
      const review = { movieId, content, rating };

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

  // TODO: Stying: Add modal when working on design (check chrome bookmark for reference)
  // TODO: Stying: Work on: "if empty fields when submit show error messages with tailwind" when working on styling
  return (
    <form onSubmit={handleSubmit}>
      <h1>I watched {movieTitle}</h1>
      <label htmlFor="content">Add Your Review: </label>
      <input
        type="text"
        id="content"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        maxLength={1000}
      />
      <label htmlFor="rating">Add Your Rating: </label>
      <input
        type="number"
        id="rating"
        onChange={(e) => setRating(e.target.value)}
        value={rating}
      />
      <button>post</button>
      {errorReview && (
        <p>
          {errorReview}: {emptyFields.join(", ")}
        </p>
      )}
    </form>
  );
}
