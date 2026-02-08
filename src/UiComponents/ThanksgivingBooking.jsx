import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  fetchMasses,
  submitThanksgiving,
  resetThanksgivingState,
} from "../Redux/slice/thanksgivingSlice";

export default function ThanksgivingBooking() {
  const dispatch = useDispatch();
  const { masses, loading, submitting, success, error } = useSelector(
    (state) => state.thanksgiving,
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    intention: "",
    massId: "",
  });

  // Fetch masses on mount
  useEffect(() => {
    dispatch(fetchMasses());
  }, [dispatch]);

  // Handle success
  useEffect(() => {
    if (success) {
      toast.success("Thanksgiving submitted successfully!");
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
    <section className="py-16 bg-[#f9f7f4]">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#1e3a5f] mb-6">
          Thanksgiving Mass Booking
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Submit your thanksgiving intention for Mass this week. Maximum{" "}
          {masses[0]?.maxThanksgivings || 5} bookings per Mass.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-[#2d2d2d]">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#2d2d2d]">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#2d2d2d]">
              Select Mass *
            </label>
            <select
              value={form.massId}
              onChange={(e) => setForm({ ...form, massId: e.target.value })}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635] disabled:opacity-50"
            >
              <option value="">
                {loading ? "Loading masses..." : "Select Mass"}
              </option>
              {masses.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#2d2d2d]">
              Thanksgiving Intention *
            </label>
            <textarea
              placeholder="Write your thanksgiving intention..."
              rows={4}
              value={form.intention}
              onChange={(e) => setForm({ ...form, intention: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || loading}
            className="w-full py-3 bg-[#8B2635] hover:bg-[#6d1d2a] text-white rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit Thanksgiving"}
          </button>
        </form>
      </div>
    </section>
  );
}
