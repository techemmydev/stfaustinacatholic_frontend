import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import {
  fetchTestimonials,
  submitTestimonial,
  resetTestimonialState,
} from "../Redux/slice/testimonialSlice";

const CommunityStories = () => {
  const dispatch = useDispatch();
  const { testimonials, loading, submitting, success, error } = useSelector(
    (state) => state.testimonial,
  );

  const [formData, setFormData] = useState({ name: "", role: "", message: "" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Fetch testimonials on mount
  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  // Handle success
  useEffect(() => {
    if (success) {
      toast.success(
        "Your story has been submitted for review. Thank you for sharing!",
      );
      setFormData({ name: "", role: "", message: "" });
      setTimeout(() => {
        dispatch(resetTestimonialState());
      }, 3000);
    }
  }, [success, dispatch]);

  // Handle error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Auto-play carousel
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [currentIndex, testimonials.length]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.role || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(submitTestimonial(formData));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-[#f8fafc] to-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1e3a5f] mb-6">
            Community Stories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Every testimony reflects faith in action. Share your spiritual
            journey and inspire others within our parish community.
          </p>
        </div>

        {/* ===== 2 COLUMN LAYOUT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ================= FORM ================= */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-8 lg:p-10 rounded-3xl shadow-2xl border border-gray-100 sticky top-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-[#1e3a5f] mb-6">
              Share Your Story
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#1e3a5f] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Your Role
                </label>
                <input
                  type="text"
                  name="role"
                  placeholder="Parishioner, Volunteer, Choir Member..."
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#1e3a5f] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Your Testimony
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Share how God has worked in your life through our parish..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#1e3a5f] focus:outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#8B2635] text-white py-4 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Your Story"}
              </button>
            </div>
          </motion.form>

          {/* ================= CAROUSEL ================= */}
          <div>
            <h3 className="text-2xl font-bold text-[#1e3a5f] mb-8 text-center lg:text-left">
              Voices of Our Parish
            </h3>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : testimonials.length === 0 ? (
              <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
                <p className="text-gray-500">
                  No testimonials yet. Be the first to share your journey.
                </p>
              </div>
            ) : (
              <div className="relative bg-white rounded-3xl shadow-2xl p-10 min-h-[320px]">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                  >
                    <div className="text-center">
                      <p className="text-gray-700 text-lg leading-relaxed mb-8">
                        “{testimonials[currentIndex].message}”
                      </p>

                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] flex items-center justify-center mb-3">
                          <span className="text-white text-xl font-bold">
                            {testimonials[currentIndex].name.charAt(0)}
                          </span>
                        </div>

                        <h4 className="text-[#1e3a5f] font-bold text-lg">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {testimonials.length > 1 && (
                  <div className="flex justify-center gap-3 mt-8">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition ${
                          index === currentIndex
                            ? "bg-[#1e3a5f]"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Soft Luxury Glow Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#1e3a5f] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#8B2635] opacity-5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default CommunityStories;
