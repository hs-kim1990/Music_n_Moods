const axios = require('axios');
const { getSpotifyAccessToken } = require('../services/spotifyService');

// Fetch recommended music list from Spotify
exports.getRecommendations = async (req, res) => {
    try {
      const token = await getSpotifyAccessToken();
  
      // Define a genre mapping for each mood
      const moodGenreMapping = {
        Happy: 'happy',
        Sad: 'sad',
        Tired: 'sleep',
        Anxious: 'ambient'
      };
  
      // Get the genre based on the mood from the query, default to 'pop' if not provided or invalid
      const mood = req.query.genre || 'Happy'; // Default mood if not provided
      const genre = moodGenreMapping[mood] || 'pop';
  
      const response = await axios.get('https://api.spotify.com/v1/recommendations', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          limit: 20,
          seed_genres: genre,
        },
      });
  
      // Filter for tracks with a valid preview_url and limit to 6 tracks
      const validTracks = response.data.tracks.filter(track => track.preview_url).slice(0, 6);
  
      res.json(validTracks);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      res.status(500).json({ message: 'Error fetching recommendations' });
    }
};  
  
exports.getToken = async (req, res) => {
    try {
      const access_token = await getSpotifyAccessToken();
  
      res.json(access_token);
    } catch (error) {
      console.error('Error fetching token:', error);
      res.status(500).json({ message: 'Error fetching token' });
    }
};
