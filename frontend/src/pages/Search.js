import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCards from "../components/MovieCards";
import { useMoviesContext } from "../hooks/useMoviesContext";
import axios from "axios";

export default function Search() {
  const [searchMovies, setSearchMovies] = useState([]);
  const { API_URL } = useMoviesContext();
  const { searchId } = useParams();

  useEffect(() => {
    const fetchSearchMovies = async () => {
      const type = "search";
      const {
        data: { results },
      } = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          query: searchId,
        },
      });
      setSearchMovies(results);
    };

    fetchSearchMovies();
  }, [API_URL, searchId]);

  return (
    <>
      <p className="font-OpenSans text-sm text-neutral-300 mb-0.5">
        SEARCH RESULTS
      </p>
      <hr className="border-t-neutral-300" />
      <ul className="flex flex-wrap mt-5">
        {searchMovies.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </ul>
      <hr className="border-t-neutral-300 mt-1 pb-4" />
    </>
  );
}
