import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, User, Pen } from "lucide-react";
import { toast } from "sonner";
import {
  fetchTestimonials,
  submitTestimonial,
  resetTestimonialState,
} from "../Redux/slice/testimonialSlice";

// ── backend logic untouched ──────────────────────────────────

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 60 : -60, opacity: 0 }),
};

const CommunityStories = () => {
  const dispatch = useDispatch();
  const { testimonials, loading, submitting, success, error } = useSelector(
    (state) => state.testimonial,
  );

  const [formData, setFormData] = useState({ name: "", role: "", message: "" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(
        "Your story has been submitted for review. Thank you for sharing!",
      );
      setFormData({ name: "", role: "", message: "" });
      setTimeout(() => dispatch(resetTestimonialState()), 3000);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => nextSlide(), 5000);
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
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // ────────────────────────────────────────────────────────────

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: "#faf8f5",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(201,168,76,0.07) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* ── Header ── */}
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            Faith in Action
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#1e3a5f", lineHeight: 1.1 }}
          >
            Community
            <br />
            <span style={{ color: "#8B2635" }}>Stories</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5 mb-6">
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "rgba(201,168,76,0.4)",
              }}
            />
            <span style={{ color: "#c9a84c" }}>✟</span>
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "rgba(201,168,76,0.4)",
              }}
            />
          </div>
          <p
            className="max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: "#888", fontFamily: "sans-serif", fontWeight: 300 }}
          >
            Every testimony reflects faith in action. Share your spiritual
            journey and inspire others within our parish community.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* ── LEFT: Carousel ── */}
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p
                  className="text-xs tracking-[0.25em] uppercase mb-2"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  Parishioner Voices
                </p>
                <h3 className="text-2xl font-bold" style={{ color: "#1e3a5f" }}>
                  Voices of Our Parish
                </h3>
              </div>
              {/* Arrow controls */}
              {testimonials.length > 1 && (
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    className="w-9 h-9 flex items-center justify-center border transition-all"
                    style={{ borderColor: "#e8e2d9", color: "#888" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#c9a84c";
                      e.currentTarget.style.color = "#c9a84c";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e8e2d9";
                      e.currentTarget.style.color = "#888";
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-9 h-9 flex items-center justify-center border transition-all"
                    style={{ borderColor: "#e8e2d9", color: "#888" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#c9a84c";
                      e.currentTarget.style.color = "#c9a84c";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e8e2d9";
                      e.currentTarget.style.color = "#888";
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div
                  className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
                  style={{
                    borderColor: "#c9a84c",
                    borderTopColor: "transparent",
                  }}
                />
              </div>
            ) : testimonials.length === 0 ? (
              <div
                className="text-center py-16"
                style={{ background: "white", border: "1px solid #e8e2d9" }}
              >
                <p
                  className="text-sm"
                  style={{ color: "#aaa", fontFamily: "sans-serif" }}
                >
                  No testimonials yet. Be the first to share your journey.
                </p>
              </div>
            ) : (
              <div
                className="relative overflow-hidden"
                style={{
                  background: "white",
                  border: "1px solid #e8e2d9",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  minHeight: "340px",
                }}
              >
                {/* Gold top bar */}
                <div
                  style={{
                    height: "4px",
                    background:
                      "linear-gradient(to right, #1e3a5f, #c9a84c, #8B2635)",
                  }}
                />

                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="p-8 md:p-10"
                  >
                    {/* Large quote mark */}
                    <div
                      style={{
                        fontSize: "5rem",
                        lineHeight: 0.7,
                        color: "#c9a84c",
                        opacity: 0.3,
                        fontFamily: "Georgia, serif",
                        marginBottom: "16px",
                      }}
                    >
                      "
                    </div>

                    <p
                      className="text-lg italic leading-relaxed mb-8"
                      style={{ color: "#444" }}
                    >
                      {testimonials[currentIndex].message}
                    </p>

                    {/* Divider */}
                    <div
                      style={{
                        height: "1px",
                        background: "#f0ece4",
                        marginBottom: "20px",
                      }}
                    />

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 flex items-center justify-center text-white font-bold flex-shrink-0"
                        style={{
                          background:
                            currentIndex % 2 === 0 ? "#1e3a5f" : "#8B2635",
                          clipPath:
                            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                        }}
                      >
                        {testimonials[currentIndex].name.charAt(0)}
                      </div>
                      <div>
                        <h4
                          className="font-bold"
                          style={{ color: "#1e3a5f", fontSize: "1rem" }}
                        >
                          {testimonials[currentIndex].name}
                        </h4>
                        <p
                          className="text-xs tracking-widest uppercase mt-0.5"
                          style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                        >
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dot indicators */}
                {testimonials.length > 1 && (
                  <div className="flex justify-center gap-2 pb-6">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="transition-all duration-300"
                        style={{
                          width: index === currentIndex ? "28px" : "8px",
                          height: "3px",
                          borderRadius: "2px",
                          background:
                            index === currentIndex ? "#c9a84c" : "#e8e2d9",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Slide counter */}
            {testimonials.length > 0 && (
              <p
                className="mt-4 text-right text-xs"
                style={{
                  color: "#bbb",
                  fontFamily: "monospace",
                  letterSpacing: "0.2em",
                }}
              >
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </p>
            )}
          </div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:sticky lg:top-24"
          >
            <div
              style={{
                background: "white",
                border: "1px solid #e8e2d9",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                borderTop: "4px solid #c9a84c",
              }}
            >
              {/* Form header */}
              <div
                className="px-8 py-6"
                style={{ borderBottom: "1px solid #f0ece4" }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <Pen size={15} style={{ color: "#c9a84c" }} />
                  <p
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    Your Testimony
                  </p>
                </div>
                <h3 className="text-2xl font-bold" style={{ color: "#1e3a5f" }}>
                  Share Your Story
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                <div className="flex flex-col gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      className="block text-xs font-semibold tracking-widest uppercase mb-2"
                      style={{ color: "#888", fontFamily: "sans-serif" }}
                    >
                      Full Name
                    </label>
                    <div
                      className="flex items-center gap-3 px-4 py-3"
                      style={{
                        border: "1px solid #e8e2d9",
                        background: "#faf8f5",
                      }}
                    >
                      <User
                        size={13}
                        style={{ color: "#c9a84c", flexShrink: 0 }}
                      />
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent focus:outline-none text-sm"
                        style={{ color: "#333", fontFamily: "sans-serif" }}
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <label
                      className="block text-xs font-semibold tracking-widest uppercase mb-2"
                      style={{ color: "#888", fontFamily: "sans-serif" }}
                    >
                      Your Role
                    </label>
                    <div
                      className="flex items-center gap-3 px-4 py-3"
                      style={{
                        border: "1px solid #e8e2d9",
                        background: "#faf8f5",
                      }}
                    >
                      <span
                        style={{
                          color: "#c9a84c",
                          fontSize: "0.8rem",
                          flexShrink: 0,
                        }}
                      >
                        ✟
                      </span>
                      <input
                        type="text"
                        name="role"
                        placeholder="Parishioner, Volunteer, Choir Member…"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent focus:outline-none text-sm"
                        style={{ color: "#333", fontFamily: "sans-serif" }}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="block text-xs font-semibold tracking-widest uppercase mb-2"
                      style={{ color: "#888", fontFamily: "sans-serif" }}
                    >
                      Your Testimony
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Share how God has worked in your life through our parish…"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm focus:outline-none resize-none"
                      style={{
                        border: "1px solid #e8e2d9",
                        background: "#faf8f5",
                        color: "#333",
                        fontFamily: "sans-serif",
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 group"
                    style={{
                      background: submitting ? "#ccc" : "#1e3a5f",
                      color: "white",
                      fontFamily: "sans-serif",
                      cursor: submitting ? "not-allowed" : "pointer",
                      clipPath:
                        "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                    }}
                    onMouseEnter={(e) => {
                      if (!submitting)
                        e.currentTarget.style.background = "#8B2635";
                    }}
                    onMouseLeave={(e) => {
                      if (!submitting)
                        e.currentTarget.style.background = "#1e3a5f";
                    }}
                  >
                    {submitting ? (
                      "Submitting…"
                    ) : (
                      <>
                        Submit Your Story
                        <ArrowRight
                          size={13}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>

                  {success && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-sm font-semibold"
                      style={{ color: "#2a5f3f", fontFamily: "sans-serif" }}
                    >
                      ✓ Story submitted! Thank you for sharing.
                    </motion.p>
                  )}
                </div>
              </form>
            </div>

            {/* Note below form */}
            <p
              className="mt-4 text-xs text-center"
              style={{ color: "#bbb", fontFamily: "sans-serif" }}
            >
              All submissions are reviewed before being published.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunityStories;
