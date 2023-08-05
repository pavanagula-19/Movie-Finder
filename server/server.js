// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { handleInvalidSearchQuery, handleNoMoviesFound, handleDataFetchError } = require('./errorHandlers');

const app = express();
const API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = "c2b128a32c9ef1cb8c58d4dcfaa8143a";
const PAGE_SIZE = 10; // Number of movies to show per page

app.use(cors());

app.get('/movies', async (req, res) => {
  const { title, page } = req.query;
  const pageNum = parseInt(page, 10) || 1;

  if (!title || title.trim() === '') {
    return handleInvalidSearchQuery(req, res);
  }

  try {
    const response = await axios.get(`${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(title)}&page=${pageNum}`);
    const data = response.data.results;

    if (data.length === 0) {
      return handleNoMoviesFound(res);
    }

    // Calculate total number of pages
    const totalPages = Math.ceil(data.length / PAGE_SIZE);

    // Get the movies for the current page
    const startIndex = (pageNum - 1) * PAGE_SIZE;
    const endIndex = pageNum * PAGE_SIZE;
    const moviesToShow = data.slice(startIndex, endIndex);

    res.json({ total_pages: totalPages, current_page: pageNum, results: moviesToShow });
  } catch (error) {
    handleDataFetchError(res, error);
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
