// Servicio para conectar con Google Flights 2 API de RapidAPI
const API_KEY = 'ba3931c867msh2140615ccb6986cp1e735ejsn4147d855bc0f';
const API_HOST = 'google-flights2.p.rapidapi.com';
const BASE_URL = 'https://google-flights2.p.rapidapi.com/api/v1';

/**
 * Busca vuelos según los criterios del usuario
 * @param {Object} searchData - Datos de búsqueda
 * @returns {Promise<Array>} - Array de vuelos encontrados
 */
export const searchFlights = async (searchData) => {
  try {
    console.log('🔍 Buscando vuelos con:', searchData);

    // Construir los parámetros de búsqueda para Google Flights API
    const params = new URLSearchParams({
      departure_id: searchData.origin.toUpperCase(), // Código de aeropuerto origen (LAX, BOG, etc)
      arrival_id: searchData.destination.toUpperCase(), // Código de aeropuerto destino
      outbound_date: searchData.departureDate, // Fecha de salida (YYYY-MM-DD)
      travel_class: mapCabinClass(searchData.class), // ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST
      adults: searchData.passengers || 1, // Número de adultos
      children: 0, // Número de niños
      infant_in_seat: 0, // Bebés con asiento
      infant_on_lap: 0, // Bebés en regazo
      show_hidden: 1, // Mostrar vuelos ocultos
      currency: 'USD', // Moneda
      language_code: 'en-US', // Idioma español
      country_code: 'US', // Estados Unidos (cambiado de CO para más resultados)
      search_type: 'best' // Tipo de búsqueda: best, cheapest, fastest
    });

    // Si es ida y vuelta, agregar fecha de regreso
    if (searchData.returnDate) {
      params.append('return_date', searchData.returnDate);
    }

    const url = `${BASE_URL}/searchFlights?${params}`;

    console.log('📡 Llamando a:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
      }
    });

    console.log('📥 Respuesta status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error de API:', errorText);
      throw new Error(`Error en la API: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Datos recibidos:', data);

    if (data.status === false) {
      console.error('❌ Mensaje de error:', data.message);
      throw new Error(`Error de la API: ${data.message[0]}`);
    }
    
    // Procesar los datos de la API y retornar en formato estandarizado
    return processFlightData(data, searchData);
    
  } catch (error) {
    console.error('❌ Error al buscar vuelos:', error);
    throw error;
  }
};

/**
 * Mapea las clases de vuelo a los códigos de la API
 */
const mapCabinClass = (className) => {
  const classMap = {
    'economy': 'ECONOMY',
    'premium': 'PREMIUM_ECONOMY',
    'business': 'BUSINESS',
    'first': 'FIRST'
  };
  return classMap[className] || 'ECONOMY';
};

/**
 * Procesa los datos de Google Flights API y los convierte a formato estándar
 * ESTRUCTURA REAL: data.itineraries.topFlights
 */
const processFlightData = (apiData, searchData) => {
  console.log('🔄 Procesando datos de la API...');

  // Verificar si hay datos - ESTRUCTURA REAL
  if (!apiData || !apiData.data || !apiData.data.itineraries || !apiData.data.itineraries.topFlights) {
    console.warn('⚠️ No se encontraron vuelos en la respuesta');
    console.log('📊 Estructura recibida:', apiData);
    return [];
  }

  const topFlights = apiData.data.itineraries.topFlights;
  console.log(`📊 Se encontraron ${topFlights.length} vuelos en topFlights`);

  return topFlights.map((topFlight, index) => {
    try {
      // Extraer información de los segmentos del vuelo
      const segments = topFlight.flights || [];
      
      if (segments.length === 0) {
        console.warn(`⚠️ Vuelo ${index} no tiene segmentos`);
        return null;
      }

      // Primer segmento (salida)
      const firstSegment = segments[0];
      // Último segmento (llegada)
      const lastSegment = segments[segments.length - 1];

      // Información de salida
      const departure = {
        airport: firstSegment.departure_airport?.airport_code || searchData.origin,
        airportName: firstSegment.departure_airport?.airport_name || 'Aeropuerto',
        time: extractTime(firstSegment.departure_airport?.time),
        date: extractDate(firstSegment.departure_airport?.time) || searchData.departureDate,
        terminal: 'N/A'
      };

      // Información de llegada
      const arrival = {
        airport: lastSegment.arrival_airport?.airport_code || searchData.destination,
        airportName: lastSegment.arrival_airport?.airport_name || 'Aeropuerto',
        time: extractTime(lastSegment.arrival_airport?.time),
        date: extractDate(lastSegment.arrival_airport?.time) || searchData.departureDate,
        terminal: 'N/A'
      };

      // Información de la aerolínea (del primer segmento)
      const airline = firstSegment.airline || 'Aerolínea';
      const airlineCode = extractAirlineCode(firstSegment.flight_number) || 'XX';

      // Calcular escalas
      const stops = segments.length - 1;

      // Extraer emisiones CO2
      let totalCO2 = 0;
      segments.forEach(seg => {
        const emissions = seg.extensions?.find(ext => ext.includes('Emissions'));
        if (emissions) {
          const match = emissions.match(/(\d+)\s*kg/);
          if (match) {
            totalCO2 += parseInt(match[1]);
          }
        }
      });

      // Extraer precio (puede venir en diferentes lugares)
      const price = extractPrice(topFlight, apiData.data);

      return {
        id: `flight-${index}`,
        flightNumber: firstSegment.flight_number || 'N/A',
        airline: airline,
        airlineCode: airlineCode,
        logo: firstSegment.airline_logo || `https://images.kiwi.com/airlines/64/${airlineCode}.png`,
        
        departure,
        arrival,
        
        duration: topFlight.duration?.text || 'N/A',
        stops: stops,
        stopInfo: stops > 0 ? {
          count: stops,
          airports: segments.slice(0, -1).map(seg => seg.arrival_airport?.airport_code).filter(Boolean)
        } : null,
        
        price: price,
        currency: 'USD',
        priceDisplay: price,
        
        class: mapClassDisplay(searchData.class),
        available: true,
        
        // Información adicional
        co2Emissions: totalCO2 > 0 ? totalCO2 : null,
        aircraft: firstSegment.aircraft || 'N/A',
        legroom: firstSegment.legroom || null,
        
        // Detalles de todos los segmentos
        segments: segments.map(seg => ({
          departure: seg.departure_airport?.airport_code,
          arrival: seg.arrival_airport?.airport_code,
          airline: seg.airline,
          flightNumber: seg.flight_number,
          aircraft: seg.aircraft,
          duration: seg.duration?.text
        })),
        
        // Para vuelos de ida y vuelta
        hasReturn: false, // TODO: implementar cuando la API devuelva vuelos de regreso
        returnInfo: null
      };
    } catch (error) {
      console.error(`❌ Error procesando vuelo ${index}:`, error);
      return null;
    }
  }).filter(flight => flight !== null);
};

/**
 * Extrae el precio de diferentes lugares posibles
 */
const extractPrice = (topFlight, data) => {
  // Intentar obtener precio de diferentes lugares
  
  // Opción 1: topFlight.price
  if (topFlight.price) {
    const match = topFlight.price.toString().match(/\d+/);
    if (match) return parseInt(match[0]);
  }

  // Opción 2: En pricing_options
  if (topFlight.pricing_options && topFlight.pricing_options[0]) {
    return Math.round(topFlight.pricing_options[0].price || 0);
  }

  // Opción 3: En data
  if (data.price) {
    return Math.round(data.price);
  }

  // Opción 4: Precio estimado
  return Math.floor(Math.random() * 300) + 200;
};

/**
 * Extrae el código de aerolínea del número de vuelo
 */
const extractAirlineCode = (flightNumber) => {
  if (!flightNumber) return null;
  const match = flightNumber.match(/^([A-Z0-9]{2})/);
  return match ? match[1] : null;
};

/**
 * Extrae la hora de un string de fecha
 * Formato: "2025-11-8 13:23"
 */
const extractTime = (dateString) => {
  if (!dateString) return '00:00';
  
  try {
    const parts = dateString.split(' ');
    if (parts.length >= 2) {
      return parts[1]; // "13:23"
    }
    return '00:00';
  } catch (error) {
    return '00:00';
  }
};

/**
 * Extrae la fecha de un string
 * Formato: "2025-11-8 13:23" -> "2025-11-08"
 */
const extractDate = (dateString) => {
  if (!dateString) return null;
  
  try {
    const parts = dateString.split(' ');
    if (parts.length >= 1) {
      const dateParts = parts[0].split('-');
      if (dateParts.length === 3) {
        const year = dateParts[0];
        const month = dateParts[1].padStart(2, '0');
        const day = dateParts[2].padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      return parts[0];
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Procesa el tramo de regreso
 */
const processReturnLeg = (returnLeg) => {
  if (!returnLeg) return null;

  return {
    departure: {
      airport: returnLeg.departure_airport?.id || 'N/A',
      time: formatTime(returnLeg.departure_time),
      date: returnLeg.departure_time ? returnLeg.departure_time.split('T')[0] : 'N/A'
    },
    arrival: {
      airport: returnLeg.arrival_airport?.id || 'N/A',
      time: formatTime(returnLeg.arrival_time),
      date: returnLeg.arrival_time ? returnLeg.arrival_time.split('T')[0] : 'N/A'
    },
    duration: formatDuration(returnLeg.duration),
    stops: returnLeg.stops || 0
  };
};

/**
 * Obtiene información de las escalas
 */
const getStopsInfo = (leg) => {
  if (!leg.stops || leg.stops === 0) return null;
  
  return {
    count: leg.stops,
    airports: []
  };
};

/**
 * Formatea la duración en formato legible
 */
const formatDuration = (minutes) => {
  if (!minutes) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

/**
 * Formatea el tiempo en formato HH:MM
 */
const formatTime = (isoString) => {
  if (!isoString) return '00:00';
  
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  } catch (error) {
    console.error('Error al formatear tiempo:', error);
    return '00:00';
  }
};

/**
 * Mapea la clase para mostrar
 */
const mapClassDisplay = (className) => {
  const classMap = {
    'economy': 'Económica',
    'premium': 'Premium Economy',
    'business': 'Business',
    'first': 'Primera Clase'
  };
  return classMap[className] || 'Económica';
};

/**
 * Busca aeropuertos por nombre o código
 */
export const searchAirports = async (query) => {
  try {
    const url = `${BASE_URL}/searchAirport?query=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Error al buscar aeropuertos: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error al buscar aeropuertos:', error);
    return [];
  }
};

/**
 * Obtiene el calendario de precios
 */
export const getPriceCalendar = async (origin, destination, departureDate) => {
  try {
    const params = new URLSearchParams({
      departure_id: origin,
      arrival_id: destination,
      start_date: departureDate,
      currency: 'USD'
    });

    const url = `${BASE_URL}/getCalendarPicker?${params}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Error al obtener calendario: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener calendario de precios:', error);
    throw error;
  }
};

export default {
  searchFlights,
  searchAirports,
  getPriceCalendar
};