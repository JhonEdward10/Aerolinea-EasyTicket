import React from 'react';
import Hero from '../components/Hero';
import SearchFlights from '../components/SearchFlights';

const Home = () => {
  return (
    <div id="inicio" className='scroll-mt-20'>
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
      <section id="contacto" className="py-16 bg-gradient-to-r from-primary to-blue-900 text-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* WhatsApp Button at Top */}
          <div className="mb-8">
            <a 
              href="https://wa.me/14053169901?text=Hello!%20I'm%20interested%20in%20booking%20a%20flight."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-orange-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-2xl transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-xs">Call to Talk to a Live Agent</span>
                <span className="font-bold">+1 (405) 316-9901</span>
              </div>
            </a>
          </div>

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