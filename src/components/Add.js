import React, { useState, useEffect, useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";
import ResultCard from "./ResultCard";

const Add = () => {
  const { saveSearchToState, currSearch } = useContext(GlobalContext);
  const [query, setQuery] = useState(currSearch.query ? currSearch.query : "");
  const [results, setResults] = useState(
    currSearch.results ? currSearch.results : []
  );
  const [lastSearch, setLastSearch] = useState("");
  const queryRef = useRef();
  const resultsRef = useRef();

  queryRef.current = query;
  resultsRef.current = results;

  const inputRef = useRef();

  const handleKeyDown = (e) => {
    //Press "/" to focus search bar.
    if (e.keyCode === 191) {
      e.preventDefault();
      inputRef.current.focus();
    }
    //On "Enter" press, check that search query is not empty string or same as last search
    //and that search bar has focus.
    if (
      e.keyCode === 13 &&
      document.activeElement == inputRef.current &&
      queryRef.current.length > 0 &&
      queryRef.current !== lastSearch
    ) {
      e.preventDefault();
      setLastSearch(queryRef.current);
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${queryRef.current}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.errors) {
            setResults(data.results);
          } else {
            setResults([]);
          }
        });
    }
  };

  useEffect(() => {
    document.title = "Search | filmark";
    document.addEventListener("keydown", handleKeyDown);

    const cacheToFalseTimeout = setTimeout(() => {
      if (currSearch.hasCached) {
        currSearch.hasCached = false;
      }
    }, 600);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(cacheToFalseTimeout);

      let retObj = {
        query: queryRef.current,
        results: resultsRef.current,
        hasCached: true,
      };
      saveSearchToState(retObj);
    };
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={onChange}
            />
          </div>
          {results.length > 0 ? (
            <ul className="results">
              {results.map((movie) => (
                <li key={movie.id}>
                  <ResultCard movie={movie} />
                </li>
              ))}
            </ul>
          ) : (
            <h1>No results</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Add;
