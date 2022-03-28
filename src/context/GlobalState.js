import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
  currSearch: {},
  popularMovies: { lastDataUpdate: 0 },
  region: "GR",
  regions: [
    "AE",
    "AR",
    "AT",
    "AU",
    "BE",
    "BG",
    "BO",
    "BR",
    "CA",
    "CH",
    "CL",
    "CO",
    "CR",
    "CZ",
    "DE",
    "DK",
    "EC",
    "EE",
    "EG",
    "ES",
    "FI",
    "FR",
    "GB",
    "GF",
    "GR",
    "GT",
    "HK",
    "HN",
    "HR",
    "HU",
    "ID",
    "IE",
    "IN",
    "IS",
    "IT",
    "JP",
    "KR",
    "LI",
    "LT",
    "LV",
    "MC",
    "MX",
    "MY",
    "NL",
    "NO",
    "NZ",
    "PA",
    "PE",
    "PH",
    "PL",
    "PT",
    "PY",
    "RU",
    "SA",
    "SE",
    "SG",
    "SK",
    "SV",
    "TH",
    "TR",
    "TW",
    "US",
    "UY",
    "VE",
    "ZA",
  ],
};

// create context
const GlobalContext = createContext(initialState);

// provider component
const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  // actions
  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  //update streaming providers in watchlist (24h TTL)
  const updateMovieInWatchlist = (movie) => {
    dispatch({ type: "UPDATE_MOVIE_IN_WATCHLIST", payload: movie });
  };

  const removeMovieFromWatchlist = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };

  const addMovieToWatched = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  };

  //update streaming providers in watched (24h TTL)
  const updateMovieInWatched = (movie) => {
    dispatch({ type: "UPDATE_MOVIE_IN_WATCHED", payload: movie });
  };

  const moveToWatchlist = (movie) => {
    dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
  };

  const moveToWatched = (movie) => {
    dispatch({ type: "MOVE_TO_WATCHED", payload: movie });
  };

  const removeMovieFromWatched = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHED", payload: id });
  };

  //save previous search results
  const saveSearchToState = (dataObj) => {
    dispatch({ type: "SAVE_SEARCH_TO_STATE", payload: dataObj });
  };

  const setActiveRegion = (newRegion) => {
    dispatch({ type: "SET_ACTIVE_REGION", payload: newRegion });
  };

  //cache popular movies (30min TTL)
  const savePopularToState = (popularMovies) => {
    dispatch({ type: "SAVE_POPULAR_TO_STATE", payload: popularMovies });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        currSearch: state.currSearch,
        region: state.region,
        regions: state.regions,
        popularMovies: state.popularMovies,
        addMovieToWatchlist,
        updateMovieInWatchlist,
        removeMovieFromWatchlist,
        addMovieToWatched,
        updateMovieInWatched,
        moveToWatchlist,
        moveToWatched,
        removeMovieFromWatched,
        saveSearchToState,
        setActiveRegion,
        savePopularToState,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export { GlobalContext, GlobalProvider };
