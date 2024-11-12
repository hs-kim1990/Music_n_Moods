const axios = require('axios');
require('dotenv').config();

let accessToken = null;
let tokenExpirationTime = null;

const getSpotifyAccessToken = async () => {
  // Check if the token is still valid
  if (accessToken && new Date() < tokenExpirationTime) {
    return accessToken;
  }

  const authOptions = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
    },
    data: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  };

  try {
    const response = await axios(authOptions);
    accessToken = response.data.access_token;
    tokenExpirationTime = new Date(new Date().getTime() + response.data.expires_in * 1000);
    return accessToken;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw new Error('Unable to authenticate with Spotify');
  }
};

module.exports = { getSpotifyAccessToken };
