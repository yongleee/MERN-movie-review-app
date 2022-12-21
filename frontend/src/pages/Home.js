import { useEffect, useState } from "react";
import MovieCards from "../components/MovieCards";
import { useMoviesContext } from "../hooks/useMoviesContext";
import axios from "axios";

export default function Home() {
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const { API_URL } = useMoviesContext();

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
    <>
      <p className="font-OpenSans text-sm text-neutral-300 mb-0.5">
        POPULAR MOVIES
      </p>
      <hr className="border-t-neutral-300" />
      <ul className="flex flex-wrap mt-5">
        {discoverMovies.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </ul>
      <hr className="border-t-neutral-300 mt-1 pb-4" />
    </>
  );
}
