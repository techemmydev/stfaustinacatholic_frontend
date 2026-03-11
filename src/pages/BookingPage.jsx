import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
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
  { value: "confession", label: "Confession / Reconciliation" },
  { value: "wedding", label: "Wedding Planning" },
  { value: "general", label: "General Consultation" },
];

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

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid #e8e2d9",
  background: "#faf8f5",
  outline: "none",
  fontFamily: "sans-serif",
  color: "#1e3a5f",
  fontSize: "0.9rem",
  transition: "border-color 0.2s",
};

export function BookingPage() {
  const dispatch = useDispatch();
  const { loading, success, error, availableSlots, slotsLoading } = useSelector(
    (state) => state.appointment,
  );
  const [formData, setFormData] = useState({ ...initialFormData });

  useEffect(() => {
    if (formData.date) dispatch(fetchAvailableSlots(formData.date));
  }, [formData.date, dispatch]);

  useEffect(() => {
    if (formData.time && !availableSlots.find((s) => s.time === formData.time))
      setFormData((prev) => ({ ...prev, time: "" }));
  }, [availableSlots]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
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

  // ── Success Screen ──────────────────────────────────────────────
  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center py-16 px-4"
        style={{
          background: "#faf8f5",
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full"
          style={{
            background: "white",
            border: "1px solid #e8e2d9",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              height: "4px",
              background:
                "linear-gradient(to right, #c9a84c, #e8d5a3, #c9a84c)",
            }}
          />
          <div className="p-12 text-center">
            <div
              className="w-20 h-20 flex items-center justify-center mx-auto mb-6"
              style={{ background: "#f0faf0", border: "2px solid #86efac" }}
            >
              <CheckCircle className="w-10 h-10" style={{ color: "#16a34a" }} />
            </div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              Request Received
            </p>
            <h2
              className="text-4xl font-bold mb-5"
              style={{ color: "#1e3a5f", lineHeight: 1.1 }}
            >
              Appointment
              <br />
              <span style={{ color: "#8B2635" }}>Submitted!</span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
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
              className="text-base leading-relaxed mb-8"
              style={{
                color: "#888",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              Our parish staff will review your request and contact you within
              24–48 hours to confirm.
            </p>

            <div
              className="p-6 mb-8 text-left space-y-3"
              style={{ background: "#faf8f5", borderLeft: "4px solid #c9a84c" }}
            >
              <p
                className="text-xs tracking-widest uppercase mb-3"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Appointment Details
              </p>
              {[
                ["Name", formData.name],
                ["Email", formData.email],
                ["Phone", formData.phone],
                [
                  "Type",
                  appointmentTypes.find(
                    (t) => t.value === formData.appointmentType,
                  )?.label,
                ],
                ["Date", formatDisplayDate(formData.date)],
                ["Time", formData.time],
                formData.notes ? ["Notes", formData.notes] : null,
              ]
                .filter(Boolean)
                .map(([label, val]) => (
                  <div
                    key={label}
                    className="flex gap-3 text-sm"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    <span
                      className="font-bold w-16 flex-shrink-0"
                      style={{ color: "#1e3a5f" }}
                    >
                      {label}:
                    </span>
                    <span style={{ color: "#777" }}>{val}</span>
                  </div>
                ))}
            </div>

            <button
              onClick={handleBookAnother}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all group"
              style={{
                background: "#c9a84c",
                color: "#0a0a0a",
                fontFamily: "sans-serif",
                clipPath:
                  "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              }}
            >
              Book Another Appointment
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Booking Form ────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: "520px" }}
      >
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.2) 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1519824145371-296894a3dcd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Book an Appointment"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="max-w-2xl"
          >
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              Schedule a Visit
            </p>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-5"
              style={{ lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              Book an
              <br />
              <span style={{ color: "#c9a84c" }}>Appointment</span>
            </h1>
            <div
              style={{
                height: "3px",
                width: "60px",
                background: "#c9a84c",
                marginBottom: "20px",
              }}
            />
            <p
              className="text-lg leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.75)",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              Schedule a meeting with our clergy or staff for sacraments,
              spiritual guidance, or questions.
            </p>
          </motion.div>
        </div>
        <div
          className="absolute bottom-8 right-6 md:right-16 z-20 text-white/25"
          style={{
            fontFamily: "monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
          }}
        >
          BOOK / APPOINTMENT
        </div>
      </motion.section>

      {/* ── FORM + SIDEBAR ──────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#faf8f5" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <div
                style={{
                  background: "white",
                  border: "1px solid #e8e2d9",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                {/* Form header */}
                <div
                  className="px-8 py-6 flex items-center gap-4"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e3a5f 0%, #0f2240 100%)",
                    borderBottom: "3px solid #c9a84c",
                  }}
                >
                  <Calendar className="w-6 h-6" style={{ color: "#c9a84c" }} />
                  <div>
                    <p
                      className="text-xs tracking-[0.25em] uppercase"
                      style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                    >
                      Fill in your details
                    </p>
                    <h3 className="text-xl font-bold text-white">
                      Appointment Details
                    </h3>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        id: "name",
                        label: "Full Name",
                        placeholder: "e.g. Maria Santos",
                        type: "text",
                      },
                      {
                        id: "email",
                        label: "Email Address",
                        placeholder: "you@example.com",
                        type: "email",
                      },
                    ].map(({ id, label, placeholder, type }) => (
                      <div key={id}>
                        <p
                          className="text-xs tracking-widest uppercase mb-2"
                          style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                        >
                          {label} <span style={{ color: "#8B2635" }}>*</span>
                        </p>
                        <input
                          id={id}
                          name={id}
                          type={type}
                          value={formData[id]}
                          onChange={handleInputChange}
                          required
                          placeholder={placeholder}
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#c9a84c")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#e8e2d9")
                          }
                        />
                      </div>
                    ))}
                  </div>

                  {/* Phone */}
                  <div>
                    <p
                      className="text-xs tracking-widest uppercase mb-2"
                      style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                    >
                      Phone <span style={{ color: "#8B2635" }}>*</span>
                    </p>
                    <input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+1 (555) 000-0000"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                      onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                    />
                  </div>

                  {/* Appointment Type */}
                  <div>
                    <p
                      className="text-xs tracking-widest uppercase mb-2"
                      style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                    >
                      Appointment Type{" "}
                      <span style={{ color: "#8B2635" }}>*</span>
                    </p>
                    <select
                      id="appointmentType"
                      name="appointmentType"
                      value={formData.appointmentType}
                      onChange={handleInputChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                      onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
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
                      <p
                        className="text-xs tracking-widest uppercase mb-2"
                        style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                      >
                        Pick a Date <span style={{ color: "#8B2635" }}>*</span>
                      </p>
                      <input
                        id="date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        style={inputStyle}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#c9a84c")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                      />
                    </div>
                    <div>
                      <p
                        className="text-xs tracking-widest uppercase mb-2"
                        style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                      >
                        Choose Your Time{" "}
                        <span style={{ color: "#8B2635" }}>*</span>
                      </p>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        disabled={!formData.date || slotsLoading}
                        style={{
                          ...inputStyle,
                          opacity: !formData.date || slotsLoading ? 0.5 : 1,
                          cursor:
                            !formData.date || slotsLoading
                              ? "not-allowed"
                              : "default",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#c9a84c")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
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
                    <p
                      className="text-xs tracking-widest uppercase mb-2"
                      style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                    >
                      Additional Notes{" "}
                      <span
                        style={{
                          color: "#aaa",
                          fontWeight: 300,
                          textTransform: "none",
                          letterSpacing: 0,
                        }}
                      >
                        (optional)
                      </span>
                    </p>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Any special requests or information we should know..."
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                      onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all group"
                    style={{
                      background: loading ? "#ccc" : "#c9a84c",
                      color: "#0a0a0a",
                      fontFamily: "sans-serif",
                      cursor: loading ? "not-allowed" : "pointer",
                      clipPath:
                        "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                    }}
                  >
                    {loading ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Request{" "}
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Office Hours */}
              <div
                style={{
                  background: "white",
                  border: "1px solid #e8e2d9",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  className="px-6 py-4"
                  style={{
                    borderBottom: "3px solid #c9a84c",
                    background:
                      "linear-gradient(135deg, #1e3a5f 0%, #0f2240 100%)",
                  }}
                >
                  <p
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    We're Here
                  </p>
                  <h4 className="text-lg font-bold text-white">Office Hours</h4>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { day: "Monday – Friday", hours: "9:00 AM – 5:00 PM" },
                    { day: "Saturday", hours: "10:00 AM – 2:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex items-start gap-3">
                      <Clock
                        size={14}
                        style={{
                          color: "#c9a84c",
                          flexShrink: 0,
                          marginTop: "3px",
                        }}
                      />
                      <div>
                        <p
                          className="text-xs font-bold tracking-wide"
                          style={{ color: "#1e3a5f", fontFamily: "sans-serif" }}
                        >
                          {day}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "#888", fontFamily: "sans-serif" }}
                        >
                          {hours}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #1e3a5f 0%, #0f2240 100%)",
                  border: "1px solid #1e3a5f",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  className="px-6 py-4"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <p
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    Get in Touch
                  </p>
                  <h4 className="text-lg font-bold text-white">Need Help?</h4>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { Icon: Phone, value: "+1 (555) 000-0000" },
                    { Icon: Mail, value: "parish@stfaustina.org" },
                  ].map(({ Icon, value }) => (
                    <div key={value} className="flex items-center gap-3">
                      <Icon
                        size={14}
                        style={{ color: "#c9a84c", flexShrink: 0 }}
                      />
                      <span
                        className="text-sm"
                        style={{
                          color: "rgba(255,255,255,0.75)",
                          fontFamily: "sans-serif",
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appointment Types Quick Ref */}
              <div
                style={{ background: "#faf8f5", border: "1px solid #e8e2d9" }}
              >
                <div
                  className="px-6 py-4"
                  style={{ borderBottom: "3px solid #8B2635" }}
                >
                  <p
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{ color: "#8B2635", fontFamily: "sans-serif" }}
                  >
                    Available For
                  </p>
                  <h4
                    className="text-base font-bold"
                    style={{ color: "#1e3a5f" }}
                  >
                    Appointment Types
                  </h4>
                </div>
                <div className="p-4">
                  {appointmentTypes.map((type, i) => (
                    <div
                      key={type.value}
                      className="flex items-center gap-2 py-2"
                      style={{
                        borderBottom:
                          i < appointmentTypes.length - 1
                            ? "1px solid #f0ece4"
                            : "none",
                      }}
                    >
                      <span
                        style={{
                          color: i % 2 === 0 ? "#8B2635" : "#1e3a5f",
                          fontSize: "0.6rem",
                        }}
                      >
                        ✟
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "#777", fontFamily: "sans-serif" }}
                      >
                        {type.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
