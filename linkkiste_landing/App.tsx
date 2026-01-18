import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans bg-white selection:bg-app-blue selection:text-white">
      <Header />
      
      <main>
        <Hero />
        <Features />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;