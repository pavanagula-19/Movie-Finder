import React from "react";

const MovieCard = ({ movie }) => {
  const posterBaseUrl = "https://image.tmdb.org/t/p/";
  const posterSize = "w500";

  return (
    <div className="movie-card">
      <div className="movie-image">
        <img
          src={
            movie.poster_path
              ? `${posterBaseUrl}${posterSize}${movie.poster_path}`
              : "https://via.placeholder.com/400"
          }
          alt={movie.title}
        />
      </div>
      <div className="movie-content">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-description">{movie.overview}</p>
        <p className="movie-release-date">Released Date: {movie.release_date}</p>
        <p className="movie-ratings">Ratings: {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCard;
