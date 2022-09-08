import { Link } from "react-router-dom";

export default function MovieCards({ movie }) {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w200";

  return (
    <>
      <Link to={`/movie/${movie.title}`} state={{ movie }}>
        <div className="movie-card">
          {movie.poster_path && (
            <img
              src={`${IMAGE_PATH}${movie.poster_path}`}
              alt={`Poster of ${movie.title}`}
            />
          )}
          <h5>{movie.title}</h5>
        </div>
      </Link>
    </>
  );
}
