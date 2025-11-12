import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Loader2, AlertCircle } from 'lucide-react';
import { searchFlights } from '../services/flightAPI';
import FlightResults from './FlightResults';
import AirportSelector from './AirportSelector';

const SearchFlights = () => {
  const [tripType, setTripType] = useState('roundTrip');
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [error, setError] = useState(null);
  
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearchPerformed(true);
    setError(null);
    
    try {
      console.log('🚀 Iniciando búsqueda de vuelos...');
      
      const results = await searchFlights(searchData);
      
      console.log('✅ Resultados obtenidos:', results.length);
      setFlights(results);
      
      // Scroll suave a los resultados
      setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
      
    } catch (error) {
      console.error('❌ Error al buscar vuelos:', error);
      setError(error.message || 'Hubo un error al buscar vuelos. Por favor intenta de nuevo.');
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));

    // Si cambia el tipo de viaje a solo ida, limpiar fecha de regreso
    if (name === 'tripType' && value === 'oneWay') {
      setSearchData(prev => ({
        ...prev,
        returnDate: ''
      }));
    }
  };

  const handleFlightSelect = (flight) => {
    const message = `
🎉 ¡Vuelo Seleccionado!

✈️ Vuelo: ${flight.flightNumber}
🏢 Aerolínea: ${flight.airline} (${flight.airlineCode})

📍 RUTA DE IDA:
   ${flight.departure.airport} → ${flight.arrival.airport}
   Salida: ${flight.departure.time} (${flight.departure.date})
   Llegada: ${flight.arrival.time} (${flight.arrival.date})
   Duración: ${flight.duration}
   Escalas: ${flight.stops === 0 ? 'Vuelo directo' : `${flight.stops} escala(s)`}

${flight.hasReturn ? `
📍 RUTA DE REGRESO:
   ${flight.returnInfo.departure.airport} → ${flight.returnInfo.arrival.airport}
   Salida: ${flight.returnInfo.departure.time}
   Llegada: ${flight.returnInfo.arrival.time}
   Duración: ${flight.returnInfo.duration}
` : ''}

💰 Precio Total: $${flight.priceDisplay} ${flight.currency}
🎫 Clase: ${flight.class}

${flight.co2Emissions ? `🌱 Emisiones CO₂: ${flight.co2Emissions} kg` : ''}

⚠️ En la próxima fase se implementará el sistema de pago.
    `.trim();

    alert(message);
  };

  // Obtener fecha mínima (hoy)
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <div id="buscar" className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 -mt-16 relative z-10 max-w-6xl mx-auto">
        {/* Trip Type Selector */}
        <div className="flex space-x-4 mb-6">
          <button
            type="button"
            onClick={() => {
              setTripType('roundTrip');
              setSearchData(prev => ({ ...prev, returnDate: '' }));
            }}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              tripType === 'roundTrip'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ✈️ Ida y Vuelta
          </button>
          <button
            type="button"
            onClick={() => {
              setTripType('oneWay');
              setSearchData(prev => ({ ...prev, returnDate: '' }));
            }}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              tripType === 'oneWay'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ➡️ Solo Ida
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Origin */}
            <AirportSelector
              value={searchData.origin}
              onChange={(airportCode) => setSearchData(prev => ({ ...prev, origin: airportCode }))}
              label="Origen"
              placeholder="Bogotá, Los Ángeles, Medellín..."
              iconColor="text-gray-400"
              required
            />

            {/* Destination */}
            <AirportSelector
              value={searchData.destination}
              onChange={(airportCode) => setSearchData(prev => ({ ...prev, destination: airportCode }))}
              label="Destino"
              placeholder="Nueva York, Miami, Cartagena..."
              iconColor="text-secondary"
              required
            />

            {/* Departure Date */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha de Salida <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="departureDate"
                  value={searchData.departureDate}
                  onChange={handleChange}
                  min={today}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            {/* Return Date */}
            {tripType === 'roundTrip' && (
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fecha de Regreso <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    name="returnDate"
                    value={searchData.returnDate}
                    onChange={handleChange}
                    min={searchData.departureDate || today}
                    className="input-field pl-10"
                    required={tripType === 'roundTrip'}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Passengers */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pasajeros</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="passengers"
                  value={searchData.passengers}
                  onChange={handleChange}
                  className="input-field pl-10"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Adulto' : 'Adultos'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Class */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Clase</label>
              <select
                name="class"
                value={searchData.class}
                onChange={handleChange}
                className="input-field"
              >
                <option value="economy">Económica</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">Primera Clase</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Buscando...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Buscar Vuelos</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">💡 Cómo buscar:</p>
              <p>Escribe el nombre de la ciudad o aeropuerto y selecciona de la lista.</p>
              <p className="mt-1"><strong>Ejemplos:</strong> Bogotá, Los Ángeles, Nueva York, Miami, Medellín, Cartagena</p>
            </div>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {searchPerformed && (
        <div id="results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-secondary"></div>
              <p className="mt-4 text-gray-600 text-lg">Buscando los mejores vuelos con Google Flights...</p>
              <p className="mt-2 text-gray-500 text-sm">Esto puede tomar unos segundos</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-2xl font-bold text-red-700 mb-2">Error al buscar vuelos</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="btn-primary"
              >
                Intentar de nuevo
              </button>
            </div>
          ) : flights.length > 0 ? (
            <>
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {searchData.origin} → {searchData.destination}
                </h2>
                <p className="text-gray-600">
                  📅 {searchData.departureDate} 
                  {searchData.returnDate && ` - ${searchData.returnDate}`} • 
                  👥 {searchData.passengers} pasajero{searchData.passengers > 1 ? 's' : ''} • 
                  🎫 {searchData.class === 'economy' ? 'Económica' : searchData.class === 'business' ? 'Business' : searchData.class === 'first' ? 'Primera Clase' : 'Premium Economy'}
                </p>
              </div>
              <FlightResults flights={flights} onFlightSelect={handleFlightSelect} />
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No encontramos vuelos</h3>
              <p className="text-gray-500 mb-4">
                No hay vuelos disponibles para la ruta {searchData.origin} → {searchData.destination}
              </p>
              <p className="text-gray-400 text-sm">
                Intenta modificar tus fechas o verifica los códigos de aeropuerto
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchFlights;