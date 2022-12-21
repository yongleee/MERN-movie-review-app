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
        setAverageRating("This movie has no rating yet");
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
      <h1 className="font-OpenSans text-3xl text-neutral-50 font-[600]">
        {movie.title}
      </h1>
      <p className="font-OpenSans text-sm text-neutral-300">
        Directed by <span className="text-neutral-50">{director}</span>
      </p>
      <p className="font-OpenSans text-sm text-neutral-300">
        Ratings: {averageRating}
      </p>
    </>
  );
}
