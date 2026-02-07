import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
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

  return (
    <section className="bg-white py-20 font-inter relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-[#1e3a5f] mb-12">
          Community Stories
        </h2>
        <p className="text-gray-700 mb-10">
          Share your spiritual experience with St. Faustina Parish and inspire
          others!
        </p>

        {/* Submission Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-[#fbf9f5] p-8 rounded-xl shadow-lg mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Your Role (e.g., Parishioner, Volunteer)"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
            required
          />
          <textarea
            name="message"
            placeholder="Share your spiritual experience..."
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit Story"}
          </button>
          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-green-600 font-semibold mt-2"
            >
              Your story has been submitted for review. Thank you for sharing!
            </motion.p>
          )}
        </motion.form>

        {/* Display Stories */}
        {loading ? (
          <p className="text-gray-500">Loading testimonials...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-gray-500">
            No testimonials yet. Be the first to share your story!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
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
                <motion.div
                  className="absolute -top-6 -right-6 w-16 h-16 bg-blue-100 rounded-full opacity-20"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "linear",
                  }}
                ></motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunityStories;
