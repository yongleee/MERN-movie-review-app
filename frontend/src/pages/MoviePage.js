import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../api/axios";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import MovieInfo from "../components/MovieInfo";
import { useAuthContext } from "../hooks/useAuthContext";
import { useReviewsContext } from "../hooks/useReviewsContext";

// TODO: add date for review added (done)
// TODO: Learn authentication
// TODO: edit review
export default function MoviePage() {
  const [movieIdForDB, setMovieIdForDB] = useState("");
  const [hasCheckedMovieId, setHasCheckedMovieId] = useState(false);
  const [hasAddedToWL, setHasAddedToWL] = useState(false);

  const { auth } = useAuthContext();
  const { dispatch } = useReviewsContext();

  const {
    state: { movie },
  } = useLocation();

  const IMAGE_PATH = "https://image.tmdb.org/t/p/w300";

  const movieTitle = movie.title;
  const posterPath = movie.poster_path;
  const TMDBId = movie.id;

  // check if the movie is in user's watchlist
  useEffect(() => {
    const fetchUserData = async (username) => {
      const { data } = await axios.get(`/api/users/username/${username}`);
      const isAddedToWL = data?.watchlist.find(
        (movie) => movie.movieId._id === movieIdForDB
      );

      if (isAddedToWL) {
        setHasAddedToWL(true);
      }
    };

    if (auth) {
      fetchUserData(auth?.username);
    }
  }, [auth, movieIdForDB]);

  // fetch movie id from db
  useEffect(() => {
    dispatch({ type: "RESET_REVIEWS" });
    const fetchMovieIdFromDB = async () => {
      const existedMovieId = await axios.get(`/api/movies/title/${movieTitle}`);

      if (existedMovieId.data) {
        setMovieIdForDB(existedMovieId.data);
      } else {
        setMovieIdForDB("NO_ID");
      }
    };

    fetchMovieIdFromDB();
  }, [dispatch, movieTitle]);

  // create movie db for db
  useEffect(() => {
    const createMovieDB = async () => {
      const newMovieId = await axios.post("/api/movies", {
        movieTitle,
        posterPath,
        TMDBId,
      });
      setMovieIdForDB(newMovieId.data);
    };

    if (movieIdForDB === "NO_ID") {
      createMovieDB();
    }
  }, [TMDBId, movieTitle, posterPath, movieIdForDB]);

  // check if movieid in db exist
  useEffect(() => {
    if (movieIdForDB !== "NO_ID" && movieIdForDB) {
      setHasCheckedMovieId(true);
    }
  }, [movieIdForDB]);

  return (
    <>
      <div className="flex flex-col	md:flex-row mt-10 items-center md:items-start">
        <img
          src={`${IMAGE_PATH}${movie.poster_path}`}
          alt={`Poster of ${movie.title}`}
          className="h-[360px] w-[240px] outline outline-1 outline-neutral-50/30 rounded-sm"
        />
        <div className="md:ml-9 md:w-11/12 md:pt-0 pt-5">
          <MovieInfo movie={movie} />
          <ReviewForm
            movieTitle={movie.title}
            movieIdForDB={movieIdForDB}
            hasAddedToWL={hasAddedToWL}
          />
          <ReviewList
            movieIdForDB={movieIdForDB}
            hasCheckedMovieId={hasCheckedMovieId}
          />
        </div>
      </div>
    </>
  );
}
