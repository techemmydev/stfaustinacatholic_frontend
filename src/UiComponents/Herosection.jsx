import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/images/stfaustinaimage.png";

const Herosection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={logo}
        alt="St. Faustina Parish Hero Section"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to St. Faustina Parish
        </h1>

        <p className="text-lg md:text-2xl mb-6 max-w-2xl">
          Join us in faith, prayer, and community as we grow in love and service
          to God.
        </p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a
            href="#about"
            className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-semibold rounded shadow transition"
          >
            Learn More
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-semibold rounded shadow transition"
          >
            Join Our Community
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Down Arrow */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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
