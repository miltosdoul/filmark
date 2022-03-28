import React, { useState, useEffect, useContext } from "react";
import MovieCard from "./MovieCard";
import { GlobalContext } from "../context/GlobalState";
import { motion, AnimatePresence } from "framer-motion";

//30min time to live
const CACHE_TTL = 1000 * 60 * 30;

const Homepage = () => {
  const { popularMovies, savePopularToState } = useContext(GlobalContext);
  const [res, setRes] = useState(popularMovies.length > 0 ? popularMovies : []);

  useEffect(() => {
    document.title = "Home | filmark";

    let timeSinceUpdate = Date.now() - popularMovies.lastDataUpdate;

    if (timeSinceUpdate > CACHE_TTL) {
      fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.errors) {
            setRes(data.results);
            data.results.lastDataUpdate = Date.now();
            savePopularToState(data.results);
          } else {
            console.log("Error while fetching popular movies");
          }
        });
    }
  }, []);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Popular this week</h1>
        </div>
        <div className="movie-grid">
          <AnimatePresence>
            {res.map((movie) => {
              return (
                <motion.div
                  key={`${movie.id}`}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  style={{ position: "relative" }}
                >
                  <MovieCard movie={movie} type="homepage" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
