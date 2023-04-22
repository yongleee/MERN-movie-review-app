import { Link } from "react-router-dom";

export default function MovieCards({ movie }) {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w200";

  return (
    <li className="md:basis-1/4 basis-1/3 mb-6">
      <Link to={`/movie/${movie.title}`} state={{ movie }}>
        {movie.poster_path && (
          <img
            src={`${IMAGE_PATH}${movie.poster_path}`}
            alt={`Poster of ${movie.title}`}
            className="mx-auto md:w-[200px] md:h-[300px] w-auto rounded-sm outline outline-1 outline-teal-800 hover:outline-2 hover:outline-teal-300 transition-all"
          />
        )}
      </Link>
    </li>
  );
}
