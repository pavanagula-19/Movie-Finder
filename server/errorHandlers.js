
function handleInvalidSearchQuery(req, res) {
    res.status(400).json({ error: 'Please provide a valid movie title' });
  }
  
  function handleNoMoviesFound(res) {
    res.status(404).json({ error: 'No movies found for the given title' });
  }
  
  function handleDataFetchError(res, error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
  
  module.exports = {
    handleInvalidSearchQuery,
    handleNoMoviesFound,
    handleDataFetchError,
  };
  