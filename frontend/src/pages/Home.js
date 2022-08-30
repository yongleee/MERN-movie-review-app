import { useEffect, useState } from "react";
import MovieCards from "../components/MovieCards";
import { useMoviesContext } from "../hooks/useMoviesContext";
import axios from "axios";

export default function Home() {
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const { API_URL } = useMoviesContext();
  console.log("home render");

  useEffect(() => {
    const fetchDiscoverMovies = async () => {
      const type = "discover";
      const {
        data: { results },
      } = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
        },
      });
      setDiscoverMovies(results);
    };
    fetchDiscoverMovies();
  }, [API_URL]);

  return (
    <div>
      {discoverMovies.map((movie) => (
        <MovieCards key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
