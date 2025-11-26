import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import FlagIcon from './FlagIcon';
import { countries } from '../data/countries.js';

const CountrySelector = ({ value, onChange, placeholder = "Select country" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Filtrar países según búsqueda
  const filteredCountries = countries.filter(country => {
    const searchLower = searchTerm.toLowerCase();
    return (
      country.name.toLowerCase().includes(searchLower) ||
      country.code.toLowerCase().includes(searchLower) ||
      country.dialCode.includes(searchTerm)
    );
  });

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (country) => {
    onChange(country);
    setIsOpen(false);
    setSearchTerm('');
  };

  const selectedCountry = countries.find(c => c.code === value) || countries[0]; // Default: US

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón selector */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <FlagIcon code={selectedCountry.code} size="md" />
        <span className="text-xs font-semibold">{selectedCountry.code}</span>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
          {/* Buscador */}
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search country..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>

          {/* Lista de países */}
          <div className="overflow-y-auto max-h-80">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left ${
                    value === country.code ? 'bg-blue-100' : ''
                  }`}
                >
                  <FlagIcon code={country.code} size="lg" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-gray-900">{country.name}</div>
                    <div className="text-xs text-gray-500">{country.code}</div>
                  </div>
                  <span className="text-sm text-gray-600 font-mono">{country.dialCode}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;