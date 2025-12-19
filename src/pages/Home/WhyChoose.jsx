import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FaTruck, FaShieldAlt, FaBookOpen } from "react-icons/fa";

const WhyChoose = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Why Choose BookCourier?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
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
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;