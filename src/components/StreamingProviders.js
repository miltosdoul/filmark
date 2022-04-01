import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const DAY_IN_MSEC = 1000 * 60 * 60 * 24;

const StreamingProviders = ({ movie, movieData, type }) => {
  const { updateMovieInWatchlist, updateMovieInWatched } =
    useContext(GlobalContext);

  useEffect(() => {
    let timeSinceUpdate = Date.now() - movie.lastStreamingDataUpdate;
    fetchStreamingData(timeSinceUpdate);
  }, []);

  const fetchStreamingData = async (currTime) => {
    if (currTime > DAY_IN_MSEC) {
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${process.env.REACT_APP_TMDB_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          //delete unused info
          for (const key in data.results) {
            data.results[key].buy && delete data.results[key].buy;
            data.results[key].rent && delete data.results[key].rent;
            data.results[key].link && delete data.results[key].link;
          }
          movie.watchProviders = data.results;
          movie.lastStreamingDataUpdate = Date.now();

          if (type == "watchlist") {
            updateMovieInWatchlist(movie);
          } else if (type == "watched") {
            updateMovieInWatched(movie);
          }
        });
    }
  };

  if (movieData && movieData.flatrate) {
    return (
      <div className="streaming-wrapper">
        <div className="streaming">
          {movieData.flatrate.length < 5 ? (
            movieData.flatrate.map((s, idx) => (
              <img
                key={idx}
                className="flatrate-icon"
                src={`https://image.tmdb.org/t/p/original${s.logo_path}`}
                alt={s.provider_name}
                title={s.provider_name}
              />
            ))
          ) : (
            <>
              {movieData.flatrate.slice(0, 4).map((s) => (
                <img
                  key={`${movie.id}_${s.logo_path.substr(0, 4)}`}
                  className="flatrate-icon"
                  src={`https://image.tmdb.org/t/p/original${s.logo_path}`}
                  alt={s.provider_name}
                  title={s.provider_name}
                />
              ))}
              <span>...</span>
            </>
          )}
        </div>
      </div>
    );
  } else return <div className="streaming-info">No streaming data</div>;
};

export default StreamingProviders;
