import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EmailCaptureModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    // Verificar si es primera vez
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      // Mostrar modal después de 2 segundos si es primera vez
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Marcar que ya visitó
    localStorage.setItem('hasVisited', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!agreed) {
      alert('Please agree to receive promotional messages');
      return;
    }

    // Aquí puedes enviar los datos a tu backend
    console.log('Email captured:', { email, phone });
    
    // Marcar que ya visitó
    localStorage.setItem('hasVisited', 'true');
    
    // Cerrar modal
    setIsVisible(false);
    
    // Opcional: Mostrar mensaje de éxito
    alert('Thank you! Your $30 voucher code is: ASAP30');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Contenido */}
          <div className="p-6 text-center">
            {/* Icono de sobre con cupón - MÁS PEQUEÑO */}
            <div className="mb-4">
              <svg className="w-20 h-20 mx-auto" viewBox="0 0 200 200" fill="none">
                {/* Sobre NARANJA */}
                <path d="M40 80 L100 110 L160 80 L160 140 L40 140 Z" fill="#ff6b35" />
                <path d="M40 80 L100 110 L160 80 L160 70 L40 70 Z" fill="#f97316" />
                <path d="M40 70 L100 100 L160 70" stroke="#ea580c" strokeWidth="2" fill="none" />
                
                {/* Cupón AZUL */}
                <rect x="70" y="40" width="60" height="50" fill="#1e3a8a" rx="4" />
                <text x="100" y="60" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#ffffff">%</text>
                <line x1="75" y1="70" x2="90" y2="50" stroke="#ffffff" strokeWidth="2" />
                <line x1="110" y1="70" x2="125" y2="50" stroke="#ffffff" strokeWidth="2" />
                
                {/* Líneas de brillo NARANJA */}
                <line x1="85" y1="25" x2="90" y2="35" stroke="#ff6b35" strokeWidth="2" />
                <line x1="100" y1="20" x2="100" y2="30" stroke="#ff6b35" strokeWidth="2" />
                <line x1="115" y1="25" x2="110" y2="35" stroke="#ff6b35" strokeWidth="2" />
              </svg>
            </div>

            {/* Título */}
            <h2 className="text-2xl font-bold text-primary mb-1">
              Save $30 Instantly
            </h2>
            <h3 className="text-xl font-bold text-secondary mb-3">
              on Your Next Flight
            </h3>

            {/* Descripción */}
            <p className="text-sm text-gray-600 mb-4">
              Join 2.5M+ travelers getting insider access to flight deals. Subscribe now and get your exclusive $30 voucher!
            </p>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your best email"
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />

              {/* Separador */}
              <div className="text-primary font-semibold text-sm">AND / OR</div>

              {/* Teléfono */}
              <div className="flex space-x-2">
                <div className="flex items-center px-2 py-2.5 border border-gray-300 rounded-lg bg-gray-50">
                  <span className="text-xl mr-1">🇺🇸</span>
                  <span className="text-xs font-semibold">US</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Checkbox de acuerdo */}
              <div className="flex items-start text-left text-xs text-gray-600 leading-tight">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 mr-2 w-3.5 h-3.5"
                  required
                />
                <label htmlFor="agree" className="text-xs">
                  I agree to receive promotional SMS texts via an autodialer, and this agreement isn't a condition of purchase. I also agree to{' '}
                  <a href="#" className="text-secondary underline">T&Cs</a> and{' '}
                  <a href="#" className="text-secondary underline">Privacy Policy</a>. Up to 5 Msgs/month. Msg & Data rates may apply.
                </label>
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="w-full bg-secondary hover:bg-green-600 text-white font-bold py-3 text-sm rounded-lg transition-all shadow-lg transform hover:scale-105"
              >
                Subscribe and get a Voucher
              </button>
            </form>

            {/* Footer de seguridad */}
            <div className="mt-4 flex items-center justify-center text-xs text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              100% Safety & Privacy Guaranteed! Unsubscribe anytime.
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default EmailCaptureModal;
















