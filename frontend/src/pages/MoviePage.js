import { useEffect, useState } from "react";
import { useMoviesContext } from "../hooks/useMoviesContext";
import { useLocation } from "react-router-dom";
import axios from "axios";

// TODO: Learn about axios .then promises
// TODO: Set up a movie page with movieid as params with form for inputing reviews
// TODO: Enable mongodb
// TODO: post movie review
// TODO: get movie review
// TODO: review list component
export default function MoviePage() {
  const [movieCredits, setMovieCredits] = useState([]);
  const [director, setDirector] = useState("");
  const { API_URL } = useMoviesContext();
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w300";
  const {
    state: { movie },
  } = useLocation();

  useEffect(() => {
    const fetchMovieCredits = async () => {
      const movie_id = movie.id;
      const { data } = await axios.get(`${API_URL}/movie/${movie_id}/credits`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
        },
      });
      setMovieCredits(data);
    };
    fetchMovieCredits();
  }, [API_URL, movie.id]);

  const { crew } = movieCredits;
  console.log(crew);

  return (
    <>
      <div>
        <img
          src={`${IMAGE_PATH}${movie.poster_path}`}
          alt={`Poster of ${movie.title}`}
        />
        <h1>{movie.title}</h1>
        <p>{director}</p>
      </div>
    </>
  );
}
