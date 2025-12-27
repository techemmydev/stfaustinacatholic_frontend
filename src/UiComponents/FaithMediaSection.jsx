import React from "react";
import { motion } from "framer-motion";

const FaithMediaSection = () => {
  return (
    <section className="bg-[#fbf9f5] py-20 font-inter">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1e3a5f] mb-6">
            Grow Your Faith No Matter Where You Are
          </h2>

          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            From inspiring homilies and catechetical teachings to documentaries
            and coverage of important liturgical celebrations, our parish media
            ministry brings the faith closer to you wherever you are.
          </p>

          <p className="text-gray-600 mb-6">
            <span className="font-semibold text-[#1e3a5f]">Featured:</span>{" "}
            Priestly & Diaconate Ordinations — 28.06.2025
          </p>

          <a
            href="#media"
            className="inline-block bg-blue-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition"
          >
            See More
          </a>
        </motion.div>

        {/* Right Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full aspect-video rounded-lg overflow-hidden shadow-lg"
        >
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/8R0E_u6D76M?si=2gVdIXm5MxmzM4iu"
            title="Catholic Media"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default FaithMediaSection;
