import React from 'react';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WhatsAppFloat from './components/Whatsappfloat';
import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
