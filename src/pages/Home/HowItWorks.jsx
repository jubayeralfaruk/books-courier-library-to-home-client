import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">How BookCourier Works</h2>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="p-6 rounded-xl shadow-md shadow-cyan-900">
            <span className="text-4xl font-bold text-primary">1</span>
            <h3 className="mt-4 font-semibold">Choose Book</h3>
          </div>
          <div className="p-6 rounded-xl shadow-md shadow-cyan-900 ">
            <span className="text-4xl font-bold text-primary">2</span>
            <h3 className="mt-4 font-semibold">Place Order</h3>
          </div>
          <div className="p-6 rounded-xl shadow-md shadow-cyan-900">
            <span className="text-4xl font-bold text-primary">3</span>
            <h3 className="mt-4 font-semibold">Pay Now</h3>
          </div>
          <div className="p-6 rounded-xl shadow-md shadow-cyan-900">
            <span className="text-4xl font-bold text-primary">4</span>
            <h3 className="mt-4 font-semibold">Fast Delivery</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
