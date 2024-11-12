// routes/spotify.js
const express = require('express');
const { getRecommendations, getToken } = require('../controllers/spotifyController');

const router = express.Router();

router.get('/recommendations', getRecommendations);
router.get('/token', getToken);

module.exports = router;
