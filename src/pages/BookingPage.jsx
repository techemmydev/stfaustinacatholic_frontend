import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, CheckCircle, Clock, Phone, Mail, User } from "lucide-react";
import { toast } from "sonner";
import {
  createAppointment,
  fetchAvailableSlots,
  resetAppointmentState,
} from "../Redux/slice/BookingAppointSlice";

const appointmentTypes = [
  { value: "mass", label: "Mass Attendance" },
  { value: "baptism", label: "Baptism Preparation" },
  { value: "first-communion", label: "First Communion Preparation" },
  { value: "confirmation", label: "Confirmation Preparation" },
  { value: "confession", label: "Confession/Reconciliation" },
  { value: "wedding", label: "Wedding Planning" },
  { value: "general", label: "General Consultation" },
];

// ─────────────────────────────────────────────────────────────
// Defined OUTSIDE the component so it's a stable reference
// and not recreated on every render.
// ─────────────────────────────────────────────────────────────
const initialFormData = {
  name: "",
  email: "",
  phone: "",
  appointmentType: "",
  date: "",
  time: "",
  notes: "",
};

const formatDisplayDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function BookingPage() {
  const dispatch = useDispatch();
  const { loading, success, error, availableSlots, slotsLoading } = useSelector(
    (state) => state.appointment,
  );

  const [formData, setFormData] = useState({ ...initialFormData });

  // Fetch slots when date changes
  useEffect(() => {
    if (formData.date) {
      dispatch(fetchAvailableSlots(formData.date));
    }
  }, [formData.date, dispatch]);

  // Reset selected time if it's no longer in the available list
  useEffect(() => {
    if (
      formData.time &&
      !availableSlots.find((s) => s.time === formData.time)
    ) {
      setFormData((prev) => ({ ...prev, time: "" }));
    }
  }, [availableSlots]);

  // Show toast on error from slice
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Cleanup on unmount
  useEffect(() => {
    return () => dispatch(resetAppointmentState());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.appointmentType ||
      !formData.date ||
      !formData.time
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    dispatch(createAppointment(formData));
  };

  const handleBookAnother = () => {
    dispatch(resetAppointmentState());
    setFormData({ ...initialFormData });
  };

  // ── Success Screen ─────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f7f4] py-16 px-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="mb-4 text-[#1e3a5f]">
            Appointment Request Submitted!
          </h2>
          <p className="text-lg text-[#666666] mb-6">
            Thank you for your appointment request. Our parish staff will review
            your request and contact you within 24–48 hours.
          </p>

          <div className="bg-[#f9f7f4] rounded-lg p-6 mb-6 text-left space-y-2 text-[#2d2d2d]">
            <h3 className="mb-4 text-[#1e3a5f]">Appointment Details</h3>
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Type:</strong>{" "}
              {
                appointmentTypes.find(
                  (t) => t.value === formData.appointmentType,
                )?.label
              }
            </p>
            <p>
              <strong>Date:</strong> {formatDisplayDate(formData.date)}
            </p>
            <p>
              <strong>Time:</strong> {formData.time}
            </p>
            {formData.notes && (
              <p>
                <strong>Notes:</strong> {formData.notes}
              </p>
            )}
          </div>

          <button
            onClick={handleBookAnother}
            className="px-8 py-3 bg-[#8B2635] text-white rounded-full hover:bg-[#6d1d2a] transition-colors"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  // ── Booking Form ───────────────────────────────────────────────
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-[#d4af37]" />
          </div>
          <h1 className="text-white mb-6">Book an Appointment</h1>
          <p className="text-xl text-gray-200">
            Schedule a meeting with our clergy or staff for sacraments,
            spiritual guidance, or questions.
          </p>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="mb-6 text-2xl font-semibold text-[#1e3a5f]">
                Appointment Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Maria Santos"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Phone *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                  />
                </div>

                {/* Appointment Type */}
                <div>
                  <label
                    htmlFor="appointmentType"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Appointment Type *
                  </label>
                  <select
                    id="appointmentType"
                    name="appointmentType"
                    value={formData.appointmentType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                  >
                    <option value="">Select a type...</option>
                    {appointmentTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="date"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Pick a Date *
                    </label>
                    <input
                      id="date"
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="time"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Choose Your Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      disabled={!formData.date || slotsLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {slotsLoading
                          ? "Loading slots..."
                          : !formData.date
                            ? "Pick a date first"
                            : availableSlots.length === 0
                              ? "No slots available"
                              : "Select a time"}
                      </option>
                      {availableSlots.map((slot) => (
                        <option key={slot.time} value={slot.time}>
                          {slot.time} ({slot.remaining} spot
                          {slot.remaining !== 1 ? "s" : ""} left)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label
                    htmlFor="notes"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Additional Notes{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Any special requests or information we should know..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635] resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#8B2635] hover:bg-[#6d1d2a] text-white py-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? "Submitting..." : "Submit Appointment Request"}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="mb-4 text-xl font-semibold text-[#1e3a5f]">
                Office Hours
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#8B2635] flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">Monday – Friday</p>
                    <p>9:00 AM – 5:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#8B2635] flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">Saturday</p>
                    <p>10:00 AM – 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#8B2635] flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">Sunday</p>
                    <p>Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1e3a5f] text-white rounded-xl shadow-lg p-6">
              <h3 className="mb-4 text-xl font-semibold">Need Help?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  <span>+1 (555) 000-0000</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  <span>parish@stfaustina.org</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
