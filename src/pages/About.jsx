import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, BookOpen, Truck, Home, Clock, ShoppingCart, Users, Award, Package } from 'lucide-react';

export default function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.phone && formData.subject && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    }
  };

  const features = [
    { icon: <BookOpen className="w-8 h-8" />, title: 'Vast Collection', description: 'Access thousands of books from our extensive library catalog' },
    { icon: <Truck className="w-8 h-8" />, title: 'Fast Delivery', description: 'Get books delivered to your doorstep within 24-48 hours' },
    { icon: <Home className="w-8 h-8" />, title: 'Home Service', description: 'Browse and order from the comfort of your home' },
    { icon: <ShoppingCart className="w-8 h-8" />, title: 'Easy Purchase', description: 'Buy your favorite books directly from our librarians' }
  ];

  const stats = [
    { number: '50,000+', label: 'Books Available' },
    { number: '10,000+', label: 'Happy Readers' },
    { number: '500+', label: 'Daily Deliveries' },
    { number: '24/7', label: 'Customer Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Header Banner */}
      {/* <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-16 h-16 mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold">BookCourier</h1>
          </div>
          <p className="text-xl md:text-2xl">Your Library at Your Doorstep</p>
        </div>
      </div> */}

      {/* About Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connecting readers with books through our innovative library-to-home delivery service
            </p>
          </div>

          {/* Story */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              BookCourier was founded with a simple mission: to make books more accessible to everyone. We understand that visiting a library isn't always convenient, so we bring the library to you. Our platform connects experienced librarians who curate and sell quality books directly to readers through our efficient courier service.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Whether you're looking for bestsellers, academic texts, children's books, or rare editions, our librarians help you find exactly what you need and deliver it right to your doorstep. We believe that every book has a reader, and every reader deserves easy access to books.
            </p>
          </div>

          {/* Features Grid */}
          {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center">
                <div className="text-amber-600 flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div> */}

          {/* Stats */}
          {/* <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl shadow-xl p-8 md:p-12 mb-12">
            <h3 className="text-3xl font-bold text-white text-center mb-8">Our Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-amber-100 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div> */}

          {/* How It Works */}
          {/* <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-600">1</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Browse & Select</h4>
                <p className="text-gray-600">Browse our extensive catalog and choose the books you want</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Place Order</h4>
                <p className="text-gray-600">Add to cart and complete your purchase with our librarians</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-600">3</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Home Delivery</h4>
                <p className="text-gray-600">Receive your books at your doorstep within 24-48 hours</p>
              </div>
            </div>
          </div> */}
        </div>
      </section>      
    </div>
  );
}