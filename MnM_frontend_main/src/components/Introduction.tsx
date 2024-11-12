import React from 'react';
import { ArrowRight, Music } from 'lucide-react';

interface IntroductionProps {
  onStart: () => void;
}

const Introduction: React.FC<IntroductionProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-10 py-4 text-yellow-100">
      <div>
        {/* Logo and Title */}
        <div className="flex items-center justify-center animate-pulse mb-4">
          <Music className="w-16 h-16 text-yellow-400 mr-4 sm:mr-6" />
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-300">
            Music & Mood
          </h1>
        </div>
        {/* Description */}
        <p className="text-xl max-w-2xl mx-auto font-medium text-yellow-200 leading-relaxed">
          Discover music that resonates with your emotions. Let us guide you to the perfect soundtrack for your mood and uplift your spirit.
        </p>
      </div>
      
      {/* Steps to Use the App */}
      <div className="space-y-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-yellow-300">How it works:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-brown-700/20 p-6 rounded-lg shadow-md transform transition duration-300 hover:bg-brown-600/30 hover:shadow-xl">
            <div className="text-lg font-semibold text-yellow-300 mb-2">1. Tell us about you</div>
            <p className="text-sm text-yellow-200">Quick questions to understand your unique preferences.</p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-brown-700/20 p-6 rounded-lg shadow-md transform transition duration-300 hover:bg-bg-brown-600/30 hover:shadow-xl">
            <div className="text-lg font-semibold text-yellow-300 mb-2">2. Share your mood</div>
            <p className="text-sm text-yellow-200">Choose the emotion that best describes how you feel.</p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-brown-700/20 p-6 rounded-lg shadow-md transform transition duration-300 hover:bg-brown-600/30 hover:shadow-xl">
            <div className="text-lg font-semibold text-yellow-300 mb-2">3. Get recommendations</div>
            <p className="text-sm text-yellow-200">Receive personalized music suggestions just for you.</p>
          </div>
        </div>
      </div>
      
      {/* Start Button */}
      <button
        onClick={onStart}
        className="mt-8 px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full text-lg font-semibold text-brown-900 flex items-center justify-center space-x-2 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <span>Get Started</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Introduction;
