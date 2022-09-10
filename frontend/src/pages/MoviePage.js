import { useEffect, useState } from "react";
import { useMoviesContext } from "../hooks/useMoviesContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

// TODO: Set up a movie page with movieid as params with form for inputing reviews (done)
// TODO: post movie review (done)
// TODO: Check ninja video whether context is required to save the review data for showing the data after it was posted
// TODO: get movie review
// TODO: review list component
// TODO: Learn authentication
export default function MoviePage() {
  const [movieCredits, setMovieCredits] = useState({});
  const [director, setDirector] = useState("");
  const [movieIdForDB, setMovieIdForDB] = useState("");

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

  useEffect(() => {
    const fetchMovieIdFromDB = async () => {
      const movieTitle = movie.title;
      const existedMovieId = await axios.get(`/api/movies/title/${movieTitle}`);
      if (existedMovieId.data) {
        setMovieIdForDB(existedMovieId.data);
      } else {
        const newMovieId = await axios.post("/api/movies", {
          movieTitle,
        });
        setMovieIdForDB(newMovieId.data);
      }
    };

    fetchMovieIdFromDB();
  }, [movie.title]);
  // console.log(movieIdForDB);

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
      <div>
        <ReviewForm movieTitle={movie.title} movieIdForDB={movieIdForDB} />
      </div>
      <div>
        <ReviewList movieIdForDB={movieIdForDB} />
      </div>
    </>
  );
}
