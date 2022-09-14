import { useEffect, useState } from "react";
import { useMoviesContext } from "../hooks/useMoviesContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

// TODO: work on word limit on review (done)
// TODO: error catching
// TODO: show average star
// TODO: add a review context to update the review immediately after posting
// TODO: delete and update review
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
      }
    };

    fetchMovieIdFromDB();
  }, [movie.title]);

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
