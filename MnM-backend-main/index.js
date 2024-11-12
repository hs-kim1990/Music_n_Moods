// index.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const spotifyRoutes = require('./routes/spotify');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Use env variable or default to localhost
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.json());

// Root route for basic status check
app.get('/', (req, res) => {
  res.send('Welcome to the Spotify Integration API');
});

app.use('/auth', authRoutes);
app.use('/spotify', spotifyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
