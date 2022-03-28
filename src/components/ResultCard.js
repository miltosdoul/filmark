import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import MovieDesc from "./MovieDesc";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ResultCard = ({ movie }) => {
  const { addMovieToWatchlist, addMovieToWatched, watchlist, watched, region } =
    useContext(GlobalContext);

  let storedMovie = watchlist.find((o) => o.id === movie.id);
  let storedMovieWatched = watched.find((o) => o.id === movie.id);

  const watchlistDisabled = storedMovie
    ? true
    : storedMovieWatched
    ? true
    : false;

  const watchedDisabled = storedMovieWatched ? true : false;

  const addToWatchlistWrapper = async (movie) => {
    await fetchStreamingInfo(movie);
    addMovieToWatchlist(movie);
  };

  const addToWatchedWrapper = async (movie) => {
    await fetchStreamingInfo(movie);
    addMovieToWatched(movie);
  };

  const fetchStreamingInfo = async (m) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${m.id}/watch/providers?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors && data.results) {
          //delete unused info
          for (const key in data.results) {
            data.results[key].buy && delete data.results[key].buy;
            data.results[key].rent && delete data.results[key].rent;
            data.results[key].link && delete data.results[key].link;
          }
          movie.watchProviders = data.results;
          movie.lastStreamingDataUpdate = Date.now();
        } else {
          console.log("Error while fetching watchProviders. Error: ", data);
        }
      });
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      layout
      className="result-card"
    >
      <Link to={`/movie/${movie.id}`}>
        <div className="poster-wrapper">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={`${movie.title} Poster`}
            />
          ) : (
            <div className="filler-poster"></div>
          )}
        </div>
      </Link>
      <div className="info">
        <div className="header">
          <Link to={`/movie/${movie.id}`} className="title">
            {movie.title}
          </Link>
          <h4 className="release-date">
            {movie.release_date ? movie.release_date.substring(0, 4) : "-"}
          </h4>
          <MovieDesc description={movie.overview} />
        </div>
        <div className="controls">
          <button
            className="btn"
            disabled={watchlistDisabled}
            onClick={() => addToWatchlistWrapper(movie)}
          >
            Add to watchlist
          </button>

          <button
            className="btn"
            disabled={watchedDisabled}
            onClick={() => addToWatchedWrapper(movie)}
          >
            Add to watched
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
