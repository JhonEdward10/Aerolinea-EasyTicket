import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

const Testimonials = () => {
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

  // // Función para generar avatar con iniciales
  // const getAvatarUrl = (name) => {
  //   return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128&bold=true`;
  // };

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

        {/* Grid de Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-gray-100 hover:border-primary"
            >
              {/* Header del testimonial */}
              <div className="flex items-center space-x-4 mb-4">
                {/* Avatar */}
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-4 border-primary shadow-md object-cover"
                />
                
                {/* Nombre y ubicación */}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                  {testimonial.verified && (
                    <div className="flex items-center space-x-1 mt-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600 font-semibold">
                        Verified Purchase
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-3">
                {renderStars(testimonial.rating)}
              </div>

              {/* Comentario */}
              <p className="text-gray-700 leading-relaxed mb-3">
                "{testimonial.comment}"
              </p>

              {/* Fecha */}
              <p className="text-sm text-gray-400">
                {testimonial.date}
              </p>
            </div>
          ))}
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