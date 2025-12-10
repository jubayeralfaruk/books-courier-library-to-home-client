import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router";

export default function HeroBanner() {
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setLightPos({ x: clientX, y: clientY });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="min-h-[65vw] lg:min-h-[70vh] bg-gray-950 text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Small Centered Light Glow */}
      <div
        className="pointer-events-none fixed w-32 h-32 rounded-full bg-blue-500/20 blur-2xl transition-all duration-300"
        style={{
          left: lightPos.x - 64 + "px",
          top: lightPos.y - 64 + "px",
        }}></div>

      {/* Animated Gradient Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full animate-pulse"></div>

      {/* Floating Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-16 h-16 border border-blue-500 rounded-full animate-[spin_8s_linear_infinite] top-20 left-1/4"></div>
        <div className="absolute w-24 h-24 border border-purple-500 rounded-full animate-[spin_12s_linear_reverse_infinite] bottom-10 right-1/4"></div>
      </div>

      {/* Content */}
      <div className="text-center relative z-10 max-w-2xl">
        <h1
data-aos="fade-up"
className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent animate-gradient-x"
>
Discover Knowledge at Your Doorstep
</h1>

        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-gray-300 text-lg md:text-xl mb-8">
          Borrow and receive books from your nearest libraries without stepping
          outside. Fast, easy & convenient.
        </p>

        <div
          data-aos="zoom-in"
          data-aos-delay="400"
          className="flex justify-center gap-4">
          <Link
            to="/books"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition shadow-lg font-semibold">
            Explore Books
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-gray-800 border border-gray-600 hover:border-blue-500 transition font-semibold">
            Get Started
          </Link>
        </div>
      </div>
      <style>{`
@keyframes gradient-x {
0% { background-position: 0% 50%; }
50% { background-position: 100% 50%; }
100% { background-position: 0% 50%; }
}
.animate-gradient-x {
background-size: 200% 200%;
animation: gradient-x 3s ease infinite;
}
.animate-spin-fast {
animation: spin 2s linear infinite;
}
.animate-spin-reverse-fast {
animation: spin 2s linear infinite reverse;
}
.faster {
animation-duration: 1s !important;
}
`}</style>
    </section>
  );
}
