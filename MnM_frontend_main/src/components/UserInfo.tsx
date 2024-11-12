import React, { useState, useEffect } from 'react';
import { Clock, User } from 'lucide-react';

interface UserInfoProps {
  onSubmit: (info: {
    age: string;
    gender: string;
    time: string;
  }) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    time: ''
  });

  useEffect(() => {
    const now = new Date();
    setFormData(prev => ({
      ...prev,
      time: now.toLocaleTimeString()
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white/10 p-8 rounded-xl backdrop-blur-sm">
      <h2 className="text-3xl font-bold mb-6 text-center">Tell us about yourself</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Age</label>
          <input
            type="number"
            required
            min="13"
            max="120"
            value={formData.age}
            onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
            className="w-full px-4 py-2 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <select
            required
            value={formData.gender}
            onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
            className="w-full px-4 py-2 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 text-gray-300">
          <Clock className="w-5 h-5" />
          <span>Current time: {formData.time}</span>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default UserInfo;