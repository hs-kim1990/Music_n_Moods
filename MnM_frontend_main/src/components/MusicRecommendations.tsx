import React, { useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import happy from '../assets/images/happy.png';
import tired from '../assets/images/tired.png';
import sad from '../assets/images/sad.png';
import anxious from '../assets/images/anxious.png';
import axios from 'axios';

interface UserInfo {
  age: string;
  gender: string;
  time?: string;
}

interface MusicRecommendationsProps {
  userInfo: UserInfo;
  moodState: {
    finalMood: string;
    moodScores: { Happy: number; Tired: number; Sad: number; Anxious: number };
  };
}

const MusicRecommendations: React.FC<MusicRecommendationsProps> = ({ moodState }) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [_accessToken, setAccessToken] = useState<string | null>(null); // State to hold the token
  const [audio, setAudio] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true); // New state for loading recommendations
  const [loadingScreen, setLoadingScreen] = useState(true); // State to control loading screen
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const moodImages: Record<string, string> = {
    Happy: happy,
    Sad: sad,
    Anxious: anxious,
    Tired: tired,
  };

  const moodScores = [
    { mood: 'Happy', score: moodState.moodScores.Happy, color: 'bg-green-500/40 hover:bg-green-500/60' },
    { mood: 'Tired', score: moodState.moodScores.Tired, color: 'bg-blue-500/40 hover:bg-blue-500/60' },
    { mood: 'Sad', score: moodState.moodScores.Sad, color: 'bg-purple-500/40 hover:bg-purple-500/60' },
    { mood: 'Anxious', score: moodState.moodScores.Anxious, color: 'bg-red-500/40 hover:bg-red-500/60' },
  ];

  useEffect(() => {
    // Fetch the Spotify access token and recommendations once
    const fetchMusicData = async () => {
      try {
        const tokenResponse = await axios.get('http://localhost:3000/spotify/token');
        const token = tokenResponse.data;
        setAccessToken(token);

        // Fetch recommendations only after the token is received
        const recommendationsResponse = await axios.get(`http://localhost:3000/spotify/recommendations?genre=${moodState.finalMood.toLowerCase()}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecommendations(recommendationsResponse.data);
        setLoadingRecommendations(false); // Hide the loading indicator once data is fetched

        // Set a delay of 1.5 second before showing the recommendations
        setTimeout(() => {
          setLoadingScreen(false); // Hide loading screen after 1 second delay
        }, 1500);
      } catch (error) {
        console.error('Error fetching music data:', error);
        setLoadingRecommendations(false); // Hide the loading indicator on error
        setLoadingScreen(false); // Hide loading screen on error
      }
    };

    fetchMusicData();
  }, [moodState.finalMood]);

  const handlePlayPause = (track: any) => {
    if (!track.preview_url) {
      console.error('No preview URL available for this track');
      return;
    }

    if (audio) {
      audio.pause();
      if (isPlaying && currentTrack?.id === track.id) {
        setIsPlaying(false);
        setCurrentTrack(null);
        return;
      }
    }

    setLoading(true);
    const newAudio = new Audio(track.preview_url);

    newAudio.onloadeddata = () => {
      setLoading(false);
      newAudio.play().then(() => {
        setAudio(newAudio);
        setCurrentTrack(track);
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Error playing the track:', error);
        setLoading(false);
      });
    };

    newAudio.onended = () => {
      setIsPlaying(false);
      setCurrentTrack(null);
    };
  };

  const handleFeedback = () => {
    setFeedbackGiven(true);
  };

  return (
    <div className="flex flex-col h-full text-white space-y-4">
      {/* Loading Screen with 1-second delay */}
      {loadingScreen && (
        <div className="max-w-lg mx-auto text-center h-[70vh] flex flex-col justify-center items-center">
          <h2 className="text-4xl font-extrabold text-white animate-fadeIn mb-2">Hold tight!</h2>
          <p className="text-lg text-white/80 max-w-md mx-auto mb-6">
            Your personalized music recommendations are being created just for you. We’re almost there!
          </p>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            <div className="text-lg text-white">Loading...</div>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-16">
            <div className="text-4xl text-white/80 animate-bounce">😊</div>
            <div className="text-4xl text-red-500 animate-pulse">💖</div>
            <div className="text-4xl text-white/80 animate-bounce">😊</div>
          </div>
        </div>
      )}

      {/* Recommendations Page */}
      {!loadingScreen && (
        <div>
          <div className="mb-4 flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <img
                src={moodImages[moodState?.finalMood] || moodImages.Happy}
                alt="Mood Character"
                className="w-20 object-cover transform transition-transform scale-125"
                loading="lazy"
              />
              <div>
                <h2 className="text-2xl font-semibold mb-2">Your Current Mood: {moodState.finalMood}</h2>
                <div className="flex space-x-4">
                  {moodScores.map(({ mood, score, color }) => (
                    <div key={mood} className="flex flex-col items-center">
                      <div className={`relative w-12 h-12 ${color} transition-all duration-200 flex items-center justify-center rounded-full border-2 border-gray-600/50`}>
                        <span className={`text-xs font-bold`}>{score}%</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{mood}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-left text-md font-medium text-white/80 mb-2">Here are some tunes to match your mood:</p>

          <div className="flex flex-col px-4 space-y-4 sm:max-h-[70vh] overflow-y-auto">
            {loadingRecommendations ? (
              <div className="text-center text-white">Loading recommendations...</div>
            ) : (
              recommendations.map((track) => (track.preview_url &&
                <div key={track.id} className="flex items-center p-4 bg-gray-800/10 rounded-lg shadow-md backdrop-blur-md hover:shadow-lg">
                  <img
                    src={track.album.images[0]?.url}
                    alt={track.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-semibold">{track.name}</h3>
                    <p className="text-gray-200/60">{track.artists[0]?.name}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePlayPause(track)}
                      className="p-2 rounded-full bg-yellow-600 hover:bg-yellow-500 transition-all duration-200"
                    >
                      {loading && currentTrack?.id === track.id ? (
                        <span className="loader">Loading...</span>
                      ) : isPlaying && currentTrack?.id === track.id ? (
                        <Pause size={24} />
                      ) : (
                        <Play size={24} />
                      )}
                    </button>

                    <button
                      onClick={() => window.open(track.external_urls.spotify, '_blank')}
                      className="p-2 rounded-full bg-[#1DB954] hover:bg-[#1ED760] transition-all"
                    >
                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z"/></svg>
                    </button>

                  </div>
                </div>
              ))
            )}
          </div>

          {feedbackGiven ? (
            <div className="fixed bottom-4 right-4 flex justify-center">
              <div className="flex items-center space-x-2 px-4 py-2">
                <div className="text-md font-semibold animate-fade-in-out text-yellow-300">
                  Thank you for your feedback! 😊
                </div>
              </div>
            </div>
          ) : (
            <div className="fixed bottom-4 right-4 flex justify-center">
              <div className="flex items-center space-x-2 py-2 px-4 bg-primary rounded-lg shadow-lg backdrop-blur-md">
                <div className="flex flex-col items-center">
                  <h3 className="text-md font-semibold mb-2">How's your playlist?</h3>
                  <div className="flex space-x-2">
                    {['😢', '😕', '😐', '🙂', '😍'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={handleFeedback}
                        className="text-xl transition transform hover:scale-110 hover:text-yellow-300"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MusicRecommendations;
