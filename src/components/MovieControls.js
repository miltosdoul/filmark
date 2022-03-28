import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import MovieControlButton from "./MovieControlButton";
import {
  faArrowsAlt,
  faXmark,
  faEye,
  faEyeSlash,
  faClock,
  faClockRotateLeft,
  faSkull,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Sets movie control icons and corresponding actions based on
 * which page {homepage, watchlist, watched} it is being called from
 * and then sends that data to the MovieControlButton component.
 */
const MovieControls = ({ movie, type }) => {
  const {
    watchlist,
    watched,
    addMovieToWatchlist,
    addMovieToWatched,
    moveToWatched,
    removeMovieFromWatchlist,
    removeMovieFromWatched,
  } = useContext(GlobalContext);

  const [leftButtonState, setLeftButtonState] = useState({
    name: "leftButton",
    clicked: false,
    icons: {
      default: faSkull,
      active: faSkull,
    },
    functions: {
      default: () => console.log("Default leftbutton function"),
      active: () => console.log("Active leftbutton function"),
    },
    title: {
      default: "Default title",
      active: "Active title",
    },
  });
  const [rightButtonState, setRightButtonState] = useState({
    name: "rightButton",
    clicked: false,
    icons: {
      default: faSkull,
      active: faSkull,
    },
    functions: {
      default: () => console.log("Default rightbutton function"),
      active: () => console.log("Active rightbutton function"),
    },
    title: {
      default: "Default title",
      active: "Active title",
    },
  });

  const fetchStreamingInfo = async (m) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${m.id}/watch/providers?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors && data.results) {
          for (const key in data.results) {
            data.results[key].buy && delete data.results[key].buy;
            data.results[key].rent && delete data.results[key].rent;
            data.results[key].link && delete data.results[key].link;
          }
          movie.watchProviders = data.results;
          movie.lastStreamingDataUpdate = Date.now();
        }
      });
  };

  const handleAddToWatchlist = (movie) => {
    fetchStreamingInfo(movie);
    addMovieToWatchlist(movie);
  };

  const handleAddToWatched = (movie) => {
    let isMovieInWatchlist = watchlist.find((o) => o.id == movie.id);

    if (isMovieInWatchlist) {
      moveToWatched(movie);
    } else {
      fetchStreamingInfo(movie);
      addMovieToWatched(movie);
    }
  };

  useEffect(() => {
    if (type == "homepage") {
      setLeftButtonState((state) => ({
        ...state,
        clicked: watchlist.find((o) => o.id == movie.id) ? true : false,
        icons: {
          default: faClock,
          active: faClockRotateLeft,
        },
        functions: {
          default: () => handleAddToWatchlist(movie),
          active: () => removeMovieFromWatchlist(movie.id),
        },
        title: {
          default: "Add to watchlist",
          active: "Remove from watchlist",
        },
      }));
      setRightButtonState((state) => ({
        ...state,
        clicked: watched.find((o) => o.id == movie.id) ? true : false,
        icons: {
          default: faEye,
          active: faEyeSlash,
        },
        functions: {
          default: () => handleAddToWatched(movie),
          active: () => removeMovieFromWatched(movie),
        },
        title: {
          default: "Add to watched",
          active: "Remove from watched",
        },
      }));
    } else if (type == "watchlist") {
      setLeftButtonState((state) => ({
        ...state,
        clicked: watched.find((o) => o.id == movie.id) ? true : false,
        icons: {
          default: faEye,
          active: faEyeSlash,
        },
        functions: {
          default: () => moveToWatched(movie),
          active: () => removeMovieFromWatched(movie),
        },
        title: {
          default: "Move to watched",
          active: "Remove from watched",
        },
      }));
      setRightButtonState((state) => ({
        ...state,
        icons: {
          default: faXmark,
          active: faArrowsAlt,
        },
        functions: {
          default: () => removeMovieFromWatchlist(movie.id),
          active: () => console.log("No-op @ setRightButtonState"),
        },
        title: {
          default: "Remove from watchlist",
          active: "",
        },
      }));
    } else if (type == "watched") {
      setLeftButtonState((state) => ({
        ...state,
        clicked: watchlist.find((o) => o.id == movie.id) ? true : false,
        icons: {
          default: faClock,
          active: faClockRotateLeft,
        },
        functions: {
          default: () => addMovieToWatchlist(movie),
          active: () => removeMovieFromWatchlist(movie.id),
        },
        title: {
          default: "Add to watchlist",
          active: "Remove from watchlist",
        },
      }));
      setRightButtonState((state) => ({
        ...state,
        icons: {
          default: faXmark,
          active: faArrowsAlt,
        },
        functions: {
          default: () => removeMovieFromWatched(movie),
          active: () => console.log("No-op @ setRightButtonState"),
        },
        title: {
          default: "Remove from watched",
          active: "",
        },
      }));
    }
  }, [watchlist, watched]);

  const handleClick = (e) => {
    if (e.currentTarget.id === leftButtonState.name) {
      leftButtonState.clicked
        ? leftButtonState.functions.active()
        : leftButtonState.functions.default();

      setLeftButtonState((state) => ({
        ...state,
        clicked: !state.clicked,
      }));
    } else if (e.currentTarget.id === rightButtonState.name) {
      rightButtonState.clicked
        ? rightButtonState.functions.active()
        : rightButtonState.functions.default();

      setRightButtonState((state) => ({
        ...state,
        clicked: !state.clicked,
      }));
    }
  };

  return (
    <div className="inner-card-controls">
      <MovieControlButton
        buttonState={leftButtonState}
        handleClick={handleClick}
      />
      <MovieControlButton
        buttonState={rightButtonState}
        handleClick={handleClick}
      />
    </div>
  );
};

export default MovieControls;
