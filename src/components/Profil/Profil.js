import React, { useContext, useState } from "react";
import MovieProfilContext from "../../store/movieProfil-context";
import MovieCard from "../Movie/MovieCard";
import MovieDetail from "../Movie/MovieDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./Profil.module.css";

const Profil = (props) => {
  const ctx = useContext(MovieProfilContext);

  const [isMovieDetailOpen, setIsMovieDetailOpen] = useState(false);
  const [movieId, setMovieId] = useState("");

  const userClickHandler = (movieId) => {
    setIsMovieDetailOpen(true);
    setMovieId(movieId);
  };

  const closeHandler = (movieId) => {
    setIsMovieDetailOpen(false);
  };

  const displayMovieCard = () => {
    if (ctx.movies.length > 0) {
      return ctx.movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onUserClick={userClickHandler}
          />
        );
      });
    } else {
      return <p>There is no movie in your profil</p>;
    }
  };

  return (
    <section
      className={classes.profil}
      onClick={props.showNav ? props.onPageClick : null}
    >
      <FontAwesomeIcon
        icon="fa-solid fa-bars"
        className={classes.burger}
        onClick={props.onBurgerClick}
      />
      <div className={classes.movieDetail}>
        {isMovieDetailOpen ? (
          <MovieDetail movieId={movieId} onClose={closeHandler} />
        ) : null}
      </div>
      <div>
        <ul className={classes.profilContainer}>{displayMovieCard()}</ul>
      </div>
    </section>
  );
};

export default Profil;
