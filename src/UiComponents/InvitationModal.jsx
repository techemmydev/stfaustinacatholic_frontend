import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User, X } from "lucide-react";

const InvitationSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Invitation Sent:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="bg-[#fbf9f5] py-30 font-inter text-center relative overflow-hidden">
      {/* Intro Content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto px-4 mb-12"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-[#1e3a5f] mb-4">
          Join Our Parish Community
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          We would love to welcome you to our parish family. Click the button
          below to send us an invitation and learn more about our events,
          ministries, and community programs.
        </p>
      </motion.div>

      {/* Centered Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-900 text-white px-8 py-4 rounded-md hover:bg-gray-800 transition font-semibold text-lg"
        >
          Send Invitation
        </button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl w-full max-w-md p-8 relative shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4 text-center">
                Send Us an Invitation
              </h2>
              <p className="text-gray-700 mb-6 text-center">
                Fill out the form and we’ll reach out to you about our parish
                events or ministries.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full focus:outline-none py-2 text-gray-700"
                  />
                </div>

                <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full focus:outline-none py-2 text-gray-700"
                  />
                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message (optional)"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none text-gray-700"
                />

                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition"
                >
                  Send Invitation
                </button>

                {submitted && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-green-600 font-semibold mt-2 text-center"
                  >
                    Invitation sent successfully! We’ll be in touch soon.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InvitationSection;
