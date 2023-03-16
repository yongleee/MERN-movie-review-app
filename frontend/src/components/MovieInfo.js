import { useState, useEffect } from "react";
import { useMoviesContext } from "../hooks/useMoviesContext";
import { useReviewsContext } from "../hooks/useReviewsContext";
import axios from "axios";

export default function MovieInfo({ movie }) {
  const [movieCredits, setMovieCredits] = useState({});
  const [director, setDirector] = useState("");
  const [averageRating, setAverageRating] = useState("");

  const { reviews } = useReviewsContext();
  const { API_URL } = useMoviesContext();

  useEffect(() => {
    setAverageRating("");
    if (reviews) {
      if (reviews.length > 0) {
        const totalRating = reviews.reduce((prev, cur) => prev + cur.rating, 0);
        setAverageRating((totalRating / reviews.length).toFixed(1));
      } else if (reviews.length === 0) {
        setAverageRating(null);
      }
    }
  }, [reviews]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      const movie_id = movie.id;
      const { data } = await axios.get(`${API_URL}/movie/${movie_id}/credits`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
        },
      });
      setMovieCredits((prevMovieCredits) => {
        return { ...data };
      });
    };

    fetchMovieCredits();
  }, [API_URL, movie.id]);

  useEffect(() => {
    const getDirector = () => {
      const { crew } = movieCredits;
      if (crew) {
        const directorObj = crew.filter((c) => c.job === "Director");
        const directorNames = directorObj.map((director) => director.name);
        if (Array.isArray(directorNames)) {
          setDirector(directorNames.join(", "));
          return;
        }
        setDirector(directorNames);
      }
    };

    getDirector();
  }, [movieCredits]);

  return (
    <>
      <p className="font-Tinos text-4xl text-neutral-50">
        {movie.title}
        <span className="font-OpenSans text-sm text-neutral-400 mx-4">
          <span className="mr-3">{movie.release_date.substring(0, 4)}</span>
          Directed by <span className="text-neutral-300">{director}</span>
        </span>
      </p>
      <p className="font-OpenSans text-neutral-400 my-4">
        Average Ratings:
        {averageRating ? (
          <span className="font-OpenSans text-2xl text-neutral-300 ml-2">
            {averageRating}
          </span>
        ) : (
          <span> This movie has no rating yet.</span>
        )}
      </p>
    </>
  );
}
