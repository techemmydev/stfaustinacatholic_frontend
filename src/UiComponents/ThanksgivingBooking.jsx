import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  Church,
  User,
  Mail,
  Heart,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  submitThanksgiving,
  resetThanksgivingState,
} from "../Redux/slice/thanksgivingSlice";
import { fetchActiveMasses } from "../Redux/slice/Massslice";

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid #e8e2d9",
  background: "#faf8f5",
  outline: "none",
  fontFamily: "sans-serif",
  color: "#1e3a5f",
  fontSize: "0.9rem",
  borderRadius: 0,
};

const labelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "0.7rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#c9a84c",
  fontFamily: "sans-serif",
  marginBottom: "8px",
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

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

  useEffect(() => {
    dispatch(fetchActiveMasses());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(
        "Thanksgiving submitted! We'll include your intention in the Mass.",
      );
      setForm({ name: "", email: "", intention: "", massId: "" });
      setTimeout(() => dispatch(resetThanksgivingState()), 3000);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
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
          src="https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Thanksgiving Mass"
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
              Gratitude & Praise
            </p>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-5"
              style={{ lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              Thanksgiving
              <br />
              <span style={{ color: "#c9a84c" }}>Mass Booking</span>
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
              Submit your thanksgiving intention for Mass and let the whole
              parish rejoice with you.
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
          GIVE / THANKS
        </div>
      </motion.section>

      {/* ── HOW IT WORKS + FORM ────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#faf8f5" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — How It Works */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                The Process
              </p>
              <h2
                className="text-4xl font-bold mb-5 leading-tight"
                style={{ color: "#1e3a5f", lineHeight: 1.1 }}
              >
                How It
                <br />
                <span style={{ color: "#8B2635" }}>Works</span>
              </h2>
              <div
                style={{
                  height: "3px",
                  width: "60px",
                  background: "#c9a84c",
                  marginBottom: "24px",
                }}
              />

              <div
                className="flex flex-col gap-0"
                style={{ border: "1px solid #e8e2d9" }}
              >
                {[
                  {
                    step: "01",
                    text: "Select a Mass time from the available options below.",
                  },
                  {
                    step: "02",
                    text: "Share your thanksgiving intention — gratitude, blessings received, answered prayers.",
                  },
                  {
                    step: "03",
                    text: `Maximum ${activeMasses[0]?.maxThanksgivings || 5} bookings accepted per Mass.`,
                  },
                  {
                    step: "04",
                    text: "Your intention will be included and remembered at the selected Mass.",
                  },
                ].map(({ step, text }, i) => (
                  <div
                    key={step}
                    className="flex items-start gap-5 p-5"
                    style={{
                      borderBottom: i < 3 ? "1px solid #f0ece4" : "none",
                      borderLeft: `4px solid ${i % 2 === 0 ? "#8B2635" : "#1e3a5f"}`,
                      background: "white",
                    }}
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={{
                        background: i % 2 === 0 ? "#8B2635" : "#1e3a5f",
                        color: "#c9a84c",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {step}
                    </div>
                    <p
                      className="text-sm leading-relaxed pt-1"
                      style={{ color: "#777", fontFamily: "sans-serif" }}
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="mt-8 p-6"
                style={{
                  background: "white",
                  borderLeft: "4px solid #c9a84c",
                  border: "1px solid #e8e2d9",
                }}
              >
                <p className="text-lg italic mb-2" style={{ color: "#1e3a5f" }}>
                  "In everything give thanks; for this is the will of God."
                </p>
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  — 1 Thessalonians 5:18
                </p>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div
                style={{
                  background: "white",
                  border: "1px solid #e8e2d9",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
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
                  <Heart className="w-6 h-6" style={{ color: "#c9a84c" }} />
                  <div>
                    <p
                      className="text-xs tracking-[0.25em] uppercase"
                      style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                    >
                      Your Gratitude
                    </p>
                    <h3 className="text-xl font-bold text-white">
                      Submit Your Thanksgiving
                    </h3>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  {/* Name */}
                  <div>
                    <label style={labelStyle}>
                      <User size={12} style={{ color: "#8B2635" }} />
                      Full Name <span style={{ color: "#8B2635" }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                      onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle}>
                      <Mail size={12} style={{ color: "#8B2635" }} />
                      Email Address <span style={{ color: "#8B2635" }}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                      onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                    />
                  </div>

                  {/* Mass Selection */}
                  <div>
                    <label style={labelStyle}>
                      <Church size={12} style={{ color: "#8B2635" }} />
                      Select Mass <span style={{ color: "#8B2635" }}>*</span>
                    </label>
                    <select
                      value={form.massId}
                      onChange={(e) =>
                        setForm({ ...form, massId: e.target.value })
                      }
                      required
                      disabled={loading}
                      style={{
                        ...inputStyle,
                        opacity: loading ? 0.5 : 1,
                        cursor: loading ? "not-allowed" : "default",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                      onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                    >
                      <option value="">
                        {loading ? "Loading masses..." : "Select a Mass"}
                      </option>
                      {activeMasses.map((mass) => (
                        <option key={mass._id} value={mass._id}>
                          {mass.name}
                          {mass.time && ` — ${mass.time}`}
                        </option>
                      ))}
                    </select>
                    {activeMasses.length === 0 && !loading && (
                      <p
                        className="text-xs mt-2"
                        style={{ color: "#e53e3e", fontFamily: "sans-serif" }}
                      >
                        No masses available at this time. Please try again
                        later.
                      </p>
                    )}
                  </div>

                  {/* Intention */}
                  <div>
                    <label style={labelStyle}>
                      <Heart size={12} style={{ color: "#8B2635" }} />
                      Thanksgiving Intention{" "}
                      <span style={{ color: "#8B2635" }}>*</span>
                    </label>
                    <textarea
                      placeholder="Share what you're grateful for... (e.g., thanksgiving for family blessings, recovery from illness, successful venture, etc.)"
                      rows={5}
                      value={form.intention}
                      onChange={(e) =>
                        setForm({ ...form, intention: e.target.value })
                      }
                      required
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                      onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                    />
                    <p
                      className="text-xs mt-2"
                      style={{ color: "#aaa", fontFamily: "sans-serif" }}
                    >
                      Your intention will be remembered during the Mass
                      celebration.
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={
                      submitting || loading || activeMasses.length === 0
                    }
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all group"
                    style={{
                      background:
                        submitting || loading || activeMasses.length === 0
                          ? "#ccc"
                          : "#c9a84c",
                      color: "#0a0a0a",
                      fontFamily: "sans-serif",
                      cursor:
                        submitting || loading || activeMasses.length === 0
                          ? "not-allowed"
                          : "pointer",
                      clipPath:
                        "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                    }}
                  >
                    {submitting ? (
                      <>
                        <svg
                          className="animate-spin w-4 h-4"
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
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Thanksgiving{" "}
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY OFFER THANKSGIVING ─────────────────────────────────── */}
      <section className="py-24" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-14">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              The Purpose
            </p>
            <h2 className="text-4xl font-bold" style={{ color: "#1e3a5f" }}>
              Why Offer
              <br />
              <span style={{ color: "#8B2635" }}>Thanksgiving?</span>
            </h2>
            <div
              style={{
                height: "3px",
                width: "60px",
                background: "#c9a84c",
                margin: "16px auto 0",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "❤",
                title: "Express Gratitude",
                desc: "Give thanks to God for blessings, answered prayers, and divine providence in your life.",
                accent: "#8B2635",
              },
              {
                icon: "✟",
                title: "Join in Worship",
                desc: "Your intention becomes part of the holy sacrifice, uniting with the parish community.",
                accent: "#1e3a5f",
              },
              {
                icon: "✦",
                title: "Remember Blessings",
                desc: "Keep a record of God's faithfulness and continue in a spirit of thanksgiving.",
                accent: "#8B2635",
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="group p-7 relative overflow-hidden"
                style={{
                  background: "white",
                  border: "1px solid #e8e2d9",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0 group-hover:h-1 transition-all duration-300"
                  style={{ background: card.accent }}
                />
                <div className="text-3xl mb-4" style={{ color: card.accent }}>
                  {card.icon}
                </div>
                <h3
                  className="font-bold mb-2"
                  style={{ color: "#1e3a5f", fontSize: "1.05rem" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#888", fontFamily: "sans-serif" }}
                >
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1e3a5f 0%, #0f2240 60%, #8B2635 100%)",
        }}
      >
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2 text-white/5 select-none pointer-events-none hidden lg:block"
          style={{ fontSize: "20rem", lineHeight: 1 }}
        >
          ✟
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            Deo Gratias
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            A Heart Full of Gratitude
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
            className="text-lg mb-4 max-w-xl mx-auto leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "sans-serif",
              fontWeight: 300,
            }}
          >
            "In everything give thanks; for this is the will of God in Christ
            Jesus for you."
          </p>
          <p
            className="text-base"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            — 1 Thessalonians 5:18
          </p>
        </div>
      </section>
    </div>
  );
}
