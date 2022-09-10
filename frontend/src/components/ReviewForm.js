import axios from "axios";
import { useState } from "react";

export default function ReviewForm({ movieTitle, movieIdForDB }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  // const [error, setError] = useState(null);
  // const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (movieIdForDB) {
      const review = { movieId: movieIdForDB, content, rating };

      const response = await axios.post("/api/reviews", review);
      console.log(response);
    }
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
