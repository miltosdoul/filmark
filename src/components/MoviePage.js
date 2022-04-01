import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import placeholderProfileImg from "../assets/blank-profile-picture.png";

const MoviePage = () => {
  const [movieData, setMovieData] = useState({});
  const [movieRecommendations, setMovieRecommendations] = useState({});
  const [movieCast, setCast] = useState({});
  const [directors, setDirectors] = useState([]);
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll(".cast-crew").forEach((el) => el.scrollTo(0, 0));

    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=videos,images`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieData(data);
        document.title = data.title + " | filmark" || "Movie not found...";

        return fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
        );
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then((data) => {
        setCast(data);
      })
      .catch((err) => {
        console.warn(err);
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieRecommendations(data);
      });

    setLoading(false);
  }, [id]);

  useEffect(() => {
    setDirectors([]);

    movieCast.crew &&
      movieCast.crew.forEach((obj) => {
        if (obj.job === "Director") {
          setDirectors((state) => [...state, obj.name]);
        }
      });
  }, [movieCast]);

  return (
    <>
      <div className="wrapper">
        {movieData?.images?.backdrops[0]?.file_path && (
          <div
            className="bgimg"
            style={{
              backgroundImage: `
              linear-gradient(
                90deg,
                rgb(2, 24, 43) 0,
                rgba(2, 24, 43,.986) .97%,
                rgba(2, 24, 43,.945) 2.07833333%,
                rgba(2, 24, 43,.883) 3.29666667%,
                rgba(2, 24, 43,.803) 4.60166667%,
                rgba(2, 24, 43,.711) 5.96666667%,
                rgba(2, 24, 43,.61) 7.365%,
                rgba(2, 24, 43,.504) 8.77166667%,
                rgba(2, 24, 43,.398) 10.16%,
                rgba(2, 24, 43,.296) 11.505%,
                rgba(2, 24, 43,.203) 12.78%,
                rgba(2, 24, 43,.122) 13.95833333%,
                rgba(2, 24, 43,.059) 15.01666667%,
                rgba(2, 24, 43,.016) 15.92833333%,
                rgba(2, 24, 43,0) 16.66666667%,
                rgba(2, 24, 43,0) 83.33333333%,
                rgba(2, 24, 43,.016) 84.07166667%,
                rgba(2, 24, 43,.059) 84.98333333%,
                rgba(2, 24, 43,.122) 86.04166667%,
                rgba(2, 24, 43,.203) 87.22%,
                rgba(2, 24, 43,.296) 88.495%,
                rgba(2, 24, 43,.398) 89.84%,
                rgba(2, 24, 43,.504) 91.22833333%,
                rgba(2, 24, 43,.61) 92.635%,
                rgba(2, 24, 43,.711) 94.03333333%,
                rgba(2, 24, 43,.803) 95.39833333%,
                rgba(2, 24, 43,.883) 96.70333333%,
                rgba(2, 24, 43,.945) 97.92166667%,
                rgba(2, 24, 43,.986) 99.03%,
                rgb(2, 24, 43)
              ),
              linear-gradient(
                0deg,
                rgb(2, 24, 43) -10%,
                rgb(2, 24, 43) 16.48148148%,
                rgba(2, 24, 43,.986) 18.63703704%,
                rgba(2, 24, 43,.945) 21.1%,
                rgba(2, 24, 43,.883) 23.80740741%,
                rgba(2, 24, 43,.803) 26.70740741%,
                rgba(2, 24, 43,.711) 29.74074074%,
                rgba(2, 24, 43,.61) 32.84814815%,
                rgba(2, 24, 43,.504) 35.97407407%,
                rgba(2, 24, 43,.398) 39.05925926%,
                rgba(2, 24, 43,.296) 42.04814815%,
                rgba(2, 24, 43,.203) 44.88148148%,
                rgba(2, 24, 43,.122) 47.5%,
                rgba(2, 24, 43,.059) 49.85185185%,
                rgba(2, 24, 43,.016) 51.87777778%,
                rgba(2, 24, 43,0) 53.51851852%
              ),
      url("https://image.tmdb.org/t/p/w1280${movieData.images.backdrops[0].file_path}")`,
            }}
          ></div>
        )}
      </div>

      <div className="movie-page">
        <div className="container movie-container">
          <div className="header header2">
            {movieData.release_date && movieData.poster_path && (
              <>
                <div
                  className="movie-wrapper"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    className="movie-image"
                    src={`https://image.tmdb.org/t/p/w300/${movieData.poster_path}`}
                    style={{ borderRadius: "10px" }}
                    alt="movie poster"
                  />
                  <div
                    className="buttons"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      width: "80%",
                    }}
                  ></div>
                </div>
                <div className="text-desc-wrapper">
                  <div className="text">
                    <h1 className="heading movie-title">
                      {movieData.original_title == movieData.title
                        ? movieData.original_title
                        : `${movieData.original_title} (${movieData.title})`}
                    </h1>

                    <p>
                      {movieData.release_date.match(/\d{4}/)} 🞄{" "}
                      {movieData.genres.map((genre, idx) => {
                        if (idx + 1 == movieData.genres.length) {
                          return <span key={idx}>{genre.name}</span>;
                        } else {
                          return <span key={idx}>{genre.name}, </span>;
                        }
                      })}
                    </p>

                    {directors.length > 1 ? (
                      <p>
                        Directed by{" "}
                        {directors.map((dir, idx) => {
                          if (idx == directors.length - 1) {
                            return <span key={idx}>{dir}</span>;
                          } else {
                            return <span key={idx}>{dir}, </span>;
                          }
                        })}
                      </p>
                    ) : (
                      <p
                        style={{
                          margin: "0.3rem 0",
                          color: "#cfcfcf",
                          fontWeight: 300,
                        }}
                      >
                        Directed by <span>{directors[0]}</span>
                      </p>
                    )}
                    {movieCast.cast && (
                      <p
                        style={{
                          margin: "0.3rem 0",
                          color: "#cfcfcf",
                          fontWeight: 300,
                          maxWidth: "350px",
                        }}
                      >
                        Starring{" "}
                        {movieCast.cast
                          .slice(0, 3)
                          .map((cast, idx) =>
                            idx == 2 ? (
                              <span key={idx}>{cast.name}</span>
                            ) : (
                              <span key={idx}>{cast.name}, </span>
                            )
                          )}
                      </p>
                    )}
                    <p>
                      <span style={{ color: "gold" }}>
                        {movieData.vote_average}
                      </span>
                      /10
                    </p>
                  </div>
                  <p className="desc">{movieData.overview} </p>
                </div>
              </>
            )}
          </div>
          {movieCast?.cast?.length > 0 && !isLoading && (
            <section className="cast">
              <h2>Cast:</h2>
              <div className="scroller cast-crew">
                {movieCast.cast.slice(0, 30).map((member, idx) => (
                  <div className="person-profile" key={idx}>
                    <img
                      src={
                        member.profile_path
                          ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                          : placeholderProfileImg
                      }
                      alt="cast-img"
                      className="person-profile-img"
                    ></img>
                    <div className="personname">
                      <a className="person" href="#">
                        {member.name}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {movieRecommendations?.results?.length > 0 && !isLoading && (
            <section className="recommendations">
              <h2>More like this:</h2>
              <div className="scroller movie-recommendations-scroller">
                {movieRecommendations.results.map((movie) => {
                  return (
                    <Link
                      to={`/movie/${movie.id}`}
                      className="recomm-movie-image__link"
                      key={movie.id}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={`${movie.title} Poster`}
                        className="recomm-movie-image"
                      />
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default MoviePage;
