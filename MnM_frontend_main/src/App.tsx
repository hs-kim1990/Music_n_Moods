import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/NavBar';
import Introduction from './components/Introduction';
import Questionnaire from './components/Questionnaire';
import AboutUs from './components/AboutUs';

function App() {
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState('home');

  const renderContent = () => {
    if (page === 'about') return <AboutUs />;
    return started ? <Questionnaire /> : <Introduction onStart={() => setStarted(true)} />;
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-brown-900 via-brown-800 to-yellow-900 text-yellow-100 flex flex-col">
        <Navbar setPage={setPage} />
        <main className="flex-grow flex items-center">
          <div className={`min-h-full h-auto container mx-auto p-2 max-w-5xl ${started && 'mb-24'}`}>
            {renderContent()}
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
