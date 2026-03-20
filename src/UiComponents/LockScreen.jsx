import { useDispatch, useSelector } from "react-redux";
import { unlockScreen } from "../Redux/slice/lockSlice";
import { loginAdmin } from "../Redux/slice/adminSlice";
import { createPortal } from "react-dom";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function LockScreen() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.admin);

  const [time, setTime] = useState(new Date());
  const [unlocking, setUnlocking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const passwordRef = useRef(null);

  // Saved email from login
  const savedEmail = localStorage.getItem("adminEmail") || "";

  // Prevent scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Live clock
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (showModal) {
      setTimeout(() => passwordRef.current?.focus(), 100);
    } else {
      setPassword("");
      setError("");
      setShowPassword(false);
    }
  }, [showModal]);

  const formatTime = (d) =>
    d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const formatDate = (d) =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");
    const result = await dispatch(loginAdmin({ email: savedEmail, password }));

    if (result.meta.requestStatus === "fulfilled") {
      setUnlocking(true);
      setTimeout(() => dispatch(unlockScreen()), 500);
    } else {
      const msg =
        result.payload?.message ||
        result.error?.message ||
        "Incorrect password.";
      setError(msg);
      setPassword("");
      passwordRef.current?.focus();
    }
  };

  return createPortal(
    <motion.div
      key="lockscreen"
      initial={{ opacity: 0 }}
      animate={{ opacity: unlocking ? 0 : 1 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background:
          "linear-gradient(160deg, #0f2240 0%, #1e3a5f 60%, #2a0d14 100%)",
      }}
    >
      {/* Gold top bar */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "3px",
          background: "linear-gradient(to right, #1e3a5f, #c9a84c, #8B2635)",
        }}
      />

      {/* Watermark cross */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]"
        style={{ fontSize: "36rem", color: "#c9a84c", lineHeight: 1 }}
      >
        ✟
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <p
          className="text-xs tracking-[0.35em] uppercase mb-6"
          style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
        >
          SS Peter & Paul Catholic Church | Lagos, Nigeria
        </p>

        <p
          className="font-bold text-white mb-2"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 6rem)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          {formatTime(time)}
        </p>
        <p
          className="text-sm mb-8"
          style={{
            color: "rgba(255,255,255,0.4)",
            fontFamily: "sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          {formatDate(time)}
        </p>

        <div className="flex items-center gap-4 mb-10">
          <div
            style={{
              height: "1px",
              width: "48px",
              background: "rgba(201,168,76,0.3)",
            }}
          />
          <span style={{ color: "#c9a84c", fontSize: "0.8rem" }}>✟</span>
          <div
            style={{
              height: "1px",
              width: "48px",
              background: "rgba(201,168,76,0.3)",
            }}
          />
        </div>

        <p
          className="text-xs tracking-[0.25em] uppercase mb-2"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "sans-serif" }}
        >
          Session Locked · Admin Portal
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="mt-6 flex items-center gap-3 px-10 py-4 text-xs font-bold tracking-widest uppercase transition-all"
          style={{
            background: "#c9a84c",
            color: "#0a0a0a",
            fontFamily: "sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#8B2635";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#c9a84c";
            e.currentTarget.style.color = "#0a0a0a";
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>
          Click to Unlock
        </button>

        <div
          className="mt-12 max-w-sm"
          style={{
            borderTop: "1px solid rgba(201,168,76,0.15)",
            paddingTop: "24px",
          }}
        >
          <p
            className="text-sm italic leading-relaxed"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            "I am Love and Mercy itself."
          </p>
          <p
            className="text-xs tracking-widest uppercase mt-2"
            style={{ color: "rgba(201,168,76,0.5)", fontFamily: "sans-serif" }}
          >
            — Diary of St. Faustina
          </p>
        </div>
      </motion.div>

      {/* Gold bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "2px",
          background:
            "linear-gradient(to right, transparent, #c9a84c, transparent)",
        }}
      />

      {/* ── Password Modal ───────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center"
            style={{ background: "rgba(10,18,35,0.85)" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowModal(false);
            }}
          >
            <motion.div
              key="modal-box"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-80 p-9"
              style={{
                background: "#0f1e38",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              {/* Close */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-4 text-lg leading-none transition-colors"
                style={{
                  color: "rgba(255,255,255,0.35)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
                }
              >
                ×
              </button>

              {/* Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div
                  className="flex items-center justify-center mb-4"
                  style={{
                    width: 44,
                    height: 44,
                    background: "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.3)",
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="#c9a84c"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p
                  className="text-xs tracking-[0.25em] uppercase mb-1"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  Admin Verification
                </p>
                {savedEmail && (
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {savedEmail}
                  </p>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleUnlock} className="space-y-4">
                <div>
                  <label
                    className="block text-xs tracking-widest uppercase mb-2"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      ref={passwordRef}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter your password"
                      className="w-full pr-10 text-sm"
                      style={{
                        padding: "11px 40px 11px 14px",
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${error ? "rgba(139,38,53,0.8)" : "rgba(201,168,76,0.2)"}`,
                        color: "white",
                        fontFamily: "sans-serif",
                        outline: "none",
                      }}
                      onFocus={(e) => {
                        if (!error)
                          e.target.style.borderColor = "rgba(201,168,76,0.6)";
                      }}
                      onBlur={(e) => {
                        if (!error)
                          e.target.style.borderColor = "rgba(201,168,76,0.2)";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{
                        background: "none",
                        border: "none",
                        color: "rgba(255,255,255,0.4)",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {error && (
                    <p
                      className="text-xs mt-2"
                      style={{ color: "#e87878", fontFamily: "sans-serif" }}
                    >
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-xs font-bold tracking-widest uppercase transition-all"
                  style={{
                    background: "#c9a84c",
                    color: "#0a0a0a",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "sans-serif",
                    opacity: loading ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.background = "#8B2635";
                      e.currentTarget.style.color = "white";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#c9a84c";
                    e.currentTarget.style.color = "#0a0a0a";
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    "Unlock Session"
                  )}
                </button>
              </form>

              {/* Contact note instead of sign-in link */}
              <p
                className="mt-6 text-xs leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: "sans-serif",
                  maxWidth: "260px",
                }}
              >
                Having trouble accessing the site?{" "}
                <span style={{ color: "rgba(201,168,76,0.6)" }}>
                  Please visit the parish admin desk for assistance.
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>,
    document.body,
  );
}
