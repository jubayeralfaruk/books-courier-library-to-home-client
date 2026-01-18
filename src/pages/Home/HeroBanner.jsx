import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroBanner() {
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Discover Knowledge at Your Doorstep",
      description: "Borrow and receive books from your nearest libraries without stepping outside. Fast, easy & convenient.",
      primaryBtn: { text: "Explore Books", link: "/books" },
      secondaryBtn: { text: "Get Started", link: "/register" },
      gradient: "from-blue-400 via-purple-400 to-pink-500"
    },
    {
      title: "Thousands of Books Delivered Daily",
      description: "Access our vast collection of books from fiction to academic texts. We deliver to your doorstep within 24-48 hours.",
      primaryBtn: { text: "Browse Collection", link: "/books" },
      secondaryBtn: { text: "Learn More", link: "/about" },
      gradient: "from-purple-400 via-pink-400 to-red-500"
    },
    {
      title: "Join Our Reading Community",
      description: "Connect with fellow book lovers, share reviews, and discover your next favorite read. Start your journey today!",
      primaryBtn: { text: "Join Now", link: "/register" },
      secondaryBtn: { text: "View Coverage", link: "/coverage" },
      gradient: "from-pink-400 via-purple-400 to-blue-500"
    }
  ];

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
    
    // Auto-advance slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setLightPos({ x: clientX, y: clientY });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="min-h-[65vw] lg:min-h-[70vh] bg-theme-primary text-theme-primary flex items-center justify-center px-6 relative overflow-hidden">
      {/* Small Centered Light Glow */}
      <div
        className="pointer-events-none fixed w-32 h-32 rounded-full blur-2xl transition-all duration-300"
        style={{
          left: lightPos.x - 64 + "px",
          top: lightPos.y - 64 + "px",
          backgroundColor: 'var(--color-primary)',
          opacity: 0.2
        }}></div>

      {/* Animated Gradient Blobs */}
      <div 
        className="absolute top-10 left-10 w-72 h-72 blur-3xl rounded-full animate-pulse"
        style={{ backgroundColor: 'var(--color-primary)', opacity: 0.1 }}
      ></div>
      <div 
        className="absolute bottom-10 right-10 w-72 h-72 blur-3xl rounded-full animate-pulse"
        style={{ backgroundColor: 'var(--color-secondary)', opacity: 0.1 }}
      ></div>

      {/* Floating Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-16 h-16 border rounded-full animate-[spin_8s_linear_infinite] top-20 left-1/4"
          style={{ borderColor: 'var(--color-primary)' }}
        ></div>
        <div 
          className="absolute w-24 h-24 border rounded-full animate-[spin_12s_linear_reverse_infinite] bottom-10 right-1/4"
          style={{ borderColor: 'var(--color-secondary)' }}
        ></div>
      </div>

      {/* Slider Content */}
      <div className="text-center relative z-10 max-w-3xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              className={`text-4xl md:text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-r ${slides[currentSlide].gradient} bg-clip-text text-transparent animate-gradient-x`}
            >
              {slides[currentSlide].title}
            </h1>

            <p className="text-theme-secondary text-lg md:text-xl mb-8 px-4">
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <Link
                to={slides[currentSlide].primaryBtn.link}
                className="px-6 py-3 rounded-xl transition shadow-lg font-semibold text-white"
                style={{ 
                  backgroundColor: 'var(--color-primary)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
              >
                {slides[currentSlide].primaryBtn.text}
              </Link>
              <Link
                to={slides[currentSlide].secondaryBtn.link}
                className="px-6 py-3 rounded-xl bg-surface border border-theme hover:border-[var(--color-primary)] transition font-semibold text-theme-primary"
              >
                {slides[currentSlide].secondaryBtn.text}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-surface hover:bg-theme-secondary transition border border-theme"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} className="text-theme-primary" />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8"
                    : "w-3 hover:bg-theme-secondary"
                }`}
                style={{
                  backgroundColor: index === currentSlide ? 'var(--color-primary)' : 'var(--text-muted)'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-surface hover:bg-theme-secondary transition border border-theme"
            aria-label="Next slide"
          >
            <ChevronRight size={24} className="text-theme-primary" />
          </button>
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
`}</style>
    </section>
  );
}