import AOS from "aos";
import "aos/dist/aos.css";
import { BookOpen, Home, ShoppingCart, Truck } from "lucide-react";
import { useEffect } from "react";
import { FaTruck, FaShieldAlt, FaBookOpen } from "react-icons/fa";

const WhyChoose = () => {
  useEffect(() => {
    AOS.init({ duration: 400 });
  }, []);

  const features = [
      { icon: <BookOpen className="w-8 h-8" />, title: 'Vast Collection', description: 'Access thousands of books from our extensive library catalog' },
      { icon: <Truck className="w-8 h-8" />, title: 'Fast Delivery', description: 'Get books delivered to your doorstep within 24-48 hours' },
      { icon: <Home className="w-8 h-8" />, title: 'Home Service', description: 'Browse and order from the comfort of your home' },
      { icon: <ShoppingCart className="w-8 h-8" />, title: 'Easy Purchase', description: 'Buy your favorite books directly from our librarians' }
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Why Choose BookCourier?
        </h2>

        {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center">
                <div className="text-amber-600 flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

        {/* <div className="grid md:grid-cols-3 gap-8">
          <div data-aos="fade-up" className="p-6 bg-gray-800 rounded-xl">
            <FaBookOpen className="text-4xl mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">
              Verified Libraries
            </h3>
            <p className="text-gray-400">
              Books only from trusted library owners.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="200" className="p-6 bg-gray-800 rounded-xl">
            <FaTruck className="text-4xl mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-400">
              Quick and reliable doorstep delivery.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="400" className="p-6 bg-gray-800 rounded-xl">
            <FaShieldAlt className="text-4xl mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">
              Secure Payments
            </h3>
            <p className="text-gray-400">
              100% secure and trusted payment system.
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default WhyChoose;