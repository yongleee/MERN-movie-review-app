import { createContext, useCallback, useState } from "react";
import axios from "axios";

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const API_URL = "https://api.themoviedb.org/3";
  const fetchMovies = useCallback(async () => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        query: searchKey,
      },
    });
    setMovies(results);
  }, [searchKey, setMovies]);

  function updateSearchKey(newSearchKey) {
    setSearchKey(newSearchKey);
  }

  return (
    <MoviesContext.Provider
      value={{
        searchKey,
        movies,
        fetchMovies,
        updateSearchKey,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
