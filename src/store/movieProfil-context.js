import React from "react";

const MovieProfilContext = React.createContext({
  movies: [],
  addMovie: (movieInfo) => {},
  removeMovie: (movieInfo) => {},
});

export default MovieProfilContext;
