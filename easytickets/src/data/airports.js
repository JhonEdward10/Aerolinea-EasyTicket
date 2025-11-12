/**
 * Códigos IATA validados
 * Para agregar nuevos aeropuertos:
 * { code: 'XXX', city: 'Ciudad', country: 'País', name: 'Nombre completo del aeropuerto' }
 */

export const AIRPORTS = [
  // ====================================
  // COLOMBIA
  // ====================================
  { code: 'BOG', city: 'Bogotá', country: 'Colombia', name: 'El Dorado International Airport' },
  { code: 'MDE', city: 'Medellín', country: 'Colombia', name: 'José María Córdova International Airport' },
  { code: 'CTG', city: 'Cartagena', country: 'Colombia', name: 'Rafael Núñez International Airport' },
  { code: 'CLO', city: 'Cali', country: 'Colombia', name: 'Alfonso Bonilla Aragón International Airport' },
  { code: 'BAQ', city: 'Barranquilla', country: 'Colombia', name: 'Ernesto Cortissoz International Airport' },
  { code: 'SMR', city: 'Santa Marta', country: 'Colombia', name: 'Simón Bolívar International Airport' },
  { code: 'PEI', city: 'Pereira', country: 'Colombia', name: 'Matecaña International Airport' },
  { code: 'ADZ', city: 'San Andrés', country: 'Colombia', name: 'Gustavo Rojas Pinilla International Airport' },
  { code: 'BUN', city: 'Bucaramanga', country: 'Colombia', name: 'Palonegro International Airport' },
  { code: 'MTR', city: 'Montería', country: 'Colombia', name: 'Los Garzones Airport' },
  
  // ====================================
  // ESTADOS UNIDOS - COSTA ESTE
  // ====================================
  { code: 'JFK', city: 'New York', country: 'United States', name: 'John F. Kennedy International Airport' },
  { code: 'LGA', city: 'New York', country: 'United States', name: 'LaGuardia Airport' },
  { code: 'EWR', city: 'Newark', country: 'United States', name: 'Newark Liberty International Airport' },
  { code: 'MIA', city: 'Miami', country: 'United States', name: 'Miami International Airport' },
  { code: 'FLL', city: 'Fort Lauderdale', country: 'United States', name: 'Fort Lauderdale-Hollywood International Airport' },
  { code: 'MCO', city: 'Orlando', country: 'United States', name: 'Orlando International Airport' },
  { code: 'TPA', city: 'Tampa', country: 'United States', name: 'Tampa International Airport' },
  { code: 'ATL', city: 'Atlanta', country: 'United States', name: 'Hartsfield-Jackson Atlanta International Airport' },
  { code: 'BOS', city: 'Boston', country: 'United States', name: 'Logan International Airport' },
  { code: 'BWI', city: 'Baltimore', country: 'United States', name: 'Baltimore/Washington International Airport' },
  { code: 'DCA', city: 'Washington', country: 'United States', name: 'Ronald Reagan Washington National Airport' },
  { code: 'IAD', city: 'Washington', country: 'United States', name: 'Washington Dulles International Airport' },
  { code: 'PHL', city: 'Philadelphia', country: 'United States', name: 'Philadelphia International Airport' },
  { code: 'CLT', city: 'Charlotte', country: 'United States', name: 'Charlotte Douglas International Airport' },
  
  // ====================================
  // ESTADOS UNIDOS - COSTA OESTE
  // ====================================
  { code: 'LAX', city: 'Los Angeles', country: 'United States', name: 'Los Angeles International Airport' },
  { code: 'SFO', city: 'San Francisco', country: 'United States', name: 'San Francisco International Airport' },
  { code: 'SAN', city: 'San Diego', country: 'United States', name: 'San Diego International Airport' },
  { code: 'SEA', city: 'Seattle', country: 'United States', name: 'Seattle-Tacoma International Airport' },
  { code: 'PDX', city: 'Portland', country: 'United States', name: 'Portland International Airport' },
  { code: 'LAS', city: 'Las Vegas', country: 'United States', name: 'Harry Reid International Airport' },
  { code: 'PHX', city: 'Phoenix', country: 'United States', name: 'Phoenix Sky Harbor International Airport' },
  
  // ====================================
  // ESTADOS UNIDOS - CENTRO
  // ====================================
  { code: 'ORD', city: 'Chicago', country: 'United States', name: "O'Hare International Airport" },
  { code: 'MDW', city: 'Chicago', country: 'United States', name: 'Midway International Airport' },
  { code: 'DFW', city: 'Dallas', country: 'United States', name: 'Dallas/Fort Worth International Airport' },
  { code: 'IAH', city: 'Houston', country: 'United States', name: 'George Bush Intercontinental Airport' },
  { code: 'HOU', city: 'Houston', country: 'United States', name: 'William P. Hobby Airport' },
  { code: 'DEN', city: 'Denver', country: 'United States', name: 'Denver International Airport' },
  { code: 'MSP', city: 'Minneapolis', country: 'United States', name: 'Minneapolis-St Paul International Airport' },
  { code: 'DTW', city: 'Detroit', country: 'United States', name: 'Detroit Metropolitan Airport' },
  { code: 'STL', city: 'St. Louis', country: 'United States', name: 'St. Louis Lambert International Airport' },
  
  // ====================================
  // MÉXICO
  // ====================================
  { code: 'MEX', city: 'Mexico City', country: 'Mexico', name: 'Mexico City International Airport' },
  { code: 'CUN', city: 'Cancún', country: 'Mexico', name: 'Cancún International Airport' },
  { code: 'GDL', city: 'Guadalajara', country: 'Mexico', name: 'Miguel Hidalgo y Costilla Guadalajara International Airport' },
  { code: 'MTY', city: 'Monterrey', country: 'Mexico', name: 'General Mariano Escobedo International Airport' },
  { code: 'TIJ', city: 'Tijuana', country: 'Mexico', name: 'Tijuana International Airport' },
  { code: 'PVR', city: 'Puerto Vallarta', country: 'Mexico', name: 'Licenciado Gustavo Díaz Ordaz International Airport' },
  { code: 'SJD', city: 'Los Cabos', country: 'Mexico', name: 'Los Cabos International Airport' },
  
  // ====================================
  // CENTROAMÉRICA
  // ====================================
  { code: 'PTY', city: 'Panama City', country: 'Panama', name: 'Tocumen International Airport' },
  { code: 'SJO', city: 'San José', country: 'Costa Rica', name: 'Juan Santamaría International Airport' },
  { code: 'SAL', city: 'San Salvador', country: 'El Salvador', name: 'Monseñor Óscar Arnulfo Romero International Airport' },
  { code: 'GUA', city: 'Guatemala City', country: 'Guatemala', name: 'La Aurora International Airport' },
  
  // ====================================
  // AMÉRICA DEL SUR
  // ====================================
  { code: 'LIM', city: 'Lima', country: 'Peru', name: 'Jorge Chávez International Airport' },
  { code: 'UIO', city: 'Quito', country: 'Ecuador', name: 'Mariscal Sucre International Airport' },
  { code: 'GYE', city: 'Guayaquil', country: 'Ecuador', name: 'José Joaquín de Olmedo International Airport' },
  { code: 'SCL', city: 'Santiago', country: 'Chile', name: 'Arturo Merino Benítez International Airport' },
  { code: 'EZE', city: 'Buenos Aires', country: 'Argentina', name: 'Ministro Pistarini International Airport' },
  { code: 'GRU', city: 'São Paulo', country: 'Brazil', name: 'São Paulo/Guarulhos International Airport' },
  { code: 'GIG', city: 'Rio de Janeiro', country: 'Brazil', name: 'Rio de Janeiro/Galeão International Airport' },
  { code: 'BSB', city: 'Brasília', country: 'Brazil', name: 'Brasília International Airport' },
  { code: 'CCS', city: 'Caracas', country: 'Venezuela', name: 'Simón Bolívar International Airport' },
  
  // ====================================
  // ESPAÑA
  // ====================================
  { code: 'MAD', city: 'Madrid', country: 'Spain', name: 'Adolfo Suárez Madrid-Barajas Airport' },
  { code: 'BCN', city: 'Barcelona', country: 'Spain', name: 'Barcelona-El Prat Airport' },
  { code: 'AGP', city: 'Málaga', country: 'Spain', name: 'Málaga-Costa del Sol Airport' },
  { code: 'SVQ', city: 'Seville', country: 'Spain', name: 'Seville Airport' },
  { code: 'VLC', city: 'Valencia', country: 'Spain', name: 'Valencia Airport' },
  { code: 'PMI', city: 'Palma de Mallorca', country: 'Spain', name: 'Palma de Mallorca Airport' },
  
  // ====================================
  // FRANCIA
  // ====================================
  { code: 'CDG', city: 'Paris', country: 'France', name: 'Charles de Gaulle Airport' },
  { code: 'ORY', city: 'Paris', country: 'France', name: 'Orly Airport' },
  { code: 'NCE', city: 'Nice', country: 'France', name: 'Nice Côte d\'Azur Airport' },
  { code: 'LYS', city: 'Lyon', country: 'France', name: 'Lyon-Saint Exupéry Airport' },
  { code: 'MRS', city: 'Marseille', country: 'France', name: 'Marseille Provence Airport' },
  
  // ====================================
  // REINO UNIDO
  // ====================================
  { code: 'LHR', city: 'London', country: 'United Kingdom', name: 'Heathrow Airport' },
  { code: 'LGW', city: 'London', country: 'United Kingdom', name: 'Gatwick Airport' },
  { code: 'STN', city: 'London', country: 'United Kingdom', name: 'Stansted Airport' },
  { code: 'LCY', city: 'London', country: 'United Kingdom', name: 'London City Airport' },
  { code: 'MAN', city: 'Manchester', country: 'United Kingdom', name: 'Manchester Airport' },
  { code: 'EDI', city: 'Edinburgh', country: 'United Kingdom', name: 'Edinburgh Airport' },
  
  // ====================================
  // ALEMANIA
  // ====================================
  { code: 'FRA', city: 'Frankfurt', country: 'Germany', name: 'Frankfurt Airport' },
  { code: 'MUC', city: 'Munich', country: 'Germany', name: 'Munich Airport' },
  { code: 'TXL', city: 'Berlin', country: 'Germany', name: 'Berlin Tegel Airport' },
  { code: 'DUS', city: 'Düsseldorf', country: 'Germany', name: 'Düsseldorf Airport' },
  
  // ====================================
  // ITALIA
  // ====================================
  { code: 'FCO', city: 'Rome', country: 'Italy', name: 'Leonardo da Vinci-Fiumicino Airport' },
  { code: 'MXP', city: 'Milan', country: 'Italy', name: 'Milan Malpensa Airport' },
  { code: 'VCE', city: 'Venice', country: 'Italy', name: 'Venice Marco Polo Airport' },
  { code: 'NAP', city: 'Naples', country: 'Italy', name: 'Naples International Airport' },
  
  // ====================================
  // PAÍSES BAJOS
  // ====================================
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands', name: 'Amsterdam Airport Schiphol' },
  
  // ====================================
  // PORTUGAL
  // ====================================
  { code: 'LIS', city: 'Lisbon', country: 'Portugal', name: 'Lisbon Portela Airport' },
  { code: 'OPO', city: 'Porto', country: 'Portugal', name: 'Porto Airport' },
  
  // ====================================
  // OTROS EUROPA
  // ====================================
  { code: 'ZRH', city: 'Zurich', country: 'Switzerland', name: 'Zurich Airport' },
  { code: 'VIE', city: 'Vienna', country: 'Austria', name: 'Vienna International Airport' },
  { code: 'BRU', city: 'Brussels', country: 'Belgium', name: 'Brussels Airport' },
  { code: 'CPH', city: 'Copenhagen', country: 'Denmark', name: 'Copenhagen Airport' },
  { code: 'ARN', city: 'Stockholm', country: 'Sweden', name: 'Stockholm Arlanda Airport' },
  { code: 'OSL', city: 'Oslo', country: 'Norway', name: 'Oslo Airport' },
  
  // ====================================
  // CANADÁ
  // ====================================
  { code: 'YYZ', city: 'Toronto', country: 'Canada', name: 'Toronto Pearson International Airport' },
  { code: 'YVR', city: 'Vancouver', country: 'Canada', name: 'Vancouver International Airport' },
  { code: 'YUL', city: 'Montreal', country: 'Canada', name: 'Montréal-Pierre Elliott Trudeau International Airport' },
  { code: 'YYC', city: 'Calgary', country: 'Canada', name: 'Calgary International Airport' }
];

/**
 * Aeropuertos más populares (para mostrar por defecto)
 */
export const POPULAR_AIRPORTS = ['BOG', 'MDE', 'CTG', 'LAX', 'JFK', 'MIA', 'MAD', 'BCN', 'CDG', 'LHR'];

/**
 * Buscar aeropuertos por término
 * @param {string} searchTerm - Término de búsqueda
 * @param {number} limit - Número máximo de resultados (default: 10)
 * @returns {Array} - Array de aeropuertos filtrados
 */
export const searchAirports = (searchTerm, limit = 10) => {
  if (!searchTerm || searchTerm.length === 0) {
    return AIRPORTS.filter(a => POPULAR_AIRPORTS.includes(a.code));
  }

  const searchLower = searchTerm.toLowerCase();
  
  return AIRPORTS.filter(airport => 
    airport.code.toLowerCase().includes(searchLower) ||
    airport.city.toLowerCase().includes(searchLower) ||
    airport.country.toLowerCase().includes(searchLower) ||
    airport.name.toLowerCase().includes(searchLower)
  ).slice(0, limit);
};

/**
 * Obtener aeropuerto por código IATA
 * @param {string} code - Código IATA (ej: "LAX", "BOG")
 * @returns {Object|null} - Aeropuerto encontrado o null
 */
export const getAirportByCode = (code) => {
  if (!code) return null;
  return AIRPORTS.find(a => a.code === code.toUpperCase());
};

/**
 * Obtener aeropuertos por país
 * @param {string} country - Nombre del país
 * @returns {Array} - Array de aeropuertos del país
 */
export const getAirportsByCountry = (country) => {
  return AIRPORTS.filter(a => 
    a.country.toLowerCase() === country.toLowerCase()
  );
};

/**
 * Validar si un código IATA existe
 * @param {string} code - Código IATA
 * @returns {boolean} - true si existe, false si no
 */
export const isValidIATACode = (code) => {
  return AIRPORTS.some(a => a.code === code.toUpperCase());
};

export default {
  AIRPORTS,
  POPULAR_AIRPORTS,
  searchAirports,
  getAirportByCode,
  getAirportsByCountry,
  isValidIATACode
};
