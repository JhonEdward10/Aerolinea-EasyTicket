import React, { useState } from 'react';
import { Plane, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <Plane className="w-8 h-8 text-secondary" />
            <span className="text-2xl font-bold">Easy<span className="text-secondary">Tickets</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="hover:text-secondary transition-colors duration-300">Inicio</a>
            <a href="#buscar" className="hover:text-secondary transition-colors duration-300">Buscar Vuelos</a>
            <a href="#contacto" className="hover:text-secondary transition-colors duration-300">Contacto</a>
            <button className="flex items-center space-x-2 bg-secondary hover:bg-orange-600 px-4 py-2 rounded-lg transition-all duration-300">
              <User className="w-5 h-5" />
              <span>Iniciar Sesión</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a href="#inicio" className="block hover:text-secondary transition-colors duration-300">Inicio</a>
            <a href="#buscar" className="block hover:text-secondary transition-colors duration-300">Buscar Vuelos</a>
            <a href="#contacto" className="block hover:text-secondary transition-colors duration-300">Contacto</a>
            <button className="w-full flex items-center justify-center space-x-2 bg-secondary hover:bg-orange-600 px-4 py-2 rounded-lg transition-all duration-300">
              <User className="w-5 h-5" />
              <span>Iniciar Sesión</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
