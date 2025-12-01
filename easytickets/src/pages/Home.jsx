import React from 'react';
import SearchFlights from '../components/SearchFlights';
import Hero from '../components/Hero';
import SearchHero from '../components/SearchHero';
import Testimonials from '../components/Testimonials';
import PromoModal from '../components/Promomodal';
import EmailCaptureModal from '../components/Emailcapturemodal';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <div id="inicio" className='scroll-mt-20'>

      <EmailCaptureModal />
      <PromoModal />
      
      {/* SearchHero con carrusel de imágenes de fondo */}
      <SearchHero />

      {/* Hero SEGUNDO - después del buscador */}
      <Hero />

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

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <Newsletter />
      
    </div>
  );
};

export default Home;


























