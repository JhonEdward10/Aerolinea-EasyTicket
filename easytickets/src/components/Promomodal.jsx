import React, { useState, useEffect } from 'react';
import { X, Phone, CheckCircle } from 'lucide-react';

const PromoModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShownThisSession, setHasShownThisSession] = useState(false);

  useEffect(() => {
    // Verificar si ya visitó (cerró EmailCapture)
    const hasVisited = localStorage.getItem('hasVisited');
    const promoModalShown = sessionStorage.getItem('promoModalShown');
    
    console.log('PromoModal - hasVisited:', hasVisited);
    console.log('PromoModal - promoModalShown:', promoModalShown);
    
    // Solo mostrar si ya cerró el EmailCapture y no ha visto el promo
    if (!hasVisited || promoModalShown) {
      console.log('PromoModal - No se mostrará (no cumple condiciones)');
      return;
    }

    // Detectar scroll al final de la página
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight;
      
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      
      console.log('Scroll %:', Math.round(scrollPercentage * 100) + '%');
      
      // Si está a 70% o más del final de la página
      if (scrollPercentage >= 0.7 && !hasShownThisSession) {
        console.log('PromoModal - Mostrando modal!');
        setIsVisible(true);
        setHasShownThisSession(true);
        // Remover el listener para no ejecutar múltiples veces
        window.removeEventListener('scroll', handleScroll);
      }
    };

    // Agregar listener de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasShownThisSession]);

  const handleClose = () => {
    setIsVisible(false);
    // Guardar que ya vio el promo en esta sesión
    sessionStorage.setItem('promoModalShown', 'true');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay oscuro */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Lado izquierdo - Imagen */}
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop"
                alt="Customer Service Agent"
                className="w-full h-full object-cover rounded-l-2xl"
              />
            </div>

            {/* Lado derecho - Contenido */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              {/* Título */}
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                Looking for the <span className="text-secondary">lowest</span> price?
              </h2>

              {/* Subtítulo */}
              <p className="text-lg text-gray-600 mb-6">
                Save an average of <span className="font-bold text-secondary">$287 per ticket</span> vs online rates!
              </p>

              {/* Línea divisoria */}
              <div className="border-t border-gray-200 mb-6"></div>

              {/* Box de llamada */}
              <div className="bg-blue-50 border-2 border-primary rounded-xl p-6 mb-6">
                <p className="text-primary font-semibold text-center mb-3">
                  Call us now and save even more
                </p>
                <a
                  href="tel:16502631714"
                  className="flex items-center justify-center space-x-3 bg-secondary hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg transform hover:scale-105"
                >
                  <Phone className="w-6 h-6" />
                  <span className="text-2xl">1-650-263-1714</span>
                </a>
              </div>

              {/* Cupón de descuento */}
              <div className="bg-orange-50 border-2 border-secondary rounded-lg p-4 mb-6 text-center">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-bold text-primary">$30 OFF</span> Voucher code
                </p>
                <div className="bg-secondary text-white font-bold text-xl py-2 px-4 rounded inline-block">
                  ASAP30
                </div>
              </div>

              {/* Beneficios */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <CheckCircle className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Free tailored flight options</p>
                </div>
                <div>
                  <CheckCircle className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Option to lock the lowest price</p>
                </div>
                <div>
                  <CheckCircle className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Flexible payment plans</p>
                </div>
              </div>
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

export default PromoModal;
















