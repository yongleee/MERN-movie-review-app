import axios from "axios";
import { useMoviesContext } from "../hooks/useMoviesContext";

export const useFetchTMDB = () => {
  const { API_URL } = useMoviesContext();

  const fetchMovieByID = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
      },
    });

    return data;
  };

  return fetchMovieByID;
};
