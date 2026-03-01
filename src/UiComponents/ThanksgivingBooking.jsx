import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, Church, User, Mail, Heart } from "lucide-react";
import { toast } from "sonner";
import {
  submitThanksgiving,
  resetThanksgivingState,
} from "../Redux/slice/thanksgivingSlice";
import { fetchActiveMasses } from "../Redux/slice/Massslice";

export default function ThanksgivingBooking() {
  const dispatch = useDispatch();
  const { submitting, success, error } = useSelector(
    (state) => state.thanksgiving,
  );
  const { activeMasses, loading } = useSelector((state) => state.mass);

  const [form, setForm] = useState({
    name: "",
    email: "",
    intention: "",
    massId: "",
  });

  // Fetch masses on mount
  useEffect(() => {
    dispatch(fetchActiveMasses());
  }, [dispatch]);

  // Handle success
  useEffect(() => {
    if (success) {
      toast.success(
        "Thanksgiving submitted successfully! We'll include your intention in the Mass.",
      );
      setForm({
        name: "",
        email: "",
        intention: "",
        massId: "",
      });
      setTimeout(() => {
        dispatch(resetThanksgivingState());
      }, 3000);
    }
  }, [success, dispatch]);

  // Handle error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Cleanup on unmount
  useEffect(() => {
    return () => dispatch(resetThanksgivingState());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.intention || !form.massId) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(submitThanksgiving(form));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-[#d4af37]" />
          </div>
          <h1
            className="text-4xl md:text-5xl text-white mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Thanksgiving Mass Booking
          </h1>
          <p className="text-xl text-gray-200">
            Submit your thanksgiving intention for Mass this week
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 max-w-4xl mx-auto px-4">
        <div className="bg-blue-50 border-l-4 border-[#1e3a5f] p-6 rounded-lg mb-8">
          <h3
            className="text-lg text-[#1e3a5f] mb-2"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            How It Works
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-[#8B2635] mr-2">•</span>
              <span>Select a Mass time from the available options</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#8B2635] mr-2">•</span>
              <span>
                Share your thanksgiving intention (gratitude, blessings, etc.)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#8B2635] mr-2">•</span>
              <span>
                Maximum {activeMasses[0]?.maxThanksgivings || 5} bookings per
                Mass
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#8B2635] mr-2">•</span>
              <span>Your intention will be included in the selected Mass</span>
            </li>
          </ul>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#8B2635] p-6">
            <h2
              className="text-2xl text-white text-center"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Submit Your Thanksgiving
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Name Field */}
            <div>
              <label className="flex items-center gap-2 mb-2 font-medium text-[#2d2d2d]">
                <User className="w-4 h-4 text-[#8B2635]" />
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent transition"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="flex items-center gap-2 mb-2 font-medium text-[#2d2d2d]">
                <Mail className="w-4 h-4 text-[#8B2635]" />
                Email Address *
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent transition"
              />
            </div>

            {/* Mass Selection */}
            <div>
              <label className="flex items-center gap-2 mb-2 font-medium text-[#2d2d2d]">
                <Church className="w-4 h-4 text-[#8B2635]" />
                Select Mass *
              </label>
              <select
                value={form.massId}
                onChange={(e) => setForm({ ...form, massId: e.target.value })}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <option value="">
                  {loading ? "Loading masses..." : "Select a Mass"}
                </option>
                {activeMasses.map((mass) => (
                  <option key={mass._id} value={mass._id}>
                    {mass.name}
                    {mass.time && ` - ${mass.time}`}
                  </option>
                ))}
              </select>
              {activeMasses.length === 0 && !loading && (
                <p className="text-sm text-red-600 mt-2">
                  No masses available at this time. Please try again later.
                </p>
              )}
            </div>

            {/* Intention Field */}
            <div>
              <label className="flex items-center gap-2 mb-2 font-medium text-[#2d2d2d]">
                <Heart className="w-4 h-4 text-[#8B2635]" />
                Thanksgiving Intention *
              </label>
              <textarea
                placeholder="Share what you're grateful for... (e.g., thanksgiving for family blessings, recovery from illness, successful venture, etc.)"
                rows={5}
                value={form.intention}
                onChange={(e) =>
                  setForm({ ...form, intention: e.target.value })
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent resize-none transition"
              />
              <p className="text-sm text-gray-500 mt-2">
                Your intention will be remembered during the Mass celebration
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || loading || activeMasses.length === 0}
              className="w-full py-4 bg-gradient-to-r from-[#1e3a5f] to-[#8B2635] hover:from-[#152d47] hover:to-[#6d1d2a] text-white rounded-full font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
                "Submit Thanksgiving"
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-12 bg-[#f9f7f4]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h3
              className="text-2xl text-[#1e3a5f] mb-4 text-center"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Why Offer Thanksgiving?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg text-[#1e3a5f] mb-2 font-semibold">
                  Express Gratitude
                </h4>
                <p className="text-gray-600 text-sm">
                  Give thanks to God for blessings, answered prayers, and divine
                  providence in your life
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Church className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg text-[#1e3a5f] mb-2 font-semibold">
                  Join in Worship
                </h4>
                <p className="text-gray-600 text-sm">
                  Your intention becomes part of the holy sacrifice, uniting
                  with the parish community
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg text-[#1e3a5f] mb-2 font-semibold">
                  Remember Blessings
                </h4>
                <p className="text-gray-600 text-sm">
                  Keep a record of God's faithfulness and continue in a spirit
                  of thanksgiving
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
