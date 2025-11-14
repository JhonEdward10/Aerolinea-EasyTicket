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
              Why choose <span className="text-secondary">EasyTickets</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make your travel experience simple, safe, and affordable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Best Prices</h3>
              <p className="text-gray-600">
                We compare thousands of flights to offer you the best fares on the market
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                Your information is protected with the highest encryption technology
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="text-5xl mb-4">🎧</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 support</h3>
              <p className="text-gray-600">
                Our team is available at all times to help you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe to Our Offers
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Receive the best promotions directly in your email
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button type="submit" className="btn-secondary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;