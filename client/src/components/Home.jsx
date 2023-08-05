import React, { useState } from "react";
import MovieCard from "./MovieCard";
import "./Home.css";
import SearchIcon from "../components/search.svg";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = "c2b128a32c9ef1cb8c58d4dcfaa8143a";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}?api_key=${API_KEY}&query=${title}`);
    const data = await response.json();
  
    setMovies(data.results);
  };
  

  return (
    <div className="app">
      <h1>MovieFinder</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              searchMovies(searchTerm);
            }
          }}
        />

        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default Home;