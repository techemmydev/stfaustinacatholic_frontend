import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

const appointmentTypes = [
  { value: "mass", label: "Mass Attendance" },
  { value: "baptism", label: "Baptism Preparation" },
  { value: "first-communion", label: "First Communion Preparation" },
  { value: "confirmation", label: "Confirmation Preparation" },
  { value: "confession", label: "Confession/Reconciliation" },
  { value: "wedding", label: "Wedding Planning" },
  { value: "general", label: "General Consultation" },
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    appointmentType: "",
    date: "",
    time: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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

    console.log("Booking submitted:", formData);
    setSubmitted(true);
    toast.success("Appointment request submitted successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const calendarDates = generateCalendarDates();

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f7f4] py-16 px-4">
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
                    (t) => t.value === formData.appointmentType
                  )?.label
                }
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(formData.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
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

          <p className="text-[#666666] mb-6">
            A confirmation email has been sent to{" "}
            <strong>{formData.email}</strong>
          </p>

          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                appointmentType: "",
                date: "",
                time: "",
                notes: "",
              });
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
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-[#d4af37]" />
          </div>
          <h1 className="text-white mb-6">Book an Appointment</h1>
          <p className="text-xl text-gray-200">
            Schedule a meeting with our clergy or staff for sacraments,
            spiritual guidance, or questions
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="mb-6 text-[#1e3a5f]">Appointment Details</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2">Full Name *</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2">Phone *</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block mb-2">Appointment Type *</label>
                  <select
                    name="appointmentType"
                    value={formData.appointmentType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg"
                  >
                    <option value="">Select...</option>
                    {appointmentTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border rounded-lg"
                  />

                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border rounded-lg"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Additional notes..."
                />

                <button className="w-full bg-[#8B2635] text-white py-3 rounded-full">
                  Submit Appointment Request
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="mb-4 text-[#1e3a5f]">Available Time Slots</h3>
            <p className="text-sm text-gray-600">
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
