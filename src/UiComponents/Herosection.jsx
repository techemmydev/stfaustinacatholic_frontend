import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "../assets/images/stfaustinaimage.png";
import hero3 from "../assets/images/cross1.avif";
import hero2 from "../assets/images/slide4.avif";
import hero4 from "../assets/images/slide5.avif";

const slides = [
  {
    image: hero1,
    tag: "Divine Mercy",
    title: "Welcome to\nSs. Peter & Paul\nCatholic Parish",
    subtitle:
      "A Catholic community devoted to Divine Mercy, prayer, and service.",
    verse: "Jesus, I trust in You.",
    author: "— St. Faustina",
  },
  {
    image: hero2,
    tag: "Community",
    title: "United in\nFaith\nand Love",
    subtitle: "Growing together through the Sacraments and the Word of God.",
    verse: "Where two or three are gathered in my name, I am there.",
    author: "— Matthew 18:20",
  },
  {
    image: hero3,
    tag: "Ministry",
    title: "Serving\nGod &\nNeighbor",
    subtitle: "Living the Gospel through charity, ministry, and compassion.",
    verse: "Be merciful, just as your Father is merciful.",
    author: "— Luke 6:36",
  },
  {
    image: hero4, //adda nwe content here
    tag: "Worship",
    title: "Praise &\nAdoration",
    subtitle: "Lifting our hearts in worship and adoration to our Lord.",
    verse: "Let everything that has breath praise the Lord!",
    author: "— Psalm 150:6",
  },
];

const Herosection = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

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
      className="relative w-full h-screen min-h-[640px] max-h-[900px] overflow-hidden"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[index].image}
          src={slides[index].image}
          alt="Parish"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Layered Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* Decorative vertical gold line */}
      <div
        className="absolute left-[42%] top-0 bottom-0 w-px hidden lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #c9a84c55, transparent)",
        }}
      />

      {/* Slide Number */}
      <div
        className="absolute top-8 right-6 md:right-12 lg:right-16 text-white/30 z-20 hidden md:block"
        style={{
          fontFamily: "monospace",
          letterSpacing: "0.3em",
          fontSize: "0.7rem",
        }}
      >
        0{index + 1} / 0{slides.length}
      </div>

      {/* Main Content — Left-aligned */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[index].title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Tag pill */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="inline-flex items-center gap-2 mb-6"
                >
                  <span
                    className="text-xs font-semibold tracking-[0.25em] uppercase px-4 py-1.5 border rounded-full hidden "
                    style={{
                      color: "#c9a84c",
                      borderColor: "#c9a84c55",
                      background: "rgba(201,168,76,0.08)",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {slides[index].tag}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                  className="text-white font-bold leading-none mb-6 whitespace-pre-line"
                  style={{
                    fontSize: "clamp(1.9rem, 3.5vw, 3rem)",
                    lineHeight: 1.05,
                    textShadow: "0 4px 40px rgba(0,0,0,0.5)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {slides[index].title}
                </motion.h1>

                {/* Gold divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
                  className="origin-left mb-6"
                  style={{
                    height: "2px",
                    width: "80px",
                    background:
                      "linear-gradient(to right, #c9a84c, transparent)",
                  }}
                />

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.7 }}
                  className="text-white/70 mb-8 max-w-lg leading-relaxed"
                  style={{
                    fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
                    fontFamily: "sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {slides[index].subtitle}
                </motion.p>

                {/* Scripture */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.7 }}
                  className="mb-10 pl-4 border-l-2"
                  style={{ borderColor: "#c9a84c" }}
                >
                  <p
                    className="italic mb-1"
                    style={{
                      color: "#c9a84c",
                      fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
                    }}
                  >
                    {slides[index].verse}
                  </p>
                  <p
                    className="text-white/40 text-xs tracking-widest uppercase"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {slides[index].author}
                  </p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <a
                    href="/mass-schedule"
                    className="group relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden transition-all"
                    style={{
                      background: "#c9a84c",
                      color: "#0a0a0a",
                      fontFamily: "sans-serif",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      clipPath:
                        "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                    }}
                  >
                    Mass Times
                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                  <a
                    href="/about"
                    className="group inline-flex items-center justify-center px-8 py-3.5 border transition-all"
                    style={{
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "white",
                      fontFamily: "sans-serif",
                      fontWeight: 400,
                      fontSize: "0.82rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(4px)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "#c9a84c")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.3)")
                    }
                  >
                    About Our Parish
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom bar with dots + arrows */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 lg:px-16 py-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Dots */}
        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="transition-all duration-300"
              style={{
                width: i === index ? "32px" : "8px",
                height: "3px",
                borderRadius: "2px",
                background: i === index ? "#c9a84c" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>

        {/* Progress text */}
        <div
          className="hidden md:flex items-center gap-2 text-white/30"
          style={{
            fontFamily: "sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
          }}
        >
          <span style={{ color: "#c9a84c" }}>SCROLL</span>
          <span>TO EXPLORE</span>
        </div>

        {/* Arrow buttons */}
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="flex items-center justify-center w-10 h-10 border border-white/20 text-white/60 hover:border-yellow-500 hover:text-yellow-400 transition-all"
            style={{ borderRadius: "2px" }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="flex items-center justify-center w-10 h-10 border border-white/20 text-white/60 hover:border-yellow-500 hover:text-yellow-400 transition-all"
            style={{ borderRadius: "2px" }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div
          className="text-white/20 text-xs tracking-[0.3em] rotate-90 mb-2"
          style={{ fontFamily: "sans-serif", writingMode: "vertical-rl" }}
        >
          SCROLL
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, #c9a84c, transparent)",
          }}
        />
      </motion.div>
    </section>
  );
};

export default Herosection;
