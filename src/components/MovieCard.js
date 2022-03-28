import React, { Suspense, useState, useContext, useEffect } from "react";
import MovieControls from "./MovieControls";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";

const StreamingProviders = React.lazy(() => import("./StreamingProviders"));

const MovieCard = ({ movie, type }) => {
  const { region } = useContext(GlobalContext);
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    if (movie.watchProviders) {
      setMovieData(movie.watchProviders[region]);
    }
  }, [region]);

  return (
    <div className="movie-card" style={{ position: "relative" }}>
      <div className="moviecardinner">
        <Link to={`/movie/${movie.id}`} aria-label="Link to movie">
          <div className="overlay"></div>
        </Link>
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        ) : (
          <div className="filler-poster"></div>
        )}
        <MovieControls movie={movie} type={type} />
        <div className="tooltip">
          {movie.title} 🞄{" "}
          {movie.release_date ? movie.release_date.match(/\d{4}/) : "TBD"}
        </div>
      </div>
      {type != "homepage" && movie.watchProviders && (
        <Suspense fallback={<p>Loading streaming data...</p>}>
          <StreamingProviders movie={movie} movieData={movieData} type={type} />
        </Suspense>
      )}
    </div>
  );
};

export default React.memo(MovieCard);
