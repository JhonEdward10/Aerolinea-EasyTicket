import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      comment: "Amazing service! Found the best deal for my trip to Paris. Saved over $400 compared to other sites. Highly recommend!",
      date: "2 weeks ago",
      verified: true,
      photo: "/src/assets/sarah.jpg"
    },
    {
      name: "Michael Chen",
      location: "Los Angeles, CA",
      rating: 5,
      comment: "Customer service was excellent. They helped me find a last-minute flight and the process was super smooth. Will use again!",
      date: "1 month ago",
      verified: true,
      photo: "/src/assets/michael.jpg"
    },
    {
      name: "Emily Rodriguez",
      location: "Miami, FL",
      rating: 5,
      comment: "Best prices I've found online! Booked my family vacation and the whole experience was hassle-free. Thank you EasyTickets!",
      date: "3 weeks ago",
      verified: true,
      photo: "/src/assets/emily.jpg"
    },
    {
      name: "David Thompson",
      location: "Chicago, IL",
      rating: 5,
      comment: "Fast booking process and great customer support. Got instant confirmation and the best price guaranteed. Very satisfied!",
      date: "1 week ago",
      verified: true,
      photo: "/src/assets/david.jpg"
    },
    {
      name: "Jessica Williams",
      location: "Houston, TX",
      rating: 5,
      comment: "I was skeptical at first, but EasyTickets delivered! Found an incredible deal to Europe and saved hundreds. Absolutely recommended!",
      date: "2 months ago",
      verified: true,
      photo: "/src/assets/jessica.jpg"
    },
    {
      name: "Robert Anderson",
      location: "Seattle, WA",
      rating: 5,
      comment: "Professional and reliable service. They answered all my questions and helped me choose the best flight option. Great experience!",
      date: "3 weeks ago",
      verified: true,
      photo: "/src/assets/robert.jpg"
    }
  ];

  // Auto-play: cambiar testimonio cada 5 segundos
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Navegar al siguiente testimonio
  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navegar al testimonio anterior
  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Ir a un testimonio específico (dots)
  const goToTestimonial = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Obtener el testimonio actual
  const currentTestimonial = testimonials[currentIndex];

  // Función para renderizar estrellas
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who found their perfect flights with EasyTickets
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="flex">
              {renderStars(5)}
            </div>
            <span className="text-gray-700 font-semibold">4.9/5</span>
            <span className="text-gray-500">from 2,547 reviews</span>
          </div>
        </div>

        {/* Carrusel de Testimonios */}
        <div className="relative max-w-4xl mx-auto">
          {/* Botón Anterior */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white hover:bg-gray-100 text-primary rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Botón Siguiente */}
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white hover:bg-gray-100 text-primary rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Tarjeta del Testimonio */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-gray-100 transition-all duration-500">
            {/* Header del testimonial */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
              {/* Avatar */}
              <img
                src={currentTestimonial.photo}
                alt={currentTestimonial.name}
                className="w-24 h-24 rounded-full border-4 border-primary shadow-lg object-cover"
              />
              
              {/* Nombre, ubicación y verificación */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-gray-900 text-2xl mb-1">
                  {currentTestimonial.name}
                </h3>
                <p className="text-gray-500 mb-2">
                  {currentTestimonial.location}
                </p>
                {currentTestimonial.verified && (
                  <div className="flex items-center justify-center sm:justify-start space-x-1">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-600 font-semibold">
                      Verified Purchase
                    </span>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                {renderStars(currentTestimonial.rating)}
              </div>
            </div>

            {/* Comentario */}
            <div className="mb-6">
              <p className="text-gray-700 text-lg leading-relaxed italic">
                "{currentTestimonial.comment}"
              </p>
            </div>

            {/* Fecha */}
            <p className="text-sm text-gray-400 text-center sm:text-left">
              {currentTestimonial.date}
            </p>
          </div>

          {/* Indicadores (Dots) */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-primary'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Contador */}
          <div className="text-center mt-4">
            <span className="text-gray-500 text-sm">
              {currentIndex + 1} / {testimonials.length}
            </span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Ready to join our happy travelers?
          </p>
          <a
            href="#search"
            className="inline-block bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Book Your Flight Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;