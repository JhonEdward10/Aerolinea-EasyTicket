import React from 'react';
import { Plane, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-primary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Plane className="w-8 h-8 text-secondary" />
              <span className="text-2xl font-bold">Easy<span className="text-secondary">Tickets</span></span>
            </div>
            <p className="text-gray-300 mb-4">
              Tu compañero de viaje confiable para encontrar los mejores vuelos al mejor precio.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary transition-colors duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors duration-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors duration-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#buscar" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  Buscar Vuelos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  Mis Reservas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-4">Servicio al Cliente</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  Políticas de Cancelación
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  Calle 123 #45-67<br />
                  Bogotá, Colombia
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary" />
                <a href="tel:+573001234567" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  +57 300 123 4567
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary" />
                <a href="mailto:info@easytickets.com" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  info@easytickets.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm text-gray-300 mb-2">Horario de Atención:</p>
              <p className="text-gray-300 font-semibold">24/7 - Siempre disponibles</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm text-center md:text-left">
              © 2025 EasyTickets. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300 text-sm">
                Términos de Uso
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300 text-sm">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
