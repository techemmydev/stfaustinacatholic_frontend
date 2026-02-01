import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import {
  createAppointment,
  fetchAvailableSlots,
  resetAppointmentState,
} from "../Redux/slice/BookingAppointSlice"; // update path as needed

const appointmentTypes = [
  { value: "mass", label: "Mass Attendance" },
  { value: "baptism", label: "Baptism Preparation" },
  { value: "first-communion", label: "First Communion Preparation" },
  { value: "confirmation", label: "Confirmation Preparation" },
  { value: "confession", label: "Confession/Reconciliation" },
  { value: "wedding", label: "Wedding Planning" },
  { value: "general", label: "General Consultation" },
];

export function BookingPage() {
  const dispatch = useDispatch();
  const { loading, success, error, availableSlots, slotsLoading } = useSelector(
    (state) => state.appointment,
  );

  const resetFormData = () => ({
    name: "",
    email: "",
    phone: "",
    appointmentType: "",
    date: "",
    time: "",
    notes: "",
  });

  const [formData, setFormData] = useState(resetFormData());

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
    if (error) {
      toast.error(error);
    }
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

  const formatDisplayDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f7f4] py-16 px-4 font-inter">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="mb-4 text-[#1e3a5f]">
            Appointment Request Submitted!
          </h2>
          <p className="text-lg text-[#666666] mb-6">
            Thank you for your appointment request. Our parish staff will review
            your request and contact you within 24-48 hours.
          </p>
          <div className="bg-[#f9f7f4] rounded-lg p-6 mb-6 text-left">
            <h3 className="mb-4 text-[#1e3a5f]">Appointment Details</h3>
            <div className="space-y-2 text-[#2d2d2d]">
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
          </div>
          <button
            onClick={() => {
              dispatch(resetAppointmentState());
              setFormData(resetFormData());
            }}
            className="px-8 py-3 bg-[#8B2635] text-white rounded-full hover:bg-[#6d1d2a]"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] py-20 text-white font-inter">
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

      {/* Booking Form */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="mb-6 text-2xl font-semibold text-[#1e3a5f]">
                Appointment Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium">
                    Phone *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                  />
                </div>

                {/* Appointment Type */}
                <div>
                  <label
                    htmlFor="appointmentType"
                    className="block mb-2 font-medium"
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
                    <option value="">Select...</option>
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
                    <label htmlFor="date" className="block mb-2 font-medium">
                      Pick a Date *
                    </label>
                    <input
                      id="date"
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="block mb-2 font-medium">
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
                          ? "Loading..."
                          : !formData.date
                            ? "Pick a date first"
                            : availableSlots.length === 0
                              ? "No slots available"
                              : "Select time"}
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
                  <label htmlFor="notes" className="block mb-2 font-medium">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Optional notes..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#8B2635] hover:bg-[#a0334b] text-white py-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit Appointment Request"}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="mb-4 text-xl font-semibold text-[#1e3a5f]">
              Available Time Slots
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Monday–Friday: 9AM–5PM
              <br />
              Saturday: 10AM–2PM
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
