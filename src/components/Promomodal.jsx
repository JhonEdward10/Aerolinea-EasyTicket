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
          className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full relative animate-fade-in overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="w-6 h-6" />
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
            <div className="p-6 flex flex-col justify-center">
              {/* Título */}
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                Looking for the <span className="text-secondary">lowest</span> price?
              </h2>

              {/* Subtítulo */}
              <p className="text-base text-gray-600 mb-4">
                Save an average of <span className="font-bold text-secondary">$287 per ticket</span> vs online rates!
              </p>

              {/* Línea divisoria */}
              <div className="border-t border-gray-200 mb-4"></div>

              {/* Box de llamada */}
              <div className="bg-blue-50 border-2 border-primary rounded-xl p-4 mb-4">
                <p className="text-primary font-semibold text-center mb-2 text-sm">
                  Call us now and save even more
                </p>
                <a
                  href="https://wa.me/14053169901?text=Hello!%20I'm%20interested%20in%20booking%20a%20flight."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-secondary hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-lg">+1 (405) 3169901</span>
                </a>
              </div>

              {/* Cupón de descuento */}
              <div className="bg-orange-50 border-2 border-secondary rounded-lg p-3 mb-4 text-center">
                <p className="text-xs text-gray-700 mb-1">
                  <span className="font-bold text-primary">$30 OFF</span> Voucher code
                </p>
                <div className="bg-secondary text-white font-bold text-lg py-2 px-3 rounded inline-block">
                  ASAP30
                </div>
              </div>

              {/* Beneficios */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center mb-4">
                <div>
                  <CheckCircle className="w-5 h-5 text-secondary mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Free tailored flight options</p>
                </div>
                <div>
                  <CheckCircle className="w-5 h-5 text-secondary mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Option to lock the lowest price</p>
                </div>
                <div>
                  <CheckCircle className="w-5 h-5 text-secondary mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Flexible payment plans</p>
                </div>
              </div>

              {/* Botón WhatsApp */}
              <a
                href="https://wa.me/14053169901?text=Hello!%20I'm%20interested%20in%20booking%20a%20flight."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg transform hover:scale-105 w-full"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="text-base">Chat with us on WhatsApp</span>
              </a>
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

export default PromoModal;