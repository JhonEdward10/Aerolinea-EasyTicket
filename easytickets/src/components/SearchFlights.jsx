import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const SearchFlights = () => {
  const [tripType, setTripType] = useState('roundTrip');
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Búsqueda de vuelos - Próximamente');
  };

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div id="buscar" className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 -mt-16 relative z-10 max-w-6xl mx-auto">
      {/* Trip Type Selector */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTripType('roundTrip')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
            tripType === 'roundTrip'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Ida y Vuelta
        </button>
        <button
          onClick={() => setTripType('oneWay')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
            tripType === 'oneWay'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Solo Ida
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Origin */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Origen</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="origin"
                value={searchData.origin}
                onChange={handleChange}
                placeholder="Ciudad de origen"
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          {/* Destination */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Destino</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
              <input
                type="text"
                name="destination"
                value={searchData.destination}
                onChange={handleChange}
                placeholder="Ciudad de destino"
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          {/* Departure Date */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Salida</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                name="departureDate"
                value={searchData.departureDate}
                onChange={handleChange}
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          {/* Return Date */}
          {tripType === 'roundTrip' && (
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Regreso</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="returnDate"
                  value={searchData.returnDate}
                  onChange={handleChange}
                  className="input-field pl-10"
                  required
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
                    {num} {num === 1 ? 'Pasajero' : 'Pasajeros'}
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
            <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Buscar Vuelos</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFlights;