import { useDispatch } from "react-redux";
import { unlockScreen } from "../Redux/slice/lockSlice";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LockScreen() {
  const dispatch = useDispatch();
  const [time, setTime] = useState(new Date());
  const [unlocking, setUnlocking] = useState(false);

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

  // ── backend logic untouched ──────────────────────────────────
  const handleUnlock = () => {
    setUnlocking(true);
    setTimeout(() => dispatch(unlockScreen()), 500);
  };
  // ─────────────────────────────────────────────────────────────

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

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Parish label */}
        <p
          className="text-xs tracking-[0.35em] uppercase mb-6"
          style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
        >
          Sts. Peter &amp; Paul · Catholic Parish
        </p>

        {/* Clock */}
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

        {/* Ornament */}
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

        {/* Session locked label */}
        <p
          className="text-xs tracking-[0.25em] uppercase mb-2"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "sans-serif" }}
        >
          Session Locked · Admin Portal
        </p>

        {/* Unlock button */}
        <button
          onClick={handleUnlock}
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

        {/* Scripture */}
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
            "You are Peter, and on this rock I will build my Church."
          </p>
          <p
            className="text-xs tracking-widest uppercase mt-2"
            style={{ color: "rgba(201,168,76,0.5)", fontFamily: "sans-serif" }}
          >
            — Matthew 16:18
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
    </motion.div>,
    document.body,
  );
}
