import React from "react";
import { motion } from "framer-motion";

const AboutusMedia = () => {
  return (
    <section className="bg-[#fbf9f5] py-20 font-inter">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1e3a5f] mb-6">
            Discover Our Parish Story
          </h2>

          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            At St. Faustina’s Parish, we are a community united by faith and
            service. Explore inspiring stories, witness celebrations, and learn
            how we live out our Catholic mission every day.
          </p>

          <p className="text-gray-600 mb-6">
            <span className="font-semibold text-[#1e3a5f]">Highlights:</span>
            Community Outreach, Youth Engagement, and Special Liturgical
            Celebrations.
          </p>

          <a
            href="#media"
            className="inline-block bg-blue-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition"
          >
            Learn More
          </a>
        </motion.div>

        {/* Right Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full aspect-video rounded-lg overflow-hidden shadow-lg relative group"
        >
          <video
            className="w-full h-full object-cover rounded-lg"
            src="/path-to-your-video.mp4" // replace with your own video
            controls
            autoPlay={false}
            muted
            loop
          />
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Play Video</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutusMedia;
