import { Link } from "react-router-dom";

const MovieCards = ({ movie }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w300";
  // console.log(movie);
  return (
    <>
      <Link to="/movie">
        <div className="movie-card">
          {movie.poster_path && (
            <img src={`${IMAGE_PATH}${movie.poster_path}`} alt="" />
          )}
          <h5>{movie.title}</h5>
        </div>
      </Link>
    </>
  );
};

export default MovieCards;
