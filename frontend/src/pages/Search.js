import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCards from "../components/MovieCards";
import { useMoviesContext } from "../hooks/useMoviesContext";

export default function Search() {
  const { movies, fetchMovies, updateSearchKey } = useMoviesContext();
  const { searchId } = useParams();
  console.log(searchId);

  //TODO: Learn about useeffect cleanup and see if it applies
  useEffect(() => {
    updateSearchKey(searchId);
  }, [updateSearchKey, searchId]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <>
      <div>
        {movies.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
