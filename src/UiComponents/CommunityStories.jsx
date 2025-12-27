import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Youth Ministry Volunteer",
    message:
      "Volunteering at St. Michael's has truly transformed my faith journey. The community is welcoming and supportive!",
  },
  {
    name: "Michael Thompson",
    role: "Parishioner",
    message:
      "Attending services here has brought peace and joy to our family. We feel spiritually nourished every week.",
  },
  {
    name: "Emily Davis",
    role: "Choir Member",
    message:
      "Being part of the choir has helped me grow in faith and friendship. Music here is a true form of worship.",
  },
];

const CommunityStories = () => {
  return (
    <section className="bg-white py-20 font-inter relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-[#1e3a5f] text-center mb-12">
          Community Stories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#fbf9f5] rounded-xl p-8 shadow-lg relative overflow-hidden cursor-pointer"
            >
              <Quote className="w-10 h-10 text-blue-900 mb-4" />
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "{testimonial.message}"
              </p>
              <div>
                <h4 className="text-blue-900 font-semibold text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>

              {/* Animated accent circle */}
              <motion.div
                className="absolute -top-6 -right-6 w-16 h-16 bg-blue-100 rounded-full opacity-20"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              ></motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityStories;
