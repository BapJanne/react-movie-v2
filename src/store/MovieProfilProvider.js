import React, { useState } from "react";
import MovieProfilContext from "./movieProfil-context";

const MovieProfilProvider = (props) => {
  const [moviesListCtx, setMovieListCtx] = useState([]);

  const addMovieHandler = (movieInfo) => {
    setMovieListCtx((previousState) => {
      return [...previousState, movieInfo];
    });
  };

  const removeMovieHandler = (movieInfo) => {
    setMovieListCtx((previousState) => {
      return previousState.filter((movie) => movie.id !== movieInfo.id);
    });
  };

  const movieProfilContext = {
    movies: moviesListCtx,
    addMovie: addMovieHandler,
    removeMovie: removeMovieHandler,
  };

  return (
    <MovieProfilContext.Provider value={movieProfilContext}>
      {props.children}
    </MovieProfilContext.Provider>
  );
};

export default MovieProfilProvider;
