import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "../assets/images/stfaustinaimage.png";
import hero3 from "../assets/images/cross1.avif";
import hero2 from "../assets/images/slide4.avif";

const slides = [
  {
    image: hero1,
    title: "Welcome to St. Faustina Parish",
    subtitle:
      "A Catholic community devoted to Divine Mercy, prayer, and service.",
    verse: "“Jesus, I trust in You.” — St. Faustina",
  },
  {
    image: hero2,
    title: "United in Faith and Love",
    subtitle: "Growing together through the Sacraments and the Word of God.",
    verse:
      "“Where two or three are gathered in my name, I am there.” (Mt 18:20)",
  },
  {
    image: hero3,
    title: "Serving God & Neighbor",
    subtitle: "Living the Gospel through charity, ministry, and compassion.",
    verse: "“Be merciful, just as your Father is merciful.” (Lk 6:36)",
  },
];

const Herosection = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto slide
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [paused]);

  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);

  return (
    <section
      className="relative w-full lg:h-[600px] overflow-hidden h-[560px] font-inter"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[index].image}
          src={slides[index].image}
          alt="St. Faustina Parish"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="max-w-4xl text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {slides[index].title}
            </h1>

            <p className="text-lg md:text-2xl mb-6">{slides[index].subtitle}</p>

            <p className="italic text-[#d4af37] mb-8">{slides[index].verse}</p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/mass-schedule"
                className="px-8 py-3 bg-[#d4af37] hover:bg-[#b8962e] text-black font-semibold rounded shadow transition"
              >
                Mass Times
              </a>
              <a
                href="/about"
                className="px-8 py-3 bg-white hover:bg-gray-100 text-[#1e3a5f] font-semibold rounded shadow transition"
              >
                About Our Parish
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-[#d4af37]" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Scroll Down Arrow */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white z-10"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        aria-label="Scroll down"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </motion.a>
    </section>
  );
};

export default Herosection;
