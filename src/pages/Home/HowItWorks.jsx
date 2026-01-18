import React from "react";

const HowItWorks = () => {
  return (
    <section className="max-w-7xl px-6 mx-auto">
      {/* How It Works */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
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
          </div>
    </section>
  );
};

export default HowItWorks;
