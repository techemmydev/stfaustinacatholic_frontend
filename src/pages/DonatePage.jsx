import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Heart,
  Calendar,
  DollarSign,
  CheckCircle,
  CreditCard,
  ArrowRight,
  Mail,
  Phone,
  User,
  Loader2,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  initializeDonation,
  verifyDonation,
  clearVerifiedDonation,
} from "../Redux/slice/Donationslice";

const donationProjects = [
  {
    id: "general",
    title: "General Parish Fund",
    description: "Support day-to-day operations, ministries, and programs",
    icon: "✟",
    accent: "#8B2635",
  },
  {
    id: "building",
    title: "Building & Maintenance",
    description: "Help maintain and improve our church facilities",
    icon: "✦",
    accent: "#1e3a5f",
  },
  {
    id: "education",
    title: "Religious Education",
    description: "Support faith formation programs for all ages",
    icon: "📖",
    accent: "#8B2635",
  },
  {
    id: "outreach",
    title: "Charitable Outreach",
    description: "Serve the poor and those in need in our community",
    icon: "❤",
    accent: "#1e3a5f",
  },
];

const otherWays = [
  {
    title: "Bank Transfer",
    body: "Transfer directly to the parish account. Contact the parish office for account details.",
  },
  {
    title: "Envelope Collection",
    body: "Place your donation in the collection basket during Mass using the envelopes provided or available at the church entrance.",
  },
  {
    title: "Stock or Securities",
    body: "Consider donating appreciated stock for potential tax benefits. Contact our parish office for account information.",
  },
  {
    title: "Planned Giving",
    body: "Leave a lasting legacy through your will or estate plans. Contact our pastor to discuss planned giving opportunities.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

// ── Load Paystack inline script once ─────────────────────────────
function usePaystackScript() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (window.PaystackPop) {
      setLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  }, []);
  return loaded;
}

export function DonatePage() {
  const dispatch = useDispatch();
  const { initLoading, verifyLoading, verifiedDonation } = useSelector(
    (state) => state.donation,
  );

  const paystackReady = usePaystackScript();

  const [donationType, setDonationType] = useState("one-time");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [project, setProject] = useState("general");
  const [frequency, setFrequency] = useState("monthly");

  // Donor info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const predefinedAmounts = ["1000", "2500", "5000", "10000", "25000"];

  const finalAmount = amount === "custom" ? customAmount : amount;

  // ── Paystack popup callback ───────────────────────────────────
  const openPaystackPopup = (reference, accessCode) => {
    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email,
      amount: Math.round(parseFloat(finalAmount) * 100), // kobo
      currency: "NGN",
      ref: reference,
      access_code: accessCode,
      metadata: { name, phone, project, donationType },

      onSuccess: async () => {
        // Verify with our backend
        const result = await dispatch(verifyDonation(reference));
        if (result.payload?.status === "success") {
          toast.success("Payment verified! Thank you for your donation.");
        } else {
          toast.error("Payment could not be verified. Contact the parish.");
        }
      },
      onCancel: () => {
        toast.warning("Payment cancelled. You can try again anytime.");
      },
    });
    handler.openIframe();
  };

  // ── Form submit ───────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    if (!finalAmount || parseFloat(finalAmount) < 100) {
      toast.error("Minimum donation is ₦100.");
      return;
    }
    if (!paystackReady) {
      toast.error("Payment gateway not ready. Please wait a moment.");
      return;
    }

    const result = await dispatch(
      initializeDonation({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        amount: parseFloat(finalAmount),
        project,
        donationType,
        frequency: donationType === "recurring" ? frequency : "none",
        message: message.trim(),
      }),
    );

    if (result.error) {
      toast.error(result.payload || "Failed to start payment.");
      return;
    }

    const { reference, accessCode } = result.payload;
    openPaystackPopup(reference, accessCode);
  };

  // ── Reset after success ───────────────────────────────────────
  const handleReset = () => {
    dispatch(clearVerifiedDonation());
    setAmount("");
    setCustomAmount("");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  // ── Success Screen ────────────────────────────────────────────
  if (verifiedDonation) {
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
          className="max-w-2xl w-full text-center"
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
          <div className="p-12">
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
              Deo Gratias
            </p>
            <h2
              className="text-4xl font-bold mb-5"
              style={{ color: "#1e3a5f", lineHeight: 1.1 }}
            >
              Thank You for Your
              <br />
              <span style={{ color: "#8B2635" }}>Generosity</span>
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
              className="text-base leading-relaxed mb-4"
              style={{
                color: "#888",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              Your donation of{" "}
              <strong style={{ color: "#1e3a5f" }}>
                ₦{Number(verifiedDonation.amount).toLocaleString()}
              </strong>{" "}
              to{" "}
              <strong style={{ color: "#1e3a5f" }}>
                {verifiedDonation.project}
              </strong>{" "}
              has been received.
            </p>
            <div
              className="p-6 mb-8 text-left"
              style={{ background: "#faf8f5", borderLeft: "4px solid #c9a84c" }}
            >
              <p
                className="text-xs text-gray-500 mb-1"
                style={{ fontFamily: "sans-serif" }}
              >
                Transaction Reference
              </p>
              <p className="text-sm font-mono" style={{ color: "#1e3a5f" }}>
                {verifiedDonation.paystackReference}
              </p>
              <p
                className="text-xs text-gray-500 mt-3"
                style={{ fontFamily: "sans-serif" }}
              >
                A receipt will be sent to {verifiedDonation.email}. May God
                bless you for your generosity!
              </p>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all group"
              style={{
                background: "#c9a84c",
                color: "#0a0a0a",
                fontFamily: "sans-serif",
                clipPath:
                  "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              }}
            >
              Make Another Donation
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

  // ── Main Page ─────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <Toaster position="top-right" richColors />

      {/* ── HERO ─────────────────────────────────────────────────── */}
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
          src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Parish Donation"
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
              Give with a Grateful Heart
            </p>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-5"
              style={{ lineHeight: 1.05 }}
            >
              Support Our
              <br />
              <span style={{ color: "#c9a84c" }}>Parish</span>
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
              Your generosity helps us continue our mission of faith, worship,
              and service to our community.
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
          GIVE / PARISH
        </div>
      </motion.section>

      {/* ── STATS STRIP ──────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #0f2240 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                number: "100%",
                label: "Goes to Parish",
                desc: "Every naira directly supports our community",
              },
              {
                number: "Secure",
                label: "& Encrypted",
                desc: "Powered by Paystack — Nigeria's trusted gateway",
              },
              {
                number: "Instant",
                label: "Confirmation",
                desc: "Receive your receipt immediately by email",
              },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="text-center px-8 py-4"
                style={{
                  borderRight:
                    i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                <p
                  className="text-4xl font-bold mb-2"
                  style={{ color: "#c9a84c" }}
                >
                  {stat.number}
                </p>
                <p
                  className="text-sm font-bold tracking-widest uppercase mb-2 text-white"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {stat.label}
                </p>
                <p
                  className="text-sm"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "sans-serif",
                  }}
                >
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY GIVE + DONATION FORM ─────────────────────────────── */}
      <section className="py-24" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — Why Give */}
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
                Your Impact
              </p>
              <h2
                className="text-4xl font-bold mb-5 leading-tight"
                style={{ color: "#1e3a5f", lineHeight: 1.1 }}
              >
                Why Your
                <br />
                <span style={{ color: "#8B2635" }}>Gift Matters</span>
              </h2>
              <div
                style={{
                  height: "3px",
                  width: "60px",
                  background: "#c9a84c",
                  marginBottom: "24px",
                }}
              />
              <p
                className="text-lg leading-relaxed mb-6"
                style={{
                  color: "#555",
                  fontFamily: "sans-serif",
                  fontWeight: 300,
                }}
              >
                Your financial support enables St. Faustina Parish to celebrate
                the sacraments, educate our children in the faith, maintain our
                beautiful church, and serve those in need.
              </p>
              <div
                className="p-6"
                style={{
                  background: "#faf8f5",
                  borderLeft: "4px solid #c9a84c",
                }}
              >
                <p className="text-lg italic mb-2" style={{ color: "#1e3a5f" }}>
                  "Give, and it will be given to you. A good measure, pressed
                  down, shaken together and running over."
                </p>
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  — Luke 6:38
                </p>
              </div>
              <div className="flex flex-col gap-4 mt-10">
                {[
                  {
                    icon: "✟",
                    title: "Sacraments & Worship",
                    desc: "Funding the beauty and reverence of our liturgical life.",
                  },
                  {
                    icon: "❤",
                    title: "Charitable Outreach",
                    desc: "Serving the poor and vulnerable in Christ's name.",
                  },
                  {
                    icon: "✦",
                    title: "Faith Formation",
                    desc: "Educating children and adults in the Catholic faith.",
                  },
                ].map((val, i) => (
                  <div
                    key={val.title}
                    className="flex items-start gap-5 p-5"
                    style={{
                      border: "1px solid #e8e2d9",
                      borderLeft: `4px solid ${i % 2 === 0 ? "#8B2635" : "#1e3a5f"}`,
                      background: "white",
                    }}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-lg"
                      style={{ color: "#c9a84c" }}
                    >
                      {val.icon}
                    </div>
                    <div>
                      <h4
                        className="font-bold mb-1"
                        style={{ color: "#1e3a5f", fontSize: "0.95rem" }}
                      >
                        {val.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#888", fontFamily: "sans-serif" }}
                      >
                        {val.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Donation Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div
                style={{
                  border: "1px solid #e8e2d9",
                  background: "white",
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
                      Make a Donation
                    </p>
                    <h3 className="text-xl font-bold text-white">Give Today</h3>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                  {/* ── Donor Info ──────────────────────────────── */}
                  <div>
                    <p
                      className="text-xs tracking-widest uppercase mb-4"
                      style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                    >
                      Your Information
                    </p>
                    <div className="flex flex-col gap-4">
                      {/* Name */}
                      <div className="relative">
                        <User
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2"
                          style={{ color: "#c9a84c" }}
                        />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full Name *"
                          required
                          className="w-full pl-9 pr-4 py-3 text-sm outline-none"
                          style={{
                            border: "1px solid #e8e2d9",
                            background: "#faf8f5",
                            fontFamily: "sans-serif",
                            color: "#1e3a5f",
                          }}
                        />
                      </div>
                      {/* Email */}
                      <div className="relative">
                        <Mail
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2"
                          style={{ color: "#c9a84c" }}
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address *"
                          required
                          className="w-full pl-9 pr-4 py-3 text-sm outline-none"
                          style={{
                            border: "1px solid #e8e2d9",
                            background: "#faf8f5",
                            fontFamily: "sans-serif",
                            color: "#1e3a5f",
                          }}
                        />
                      </div>
                      {/* Phone */}
                      <div className="relative">
                        <Phone
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2"
                          style={{ color: "#c9a84c" }}
                        />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone Number (optional)"
                          className="w-full pl-9 pr-4 py-3 text-sm outline-none"
                          style={{
                            border: "1px solid #e8e2d9",
                            background: "#faf8f5",
                            fontFamily: "sans-serif",
                            color: "#1e3a5f",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── Donation Type ───────────────────────────── */}
                  <div>
                    <p
                      className="text-xs tracking-widest uppercase mb-4"
                      style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                    >
                      Donation Type
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          key: "one-time",
                          icon: <DollarSign size={20} />,
                          label: "One-Time Gift",
                          sub: "Single donation today",
                        },
                        {
                          key: "recurring",
                          icon: <Calendar size={20} />,
                          label: "Recurring Gift",
                          sub: "Automatic monthly giving",
                        },
                      ].map(({ key, icon, label, sub }) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setDonationType(key)}
                          className="p-5 text-left transition-all"
                          style={{
                            border: `2px solid ${donationType === key ? "#c9a84c" : "#e8e2d9"}`,
                            background:
                              donationType === key ? "#faf8f5" : "white",
                          }}
                        >
                          <span
                            style={{
                              color: donationType === key ? "#8B2635" : "#bbb",
                            }}
                          >
                            {icon}
                          </span>
                          <h4
                            className="font-bold mt-2 mb-1"
                            style={{ color: "#1e3a5f", fontSize: "0.9rem" }}
                          >
                            {label}
                          </h4>
                          <p
                            className="text-xs"
                            style={{ color: "#aaa", fontFamily: "sans-serif" }}
                          >
                            {sub}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ── Frequency ───────────────────────────────── */}
                  <AnimatePresence>
                    {donationType === "recurring" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p
                          className="text-xs tracking-widest uppercase mb-4"
                          style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                        >
                          Frequency
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          {["weekly", "monthly", "yearly"].map((freq) => (
                            <button
                              key={freq}
                              type="button"
                              onClick={() => setFrequency(freq)}
                              className="py-3 text-xs font-bold tracking-widest uppercase transition-all capitalize"
                              style={{
                                background:
                                  frequency === freq ? "#8B2635" : "#faf8f5",
                                color: frequency === freq ? "white" : "#888",
                                fontFamily: "sans-serif",
                                border: `1px solid ${frequency === freq ? "#8B2635" : "#e8e2d9"}`,
                              }}
                            >
                              {freq}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── Amount ──────────────────────────────────── */}
                  <div>
                    <p
                      className="text-xs tracking-widest uppercase mb-4"
                      style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                    >
                      Select Amount (₦)
                    </p>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {predefinedAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setAmount(amt);
                            setCustomAmount("");
                          }}
                          className="py-3 text-sm font-bold tracking-wide transition-all"
                          style={{
                            background: amount === amt ? "#1e3a5f" : "#faf8f5",
                            color: amount === amt ? "#c9a84c" : "#555",
                            fontFamily: "sans-serif",
                            border: `1px solid ${amount === amt ? "#1e3a5f" : "#e8e2d9"}`,
                          }}
                        >
                          ₦{Number(amt).toLocaleString()}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setAmount("custom")}
                        className="py-3 text-xs font-bold tracking-widest uppercase transition-all"
                        style={{
                          background:
                            amount === "custom" ? "#1e3a5f" : "#faf8f5",
                          color: amount === "custom" ? "#c9a84c" : "#555",
                          fontFamily: "sans-serif",
                          border: `1px solid ${amount === "custom" ? "#1e3a5f" : "#e8e2d9"}`,
                        }}
                      >
                        Custom
                      </button>
                    </div>
                    <AnimatePresence>
                      {amount === "custom" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="relative"
                        >
                          <span
                            className="absolute left-4 top-1/2 -translate-y-1/2 font-bold"
                            style={{
                              color: "#c9a84c",
                              fontFamily: "sans-serif",
                            }}
                          >
                            ₦
                          </span>
                          <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            placeholder="Enter amount"
                            min="100"
                            className="w-full pl-8 pr-4 py-3 outline-none"
                            style={{
                              border: "1px solid #c9a84c",
                              background: "#faf8f5",
                              fontFamily: "sans-serif",
                              color: "#1e3a5f",
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* ── Donate To ───────────────────────────────── */}
                  <div>
                    <p
                      className="text-xs tracking-widest uppercase mb-4"
                      style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                    >
                      Donate To
                    </p>
                    <select
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      className="w-full px-4 py-3 outline-none"
                      style={{
                        border: "1px solid #e8e2d9",
                        background: "#faf8f5",
                        fontFamily: "sans-serif",
                        color: "#1e3a5f",
                      }}
                    >
                      {donationProjects.map((proj) => (
                        <option key={proj.id} value={proj.id}>
                          {proj.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ── Personal Note ────────────────────────────── */}
                  <div>
                    <p
                      className="text-xs tracking-widest uppercase mb-3"
                      style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                    >
                      Personal Note{" "}
                      <span
                        style={{
                          color: "#bbb",
                          textTransform: "none",
                          letterSpacing: 0,
                        }}
                      >
                        (optional)
                      </span>
                    </p>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share a message or intention with the parish…"
                      rows={2}
                      className="w-full px-4 py-3 text-sm outline-none resize-none"
                      style={{
                        border: "1px solid #e8e2d9",
                        background: "#faf8f5",
                        fontFamily: "sans-serif",
                        color: "#1e3a5f",
                      }}
                    />
                  </div>

                  {/* ── Security note ────────────────────────────── */}
                  <div
                    className="flex items-start gap-3 p-4"
                    style={{
                      background: "#faf8f5",
                      borderLeft: "3px solid #c9a84c",
                    }}
                  >
                    <CreditCard
                      size={16}
                      style={{
                        color: "#c9a84c",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "#888", fontFamily: "sans-serif" }}
                    >
                      Payments are processed securely by{" "}
                      <strong>Paystack</strong>. We never store your card
                      details. All donations support St. Faustina Parish
                      directly.
                    </p>
                  </div>

                  {/* ── Submit ───────────────────────────────────── */}
                  <button
                    type="submit"
                    disabled={initLoading || verifyLoading}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all group disabled:opacity-60"
                    style={{
                      background: "#c9a84c",
                      color: "#0a0a0a",
                      fontFamily: "sans-serif",
                      clipPath:
                        "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                    }}
                  >
                    {initLoading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />{" "}
                        Initializing…
                      </>
                    ) : verifyLoading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />{" "}
                        Verifying…
                      </>
                    ) : (
                      <>
                        Pay with Paystack{" "}
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

      {/* ── WHERE YOUR DONATIONS GO ───────────────────────────────── */}
      <section className="py-24" style={{ background: "#faf8f5" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Transparency
              </p>
              <h2 className="text-4xl font-bold" style={{ color: "#1e3a5f" }}>
                Where Your Donations Go
              </h2>
              <div
                style={{
                  height: "3px",
                  width: "60px",
                  background: "#c9a84c",
                  marginTop: "16px",
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationProjects.map((proj, index) => (
              <motion.div
                key={proj.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="group p-7 transition-all cursor-pointer relative overflow-hidden"
                style={{
                  background: "white",
                  border: "1px solid #e8e2d9",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0 group-hover:h-1 transition-all duration-300"
                  style={{ background: proj.accent }}
                />
                <div className="text-3xl mb-4" style={{ color: proj.accent }}>
                  {proj.icon}
                </div>
                <h3
                  className="font-bold mb-2"
                  style={{ color: "#1e3a5f", fontSize: "1rem" }}
                >
                  {proj.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#888", fontFamily: "sans-serif" }}
                >
                  {proj.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER WAYS TO GIVE ────────────────────────────────────── */}
      <section className="py-24" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
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
                More Options
              </p>
              <h2
                className="text-4xl font-bold mb-5"
                style={{ color: "#1e3a5f", lineHeight: 1.1 }}
              >
                Other Ways
                <br />
                <span style={{ color: "#8B2635" }}>to Give</span>
              </h2>
              <div
                style={{
                  height: "3px",
                  width: "60px",
                  background: "#c9a84c",
                  marginBottom: "24px",
                }}
              />
              <p
                className="text-base leading-relaxed"
                style={{
                  color: "#777",
                  fontFamily: "sans-serif",
                  fontWeight: 300,
                }}
              >
                Beyond online giving, there are several meaningful ways to
                contribute to St. Faustina Parish. We are grateful for every
                form of generosity.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col gap-0"
              style={{ border: "1px solid #e8e2d9" }}
            >
              {otherWays.map((way, i) => (
                <div
                  key={way.title}
                  className="p-6"
                  style={{
                    borderBottom:
                      i < otherWays.length - 1 ? "1px solid #f0ece4" : "none",
                    borderLeft: `4px solid ${i % 2 === 0 ? "#8B2635" : "#1e3a5f"}`,
                  }}
                >
                  <h4
                    className="font-bold mb-1"
                    style={{ color: "#1e3a5f", fontSize: "0.95rem" }}
                  >
                    {way.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#888", fontFamily: "sans-serif" }}
                  >
                    {way.body}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
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
            Thank You
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Thank You for Your Support
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
            "Give, and it will be given to you. A good measure, pressed down,
            shaken together and running over, will be poured into your lap."
          </p>
          <p
            className="text-base"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            — Luke 6:38
          </p>
        </div>
      </section>
    </div>
  );
}
