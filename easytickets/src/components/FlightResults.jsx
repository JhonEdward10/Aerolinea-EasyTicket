import React, { useState, useMemo } from 'react';
import { Plane, Clock, Award, Star, Check, X, Mail, Phone, User, MapPin, CreditCard, Calendar } from 'lucide-react';

const FlightResults = ({ flights, onFlightSelect, searchData }) => {
  const [sortBy, setSortBy] = useState('best');
  const [showModal, setShowModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [quoteForm, setQuoteForm] = useState({
    from: searchData?.origin || '',
    to: searchData?.destination || '',
    email: '',
    phone: '',
    name: ''
  });

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

  /**
   * Manejar envío de formulario de cotización
   */
  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Cotización solicitada!\n\nDe: ${quoteForm.from}\nA: ${quoteForm.to}\nEmail: ${quoteForm.email}\nTeléfono: ${quoteForm.phone}\n\nNos contactaremos contigo pronto.`);
  };

  /**
   * Manejar selección de vuelo (abre modal)
   */
  const handleFlightSelection = (flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
    if (onFlightSelect) {
      onFlightSelect(flight);
    }
  };

  if (flights.length === 0) {
    return null;
  }

  return (
    <>
      <div className="space-y-8">
        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Ordenar por:</h3>
            <div className="text-sm text-gray-600">
              {flights.length} vuelo{flights.length !== 1 ? 's' : ''} encontrado{flights.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setSortBy('best')}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                sortBy === 'best' ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⭐ Mejor Opción
            </button>
            <button
              onClick={() => setSortBy('cheapest')}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                sortBy === 'cheapest' ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              💰 Más Económico
            </button>
            <button
              onClick={() => setSortBy('fastest')}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                sortBy === 'fastest' ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⚡ Más Rápido
            </button>
            <button
              onClick={() => setSortBy('fewest-stops')}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                sortBy === 'fewest-stops' ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🎯 Menos Escalas
            </button>
          </div>
        </div>

        {/* VUELO DESTACADO CON FORMULARIO */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-2xl p-4 md:p-5 border-4 border-blue-200">
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

          {/* GRID: Vuelo + Formulario - LADO A LADO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* VUELO (8 columnas = 66%) */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-xl shadow-lg border-4 border-blue-400 h-full">
                <div className="p-4 h-full flex flex-col justify-between">
                  {/* Contenido del vuelo - TODO VERTICAL */}
                  <div className="space-y-4">
                    {/* Aerolínea */}
                    <div className="flex items-center space-x-3">
                      <img 
                        src={cheapestFlight.logo} 
                        alt={cheapestFlight.airline}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/48x48/2563eb/ffffff?text=${cheapestFlight.airlineCode}`;
                        }}
                      />
                      <div>
                        <div className="font-bold text-gray-900 text-lg">{cheapestFlight.airline}</div>
                        <div className="text-sm text-gray-500">Vuelo {cheapestFlight.flightNumber}</div>
                      </div>
                    </div>

                    {/* Ruta y horarios */}
                    <div className="flex items-center justify-between">
                      {/* Salida */}
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">{cheapestFlight.departure.time}</div>
                        <div className="text-sm font-semibold text-gray-700">{cheapestFlight.departure.airport}</div>
                        <div className="text-xs text-gray-500">{cheapestFlight.departure.date}</div>
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
                              {cheapestFlight.duration}
                            </div>
                            <div className="text-xs text-gray-500">
                              {cheapestFlight.stops === 0 ? (
                                <span className="text-green-600 font-semibold">Directo</span>
                              ) : (
                                <span>{cheapestFlight.stops} escala{cheapestFlight.stops > 1 ? 's' : ''}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Llegada */}
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">{cheapestFlight.arrival.time}</div>
                        <div className="text-sm font-semibold text-gray-700">{cheapestFlight.arrival.airport}</div>
                        <div className="text-xs text-gray-500">{cheapestFlight.arrival.date}</div>
                      </div>
                    </div>

                    {/* Beneficios */}
                    <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center space-x-2 text-xs text-gray-700">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Lost Baggage Protection</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-700">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Refund Assurance</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-700">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Book Now, Pay Later</span>
                      </div>
                    </div>
                  </div>

                  {/* PRECIO Y BOTÓN ABAJO */}
                  <div className="space-y-3 pt-4 border-t-2 border-gray-200">
                    <div className="text-center">
                      {/* Precio anterior tachado */}
                      <div className="text-gray-500">
                        <span className="text-xl line-through">${calculateOriginalPrice(cheapestFlight.price)}</span>
                      </div>

                      {/* Precio actual destacado */}
                      <div className="mt-2">
                        <div className="text-5xl font-bold text-primary">
                          ${cheapestFlight.price}
                          <span className="text-xl align-top">*</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Total, por persona
                        </div>
                      </div>

                      {/* Información adicional */}
                      <div className="text-xs text-gray-500 space-y-1 mt-2">
                        <div>🎫 {cheapestFlight.class}</div>
                        {cheapestFlight.co2Emissions && (
                          <div>🌱 {cheapestFlight.co2Emissions} kg CO₂</div>
                        )}
                      </div>
                    </div>

                    {/* Botón de selección */}
                    <button
                      onClick={() => handleFlightSelection(cheapestFlight)}
                      className="w-full py-3 rounded-lg font-bold text-sm transition-all bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-xl"
                    >
                      🏆 Reservar Mejor Oferta
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* FORMULARIO (4 columnas = 33%) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-xl p-4 border-2 border-gray-200 sticky top-4">
              <div className="text-center mb-3">
                <h3 className="text-lg font-bold text-gray-800">Get the Best Quote</h3>
                <p className="text-xs text-gray-600 mt-1">Guaranteed</p>
              </div>

              <form onSubmit={handleQuoteSubmit} className="space-y-3">
                {/* From y To en una línea */}
                <div className="grid grid-cols-2 gap-2">
                  {/* From */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      From* <MapPin className="w-3 h-3 inline text-gray-400" />
                    </label>
                    <input
                      type="text"
                      value={quoteForm.from}
                      onChange={(e) => setQuoteForm({...quoteForm, from: e.target.value})}
                      placeholder="BOG"
                      className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                      required
                    />
                  </div>

                  {/* To */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      To* <MapPin className="w-3 h-3 inline text-gray-400" />
                    </label>
                    <input
                      type="text"
                      value={quoteForm.to}
                      onChange={(e) => setQuoteForm({...quoteForm, to: e.target.value})}
                      placeholder="JFK"
                      className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email* <Mail className="w-3 h-3 inline text-gray-400" />
                  </label>
                  <input
                    type="email"
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number* <Phone className="w-3 h-3 inline text-gray-400" />
                  </label>
                  <input
                    type="tel"
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                    placeholder="+1 234 567 8900"
                    className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                {/* Name (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Name (Optional) <User className="w-3 h-3 inline text-gray-400" />
                  </label>
                  <input
                    type="text"
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg text-sm"
                >
                  GET A FREE QUOTE
                </button>

                <p className="text-xs text-gray-500 text-center leading-tight">
                  By providing my contact details I agree to be contacted for travel information via phone, text messages and email.
                </p>
              </form>
              </div>
            </div>
          </div>
        </div>

        {/* Más ofertas de nuestros partners */}
        {otherFlights.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Más ofertas de nuestros partners
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              {otherFlights.map((flight) => (
                <FlightCard 
                  key={flight.id}
                  flight={flight} 
                  onSelect={handleFlightSelection}
                  isHighlighted={false}
                  originalPrice={calculateOriginalPrice(flight.price)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL DE RESERVA */}
      {showModal && selectedFlight && (
        <BookingModal 
          flight={selectedFlight}
          originalPrice={calculateOriginalPrice(selectedFlight.price)}
          onClose={() => setShowModal(false)}
          searchData={searchData}
        />
      )}
    </>
  );
};

/**
 * Componente individual de tarjeta de vuelo
 */
const FlightCard = ({ flight, onSelect, isHighlighted = false, originalPrice }) => {
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
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{flight.departure.time}</div>
                <div className="text-sm font-semibold text-gray-700">{flight.departure.airport}</div>
                <div className="text-xs text-gray-500">{flight.departure.date}</div>
              </div>

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
          <div className={`${isHighlighted ? 'lg:w-72' : 'lg:w-64'} text-center space-y-4 border-l-0 lg:border-l-2 border-gray-200 lg:pl-6`}>
            <div className="text-gray-500">
              <span className="text-xl line-through">${originalPrice}</span>
            </div>

            <div>
              <div className={`${isHighlighted ? 'text-5xl' : 'text-4xl'} font-bold text-primary`}>
                ${flight.price}
                <span className="text-xl align-top">*</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">Total, por persona</div>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <div>🎫 {flight.class}</div>
              {flight.co2Emissions && (
                <div>🌱 {flight.co2Emissions} kg CO₂</div>
              )}
            </div>

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

/**
 * Modal de reserva
 */
const BookingModal = ({ flight, originalPrice, onClose, searchData }) => {
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passportNumber: '',
    dateOfBirth: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ ¡Reserva Confirmada!\n\nVuelo: ${flight.flightNumber}\nRuta: ${flight.departure.airport} → ${flight.arrival.airport}\nPasajero: ${bookingData.firstName} ${bookingData.lastName}\nEmail: ${bookingData.email}\n\nRecibirás la confirmación por email.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-bold mb-2">✈️ Completar Reserva</h2>
          <p className="text-blue-100">Estás a un paso de reservar tu vuelo</p>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Resumen del vuelo */}
          <div className="bg-blue-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Resumen del Vuelo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Aerolínea</p>
                <p className="font-semibold">{flight.airline} - {flight.flightNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ruta</p>
                <p className="font-semibold">{flight.departure.airport} → {flight.arrival.airport}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Salida</p>
                <p className="font-semibold">{flight.departure.date} - {flight.departure.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Llegada</p>
                <p className="font-semibold">{flight.arrival.date} - {flight.arrival.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duración</p>
                <p className="font-semibold">{flight.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Precio Total</p>
                <p className="text-2xl font-bold text-primary">${flight.price}</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Información del Pasajero</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={bookingData.firstName}
                  onChange={(e) => setBookingData({...bookingData, firstName: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Apellido *
                </label>
                <input
                  type="text"
                  value={bookingData.lastName}
                  onChange={(e) => setBookingData({...bookingData, lastName: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Número de Pasaporte *
                </label>
                <input
                  type="text"
                  value={bookingData.passportNumber}
                  onChange={(e) => setBookingData({...bookingData, passportNumber: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fecha de Nacimiento *
                </label>
                <input
                  type="date"
                  value={bookingData.dateOfBirth}
                  onChange={(e) => setBookingData({...bookingData, dateOfBirth: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-lg transition-all shadow-lg"
              >
                💳 Confirmar y Pagar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FlightResults;


