import { useEffect } from "react";
import MovieCards from "../components/MovieCards";
import { useMoviesContext } from "../hooks/useMoviesContext";

const Home = () => {
  const { fetchMovies, movies, updateSearchKey } = useMoviesContext();
  console.log("home render");

  useEffect(() => {
    updateSearchKey("");
  }, [updateSearchKey]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div>
      {movies.map((movie) => (
        <MovieCards key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Home;
