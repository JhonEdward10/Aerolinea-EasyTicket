import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary to-blue-900 text-white">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Viaja a Donde Tus Sueños 
            <span className="text-secondary"> Te Lleven</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Encuentra los mejores precios en vuelos nacionales e internacionales. 
            Tu próxima aventura comienza aquí.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <button className="btn-primary flex items-center space-x-2 text-lg">
              <span>Buscar Vuelos</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-lg">
              Ver Ofertas
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary">500+</div>
              <div className="text-gray-200">Destinos</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary">1M+</div>
              <div className="text-gray-200">Pasajeros Felices</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary">24/7</div>
              <div className="text-gray-200">Soporte</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;