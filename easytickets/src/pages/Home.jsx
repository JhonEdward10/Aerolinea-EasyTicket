import React from 'react';
import Hero from '../components/Hero';
import SearchFlights from '../components/SearchFlights';

const Home = () => {
  return (
    <div id="inicio">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchFlights />
      </div>

      {/* Simple CTA Section */}
      <section className="py-16 bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir <span className="text-secondary">EasyTickets</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hacemos que tu experiencia de viaje sea sencilla, segura y económica
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Mejores Precios</h3>
              <p className="text-gray-600">
                Comparamos miles de vuelos para ofrecerte las mejores tarifas del mercado
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pago Seguro</h3>
              <p className="text-gray-600">
                Tu información está protegida con la más alta tecnología de encriptación
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="text-5xl mb-4">🎧</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Soporte 24/7</h3>
              <p className="text-gray-600">
                Nuestro equipo está disponible en todo momento para ayudarte
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Suscríbete a Nuestras Ofertas
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Recibe las mejores promociones directamente en tu correo
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button type="submit" className="btn-secondary whitespace-nowrap">
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;