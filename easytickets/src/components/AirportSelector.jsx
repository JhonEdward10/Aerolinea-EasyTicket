import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Loader2, X } from 'lucide-react';
import { searchAirports } from '../services/flightAPI';

const AirportSelector = ({
  value,
  onChange,
  label,
  placeholder,
  required = true,
  iconColor = "text-gray-400"
}) => {
  const [query, setQuery] = useState('');
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Buscar aeropuertos cuando el usuario escribe
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length >= 2) {
        setLoading(true);
        try {
          const results = await searchAirports(query);
          setAirports(results);
          setShowDropdown(true);
        } catch (error) {
          console.error('Error al buscar aeropuertos:', error);
          setAirports([]);
        } finally {
          setLoading(false);
        }
      } else {
        setAirports([]);
        setShowDropdown(false);
      }
    }, 300); // Debounce de 300ms

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleSelectAirport = (airport) => {
    setSelectedAirport(airport);
    setQuery(`${airport.name} (${airport.id})`);
    onChange(airport.id); // Enviar el código IATA al padre
    setShowDropdown(false);
  };

  const handleClear = () => {
    setQuery('');
    setSelectedAirport(null);
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconColor} w-5 h-5`} />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (airports.length > 0) {
              setShowDropdown(true);
            }
          }}
          placeholder={placeholder}
          className="input-field pl-10 pr-10"
          required={required}
          autoComplete="off"
        />

        {/* Botón de limpiar o loading spinner */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {loading ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : query ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <Search className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Texto de ayuda */}
      <p className="text-xs text-gray-500 mt-1">
        {selectedAirport
          ? `Seleccionado: ${selectedAirport.id}`
          : 'Escribe el nombre de la ciudad o aeropuerto'
        }
      </p>

      {/* Dropdown de resultados */}
      {showDropdown && airports.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
          {airports.map((airport, index) => (
            <button
              key={`${airport.id}-${index}`}
              type="button"
              onClick={() => handleSelectAirport(airport)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-start space-x-3"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {airport.id}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">
                  {airport.name}
                </div>
                <div className="text-sm text-gray-600 truncate">
                  {airport.city && `${airport.city}, `}
                  {airport.country}
                </div>
                {airport.terminals && (
                  <div className="text-xs text-gray-500 mt-1">
                    Terminales: {airport.terminals}
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 text-xs text-gray-400 mt-1">
                {airport.type === 'airport' ? '✈️' : '🏢'}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Mensaje cuando no hay resultados */}
      {showDropdown && !loading && query.length >= 2 && airports.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500">
          No se encontraron aeropuertos para "{query}"
        </div>
      )}
    </div>
  );
};

export default AirportSelector;
