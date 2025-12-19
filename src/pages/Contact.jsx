import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  BookOpen,
  Truck,
  Home,
  Clock,
  ShoppingCart,
  Users,
  Award,
  Package,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.subject &&
      formData.message
    ) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }
  };

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Vast Collection",
      description:
        "Access thousands of books from our extensive library catalog",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Get books delivered to your doorstep within 24-48 hours",
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Home Service",
      description: "Browse and order from the comfort of your home",
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Easy Purchase",
      description: "Buy your favorite books directly from our librarians",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Books Available" },
    { number: "10,000+", label: "Happy Readers" },
    { number: "500+", label: "Daily Deliveries" },
    { number: "24/7", label: "Customer Support" },
  ];

  return (
    <div>
      <section className="px-6 py-16 bg-gradient-to-br from-amber-100 to-orange-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Contact Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions? Need help finding a book? We're here to assist
              you!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-amber-600" />
                  Visit Our Library
                </h3>
                <p className="text-gray-700 text-lg mb-4">
                  123 Book Street, Library District
                </p>
                <p className="text-gray-700 text-lg">Dhaka 1205, Bangladesh</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Phone className="w-6 h-6 mr-2 text-amber-600" />
                  Call Us
                </h3>
                <p className="text-gray-700 text-lg mb-2">
                  Customer Service: +880 1234-567890
                </p>
                <p className="text-gray-700 text-lg mb-2">
                  Order Hotline: +880 1234-567891
                </p>
                <p className="text-gray-700 text-lg">
                  Available: 9 AM - 9 PM (Daily)
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-amber-600" />
                  Email Us
                </h3>
                <p className="text-gray-700 text-lg mb-2">
                  General: info@bookcourier.com
                </p>
                <p className="text-gray-700 text-lg mb-2">
                  Orders: orders@bookcourier.com
                </p>
                <p className="text-gray-700 text-lg">
                  Support: support@bookcourier.com
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-amber-600" />
                  Delivery Hours
                </h3>
                <p className="text-gray-700 text-lg mb-2">
                  Monday - Saturday: 10 AM - 8 PM
                </p>
                <p className="text-gray-700 text-lg">Sunday: 11 AM - 6 PM</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Send Us a Message
              </h3>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email *"
                    className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors duration-300"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number *"
                    className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors duration-300"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject *"
                    className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors duration-300"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message *"
                    rows="6"
                    className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors duration-300 resize-none"></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-4 px-6 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 shadow-lg">
                  <span>
                    {submitted ? "Message Sent Successfully!" : "Send Message"}
                  </span>
                  <Send className="w-5 h-5" />
                </button>
                <p className="text-sm text-gray-500 text-center mt-2">
                  * Required fields
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Frequently Asked Questions
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  What is the delivery charge?
                </h4>
                <p className="text-gray-600">
                  Delivery is free for orders above 1000 BDT. For orders below,
                  a nominal fee of 50 BDT applies within Dhaka.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  Can I return a book?
                </h4>
                <p className="text-gray-600">
                  Yes, you can return books within 7 days if they are in
                  original condition. Contact our support team for returns.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  Do you deliver outside Dhaka?
                </h4>
                <p className="text-gray-600">
                  Yes, we deliver nationwide! Delivery time varies: 2-3 days for
                  major cities, 4-7 days for other areas.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  How can I track my order?
                </h4>
                <p className="text-gray-600">
                  You'll receive a tracking number via SMS and email once your
                  order is dispatched. Use it to track your delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
