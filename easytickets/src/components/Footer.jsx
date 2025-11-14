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
              Your trusted travel partner for finding the best flights at the best price.
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
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#buscar" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  Search Flights
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  My Reservations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-4">Customer service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  Cancellation Policies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  5731 Kirby Dr. <br />
                  Houston, TX
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary" />
                <a href="tel:+573001234567" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  +1 (405) 316-9901
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary" />
                <a href="mailto:info@easytickets.com" className="text-gray-300 hover:text-secondary transition-colors duration-300">
                  info@easytickets.com
                </a>
              </li>
            </ul>
            {/* <div className="mt-4">
              <p className="text-sm text-gray-300 mb-2">Horario de Atención:</p>
              <p className="text-gray-300 font-semibold">24/7 - Siempre disponibles</p>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm text-center md:text-left">
              © 2025 EasyTickets. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300 text-sm">
                Terms of Use
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
