import React, { useState } from 'react';
import { X } from 'lucide-react';

const Newsletter = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEmail('');
    setPhone('');
    setAgreed(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !phone) {
      alert('Please fill in both email and phone number');
      return;
    }
    
    if (!agreed) {
      alert('Please agree to receive promotional messages');
      return;
    }

    try {
      console.log('📤 Enviando datos al backend...');
      
      const formData = new FormData();
      formData.append('email', email);
      formData.append('phone', phone);
      
      console.log('📦 Datos a enviar (FormData):');
      console.log('  - email:', email);
      console.log('  - phone:', phone);
      
      const response = await fetch('https://easyticketsapp.com/back/banner.php', {
        method: 'POST',
        body: formData
      });

      console.log('📥 Respuesta del servidor:', response.status);

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Datos guardados:', data);
      
      setShowConfirmation(true);
      
    } catch (error) {
      console.error('❌ Error al enviar datos:', error);
      alert('There was an error saving your information. Please try again.');
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setShowModal(false);
    setEmail('');
    setPhone('');
    setAgreed(false);
  };

  // Modal de confirmación
  if (showConfirmation) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleCloseConfirmation}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleCloseConfirmation}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Thank You!
          </h2>

          <p className="text-gray-700 mb-2 text-lg font-semibold">
            We received your information
          </p>
          
          <p className="text-gray-600 mb-6">
            An EasyTickets representative will contact you shortly to help you find the best flight deals.
          </p>

          <div className="bg-orange-50 border-2 border-secondary rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 mb-2">
              Your <span className="font-bold text-primary">$30 OFF</span> Voucher code:
            </p>
            <div className="bg-secondary text-white font-bold text-2xl py-3 px-4 rounded inline-block">
              ASAP30
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            📞 Expect a call from us soon!
          </p>

          <button
            onClick={handleCloseConfirmation}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    );
  }

  // Modal del formulario
  if (showModal) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mb-4">
            <svg className="w-20 h-20 mx-auto" viewBox="0 0 200 200" fill="none">
              <path d="M40 80 L100 110 L160 80 L160 140 L40 140 Z" fill="#ff6b35" />
              <path d="M40 80 L100 110 L160 80 L160 70 L40 70 Z" fill="#f97316" />
              <path d="M40 70 L100 100 L160 70" stroke="#ea580c" strokeWidth="2" fill="none" />
              <rect x="70" y="40" width="60" height="50" fill="#1e3a8a" rx="4" />
              <text x="100" y="60" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#ffffff">%</text>
              <line x1="75" y1="70" x2="90" y2="50" stroke="#ffffff" strokeWidth="2" />
              <line x1="110" y1="70" x2="125" y2="50" stroke="#ffffff" strokeWidth="2" />
              <line x1="85" y1="25" x2="90" y2="35" stroke="#ff6b35" strokeWidth="2" />
              <line x1="100" y1="20" x2="100" y2="30" stroke="#ff6b35" strokeWidth="2" />
              <line x1="115" y1="25" x2="110" y2="35" stroke="#ff6b35" strokeWidth="2" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-primary mb-1">
            Save $30 Instantly
          </h2>
          <h3 className="text-xl font-bold text-secondary mb-3">
            on Your Next Flight
          </h3>

          <p className="text-sm text-gray-600 mb-4 text-center">
            Join 2.5M+ travelers getting insider access to flight deals.<br />
            Subscribe now and get your exclusive $30 voucher!
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your best email"
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />

            <div className="flex space-x-2">
              <div className="flex items-center px-2 py-2.5 border border-gray-300 rounded-lg bg-gray-50">
                <svg className="w-6 h-4 mr-1" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
                  <rect width="60" height="30" fill="#B22234"/>
                  <rect y="2.3" width="60" height="2.3" fill="#FFF"/>
                  <rect y="6.9" width="60" height="2.3" fill="#FFF"/>
                  <rect y="11.5" width="60" height="2.3" fill="#FFF"/>
                  <rect y="16.1" width="60" height="2.3" fill="#FFF"/>
                  <rect y="20.7" width="60" height="2.3" fill="#FFF"/>
                  <rect y="25.3" width="60" height="2.3" fill="#FFF"/>
                  <rect width="24" height="13.8" fill="#3C3B6E"/>
                </svg>
                <span className="text-xs font-semibold">US</span>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="agree-newsletter"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-3.5 h-3.5 mt-1"
              />
              <label htmlFor="agree-newsletter" className="text-xs">
                I agree to receive promotional SMS texts via an autodialer, and this agreement isn't a condition of purchase. I also agree to{' '}
                <a href="#" className="text-secondary underline">T&Cs</a> and{' '}
                <a href="#" className="text-secondary underline">Privacy Policy</a>. Up to 5 Msgs/month. Msg & Data rates may apply.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-secondary hover:bg-green-600 text-white font-bold py-3 text-sm rounded-lg transition-all shadow-lg transform hover:scale-105"
            >
              Subscribe and get a Voucher
            </button>
          </form>

          <div className="flex items-center justify-center space-x-2 mt-4 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            100% Safety & Privacy Guaranteed! Unsubscribe anytime.
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="contacto" className="py-16 bg-gradient-to-r from-primary to-blue-900 text-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* WhatsApp Button at Top */}
        <div className="mb-8">
          <a 
            href="https://wa.me/16502631714?text=Hello!%20I'm%20interested%20in%20booking%20a%20flight."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-secondary hover:bg-green-600 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-2xl transform hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span className="text-lg">Call to Talk to a Live Agent: 1-650-263-1714</span>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <button 
            type="button"
            onClick={handleOpenModal}
            className="btn-secondary whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;


















