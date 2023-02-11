import { useEffect, useState } from "react";
import axios from "../api/axios";
import MovieCards from "../components/MovieCards";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchTMDB } from "../hooks/useFetchTMDB";

const UserWatchlist = () => {
  const [userWL, setUserWL] = useState([]);

  const { auth } = useAuthContext();
  const fetchMovieByID = useFetchTMDB();

  useEffect(() => {
    const fetchUserData = async (username) => {
      const {
        data: { watchlist },
      } = await axios.get(`/api/users/username/${username}`);

      const movieData = await Promise.all(
        watchlist.map(async (movie) => {
          const results = await fetchMovieByID(movie.movieId.TMDBId);
          return results;
        })
      );
      setUserWL(movieData.reverse());
    };

    if (auth) {
      fetchUserData(auth?.username);
    }
    // eslint-disable-next-line
  }, [auth]);

  return (
    <>
      <ul className="flex flex-wrap mt-5">
        {userWL.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </ul>
    </>
  );
};

export default UserWatchlist;
