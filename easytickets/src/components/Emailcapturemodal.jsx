import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EmailCaptureModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que ambos campos estén llenos
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
      
      // Crear FormData en vez de JSON
      const formData = new FormData();
      formData.append('email', email);
      formData.append('phone', phone);
      
      console.log('📦 Datos a enviar (FormData):');
      console.log('  - email:', email);
      console.log('  - phone:', phone);
      
      // Enviar datos al endpoint banner.php
      const response = await fetch('https://easyticketsapp.com/back/banner.php', {
        method: 'POST',
        body: formData  // Enviar FormData (sin Content-Type header)
      });

      console.log('📥 Respuesta del servidor:', response.status);

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Datos guardados:', data);
      
      // Marcar que ya visitó
      localStorage.setItem('hasVisited', 'true');
      
      // Mostrar modal de confirmación
      setShowConfirmation(true);
      
    } catch (error) {
      console.error('❌ Error al enviar datos:', error);
      alert('There was an error saving your information. Please try again.');
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  // Modal de confirmación después de enviar datos
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
          {/* Botón cerrar */}
          <button
            onClick={handleCloseConfirmation}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Checkmark verde */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Título */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Thank You!
          </h2>

          {/* Mensaje principal */}
          <p className="text-gray-700 mb-2 text-lg font-semibold">
            We received your information
          </p>
          
          <p className="text-gray-600 mb-6">
            An EasyTickets representative will contact you shortly to help you find the best flight deals.
          </p>

          {/* Info del cupón */}
          <div className="bg-orange-50 border-2 border-secondary rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 mb-2">
              Your <span className="font-bold text-primary">$30 OFF</span> Voucher code:
            </p>
            <div className="bg-secondary text-white font-bold text-2xl py-3 px-4 rounded inline-block">
              ASAP30
            </div>
          </div>

          {/* Mensaje adicional */}
          <p className="text-sm text-gray-600 mb-6">
            📞 Expect a call from us soon!
          </p>

          {/* Botón OK */}
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

              {/* Teléfono */}
              <div className="flex space-x-2">
                <div className="flex items-center px-2 py-2.5 border border-gray-300 rounded-lg bg-gray-50">
                  {/* Bandera USA como SVG */}
                  <svg className="w-6 h-4 mr-1" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
                    {/* Rayas rojas y blancas */}
                    <rect width="60" height="30" fill="#B22234"/>
                    <rect y="2.3" width="60" height="2.3" fill="#FFF"/>
                    <rect y="6.9" width="60" height="2.3" fill="#FFF"/>
                    <rect y="11.5" width="60" height="2.3" fill="#FFF"/>
                    <rect y="16.1" width="60" height="2.3" fill="#FFF"/>
                    <rect y="20.7" width="60" height="2.3" fill="#FFF"/>
                    <rect y="25.3" width="60" height="2.3" fill="#FFF"/>
                    {/* Cuadro azul con estrellas */}
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

      <style>{`
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