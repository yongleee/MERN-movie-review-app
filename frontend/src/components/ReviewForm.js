import axios from "axios";
import { useState, useEffect } from "react";

export default function ReviewForm({ movieTitle }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [movieId, setMovieId] = useState("");
  // const [error, setError] = useState(null);
  // const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    const fetchMovieId = async () => {
      const existedMovieId = await axios.get(`/api/movies/title/${movieTitle}`);
      if (existedMovieId.data) {
        setMovieId(existedMovieId.data);
        // console.log(existedMovieId.data);
      } else {
        const newMovieId = await axios.post("/api/movies", {
          movieTitle,
        });
        setMovieId(newMovieId.data);
        // console.log(newMovieId.data);
      }
    };

    fetchMovieId();
  }, [movieTitle]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = { movieId, content, rating };

    const response = await axios.post("/api/reviews", review);
    console.log(response);
  };

  // TODO: Add modal when working on design (check chrome bookmark for reference)
  // TODO: Work on: "if empty fields when submit show error messages with tailwind" when working on styling
  return (
    <form onSubmit={handleSubmit}>
      <h1>I watched {movieTitle}</h1>
      <label>Add Your Review: </label>
      <input
        type="text"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <label>Add Your Rating: </label>
      <input
        type="number"
        onChange={(e) => setRating(e.target.value)}
        value={rating}
      />
      <button>post</button>
    </form>
  );
}
