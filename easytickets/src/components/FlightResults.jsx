import React from 'react';
import { Plane, Clock, Calendar, ArrowRight, MapPin, Leaf } from 'lucide-react';

const FlightResults = ({ flights, onFlightSelect }) => {
  if (!flights || flights.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-lg">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No se encontraron vuelos</h3>
        <p className="text-gray-500">
          Intenta modificar tus criterios de búsqueda o verifica los códigos de aeropuerto
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {flights.length} vuelo{flights.length !== 1 ? 's' : ''} encontrado{flights.length !== 1 ? 's' : ''}
        </h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Ordenar por:</span>
          <select className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary">
            <option>Mejor opción</option>
            <option>Precio más bajo</option>
            <option>Más rápido</option>
            <option>Menos escalas</option>
          </select>
        </div>
      </div>

      {flights.map((flight) => (
        <div
          key={flight.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-transparent hover:border-primary"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Airline Logo & Info */}
            <div className="lg:col-span-2 flex flex-col items-center">
              <img
                src={flight.logo}
                alt={flight.airline}
                className="h-12 w-auto mb-2 object-contain"
                onError={(e) => {
                  e.target.src = `https://images.kiwi.com/airlines/64/${flight.airlineCode}.png`;
                }}
              />
              <p className="text-sm font-semibold text-gray-700 text-center">{flight.airline}</p>
              <p className="text-xs text-gray-500">{flight.flightNumber}</p>
              <p className="text-xs text-gray-400 mt-1">{flight.airlineCode}</p>
            </div>

            {/* Flight Route - IDA */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-4">
                {/* Departure */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <p className="text-sm font-medium text-gray-600">{flight.departure.airport}</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{flight.departure.time}</p>
                  <p className="text-sm text-gray-500">{formatDate(flight.departure.date)}</p>
                  <p className="text-xs text-gray-400">{flight.departure.airportName}</p>
                  {flight.departure.terminal && flight.departure.terminal !== 'N/A' && (
                    <p className="text-xs text-gray-400">Terminal {flight.departure.terminal}</p>
                  )}
                </div>

                {/* Duration & Stops */}
                <div className="flex-1 px-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-2 text-gray-500 mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{flight.duration}</span>
                    </div>
                    
                    <div className="w-full flex items-center relative">
                      <div className="flex-1 border-t-2 border-gray-300 relative">
                        {flight.stops > 0 && (
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-white px-2">
                              <div className="w-3 h-3 rounded-full bg-secondary border-2 border-white"></div>
                            </div>
                          </div>
                        )}
                      </div>
                      <Plane className="w-5 h-5 text-primary transform rotate-90 mx-2" />
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-2">
                      {flight.stops === 0 ? '✈️ Directo' : `${flight.stops} escala${flight.stops > 1 ? 's' : ''}`}
                    </p>
                  </div>
                </div>

                {/* Arrival */}
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end space-x-2 mb-1">
                    <p className="text-sm font-medium text-gray-600">{flight.arrival.airport}</p>
                    <MapPin className="w-4 h-4 text-secondary" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{flight.arrival.time}</p>
                  <p className="text-sm text-gray-500">{formatDate(flight.arrival.date)}</p>
                  <p className="text-xs text-gray-400">{flight.arrival.airportName}</p>
                  {flight.arrival.terminal && flight.arrival.terminal !== 'N/A' && (
                    <p className="text-xs text-gray-400">Terminal {flight.arrival.terminal}</p>
                  )}
                </div>
              </div>

              {/* Return Flight Info */}
              {flight.hasReturn && flight.returnInfo && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2 font-semibold">🔄 VUELO DE REGRESO</p>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">{flight.returnInfo.departure.airport}</span>
                      <span className="text-gray-500 mx-2">{flight.returnInfo.departure.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{flight.returnInfo.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 mx-2">{flight.returnInfo.arrival.time}</span>
                      <span className="font-medium">{flight.returnInfo.arrival.airport}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 text-center">
                    {flight.returnInfo.stops === 0 ? 'Directo' : `${flight.returnInfo.stops} escala(s)`}
                  </p>
                </div>
              )}
            </div>

            {/* Price & Book Button */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center border-l-0 lg:border-l-2 border-gray-200 pl-0 lg:pl-6">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500 mb-1">Precio total</p>
                <p className="text-4xl font-bold text-primary">
                  ${flight.priceDisplay}
                  <span className="text-lg text-gray-500 ml-1">{flight.currency}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{flight.class}</p>
              </div>
              
              <button
                onClick={() => onFlightSelect(flight)}
                disabled={!flight.available}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  flight.available
                    ? 'bg-secondary hover:bg-orange-600 text-white transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>{flight.available ? 'Seleccionar' : 'No disponible'}</span>
                {flight.available && <ArrowRight className="w-5 h-5" />}
              </button>

              {/* CO2 Emissions */}
              {flight.co2Emissions && (
                <div className="mt-3 flex items-center space-x-1 text-xs text-green-600">
                  <Leaf className="w-3 h-3" />
                  <span>{flight.co2Emissions} kg CO₂</span>
                </div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Cambio de fecha flexible</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✓</span>
                <span>1 equipaje de mano incluido</span>
              </div>
              {flight.aircraft && flight.aircraft !== 'N/A' && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">✈</span>
                  <span>Aeronave: {flight.aircraft}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Formatea la fecha en un formato legible en español
 */
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString('es-ES', options);
  } catch (error) {
    return dateString;
  }
};

export default FlightResults;