import React, { useContext } from "react";
import MovieProfilContext from "../../store/movieProfil-context";
import classes from "./MovieCard.module.css";

const MovieCard = (props) => {
  const ctx = useContext(MovieProfilContext);

  const addToProfilHandler = () => {
    ctx.addMovie(props.movie);
  };

  const removeToProfilHandler = () => {
    ctx.removeMovie(props.movie);
  };

  return (
    <div
      className={`${classes.card} ${
        props.detailOpen && props.movieDetailId === props.movie.id
          ? classes.cardActive
          : null
      }`}
    >
      <img
        className={classes.img}
        src={
          props.movie.poster_path
            ? "https://image.tmdb.org/t/p/w500" + props.movie.poster_path
            : "./img/noImg.png"
        }
        alt="poster film"
        onClick={() => {
          props.onUserClick(props.movie.id);
        }}
      />
      <h2 className={classes.title}>{props.movie.title}</h2>
      <div className={classes.btnContainer}>
        {ctx.movies.filter((movie) => movie.id === props.movie.id).length >
        0 ? (
          <div
            onClick={removeToProfilHandler}
            className={`${classes.btn} ${classes.remove}`}
          >
            Remove
          </div>
        ) : (
          <div
            onClick={addToProfilHandler}
            className={`${classes.btn} ${classes.add}`}
          >
            Add
          </div>
        )}
        <div
          className={`${classes.btn} ${classes.more}`}
          onClick={() => {
            props.onUserClick(props.movie.id);
          }}
        >
          More
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
