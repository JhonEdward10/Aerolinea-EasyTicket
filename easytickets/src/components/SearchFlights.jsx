import React, { useState } from 'react';
import { Search, Calendar, Users, Loader2, AlertCircle } from 'lucide-react';
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
  };

  const handleOriginChange = (e) => {
    setSearchData(prev => ({
      ...prev,
      origin: e.target.value
    }));
  };

  const handleDestinationChange = (e) => {
    setSearchData(prev => ({
      ...prev,
      destination: e.target.value
    }));
  };

  const handleFlightSelect = (flight) => {
    // Esta función ahora es manejada por el modal en FlightResults
    console.log('Vuelo seleccionado:', flight);
  };

  const today = new Date().toISOString().split('T')[0];
  const recommendedMinDate = new Date();
  recommendedMinDate.setDate(recommendedMinDate.getDate() + 15);
  const recommendedMin = recommendedMinDate.toISOString().split('T')[0];

  return (
    <>
      <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 -mt-16 relative z-10 max-w-6xl mx-auto scroll-mt-24">
        <div className="flex space-x-3 mb-4">
          <button
            type="button"
            onClick={() => {
              setTripType('roundTrip');
              setSearchData(prev => ({ ...prev, returnDate: '' }));
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
              tripType === 'roundTrip'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ✈️ Round Trip
          </button>
          <button
            type="button"
            onClick={() => {
              setTripType('oneWay');
              setSearchData(prev => ({ ...prev, returnDate: '' }));
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
              tripType === 'oneWay'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ➡️ One Way
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <AirportSelector
              label="From"
              value={searchData.origin}
              onChange={handleOriginChange}
              placeholder="Buscar ciudad o aeropuerto de origen..."
              required
            />

            <AirportSelector
              label="To"
              value={searchData.destination}
              onChange={handleDestinationChange}
              placeholder="Buscar ciudad o aeropuerto de destino..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Departure Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  name="departureDate"
                  value={searchData.departureDate}
                  onChange={handleChange}
                  min={today}
                  className="input-field pl-10 py-2 h-10 w-full appearance-none"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                💡 Recommended: {recommendedMin} or later
              </p>
            </div>

            {tripType === 'roundTrip' && (
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Return Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    name="returnDate"
                    value={searchData.returnDate}
                    onChange={handleChange}
                    min={searchData.departureDate || today}
                    className="input-field pl-10 py-2 h-10 w-full appearance-none"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                    required={tripType === 'roundTrip'}
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  name="passengers"
                  value={searchData.passengers}
                  onChange={handleChange}
                  className="input-field pl-10 py-2 h-10 w-full"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Adulto' : 'Adultos'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Class</label>
              <select
                name="class"
                value={searchData.class}
                onChange={handleChange}
                className="input-field py-2 h-10 w-full"
              >
                <option value="economy">Economic</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary px-8 py-3 text-base flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Looking for flights...</span>
                </>
              ) : (
                <>
                  <Search className="w-6 h-6" />
                  <span>Search Flights</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3 mt-4">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">💡 Tips for better results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Write the city name or airport code (MIA, DCA, JFK, etc.)</li>
                <li>Search for flights at least 15 days in advance.</li>
                <li>Flights during the week are usually cheaper</li>
              </ul>
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
              <p className="mt-4 text-gray-600 text-lg">Looking for the best flights with Google Flights...</p>
              <p className="mt-2 text-gray-500 text-sm">This may take a few seconds</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-2xl font-bold text-red-700 mb-2">Error when searching for flights</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="btn-primary"
              >
                Try again
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
                  👥 {searchData.passengers} Passenger{searchData.passengers > 1 ? 's' : ''} • 
                  🎫 {searchData.class === 'economy' ? 'Economic' : searchData.class === 'business' ? 'Business' : searchData.class === 'first' ? 'First Class' : 'Premium Economy'}
                </p>
              </div>
              <FlightResults 
                flights={flights} 
                onFlightSelect={handleFlightSelect}
                searchData={searchData}
              />
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">We can't find flights</h3>
              <p className="text-gray-500 mb-4">
                There are no flights available for this route {searchData.origin} → {searchData.destination}
              </p>
              <p className="text-gray-400 text-sm">
                Try changing your dates or selecting other airports
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchFlights;
