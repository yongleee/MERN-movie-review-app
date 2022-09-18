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

  const IMAGE_PATH = "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    setAverageRating("");
    console.log(reviews);
    if (reviews) {
      if (reviews.length > 0) {
        const totalRating = reviews.reduce((prev, cur) => prev + cur.rating, 0);
        setAverageRating(totalRating / reviews.length);
      } else if (reviews.length === 0) {
        setAverageRating("The movie has no rating yet");
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
      <img
        src={`${IMAGE_PATH}${movie.poster_path}`}
        alt={`Poster of ${movie.title}`}
      />
      <h1>{movie.title}</h1>
      <p>Directed by: {director}</p>
      <p>Average rating: {averageRating}</p>
    </>
  );
}
