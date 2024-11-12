import React from 'react';

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
}

const moods = [
  {
    name: 'Happy',
    image: 'https://images.unsplash.com/photo-1520483691742-bada60a1edd6?auto=format&fit=crop&q=80&w=400',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    name: 'Calm',
    image: 'https://images.unsplash.com/photo-1499988921418-b7df40ff03f9?auto=format&fit=crop&q=80&w=400',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    name: 'Energetic',
    image: 'https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?auto=format&fit=crop&q=80&w=400',
    color: 'from-red-500 to-pink-500'
  },
  {
    name: 'Melancholic',
    image: 'https://images.unsplash.com/photo-1516410529446-2c777cb7366d?auto=format&fit=crop&q=80&w=400',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    name: 'Focused',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400',
    color: 'from-green-500 to-emerald-600'
  },
  {
    name: 'Romantic',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400',
    color: 'from-pink-400 to-rose-500'
  }
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">How are you feeling?</h2>
        <p className="text-gray-300">Select the mood that best matches your current state</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {moods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => onMoodSelect(mood.name)}
            className="group relative overflow-hidden rounded-xl aspect-square transition-transform hover:scale-105"
          >
            <img
              src={mood.image}
              alt={mood.name}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${mood.color} opacity-60 group-hover:opacity-80 transition-opacity`} />
            <span className="absolute bottom-4 left-4 text-xl font-bold text-white">
              {mood.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;