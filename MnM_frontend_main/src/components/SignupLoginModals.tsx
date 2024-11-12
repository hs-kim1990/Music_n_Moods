import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Loader2, User, Lock, CheckCircle, AlertCircle } from 'lucide-react';

export const SignupModal = ({ isOpen, onRequestClose, onSwitchToLogin }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setUsername('');
      setPassword('');
      setBirthDate('');
      setGender('');
      setMessage('');
    }
  }, [isOpen]);

  const handleSignup = async () => {
    setIsLoading(true);
    const response = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, birthDate, gender }),
    });
    const data = await response.json();
    setMessage(data.message || 'Signup successful!');
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onRequestClose}>
      <DialogContent className="bg-brown-800 text-yellow-200 rounded-lg shadow-lg p-6 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-yellow-400 text-2xl font-semibold flex items-center">
            <User className="mr-2" /> Create Account
          </DialogTitle>
          <DialogDescription className="text-yellow-300 mb-4">Join MnM and elevate your mood with music</DialogDescription>
        </DialogHeader>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Full name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-yellow-400 bg-brown-900 rounded-md text-yellow-300 placeholder-yellow-500 focus:border-yellow-500 transition-all"
          />
        </div>

        <div className="mb-3">
          <input
            type="date"
            placeholder="Birth Date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-2 border border-yellow-400 bg-brown-900 rounded-md text-yellow-300 placeholder-yellow-500 focus:border-yellow-500 transition-all"
          />
        </div>

        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-4">
              <button
                className={`px-4 py-2 rounded-md ${gender === 'Male' ? 'bg-yellow-500 text-white' : 'bg-brown-900 text-yellow-300'} transition-colors`}
                onClick={() => setGender('Male')}
              >
                Male
              </button>
              <button
                className={`px-4 py-2 rounded-md ${gender === 'Female' ? 'bg-yellow-500 text-white' : 'bg-brown-900 text-yellow-300'} transition-colors`}
                onClick={() => setGender('Female')}
              >
                Female
              </button>
              <button
                className={`px-4 py-2 rounded-md ${gender === 'Non-binary' ? 'bg-yellow-500 text-white' : 'bg-brown-900 text-yellow-300'} transition-colors`}
                onClick={() => setGender('Non-binary')}
              >
                Non-binary
              </button>
              <button
                className={`px-4 py-2 rounded-md ${gender === 'Prefer not to say' ? 'bg-yellow-500 text-white' : 'bg-brown-900 text-yellow-300'} transition-colors`}
                onClick={() => setGender('Prefer not to say')}
              >
                Prefer not to say
              </button>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-yellow-400 bg-brown-900 rounded-md text-yellow-300 placeholder-yellow-500 focus:border-yellow-500 transition-all"
          />
        </div>

        <button
          onClick={handleSignup}
          className={`w-full py-2 ${isLoading ? 'bg-yellow-500/80' : 'bg-yellow-500'} hover:bg-yellow-600 rounded-md text-white font-semibold transition-colors`}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Sign Up'}
        </button>

        {message && (
          <p
            className={`text-center text-sm p-2 rounded-md ${
              message.includes('successful')
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {message.includes('successful') ? <CheckCircle className="inline mr-2" /> : <AlertCircle className="inline mr-2" />}
            {message}
          </p>
        )}

        <div className="text-center">
          <button
            onClick={onSwitchToLogin}
            className="text-yellow-300 hover:text-yellow-400 transition-colors"
          >
            Already have an account? Login
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const LoginModal = ({ isOpen, onRequestClose, onLoginSuccess, onSwitchToSignup }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setUsername('');
      setPassword('');
      setMessage('');
    }
  }, [isOpen]);

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage('Login successful!');
      onLoginSuccess(data.user);
      onRequestClose();
    } else {
      setMessage(data.message || 'Login failed.');
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onRequestClose}>
      <DialogContent className="bg-brown-800 text-yellow-200 rounded-lg shadow-lg p-6 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-yellow-400 text-2xl font-semibold flex items-center">
            <Lock className="mr-2" /> Login
          </DialogTitle>
          <DialogDescription className="text-yellow-300 mb-4">Access your MnM account</DialogDescription>
        </DialogHeader>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Full name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-yellow-400 bg-brown-900 rounded-md text-yellow-300 placeholder-yellow-500 focus:border-yellow-500 transition-all"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-yellow-400 bg-brown-900 rounded-md text-yellow-300 placeholder-yellow-500 focus:border-yellow-500 transition-all"
          />
        </div>

        <button
          onClick={handleLogin}
          className={`w-full py-2 ${isLoading ? 'bg-yellow-500/80' : 'bg-yellow-500'} hover:bg-yellow-600 rounded-md text-white font-semibold transition-colors`}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Login'}
        </button>

        {message && (
          <p
            className={`text-center text-sm p-2 rounded-md ${
              message.includes('successful')
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {message.includes('successful') ? <CheckCircle className="inline mr-2" /> : <AlertCircle className="inline mr-2" />}
            {message}
          </p>
        )}

        <div className="text-center">
          <button
            onClick={onSwitchToSignup}
            className="text-yellow-300 hover:text-yellow-400 transition-colors"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
