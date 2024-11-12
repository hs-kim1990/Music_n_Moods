import { useState } from 'react';
import { LoginModal, SignupModal } from './SignupLoginModals';
import { useAuth } from '../context/AuthContext';
import { Lock } from 'lucide-react';

const AuthModals = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { login } = useAuth();

  const openSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const closeModal = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(false);
  };

  const handleLoginSuccess = (user: { username: string, birthDate: string, gender: string }) => {
    login(user);
    closeModal();
  };

  return (
    <>
      {/* <button onClick={openSignup}>Sign Up</button> */}
      <button onClick={openLogin} className="text-md flex font-medium px-4 py-2 rounded-md">
        <Lock className="w-6 h-6 text-yellow-400 mr-2" />
        <span className="hidden sm:block text-yellow-300">Log In</span>
      </button>

      <SignupModal isOpen={isSignupOpen} onRequestClose={closeModal} onSwitchToLogin={() => {
          closeModal();
          openLogin();
        }}
      />
      <LoginModal 
        isOpen={isLoginOpen} 
        onRequestClose={closeModal} 
        onLoginSuccess={handleLoginSuccess} 
        onSwitchToSignup={() => {
          closeModal();
          openSignup();
        }}
      />
    </>
  );
};

export default AuthModals;
