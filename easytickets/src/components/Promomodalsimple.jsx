import React, { useState, useEffect } from 'react';
import { X, Phone, CheckCircle } from 'lucide-react';

const PromoModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detectar scroll al final de la página
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calcular porcentaje de scroll
      const scrollPercent = (scrollTop + windowHeight) / documentHeight;
      
      // Si está al 70% o más, mostrar modal
      if (scrollPercent >= 0.7 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Looking for the <span className="text-green-600">lowest</span> price?
              </h2>

              {/* Subtítulo */}
              <p className="text-lg text-gray-600 mb-6">
                Save an average of <span className="font-bold text-primary">$287 per ticket</span> vs online rates!
              </p>

              {/* Línea divisoria */}
              <div className="border-t border-gray-200 mb-6"></div>

              {/* Box de llamada */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                <p className="text-green-800 font-semibold text-center mb-3">
                  Call us now and save even more
                </p>
                <a
                  href="tel:16502631714"
                  className="flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg transform hover:scale-105"
                >
                  <Phone className="w-6 h-6" />
                  <span className="text-2xl">+1 (405) 316-9901</span>
                </a>
              </div>

              {/* Cupón de descuento */}
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6 text-center">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-bold">$30 OFF</span> Voucher code
                </p>
                <div className="bg-yellow-400 text-gray-900 font-bold text-xl py-2 px-4 rounded inline-block">
                  ASAP30
                </div>
              </div>

              {/* Beneficios */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Free tailored flight options</p>
                </div>
                <div>
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Option to lock the lowest price</p>
                </div>
                <div>
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Flexible payment plans</p>
                </div>
              </div>
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