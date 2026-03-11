// ContactPage.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  submitContactForm,
  resetContactState,
} from "../Redux/slice/contactsSlice";

// ── Contact info data ──────────────────────────────────────
const contactCards = [
  {
    icon: MapPin,
    label: "Address",
    lines: ["123 Church Street", "Springfield, IL 62701", "United States"],
    color: "#1e3a5f",
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["Office: (217) 555-1234", "Emergency: (217) 555-1235"],
    color: "#8B2635",
    links: ["tel:+12175551234", "tel:+12175551235"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["parish@stspeterpaulparish.org", "office@stspeterpaulparish.org"],
    color: "#1e3a5f",
    links: [
      "mailto:parish@stspeterpaulparish.org",
      "mailto:office@stspeterpaulparish.org",
    ],
  },
  {
    icon: Clock,
    label: "Office Hours",
    rows: [
      { day: "Monday – Friday", time: "9:00 AM – 5:00 PM" },
      { day: "Saturday", time: "10:00 AM – 2:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    color: "#8B2635",
  },
];

export function ContactPage() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
  useEffect(() => {
    return () => dispatch(resetContactState());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    dispatch(submitContactForm(formData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    dispatch(resetContactState());
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  // ── Success state ──────────────────────────────────────
  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center py-16 px-4"
        style={{
          background: "#faf8f5",
          fontFamily: "'Georgia','Times New Roman',serif",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full text-center p-12"
          style={{
            background: "white",
            border: "1px solid #e8e2d9",
            borderTop: "4px solid #c9a84c",
          }}
        >
          <div
            className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
            style={{ background: "#f0fdf4" }}
          >
            <CheckCircle size={32} style={{ color: "#2a5f3f" }} />
          </div>
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            Message Sent
          </p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1e3a5f" }}>
            Thank You for Reaching Out
          </h2>
          <div
            style={{
              height: "1px",
              background: "#f0ece4",
              margin: "0 auto 20px",
            }}
          />
          <p
            className="text-sm leading-relaxed mb-8"
            style={{ color: "#888", fontFamily: "sans-serif", fontWeight: 300 }}
          >
            Your message has been sent. We typically respond within 24–48 hours.
            If your matter is urgent, please call our parish office directly.
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all"
            style={{
              background: "#1e3a5f",
              color: "white",
              fontFamily: "sans-serif",
              clipPath:
                "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#8B2635")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1e3a5f")}
          >
            Send Another Message <ArrowRight size={13} />
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Main page ──────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif" }}>
      <Toaster position="top-right" richColors />

      {/* ── HERO ── */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{ height: "440px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1e3a5f 0%, #0f2240 55%, #8B2635 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute right-12 opacity-5 text-white select-none hidden lg:block"
          style={{ fontSize: "22rem", lineHeight: 1, top: "-1rem" }}
        >
          ✟
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              We're Here to Help
            </p>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-4"
              style={{ lineHeight: 1.05 }}
            >
              Contact
              <br />
              <span style={{ color: "#c9a84c" }}>Us</span>
            </h1>
            <div
              style={{
                height: "3px",
                width: "60px",
                background: "#c9a84c",
                marginBottom: "16px",
              }}
            />
            <p
              className="text-base"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              Reach out with questions, prayer requests, or feedback. We'd love
              to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT INFO + FORM ── */}
      <section className="py-20" style={{ background: "#faf8f5" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: contact cards */}
            <div className="flex flex-col gap-5">
              {contactCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  style={{
                    background: "white",
                    border: "1px solid #e8e2d9",
                    borderLeft: `4px solid ${card.color}`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-9 h-9 flex items-center justify-center"
                        style={{ background: `${card.color}12` }}
                      >
                        <card.icon size={16} style={{ color: card.color }} />
                      </div>
                      <p
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: card.color, fontFamily: "sans-serif" }}
                      >
                        {card.label}
                      </p>
                    </div>

                    {/* Hours rows */}
                    {card.rows ? (
                      <div className="flex flex-col gap-2">
                        {card.rows.map((row) => (
                          <div key={row.day} className="flex justify-between">
                            <span
                              className="text-xs"
                              style={{
                                color: "#888",
                                fontFamily: "sans-serif",
                              }}
                            >
                              {row.day}
                            </span>
                            <span
                              className="text-xs font-semibold"
                              style={{
                                color: "#333",
                                fontFamily: "sans-serif",
                              }}
                            >
                              {row.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        {card.lines.map((line, li) =>
                          card.links ? (
                            <a
                              key={line}
                              href={card.links[li]}
                              className="text-sm transition-colors"
                              style={{
                                color: "#666",
                                fontFamily: "sans-serif",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.color = card.color)
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "#666")
                              }
                            >
                              {line}
                            </a>
                          ) : (
                            <p
                              key={line}
                              className="text-sm"
                              style={{
                                color: "#666",
                                fontFamily: "sans-serif",
                              }}
                            >
                              {line}
                            </p>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* RIGHT: form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div
                style={{
                  background: "white",
                  border: "1px solid #e8e2d9",
                  borderTop: "4px solid #c9a84c",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                {/* Form header */}
                <div
                  className="px-8 py-6"
                  style={{ borderBottom: "1px solid #f0ece4" }}
                >
                  <p
                    className="text-xs tracking-[0.25em] uppercase mb-1"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    Get in Touch
                  </p>
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: "#1e3a5f" }}
                  >
                    Send Us a Message
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    {/* Name */}
                    <div>
                      <label
                        className="block text-xs font-semibold tracking-widest uppercase mb-2"
                        style={{ color: "#888", fontFamily: "sans-serif" }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-3 focus:outline-none text-sm"
                        style={{
                          border: "1px solid #e8e2d9",
                          background: "#faf8f5",
                          color: "#333",
                          fontFamily: "sans-serif",
                        }}
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label
                        className="block text-xs font-semibold tracking-widest uppercase mb-2"
                        style={{ color: "#888", fontFamily: "sans-serif" }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 focus:outline-none text-sm"
                        style={{
                          border: "1px solid #e8e2d9",
                          background: "#faf8f5",
                          color: "#333",
                          fontFamily: "sans-serif",
                        }}
                      />
                    </div>
                    {/* Phone */}
                    <div>
                      <label
                        className="block text-xs font-semibold tracking-widest uppercase mb-2"
                        style={{ color: "#888", fontFamily: "sans-serif" }}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 focus:outline-none text-sm"
                        style={{
                          border: "1px solid #e8e2d9",
                          background: "#faf8f5",
                          color: "#333",
                          fontFamily: "sans-serif",
                        }}
                      />
                    </div>
                    {/* Subject */}
                    <div>
                      <label
                        className="block text-xs font-semibold tracking-widest uppercase mb-2"
                        style={{ color: "#888", fontFamily: "sans-serif" }}
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 focus:outline-none text-sm"
                        style={{
                          border: "1px solid #e8e2d9",
                          background: "#faf8f5",
                          color: "#333",
                          fontFamily: "sans-serif",
                        }}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label
                      className="block text-xs font-semibold tracking-widest uppercase mb-2"
                      style={{ color: "#888", fontFamily: "sans-serif" }}
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Your message here…"
                      className="w-full px-4 py-3 focus:outline-none resize-none text-sm"
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
                    disabled={loading}
                    className="w-full py-4 flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase transition-all"
                    style={{
                      background: loading ? "#ccc" : "#1e3a5f",
                      color: "white",
                      fontFamily: "sans-serif",
                      cursor: loading ? "not-allowed" : "pointer",
                      clipPath:
                        "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                    }}
                    onMouseEnter={(e) => {
                      if (!loading)
                        e.currentTarget.style.background = "#8B2635";
                    }}
                    onMouseLeave={(e) => {
                      if (!loading)
                        e.currentTarget.style.background = "#1e3a5f";
                    }}
                  >
                    <Send size={13} />
                    {loading ? "Sending…" : "Send Message"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="py-20" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-10">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              Find Us
            </p>
            <h2 className="text-3xl font-bold" style={{ color: "#1e3a5f" }}>
              Visit Our Parish
            </h2>
          </div>
          <div style={{ border: "1px solid #e8e2d9", overflow: "hidden" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.82812420773!2d3.3671489740460308!3d6.543376122934027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8da2d75af429%3A0x5ce51c3b96079e1c!2sSS%20Peter%20And%20Paul%20Catholic%20Church!5e0!3m2!1sen!2sng!4v1773241552118!5m2!1sen!2sng"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="St. Peter & Paul Parish Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ── EMERGENCY ── */}
      <section className="py-16" style={{ background: "#faf8f5" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pastoral emergency */}
            <div
              style={{ background: "#1e3a5f", borderLeft: "4px solid #8B2635" }}
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle size={18} style={{ color: "#8B2635" }} />
                  <p
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    Pastoral Emergency
                  </p>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  24-Hour Pastoral Care
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontFamily: "sans-serif",
                    fontWeight: 300,
                  }}
                >
                  If you or a family member are seriously ill, hospitalised, or
                  in danger of death, a priest is available around the clock for
                  the Sacrament of Anointing and spiritual care.
                </p>
                <a
                  href="tel:+12175551235"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all"
                  style={{
                    background: "#8B2635",
                    color: "white",
                    fontFamily: "sans-serif",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#6d1d2a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#8B2635")
                  }
                >
                  <Phone size={13} /> Call Emergency Line
                </a>
              </div>
            </div>

            {/* Prayer request */}
            <div
              style={{
                background: "white",
                border: "1px solid #e8e2d9",
                borderLeft: "4px solid #c9a84c",
              }}
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ color: "#c9a84c", fontSize: "1rem" }}>✟</span>
                  <p
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    Prayer Requests
                  </p>
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "#1e3a5f" }}
                >
                  Ask for Our Prayers
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{
                    color: "#777",
                    fontFamily: "sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Submit your prayer intentions to our prayer chain. Our
                  community prays together for those in need every day. No
                  request is too small.
                </p>
                <a
                  href="mailto:prayers@stspeterpaulparish.org"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase group"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  Submit a Prayer Request
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
