import React, { useState, useEffect } from 'react';
import SearchFlights from './SearchFlights';

const SearchHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Imágenes de destinos turísticos populares (Unsplash - alta calidad)
  const destinations = [
    {
      url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=80',
      name: 'Paris, France',
      description: 'The City of Light'
    },
    {
      url: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1920&q=80',
      name: 'New York, USA',
      description: 'The Big Apple'
    },
    {
      url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=80',
      name: 'Tokyo, Japan',
      description: 'Land of the Rising Sun'
    },
    {
      url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80',
      name: 'Dubai, UAE',
      description: 'City of Gold'
    },
    {
      url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=80',
      name: 'Paris, France',
      description: 'Eiffel Tower at Night'
    },
    {
      url: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1920&q=80',
      name: 'Bali, Indonesia',
      description: 'Tropical Paradise'
    },
    {
      url: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1920&q=80',
      name: 'London, UK',
      description: 'Historic Capital'
    },
    {
      url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1920&q=80',
      name: 'Rome, Italy',
      description: 'The Eternal City'
    }
  ];

  // Auto-scroll cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [destinations.length]);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-11">
      {/* Carrusel de imágenes de fondo */}
      <div className="absolute inset-0 w-full h-full">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={destination.url}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            {/* Overlay oscuro para mejor contraste */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
          </div>
        ))}
      </div>

      {/* Indicadores de carrusel (puntos) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {destinations.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Nombre del destino actual */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 text-center z-10 text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg animate-fade-in">
          {destinations[currentImageIndex].name}
        </h2>
        <p className="text-lg md:text-xl text-white/90 drop-shadow-md animate-fade-in">
          {destinations[currentImageIndex].description}
        </p>
      </div>

      {/* SearchFlights encima con padding */}
      <div className="relative z-20 w-full py-12 px-4">
        <SearchFlights />
      </div>

      {/* Estilos para animación */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default SearchHero;