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
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 font-inter relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1e3a5f] mb-4">
            Community Stories
          </h2>
          <p className="text-gray-700 text-lg">
            Share your spiritual experience with St. Faustina Parish and inspire
            others!
          </p>
        </div>

        {/* Submission Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl mb-16 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Role *
              </label>
              <input
                type="text"
                name="role"
                placeholder="e.g., Parishioner, Volunteer, Minister"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Testimonial *
              </label>
              <textarea
                name="message"
                placeholder="Share your spiritual experience and how St. Faustina Parish has impacted your faith journey..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition resize-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#1e3a5f] text-white px-6 py-4 rounded-lg hover:bg-[#152d47] transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Your Story"
              )}
            </button>
          </div>
        </motion.form>

        {/* Testimonials Carousel */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-[#1e3a5f] text-center mb-10">
            Hear From Our Community
          </h3>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-20">
              <Quote className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                No testimonials yet. Be the first to share your story!
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Carousel Container */}
              <div className="relative h-[400px] md:h-[350px] overflow-hidden">
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
                    className="absolute w-full"
                  >
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-100 mx-4 md:mx-8">
                      <div className="flex flex-col items-center text-center">
                        {/* Quote Icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] rounded-full flex items-center justify-center mb-6">
                          <Quote className="w-8 h-8 text-white" />
                        </div>

                        {/* Testimonial Message */}
                        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
                          "{testimonials[currentIndex].message}"
                        </p>

                        {/* Author Info */}
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center mb-3">
                            <span className="text-white text-2xl font-bold">
                              {testimonials[currentIndex].name.charAt(0)}
                            </span>
                          </div>
                          <h4 className="text-[#1e3a5f] font-bold text-xl">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-gray-500 text-sm mb-5">
                            {testimonials[currentIndex].role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-[#1e3a5f] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-[#1e3a5f] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {testimonials.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentIndex
                          ? "w-8 h-3 bg-[#1e3a5f]"
                          : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Counter */}
              {testimonials.length > 1 && (
                <div className="text-center mt-4 text-gray-500 text-sm">
                  {currentIndex + 1} / {testimonials.length}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#1e3a5f] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#8B2635] opacity-5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default CommunityStories;
