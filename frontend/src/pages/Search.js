import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCards from "../components/MovieCards";
import { useMoviesContext } from "../hooks/useMoviesContext";
import axios from "axios";

export default function Search() {
  const [searchMovies, setSearchMovies] = useState([]);
  const { API_URL } = useMoviesContext();
  const { searchId } = useParams();
  console.log(searchId);

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
    <div>
      {searchMovies.map((movie) => (
        <MovieCards key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
