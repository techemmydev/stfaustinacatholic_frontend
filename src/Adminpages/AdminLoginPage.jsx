import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  MessageSquare,
  X,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { loginAdmin } from "../Redux/slice/adminSlice";
import {
  submitContactForm,
  resetContactState,
} from "../Redux/slice/contactsSlice";

// ══════════════════════════════════════════════════════════════
// CONTACT ADMIN DIALOG — uses contactsSlice
// ══════════════════════════════════════════════════════════════
function ContactAdminDialog({ onClose }) {
  const dispatch = useDispatch();

  // uses the same contactsSlice as ContactPage
  const { loading, success, error } = useSelector((s) => s.contact);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "", // contactsSlice expects this field
    subject: "Password Reset Request", // pre-filled so admin knows what it's about
    message: "",
  });
  const [focused, setFocused] = useState(null);

  // ── backend logic ────────────────────────────────────────────
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // cleanup on unmount
  useEffect(() => {
    return () => dispatch(resetContactState());
  }, [dispatch]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    dispatch(submitContactForm(form));
  };

  const handleClose = () => {
    dispatch(resetContactState());
    onClose();
  };
  // ─────────────────────────────────────────────────────────────

  const inputStyle = (field) => ({
    width: "100%",
    padding: "10px 14px 10px 38px",
    border: `1px solid ${focused === field ? "#c9a84c" : "#e8e2d9"}`,
    background: focused === field ? "white" : "#faf8f5",
    outline: "none",
    fontSize: "0.875rem",
    color: "#333",
    fontFamily: "sans-serif",
    transition: "border-color 0.2s, background 0.2s",
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,10,20,0.75)", backdropFilter: "blur(4px)" }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden"
        style={{
          background: "white",
          fontFamily: "'Georgia','Times New Roman',serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold top bar */}
        <div
          style={{
            height: "4px",
            background: "linear-gradient(to right, #1e3a5f, #c9a84c, #8B2635)",
          }}
        />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center transition-all"
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
          <X size={15} />
        </button>

        <div className="p-8">
          {/* ── SUCCESS STATE ── */}
          {success ? (
            <div className="flex flex-col items-center text-center py-6">
              <div
                className="w-16 h-16 flex items-center justify-center mb-5"
                style={{
                  background: "rgba(42,122,79,0.08)",
                  border: "2px solid #2a7a4f",
                }}
              >
                <CheckCircle size={28} style={{ color: "#2a7a4f" }} />
              </div>
              <p
                className="text-xs tracking-[0.25em] uppercase mb-2"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Request Sent
              </p>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: "#1e3a5f" }}
              >
                Message Delivered!
              </h3>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{
                  color: "#888",
                  fontFamily: "sans-serif",
                  fontWeight: 300,
                }}
              >
                Your password reset request has been sent to the administrator.
                Please wait — they will reset your password and get back to you
                shortly.
              </p>
              <button
                onClick={handleClose}
                className="px-8 py-3 text-xs font-bold tracking-widest uppercase transition-all"
                style={{
                  background: "#1e3a5f",
                  color: "white",
                  fontFamily: "sans-serif",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#8B2635")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#1e3a5f")
                }
              >
                Back to Login
              </button>
            </div>
          ) : (
            /* ── FORM STATE ── */
            <>
              <p
                className="text-xs tracking-[0.25em] uppercase mb-1"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Admin Portal
              </p>
              <h2
                className="text-xl font-bold mb-1"
                style={{ color: "#1e3a5f" }}
              >
                Request Password Reset
              </h2>
              <p
                className="text-sm mb-6"
                style={{
                  color: "#aaa",
                  fontFamily: "sans-serif",
                  fontWeight: 300,
                }}
              >
                Send a message to the administrator and they will reset your
                password manually.
              </p>
              <div
                style={{
                  height: "1px",
                  background: "#f0ece4",
                  marginBottom: "20px",
                }}
              />

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name */}
                <div className="relative">
                  <User
                    size={14}
                    className="absolute"
                    style={{
                      color: "#c9a84c",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="Your Name"
                    required
                    style={inputStyle("name")}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute"
                    style={{
                      color: "#c9a84c",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="Your Email Address"
                    required
                    style={inputStyle("email")}
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <MessageSquare
                    size={14}
                    className="absolute"
                    style={{ color: "#c9a84c", left: "12px", top: "14px" }}
                  />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Briefly explain why you need a reset (optional)"
                    rows={3}
                    style={{
                      ...inputStyle("message"),
                      paddingTop: "10px",
                      resize: "none",
                      height: "auto",
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-widest uppercase transition-all mt-1"
                  style={{
                    background: loading ? "#d4c090" : "#1e3a5f",
                    color: "white",
                    fontFamily: "sans-serif",
                    cursor: loading ? "not-allowed" : "pointer",
                    clipPath:
                      "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.background = "#8B2635";
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) e.currentTarget.style.background = "#1e3a5f";
                  }}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Request"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN LOGIN PAGE
// ══════════════════════════════════════════════════════════════
export function AdminLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.admin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [remember, setRemember] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // ── backend logic untouched ──────────────────────────────────
  useEffect(() => {
    if (isAuthenticated && !hasRedirected) {
      setHasRedirected(true);
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate, hasRedirected]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("adminEmail");
    const wasRemembered = localStorage.getItem("rememberMe") === "true";
    if (wasRemembered && savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    const result = await dispatch(loginAdmin({ email, password }));

    if (result.meta.requestStatus === "rejected") {
      const payload = result.payload;

      // ── Outside working hours — show styled warning ────────────
      if (
        typeof payload === "string"
          ? payload.includes("7:30")
          : payload?.code === "OUTSIDE_WORKING_HOURS"
      ) {
        toast.warning(
          "Access Restricted — Admin portal is only accessible Mon–Fri, 7:30am–4:00pm (WAT). Contact the Super Admin for emergency access.",
          { duration: 8000 },
        );
      } else {
        toast.error(
          typeof payload === "string"
            ? payload
            : payload?.message || "Login failed",
        );
      }
    } else if (result.meta.requestStatus === "fulfilled") {
      if (remember) {
        localStorage.setItem("adminEmail", email);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("rememberMe");
      }
      toast.success("Welcome back! Redirecting to dashboard...");
      setHasRedirected(true);
      navigate("/admin/dashboard", { replace: true });
    }
  };
  // ─────────────────────────────────────────────────────────────

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #0f2240 0%, #1e3a5f 55%, #2a0d14 100%)",
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Watermark cross */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            fontSize: "36rem",
            color: "rgba(201,168,76,0.03)",
            lineHeight: 1,
          }}
        >
          ✟
        </div>

        {/* Gold top bar */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: "3px",
            background: "linear-gradient(to right, #1e3a5f, #c9a84c, #8B2635)",
          }}
        />

        {/* Card */}
        <div className="relative z-10 w-full max-w-sm mx-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 flex items-center justify-center mx-auto mb-5"
              style={{
                background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="#c9a84c"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V11a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm0 2a3 3 0 013 3v3H9V6a3 3 0 013-3z"
                />
              </svg>
            </div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-1"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              Sts. Peter &amp; Paul Parish
            </p>
            <h1 className="text-2xl font-bold text-white mb-1">Admin Portal</h1>
            <p
              className="text-sm"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontFamily: "sans-serif",
              }}
            >
              Sign in to manage the parish
            </p>
          </div>

          {/* Form card */}
          <div style={{ background: "white" }}>
            <div style={{ height: "3px", background: "#c9a84c" }} />
            <div className="p-8">
              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                {/* Email */}
                <div>
                  <label
                    className="block text-xs font-bold tracking-widest uppercase mb-1.5"
                    style={{ color: "#1e3a5f", fontFamily: "sans-serif" }}
                  >
                    Email Address
                  </label>
                  <div
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                      border: "1px solid #e8e2d9",
                      background: "#faf8f5",
                    }}
                  >
                    <Mail
                      size={14}
                      style={{ color: "#c9a84c", flexShrink: 0 }}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@parish.org"
                      required
                      className="w-full bg-transparent focus:outline-none text-sm"
                      style={{ color: "#333", fontFamily: "sans-serif" }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    className="block text-xs font-bold tracking-widest uppercase mb-1.5"
                    style={{ color: "#1e3a5f", fontFamily: "sans-serif" }}
                  >
                    Password
                  </label>
                  <div
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                      border: "1px solid #e8e2d9",
                      background: "#faf8f5",
                    }}
                  >
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      fill="none"
                      stroke="#c9a84c"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full bg-transparent focus:outline-none text-sm flex-1"
                      style={{ color: "#333", fontFamily: "sans-serif" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ color: "#bbb", flexShrink: 0 }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#1e3a5f")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#bbb")
                      }
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4"
                    style={{ accentColor: "#1e3a5f" }}
                  />
                  <label
                    htmlFor="remember"
                    className="text-xs cursor-pointer"
                    style={{ color: "#888", fontFamily: "sans-serif" }}
                  >
                    Remember me
                  </label>
                </div>

                <div style={{ height: "1px", background: "#f0ece4" }} />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-bold tracking-widest uppercase transition-all"
                  style={{
                    background: loading ? "#d4c090" : "#1e3a5f",
                    color: "white",
                    fontFamily: "sans-serif",
                    cursor: loading ? "not-allowed" : "pointer",
                    clipPath:
                      "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.background = "#8B2635";
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) e.currentTarget.style.background = "#1e3a5f";
                  }}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Contact admin */}
              <div className="mt-5 text-center">
                <p
                  className="text-xs"
                  style={{ color: "#aaa", fontFamily: "sans-serif" }}
                >
                  Need access?{" "}
                  <button
                    onClick={() => setContactOpen(true)}
                    className="font-bold transition-colors"
                    style={{
                      color: "#8B2635",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#c9a84c")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#8B2635")
                    }
                  >
                    Contact administrator
                  </button>
                </p>
              </div>
            </div>
          </div>

          <p
            className="text-center text-xs mt-6"
            style={{
              color: "rgba(255,255,255,0.2)",
              fontFamily: "sans-serif",
              letterSpacing: "0.15em",
            }}
          >
            SECURE ADMIN ACCESS
          </p>
        </div>

        {/* Gold bottom bar */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "2px",
            background:
              "linear-gradient(to right, transparent, #c9a84c, transparent)",
          }}
        />
      </div>

      {/* Contact Dialog — uses contactsSlice */}
      {contactOpen && (
        <ContactAdminDialog onClose={() => setContactOpen(false)} />
      )}
    </>
  );
}
