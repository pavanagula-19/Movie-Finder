const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = "c2b128a32c9ef1cb8c58d4dcfaa8143a"

app.use(cors());

app.get('/movies', async (req, res) => {
  const { title } = req.query;
  try {
    const response = await axios.get(`${API_URL}?api_key=${API_KEY}&query=${title}`);
    const data = response.data.results;
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

const PORT = 5000; // You can change this to any available port you prefer

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
