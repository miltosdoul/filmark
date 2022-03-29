import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import MovieCard from "./MovieCard";
import FilterButton from "./FilterButton";
import { motion, AnimatePresence } from "framer-motion";

const Watchlist = () => {
  const { watchlist, region } = useContext(GlobalContext);
  const [isFiltered, setFilter] = useState(false);
  const [visibleMovies, setVisibleMovies] = useState(watchlist);

  useEffect(() => {
    document.title = "Watchlist | filmark";

    setVisibleMovies(
      isFiltered
        ? watchlist.filter(
            (movie) =>
              movie?.watchProviders &&
              movie?.watchProviders[region]?.flatrate &&
              movie?.watchProviders[region]?.flatrate.find((sp) => {
                return sp?.provider_id === 8;
              }) !== undefined
          )
        : watchlist
    );
  }, [isFiltered, watchlist, region]);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">My Watchlist</h1>
          <div className="flex-container">
            <FilterButton setFilter={setFilter} isFiltered={isFiltered} />
            <span className="count-pill">
              {visibleMovies.length}{" "}
              {visibleMovies.length === 1 ? "Movie" : "Movies"}
            </span>
          </div>
        </div>

        {visibleMovies.length > 0 ? (
          <div className="movie-grid">
            <AnimatePresence>
              {visibleMovies.map((movie) => {
                return (
                  <motion.div
                    key={`${movie.id}`}
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    layout
                    style={{ position: "relative" }}
                  >
                    <MovieCard movie={movie} type="watchlist" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : isFiltered ? (
          <h2 className="no-movies">No movies match filter.</h2>
        ) : (
          <h2 className="no-movies">
            No movies in your watchlist yet. Add some!
          </h2>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
