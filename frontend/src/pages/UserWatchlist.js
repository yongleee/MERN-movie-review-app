import { useEffect, useState } from "react";
import MovieCards from "../components/MovieCards";
import { useAuthContext } from "../hooks/useAuthContext";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useFetchTMDB } from "../hooks/useFetchTMDB";

const UserWatchlist = () => {
  const [userWL, setUserWL] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { auth } = useAuthContext();

  const axiosPrivate = useAxiosPrivate();
  const fetchMovieByID = useFetchTMDB();

  useEffect(() => {
    const fetchUserData = async (username) => {
      const { data } = await axiosPrivate.get(
        `/api/users/user-watchlist/${username}`,
        {
          params: {
            page,
          },
        }
      );

      setTotalPages(data.totalPages);

      const movieData = await Promise.all(
        data.watchlist.map(async (movie) => {
          const results = await fetchMovieByID(movie.movieId.TMDBId);
          return results;
        })
      );
      setUserWL(movieData);
    };

    if (auth) {
      fetchUserData(auth?.username);
    }
    // eslint-disable-next-line
  }, [auth, page]);

  const handlePrevious = () => {
    setPage(Math.max(1, page - 1));
  };

  const handleNext = () => {
    setPage(Math.min(totalPages, page + 1));
  };

  return (
    <>
      <ul className="flex flex-wrap mt-5">
        {userWL.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </ul>
      {totalPages > 1 && (
        <ul className="flex justify-between w-full text-sm my-4">
          <li className="w-1/3">
            {page !== 1 && (
              <button
                onClick={handlePrevious}
                className="h-6 bg-neutral-500 text-neutral-200 px-2 rounded-sm hover:bg-neutral-500/75 hover:text-neutral-200/75"
              >
                previous
              </button>
            )}
          </li>
          <li className="w-1/3 self-center">
            <p className="text-neutral-300 text-center">
              {page}/{totalPages}
            </p>
          </li>
          <li className="w-1/3 text-right">
            {page !== totalPages && (
              <button
                onClick={handleNext}
                className="h-6 bg-neutral-500 text-neutral-200 px-2 rounded-sm hover:bg-neutral-500/75 hover:text-neutral-200/75"
              >
                next
              </button>
            )}
          </li>
        </ul>
      )}
    </>
  );
};

export default UserWatchlist;
