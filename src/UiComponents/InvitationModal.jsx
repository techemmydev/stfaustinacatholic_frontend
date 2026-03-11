import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User, X, ArrowRight, Heart } from "lucide-react";
import { toast } from "sonner";
import {
  submitInvitation,
  resetInvitationState,
} from "../Redux/slice/invitationSlice";

const InvitationSection = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.invitation);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ── backend logic untouched ──────────────────────────────
  useEffect(() => {
    if (success) {
      toast.success("Invitation sent successfully! We'll be in touch soon.");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setIsOpen(false);
        dispatch(resetInvitationState());
      }, 2000);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    return () => dispatch(resetInvitationState());
  }, [dispatch]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    dispatch(submitInvitation(formData));
  };

  const handleClose = () => {
    setIsOpen(false);
    dispatch(resetInvitationState());
    setFormData({ name: "", email: "", message: "" });
  };
  // ─────────────────────────────────────────────────────────

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: "#faf8f5",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(201,168,76,0.07) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              You Are Welcome Here
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
              style={{ color: "#1e3a5f", lineHeight: 1.1 }}
            >
              Join Our Parish
              <br />
              <span style={{ color: "#8B2635" }}>Community</span>
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
              We would love to welcome you to the Sts. Peter &amp; Paul Parish
              family. Whether you are new to the area, returning to the faith,
              or simply looking for a spiritual home — our doors are open to
              you.
            </p>
            <p
              className="text-base leading-relaxed mb-10"
              style={{
                color: "#777",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              Send us a message and we will reach out about our events,
              ministries, and community programs.
            </p>

            {/* Feature list */}
            <div className="flex flex-col gap-3 mb-10">
              {[
                {
                  icon: "✟",
                  text: "Participate in daily Mass and the Sacraments",
                },
                { icon: "✦", text: "Join one of 20+ active parish ministries" },
                { icon: "❤", text: "Connect with a warm, welcoming community" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span style={{ color: "#c9a84c", fontSize: "0.85rem" }}>
                    {item.icon}
                  </span>
                  <p
                    className="text-sm"
                    style={{ color: "#666", fontFamily: "sans-serif" }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all group"
              style={{
                background: "#1e3a5f",
                color: "white",
                fontFamily: "sans-serif",
                clipPath:
                  "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#8B2635")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#1e3a5f")
              }
            >
              <Heart size={15} />
              Send an Invitation
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </motion.div>

          {/* Right: decorative card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="hidden lg:block"
          >
            <div
              className="relative p-10"
              style={{
                background: "linear-gradient(135deg, #1e3a5f 0%, #0f2240 100%)",
                borderTop: "4px solid #c9a84c",
              }}
            >
              {/* Watermark */}
              <div
                className="absolute right-6 bottom-4 opacity-10 text-white select-none"
                style={{ fontSize: "10rem", lineHeight: 1 }}
              >
                ✟
              </div>

              <p
                className="text-xs tracking-[0.25em] uppercase mb-4"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Our Parish Promise
              </p>
              <h3 className="text-2xl font-bold text-white mb-6 leading-snug">
                A Spiritual Home
                <br />
                For Every Soul
              </h3>
              <div
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.1)",
                  marginBottom: "24px",
                }}
              />

              {[
                { label: "New Parishioners", value: "Welcomed every Sunday" },
                { label: "Sacraments", value: "All 7 available" },
                { label: "Languages", value: "English & Igbo" },
                { label: "Children Welcome", value: "Family Mass available" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span
                    className="text-sm"
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}

              <div
                className="mt-8 p-5"
                style={{
                  background: "rgba(201,168,76,0.1)",
                  borderLeft: "3px solid #c9a84c",
                }}
              >
                <p
                  className="text-sm italic"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  "For where two or three are gathered in my name, there am I
                  among them."
                </p>
                <p
                  className="text-xs tracking-widest uppercase mt-2"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  — Matthew 18:20
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MODAL ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.75)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="relative w-full max-w-md overflow-hidden"
              style={{ background: "white" }}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold top bar */}
              <div
                style={{
                  height: "4px",
                  background:
                    "linear-gradient(to right, #1e3a5f, #c9a84c, #8B2635)",
                }}
              />

              <div className="p-8">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center transition-all"
                  style={{ background: "#f5f0e8", color: "#888" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#8B2635";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f5f0e8";
                    e.currentTarget.style.color = "#888";
                  }}
                >
                  <X size={16} />
                </button>

                <p
                  className="text-xs tracking-[0.25em] uppercase mb-2"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  You Are Welcome
                </p>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: "#1e3a5f", fontFamily: "'Georgia', serif" }}
                >
                  Send Us an Invitation
                </h2>
                <p
                  className="text-sm mb-6 leading-relaxed"
                  style={{ color: "#888", fontFamily: "sans-serif" }}
                >
                  Fill out the form and we'll reach out about parish events and
                  ministries.
                </p>

                <div
                  style={{
                    height: "1px",
                    background: "#f0ece4",
                    marginBottom: "24px",
                  }}
                />

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name */}
                  <div
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                      border: "1px solid #e8e2d9",
                      background: "#faf8f5",
                    }}
                  >
                    <User
                      size={15}
                      style={{ color: "#c9a84c", flexShrink: 0 }}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full bg-transparent focus:outline-none text-sm"
                      style={{ color: "#333", fontFamily: "sans-serif" }}
                    />
                  </div>

                  {/* Email */}
                  <div
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                      border: "1px solid #e8e2d9",
                      background: "#faf8f5",
                    }}
                  >
                    <Mail
                      size={15}
                      style={{ color: "#c9a84c", flexShrink: 0 }}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                      className="w-full bg-transparent focus:outline-none text-sm"
                      style={{ color: "#333", fontFamily: "sans-serif" }}
                    />
                  </div>

                  {/* Message */}
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message (optional)"
                    rows={4}
                    className="w-full px-4 py-3 text-sm focus:outline-none resize-none"
                    style={{
                      border: "1px solid #e8e2d9",
                      background: "#faf8f5",
                      color: "#333",
                      fontFamily: "sans-serif",
                    }}
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                    style={{
                      background: loading ? "#ccc" : "#c9a84c",
                      color: "#0a0a0a",
                      fontFamily: "sans-serif",
                      cursor: loading ? "not-allowed" : "pointer",
                      clipPath:
                        "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                    }}
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Invitation <ArrowRight size={13} />
                      </>
                    )}
                  </button>

                  {success && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-sm font-semibold"
                      style={{ color: "#2a5f3f", fontFamily: "sans-serif" }}
                    >
                      ✓ Invitation sent! We'll be in touch soon.
                    </motion.p>
                  )}
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InvitationSection;
