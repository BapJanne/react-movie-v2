import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import classes from "./MovieList.module.css";
import MovieDetail from "./MovieDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/fontawesome-free-solid";

const MovieList = (props) => {
  const [moviesData, setMoviesData] = useState([]);
  const [moviesDataPopular, setMoviesDataPopular] = useState([]);
  const [search, setSearch] = useState("");
  const [isMovieDetailOpen, setIsMovieDetailOpen] = useState(false);
  const [movieId, setMovieId] = useState("");
  const [isOnFocus, setIsOnFocus] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=467f311933c076d5b270a36f31a94583&language=en-US`
      )
      .then((res) => setMoviesDataPopular(res.data.results));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search !== "") {
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=467f311933c076d5b270a36f31a94583&query=${search}&language=en-US`
          )
          .then((res) => setMoviesData(res.data.results));
      }
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  const displayData = () => {
    if (search === "") {
      return moviesDataPopular
        .slice(0, 12)
        .map((movie) => (
          <MovieCard
            onUserClick={userClickHandler}
            key={movie.id}
            movie={movie}
            detailOpen={isMovieDetailOpen}
            movieDetailId={movieId}
          />
        ));
    } else {
      return moviesData.length > 0 ? (
        moviesData
          .slice(0, 12)
          .map((movie) => (
            <MovieCard
              onUserClick={userClickHandler}
              key={movie.id}
              movie={movie}
              detailOpen={isMovieDetailOpen}
              movieDetailId={movieId}
            />
          ))
      ) : (
        <p>There is no movie for with this title.</p>
      );
    }
  };

  const userClickHandler = (movieId) => {
    setIsMovieDetailOpen(true);
    setMovieId(movieId);
  };

  const closeHandler = () => {
    setIsMovieDetailOpen(false);
  };

  const focusHandler = () => {
    setIsOnFocus(true);
  };

  const blurHandler = () => {
    setIsOnFocus(false);
  };

  return (
    <div
      className={classes.main}
      onClick={props.showNav ? props.onPageClick : null}
    >
      <FontAwesomeIcon
        icon="fa-solid fa-bars"
        className={classes.burger}
        onClick={props.onBurgerClick}
      />
      <div className={classes.formContainer}>
        <form className={classes.form}>
          <input
            className={`${classes.input} ${
              search.length > 0 || isOnFocus === true
                ? classes.formActive
                : null
            }`}
            type="text"
            id="search-input"
            onChange={(e) => {
              setSearch(e.target.value);
              setIsMovieDetailOpen(false);
            }}
            onFocus={focusHandler}
            onBlur={blurHandler}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className={`${classes.faIcon} ${
              search.length > 0 || isOnFocus === true
                ? classes.faIconActive
                : null
            }`}
          ></FontAwesomeIcon>
        </form>
      </div>
      <div className={classes.movieDetail}>
        <MovieDetail
          movieId={movieId}
          onClose={closeHandler}
          isOpen={isMovieDetailOpen}
        />
      </div>
      <div className={classes.result}>{displayData()}</div>
    </div>
  );
};

export default MovieList;
