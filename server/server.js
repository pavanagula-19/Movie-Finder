// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { handleInvalidSearchQuery, handleNoMoviesFound, handleDataFetchError } = require('./errorHandlers');

const app = express();
const API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = "c2b128a32c9ef1cb8c58d4dcfaa8143a"

app.use(cors());

app.get('/movies', async (req, res) => {
  const { title } = req.query;

  if (!title || title.trim() === '') {
    return handleInvalidSearchQuery(req, res);
  }

  try {
    const response = await axios.get(`${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(title)}`);
    const data = response.data.results;

    if (data.length === 0) {89
      return handleNoMoviesFound(res);
    }

    res.json(data);
  } catch (error) {
    handleDataFetchError(res, error);
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
