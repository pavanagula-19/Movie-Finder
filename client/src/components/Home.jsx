import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./Home.css";
import SearchIcon from "../components/search.svg";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_URL = "https://movie-finder-server-jh7a.onrender.com/movies"; // Update with your server URL

  const searchMovies = async (title, page) => {
    try {
      const response = await fetch(`${API_URL}?title=${title}&page=${page}`);
      const data = await response.json();
      setMovies(data.results);
      setCurrentPage(data.current_page);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      searchMovies(searchTerm, 1);
    }
  }, [searchTerm]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      searchMovies(searchTerm, currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      searchMovies(searchTerm, currentPage + 1);
    }
  };

  return (
    <div className="app">
      <h1>MOVIE SEARCHING APPLICATION</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            setMovies([]);
            searchMovies(searchTerm, 1);
          }}
        />
      </div>
      {movies.length > 0 ? (
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
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default Home;
