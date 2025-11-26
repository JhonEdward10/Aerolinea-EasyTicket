import React, { useState } from 'react';
import { X } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      alert('Please enter your email');
      return;
    }

    try {
      console.log('📤 Enviando email al backend...');
      
      const formData = new FormData();
      formData.append('email', email);
      formData.append('phone', ''); // Phone vacío para newsletter
      
      console.log('📦 Datos a enviar:', email);
      
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
      
      // Mostrar modal de confirmación
      setShowConfirmation(true);
      setEmail(''); // Limpiar campo
      
    } catch (error) {
      console.error('❌ Error al enviar datos:', error);
      alert('There was an error. Please try again.');
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      {/* Modal de confirmación Newsletter */}
      {showConfirmation && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleCloseConfirmation}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative"
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
              We received your subscription
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
      )}

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
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
            <button type="submit" className="btn-secondary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Newsletter;