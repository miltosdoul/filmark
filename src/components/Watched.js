import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import MovieCard from "./MovieCard";
import { motion, AnimatePresence } from "framer-motion";

const Watched = () => {
  const { watched } = useContext(GlobalContext);
  const [visibleMovies, setVisibleMovies] = useState(watched);

  useEffect(() => {
    document.title = "Watched | filmark";
  }, []);

  useEffect(() => {
    setVisibleMovies(watched);
  }, [watched]);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Watched Movies</h1>
          <div className="flex-container">
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
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    layout
                    style={{ position: "relative" }}
                  >
                    <MovieCard movie={movie} type="watched" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <h2 className="no-movies">No movies in your watched list.</h2>
        )}
      </div>
    </div>
  );
};

export default Watched;
