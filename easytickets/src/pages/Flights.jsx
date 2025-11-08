import React, { useState } from 'react';
import SearchFlights from '../components/SearchFlights';
import FlightResults from '../components/FlightResults';
import { searchFlights } from '../services/flightAPI';
import { ArrowLeft } from 'lucide-react';

const Flights = ({ onBack }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState(null);

  const handleSearch = async (data) => {
    setLoading(true);
    setSearchData(data);
    
    try {
      // Búsqueda real con RapidAPI
      const results = await searchFlights(data);
      setFlights(results);
    } catch (error) {
      console.error('Error al buscar vuelos:', error);
      alert('Hubo un error al buscar vuelos. Por favor intenta de nuevo.');
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFlightSelect = (flight) => {
    alert(`Has seleccionado el vuelo ${flight.flightNumber} de ${flight.airline}\nPrecio: $${flight.price}\n\nEn la próxima entrega se agregará el sistema de pago.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 mb-6 hover:text-secondary transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al inicio</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold">Busca tu Vuelo Ideal</h1>
          <p className="text-gray-200 mt-2">Encuentra las mejores opciones para tu viaje</p>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchFlights onSearch={handleSearch} />
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-secondary"></div>
            <p className="mt-4 text-gray-600 text-lg">Buscando los mejores vuelos para ti...</p>
          </div>
        ) : flights.length > 0 ? (
          <>
            {searchData && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {searchData.origin} → {searchData.destination}
                </h2>
                <p className="text-gray-600">
                  {searchData.departureDate} 
                  {searchData.returnDate && ` - ${searchData.returnDate}`} • 
                  {searchData.passengers} pasajero{searchData.passengers > 1 ? 's' : ''} • 
                  Clase {searchData.class}
                </p>
              </div>
            )}
            <FlightResults flights={flights} onFlightSelect={handleFlightSelect} />
          </>
        ) : searchData ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No encontramos vuelos</h3>
            <p className="text-gray-500">
              Intenta modificar tus criterios de búsqueda para ver más opciones
            </p>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Comienza tu búsqueda</h3>
            <p className="text-gray-500">
              Ingresa tu origen, destino y fechas para encontrar los mejores vuelos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flights;