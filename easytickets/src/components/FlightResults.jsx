import React, { useState, useMemo } from 'react';
import { Plane, Clock, TrendingDown, Zap, Users, Award, Star, Check } from 'lucide-react';

const FlightResults = ({ flights, onFlightSelect }) => {
  const [sortBy, setSortBy] = useState('best');

  /**
   * Calcula el precio "antes" (precio real + $80)
   */
  const calculateOriginalPrice = (currentPrice) => {
    return Math.round(currentPrice + 80);
  };

  /**
   * Calcula el descuento porcentual
   */
  const calculateDiscount = (originalPrice, currentPrice) => {
    const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  /**
   * Determina la categoría del vuelo
   */
  const getFlightBadge = (flight, index, sortedFlights) => {
    // Vuelo más barato = Deal of the Week
    const cheapestFlight = sortedFlights.reduce((min, f) => 
      f.price < min.price ? f : min, sortedFlights[0]
    );
    
    if (flight.id === cheapestFlight.id) {
      return { type: 'deal', label: 'Deal of the Week', icon: Award, color: 'bg-blue-600' };
    }

    // Vuelo más rápido (menos duración)
    const fastestFlight = sortedFlights.reduce((fastest, f) => {
      const currentDuration = parseDuration(f.duration);
      const fastestDuration = parseDuration(fastest.duration);
      return currentDuration < fastestDuration ? f : fastest;
    }, sortedFlights[0]);

    if (flight.id === fastestFlight.id) {
      return { type: 'fastest', label: 'Fastest', icon: Zap, color: 'bg-orange-600' };
    }

    // Best Seller (segundo más barato)
    const pricesSorted = [...sortedFlights].sort((a, b) => a.price - b.price);
    if (flight.id === pricesSorted[1]?.id) {
      return { type: 'bestseller', label: 'Best Seller', icon: Star, color: 'bg-red-600' };
    }

    // Popular (vuelo directo o con menos escalas)
    if (flight.stops === 0) {
      return { type: 'popular', label: 'Non-Stop', icon: Plane, color: 'bg-green-600' };
    }

    return null;
  };

  /**
   * Parsea duración en minutos para comparar
   */
  const parseDuration = (duration) => {
    if (!duration || duration === 'N/A') return 999999;
    
    const parts = duration.match(/(\d+)h?\s*(\d+)?m?/);
    if (!parts) return 999999;
    
    const hours = parseInt(parts[1] || 0);
    const minutes = parseInt(parts[2] || 0);
    return hours * 60 + minutes;
  };

  /**
   * Ordenar vuelos según criterio
   */
  const sortedFlights = useMemo(() => {
    let sorted = [...flights];

    switch (sortBy) {
      case 'cheapest':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'fastest':
        sorted.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration));
        break;
      case 'fewest-stops':
        sorted.sort((a, b) => a.stops - b.stops);
        break;
      case 'best':
      default:
        // Mejor = balance entre precio y duración
        sorted.sort((a, b) => {
          const scoreA = (a.price / 100) + (parseDuration(a.duration) / 10) + (a.stops * 50);
          const scoreB = (b.price / 100) + (parseDuration(b.duration) / 10) + (b.stops * 50);
          return scoreA - scoreB;
        });
    }

    return sorted;
  }, [flights, sortBy]);

  /**
   * Separar vuelo destacado del resto
   */
  const cheapestFlight = useMemo(() => {
    return sortedFlights.reduce((min, f) => 
      f.price < min.price ? f : min, sortedFlights[0]
    );
  }, [sortedFlights]);

  const otherFlights = useMemo(() => {
    return sortedFlights.filter(f => f.id !== cheapestFlight.id);
  }, [sortedFlights, cheapestFlight]);

  if (flights.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            Ordenar por:
          </h3>
          <div className="text-sm text-gray-600">
            {flights.length} vuelo{flights.length !== 1 ? 's' : ''} encontrado{flights.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setSortBy('best')}
            className={`px-4 py-3 rounded-lg font-semibold transition-all ${
              sortBy === 'best'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⭐ Mejor Opción
          </button>
          <button
            onClick={() => setSortBy('cheapest')}
            className={`px-4 py-3 rounded-lg font-semibold transition-all ${
              sortBy === 'cheapest'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            💰 Más Económico
          </button>
          <button
            onClick={() => setSortBy('fastest')}
            className={`px-4 py-3 rounded-lg font-semibold transition-all ${
              sortBy === 'fastest'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⚡ Más Rápido
          </button>
          <button
            onClick={() => setSortBy('fewest-stops')}
            className={`px-4 py-3 rounded-lg font-semibold transition-all ${
              sortBy === 'fewest-stops'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🎯 Menos Escalas
          </button>
        </div>
      </div>

      {/* VUELO DESTACADO - Deal of the Week */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-2xl p-8 border-4 border-blue-200">
        {/* Badge de Deal of the Week */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Deal of the Week</span>
          </div>
          <div className="bg-green-500 text-white px-3 py-1 rounded-full font-semibold text-xs">
            {calculateDiscount(calculateOriginalPrice(cheapestFlight.price), cheapestFlight.price)}% OFF
          </div>
        </div>

        <FlightCard 
          flight={cheapestFlight} 
          onSelect={onFlightSelect}
          isHighlighted={true}
          originalPrice={calculateOriginalPrice(cheapestFlight.price)}
        />
      </div>

      {/* Más ofertas de nuestros partners */}
      {otherFlights.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Más ofertas de nuestros partners
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {otherFlights.map((flight, index) => {
              const badge = getFlightBadge(flight, index, sortedFlights);
              
              return (
                <div key={flight.id} className="relative">
                  {/* Badge si aplica */}
                  {badge && (
                    <div className="absolute -top-3 left-4 z-10">
                      <div className={`${badge.color} text-white px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-2 shadow-lg`}>
                        <badge.icon className="w-4 h-4" />
                        <span>{badge.label}</span>
                      </div>
                    </div>
                  )}
                  
                  <FlightCard 
                    flight={flight} 
                    onSelect={onFlightSelect}
                    isHighlighted={false}
                    originalPrice={calculateOriginalPrice(flight.price)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Componente individual de tarjeta de vuelo
 */
const FlightCard = ({ flight, onSelect, isHighlighted = false, originalPrice }) => {
  const discount = ((originalPrice - flight.price) / originalPrice) * 100;

  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
      isHighlighted ? 'border-4 border-blue-400' : 'border-2 border-gray-200'
    }`}>
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Información del vuelo */}
          <div className="flex-1 space-y-4">
            {/* Aerolínea */}
            <div className="flex items-center space-x-4">
              <img 
                src={flight.logo} 
                alt={flight.airline}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/48x48/2563eb/ffffff?text=${flight.airlineCode}`;
                }}
              />
              <div>
                <div className="font-bold text-gray-900 text-lg">{flight.airline}</div>
                <div className="text-sm text-gray-500">Vuelo {flight.flightNumber}</div>
              </div>
            </div>

            {/* Ruta y horarios */}
            <div className="flex items-center justify-between">
              {/* Salida */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{flight.departure.time}</div>
                <div className="text-sm font-semibold text-gray-700">{flight.departure.airport}</div>
                <div className="text-xs text-gray-500">{flight.departure.date}</div>
              </div>

              {/* Duración y escalas */}
              <div className="flex-1 mx-4">
                <div className="relative">
                  <div className="border-t-2 border-gray-300 relative">
                    <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary w-6 h-6 bg-white px-1" />
                  </div>
                  <div className="text-center mt-2">
                    <div className="text-sm font-semibold text-gray-600">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {flight.duration}
                    </div>
                    <div className="text-xs text-gray-500">
                      {flight.stops === 0 ? (
                        <span className="text-green-600 font-semibold">Directo</span>
                      ) : (
                        <span>{flight.stops} escala{flight.stops > 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Llegada */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{flight.arrival.time}</div>
                <div className="text-sm font-semibold text-gray-700">{flight.arrival.airport}</div>
                <div className="text-xs text-gray-500">{flight.arrival.date}</div>
              </div>
            </div>

            {/* Beneficios */}
            {isHighlighted && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Lost Baggage Protection</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Refund Assurance</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Book Now, Pay Later</span>
                </div>
              </div>
            )}
          </div>

          {/* Precio y botón */}
          <div className={`${isHighlighted ? 'lg:w-80' : 'lg:w-64'} text-center space-y-4 border-l-0 lg:border-l-2 border-gray-200 lg:pl-6`}>
            {/* Precio anterior tachado */}
            <div className="text-gray-500">
              <span className="text-xl line-through">${originalPrice}</span>
            </div>

            {/* Precio actual destacado */}
            <div>
              <div className={`${isHighlighted ? 'text-5xl' : 'text-4xl'} font-bold text-primary`}>
                ${flight.price}
                <span className="text-xl align-top">*</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Total, por persona
              </div>
            </div>

            {/* Información adicional */}
            <div className="text-xs text-gray-500 space-y-1">
              <div>🎫 {flight.class}</div>
              {flight.co2Emissions && (
                <div>🌱 {flight.co2Emissions} kg CO₂</div>
              )}
            </div>

            {/* Botón de selección */}
            <button
              onClick={() => onSelect(flight)}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                isHighlighted
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-xl'
                  : 'bg-secondary text-white hover:bg-orange-600 shadow-lg'
              }`}
            >
              {isHighlighted ? '🏆 Reservar Mejor Oferta' : 'Seleccionar Vuelo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightResults;
