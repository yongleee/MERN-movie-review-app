import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import MovieInfo from "../components/MovieInfo";
import { useReviewsContext } from "../hooks/useReviewsContext";

// TODO: add date for review added (done)
// TODO: Learn authentication
// TODO: edit review
export default function MoviePage() {
  const [movieIdForDB, setMovieIdForDB] = useState("");
  const [hasCheckedMovieId, setHasCheckedMovieId] = useState(false);

  const { dispatch } = useReviewsContext();

  const {
    state: { movie },
  } = useLocation();

  const IMAGE_PATH = "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    dispatch({ type: "RESET_REVIEWS" });
    const fetchMovieIdFromDB = async () => {
      const movieTitle = movie.title;
      const existedMovieId = await axios.get(`/api/movies/title/${movieTitle}`);

      if (existedMovieId.data) {
        setMovieIdForDB(existedMovieId.data);
      } else {
        setHasCheckedMovieId(true);
      }
    };

    fetchMovieIdFromDB();
  }, [movie.title, dispatch]);

  useEffect(() => {
    if (movieIdForDB) {
      setHasCheckedMovieId(true);
    }
  }, [movieIdForDB]);

  return (
    <>
      <div className="flex">
        <img
          src={`${IMAGE_PATH}${movie.poster_path}`}
          alt={`Poster of ${movie.title}`}
          className="h-[360px] w-[240px]"
        />
        <div className="">
          <MovieInfo movie={movie} />
          <ReviewForm movieTitle={movie.title} movieIdForDB={movieIdForDB} />
          <ReviewList
            movieIdForDB={movieIdForDB}
            hasCheckedMovieId={hasCheckedMovieId}
          />
        </div>
      </div>
    </>
  );
}
