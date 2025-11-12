import React, { useState, useRef, useEffect } from 'react';
import { MapPin, X, Search } from 'lucide-react';
import { searchAirports, getAirportByCode } from '../data/airports';

/**
 * Componente de selector de aeropuerto con autocompletado
 * La lista de aeropuertos se importa desde src/data/airports.js
 */
const AirportSelector = ({ 
  value, 
  onChange, 
  placeholder = 'Buscar aeropuerto o ciudad',
  label,
  icon: Icon = MapPin,
  required = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Actualizar aeropuerto seleccionado cuando cambia el valor
  useEffect(() => {
    if (value) {
      const airport = getAirportByCode(value);
      if (airport) {
        setSelectedAirport(airport);
        setSearchTerm('');
      }
    } else {
      setSelectedAirport(null);
    }
  }, [value]);

  // Filtrar aeropuertos según búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
    const results = searchAirports(term, 10);
    setFilteredAirports(results);
  };

  // Seleccionar aeropuerto
  const handleSelect = (airport) => {
    console.log('✅ Aeropuerto seleccionado:', airport.code);
    setSelectedAirport(airport);
    setSearchTerm('');
    setIsOpen(false);
    onChange({ target: { value: airport.code } });
  };

  // Limpiar selección
  const handleClear = () => {
    setSelectedAirport(null);
    setSearchTerm('');
    onChange({ target: { value: '' } });
    inputRef.current?.focus();
  };

  // Abrir dropdown
  const handleFocus = () => {
    setIsOpen(true);
    if (searchTerm.length === 0) {
      // Mostrar aeropuertos populares
      const popular = searchAirports('', 10);
      setFilteredAirports(popular);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Icono */}
        <Icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          selectedAirport ? 'text-primary' : 'text-gray-400'
        }`} />

        {/* Input */}
        {selectedAirport ? (
          // Mostrar aeropuerto seleccionado
          <div 
            className="input-field pl-10 pr-10 flex items-center justify-between cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900">
                {selectedAirport.city} ({selectedAirport.code})
              </div>
              <div className="text-xs text-gray-500 truncate">
                {selectedAirport.name}
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        ) : (
          // Campo de búsqueda
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={handleFocus}
            placeholder={placeholder}
            className="input-field pl-10 pr-10"
            required={required}
          />
        )}

        {/* Icono de búsqueda (solo cuando no hay selección) */}
        {!selectedAirport && (
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
      </div>

      {/* Dropdown de resultados */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-2xl max-h-80 overflow-y-auto">
          {filteredAirports.length > 0 ? (
            <ul className="py-2">
              {filteredAirports.map((airport) => (
                <li
                  key={airport.code}
                  onClick={() => handleSelect(airport)}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">
                        {airport.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {airport.city}, {airport.country}
                      </div>
                    </div>
                    <div className="text-lg font-bold text-primary ml-4">
                      {airport.code}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p className="font-semibold">No se encontraron aeropuertos</p>
              <p className="text-sm">Intenta buscar por ciudad, país o código IATA</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AirportSelector;
