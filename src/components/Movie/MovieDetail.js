import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./MovieDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MovieDetail = (props) => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${props.movieId}?api_key=467f311933c076d5b270a36f31a94583&language=en-US`
        )
        .then((res) => setMovieData(res.data));
      setIsLoading(false);
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [props.movieId]);

  const changeDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  };

  const formatRevenue = (revenue) => {
    let result = revenue
      .toString()
      .replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, "$1 ");
    return ` ${result} $`;
  };

  if (isLoading) {
    return <p>Loading ...</p>;
  } else {
    return (
      <section className={classes.movieDetail}>
        <div className={classes.crossContainer}>
          <FontAwesomeIcon
            icon="fa-times"
            className={classes.cross2}
            onClick={props.onClose}
          ></FontAwesomeIcon>
        </div>
        <div className={classes.moviePoster}>
          <img
            alt={movieData.title}
            src={
              movieData.poster_path
                ? "https://image.tmdb.org/t/p/w500/" + movieData.poster_path
                : "./img/noImg.png"
            }
          />
        </div>
        <div className={classes.movieInfos}>
          <FontAwesomeIcon
            icon="fa-times"
            className={classes.cross}
            onClick={props.onClose}
          ></FontAwesomeIcon>
          <h2>{movieData.title}</h2>
          <div className="progressBar">
            <progress max="10" value={movieData.vote_average} />
            {` ${Math.round(movieData.vote_average * 10) / 10} / 10`}
          </div>
          <div>
            <p>
              {movieData.release_date
                ? `Release date : ${changeDate(movieData.release_date)}`
                : "There is no release date for the movie."}
            </p>
          </div>
          <div>
            {movieData.genres ? (
              <ul>
                {movieData.genres.map((el) => (
                  <li key={el.name}>{el.name}</li>
                ))}
              </ul>
            ) : (
              <p>There is not data for the genre of the film.</p>
            )}
          </div>
          <div>
            <p>
              Budget :{" "}
              {movieData.budget
                ? formatRevenue(movieData.budget)
                : " There is no data for the budget of the film"}
            </p>
            <p>
              Revenue :
              {movieData.revenue
                ? formatRevenue(movieData.revenue)
                : " There is no data for the revenue of the film"}
            </p>
          </div>
          <div>
            <p>
              {movieData.overview
                ? movieData.overview
                : "There is no overview for this movie"}
            </p>
          </div>
        </div>
      </section>
    );
  }
};

export default MovieDetail;
