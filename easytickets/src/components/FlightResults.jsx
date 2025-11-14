import React, { useState, useMemo, useEffect } from 'react';
import { Plane, Clock, Award, Star, Check, X, Mail, Phone, User, MapPin, CreditCard, Calendar } from 'lucide-react';

const FlightResults = ({ flights, onFlightSelect, searchData }) => {
  const [sortBy, setSortBy] = useState('best');
  const [showModal, setShowModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState(null);
  const [quoteForm, setQuoteForm] = useState({
    from: searchData?.origin || '',
    to: searchData?.destination || '',
    email: '',
    phone: '',
    name: ''
  });

  /**
   * envia numero de whatsapp flotante
   */
  useEffect(() => {
    const fetchWhatsAppNumber = async () => {
      try {
        const response = await fetch('https://easyticketsapp.com/back/number.php');
        const data = await response.json();
        if (data.number) {
          setWhatsappNumber(data.number);
        }
      } catch (error) {
        console.error('Error fetching WhatsApp number:', error);
      }
    };
    
    fetchWhatsAppNumber();
  }, []);

  /**
   * Calculate antes del precio real
   */
  const calculateOriginalPrice = (currentPrice) => {
    return Math.round(currentPrice + 80);
  };

  /**
   * Calcular descuento porcentual
   */
  const calculateDiscount = (originalPrice, currentPrice) => {
    const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  /**
   * Duración en minutos para comparación
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
   * Criterios de vuelo ordenados
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
   * Separa mejor opcion
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
   * Handle en el formato de formulario de cotización
   */
  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepara datos de envio al backend
      const formData = new FormData();
      formData.append('from', quoteForm.from);
      formData.append('to', quoteForm.to);
      formData.append('email', quoteForm.email);
      formData.append('phone', quoteForm.phone);
      formData.append('name', quoteForm.name || '');
      formData.append('aerolinea', cheapestFlight.airline);
      formData.append('precio', `${cheapestFlight.price} USD`);
      formData.append('hora_vuelo', `${cheapestFlight.departure.date} ${cheapestFlight.departure.time}`);

      // Envia POST request
      const response = await fetch('https://easyticketsapp.com/back/vuelo.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('✅ Quote submitted successfully!\n\nWe will contact you soon.');
        // Limpia formulario
        setQuoteForm({
          from: searchData?.origin || '',
          to: searchData?.destination || '',
          email: '',
          phone: '',
          name: ''
        });
      } else {
        throw new Error('Error submitting quote');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ There was an error submitting your quote. Please try again.');
    }
  };

  /**
   * Handle Vuelo seleccion (opens modal)
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
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Sort by:</h3>
            <div className="text-sm text-gray-600">
              {flights.length} flight{flights.length !== 1 ? 's' : ''} found
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setSortBy('best')}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                sortBy === 'best' ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⭐ Best Option
            </button>
            <button
              onClick={() => setSortBy('cheapest')}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                sortBy === 'cheapest' ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              💰 Cheapest
            </button>
            <button
              onClick={() => setSortBy('fastest')}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                sortBy === 'fastest' ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⚡ Fastest
            </button>
            <button
              onClick={() => setSortBy('fewest-stops')}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                sortBy === 'fewest-stops' ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🎯 Fewest Stops
            </button>
          </div>
        </div>

        {/* FEATURED FLIGHT WITH FORM */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-2xl p-4 md:p-5 border-4 border-blue-200">
          {/* Deal of the Week Badge */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Deal of the Week</span>
            </div>
            <div className="bg-green-500 text-white px-3 py-1 rounded-full font-semibold text-xs">
              {calculateDiscount(calculateOriginalPrice(cheapestFlight.price), cheapestFlight.price)}% OFF
            </div>
          </div>

          {/* GRID: Flight + Form - SIDE BY SIDE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* FLIGHT (8 columns = 66%) */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-xl shadow-lg border-4 border-blue-400 h-full">
                <div className="p-3 sm:p-4 h-full flex flex-col justify-between">
                  {/* Flight content - VERTICAL */}
                  <div className="space-y-3 sm:space-y-4">
                    {/* Airline */}
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <img 
                        src={cheapestFlight.logo} 
                        alt={cheapestFlight.airline}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain flex-shrink-0"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/48x48/2563eb/ffffff?text=${cheapestFlight.airlineCode}`;
                        }}
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-gray-900 text-base sm:text-lg truncate">{cheapestFlight.airline}</div>
                        <div className="text-xs sm:text-sm text-gray-500 truncate">Flight {cheapestFlight.flightNumber}</div>
                      </div>
                    </div>

                    {/* Route and times */}
                    <div className="flex items-center justify-between">
                      {/* Departure */}
                      <div className="text-center flex-shrink-0">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">{cheapestFlight.departure.time}</div>
                        <div className="text-xs sm:text-sm font-semibold text-gray-700">{cheapestFlight.departure.airport}</div>
                        <div className="text-xs text-gray-500">{cheapestFlight.departure.date}</div>
                      </div>

                      {/* Duration and stops */}
                      <div className="flex-1 mx-2 sm:mx-4 min-w-0">
                        <div className="relative">
                          <div className="border-t-2 border-gray-300 relative">
                            <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary w-5 h-5 sm:w-6 sm:h-6 bg-white px-1" />
                          </div>
                          <div className="text-center mt-1 sm:mt-2">
                            <div className="text-xs sm:text-sm font-semibold text-gray-600">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                              {cheapestFlight.duration}
                            </div>
                            <div className="text-xs text-gray-500">
                              {cheapestFlight.stops === 0 ? (
                                <span className="text-green-600 font-semibold">Nonstop</span>
                              ) : (
                                <span>{cheapestFlight.stops} stop{cheapestFlight.stops > 1 ? 's' : ''}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Arrival */}
                      <div className="text-center flex-shrink-0">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">{cheapestFlight.arrival.time}</div>
                        <div className="text-xs sm:text-sm font-semibold text-gray-700">{cheapestFlight.arrival.airport}</div>
                        <div className="text-xs text-gray-500">{cheapestFlight.arrival.date}</div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-gray-700">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                        <span className="whitespace-nowrap">Lost Baggage Protection</span>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-gray-700">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                        <span className="whitespace-nowrap">Refund Assurance</span>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-gray-700">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                        <span className="whitespace-nowrap">Book Now, Pay Later</span>
                      </div>
                    </div>
                  </div>

                  {/* PRICE AND BUTTON BELOW */}
                  <div className="space-y-3 pt-4 border-t-2 border-gray-200">
                    <div className="text-center">
                      {/* Crossed-out price */}
                      <div className="text-gray-500">
                        <span className="text-lg sm:text-xl line-through">${calculateOriginalPrice(cheapestFlight.price)}</span>
                      </div>

                      {/* Current price highlighted */}
                      <div className="mt-2">
                        <div className="text-4xl sm:text-5xl font-bold text-primary">
                          ${cheapestFlight.price}
                          <span className="text-lg sm:text-xl align-top">*</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Total, per person
                        </div>
                      </div>

                      {/* Additional info */}
                      <div className="text-xs text-gray-500 space-y-1 mt-2">
                        <div>🎫 {cheapestFlight.class}</div>
                        {cheapestFlight.co2Emissions && (
                          <div>🌱 {cheapestFlight.co2Emissions} kg CO₂</div>
                        )}
                      </div>
                    </div>

                    {/* Selection button */}
                    <button
                      onClick={() => handleFlightSelection(cheapestFlight)}
                      className="w-full py-3 rounded-lg font-bold text-sm transition-all bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-xl"
                    >
                      🏆 Get an offer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM (4 columns = 33%) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-xl p-4 border-2 border-gray-200 sticky top-4">
                <div className="text-center mb-3">
                  <h3 className="text-lg font-bold text-gray-800">Get the Best Quote</h3>
                  <p className="text-xs text-gray-600 mt-1">Guaranteed</p>
                </div>

                <form onSubmit={handleQuoteSubmit} className="space-y-3">
                  {/* From and To in one line */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* From */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        From* <MapPin className="w-3 h-3 inline text-gray-400" />
                      </label>
                      <input
                        type="text"
                        name="from"
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
                        name="to"
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
                      name="email"
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
                      name="phone"
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
                      name="name"
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

        {/* More deals from our partners */}
        {otherFlights.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              More deals from our partners
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

      {/* BOOKING MODAL */}
      {showModal && selectedFlight && (
        <BookingModal 
          flight={selectedFlight}
          originalPrice={calculateOriginalPrice(selectedFlight.price)}
          onClose={() => setShowModal(false)}
          searchData={searchData}
        />
      )}

      {/* FLOATING WHATSAPP BUTTON
      {whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 transform hover:scale-110 z-50"
          title="Contact via WhatsApp"
        >
          <svg 
            className="w-8 h-8" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      )} */}
    </>
  );
};

/**
 * Individual flight card component
 */
const FlightCard = ({ flight, onSelect, isHighlighted = false, originalPrice }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
      isHighlighted ? 'border-4 border-blue-400' : 'border-2 border-gray-200'
    }`}>
      <div className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Flight information */}
          <div className="flex-1 space-y-4">
            {/* Airline */}
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
                <div className="text-sm text-gray-500">Flight {flight.flightNumber}</div>
              </div>
            </div>

            {/* Route and times */}
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
                        <span className="text-green-600 font-semibold">Nonstop</span>
                      ) : (
                        <span>{flight.stops} stop{flight.stops > 1 ? 's' : ''}</span>
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

            {/* Benefits */}
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

          {/* Price and button */}
          <div className={`${isHighlighted ? 'lg:w-72' : 'lg:w-64'} text-center space-y-4 border-l-0 lg:border-l-2 border-gray-200 lg:pl-6`}>
            <div className="text-gray-500">
              <span className="text-xl line-through">${originalPrice}</span>
            </div>

            <div>
              <div className={`${isHighlighted ? 'text-5xl' : 'text-4xl'} font-bold text-primary`}>
                ${flight.price}
                <span className="text-xl align-top">*</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">Total, per person</div>
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
              {isHighlighted ? '🏆 Book Best Deal' : 'Select Flight'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Booking modal
 */
const BookingModal = ({ flight, originalPrice, onClose, searchData }) => {
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [whatsappNumber, setWhatsappNumber] = useState(null);

  // Fetch WhatsApp number
  useEffect(() => {
    const fetchWhatsAppNumber = async () => {
      try {
        const response = await fetch('https://easyticketsapp.com/back/number.php');
        const data = await response.json();
        if (data.number) {
          setWhatsappNumber(data.number);
        }
      } catch (error) {
        console.error('Error fetching WhatsApp number:', error);
      }
    };
    
    fetchWhatsAppNumber();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!whatsappNumber) {
      alert('❌ WhatsApp contact not available. Please try again later.');
      return;
    }

    try {
      // Prepare data to send to backend
      const formData = new FormData();
      formData.append('from', flight.departure.airport);
      formData.append('to', flight.arrival.airport);
      formData.append('email', bookingData.email);
      formData.append('phone', bookingData.phone);
      formData.append('name', `${bookingData.firstName} ${bookingData.lastName}`);
      formData.append('aerolinea', flight.airline);
      formData.append('precio', `${flight.price} USD`);
      formData.append('hora_vuelo', `${flight.departure.date} ${flight.departure.time}`);

      // Send POST request
      await fetch('https://easyticketsapp.com/back/vuelo.php', {
        method: 'POST',
        body: formData
      });

      // Create WhatsApp message
      const message = `Hello! I'm interested in booking this flight:

        ✈️ Flight: ${flight.airline} ${flight.flightNumber}
        📍 Route: ${flight.departure.airport} → ${flight.arrival.airport}
        📅 Departure: ${flight.departure.date} at ${flight.departure.time}
        📅 Arrival: ${flight.arrival.date} at ${flight.arrival.time}
        ⏱️ Duration: ${flight.duration}
        💰 Price: $${flight.price}

        👤 Passenger: ${bookingData.firstName} ${bookingData.lastName}
        📧 Email: ${bookingData.email}
        📞 Phone: ${bookingData.phone}

        I'd like to proceed with the booking. Thank you!`;

      // Encode message for URL
      const encodedMessage = encodeURIComponent(message);
      
      // Redirect to WhatsApp
       window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
      
      // Close modal
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('❌ There was an error. Please try again.');
    }
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
          <h2 className="text-3xl font-bold mb-2">✈️ Book Your Flight</h2>
          <p className="text-blue-100">Contact us via WhatsApp to complete your booking</p>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Flight summary */}
          <div className="bg-blue-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Flight Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Airline</p>
                <p className="font-semibold">{flight.airline} - {flight.flightNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Route</p>
                <p className="font-semibold">{flight.departure.airport} → {flight.arrival.airport}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Departure</p>
                <p className="font-semibold">{flight.departure.date} - {flight.departure.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Arrival</p>
                <p className="font-semibold">{flight.arrival.date} - {flight.arrival.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold">{flight.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Price</p>
                <p className="text-2xl font-bold text-primary">${flight.price}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Your Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name *
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
                  Last Name *
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
                  Phone *
                </label>
                <input
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Info box */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-start space-x-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <div className="text-sm text-green-800">
                <p className="font-semibold mb-1">📱 You'll be redirected to WhatsApp</p>
                <p>After submitting, you'll be connected with our team via WhatsApp to complete your booking and payment.</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Contact via WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FlightResults;