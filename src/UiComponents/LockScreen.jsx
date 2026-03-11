import { useDispatch } from "react-redux";
import { unlockScreen } from "../Redux/slice/lockSlice";
import { createPortal } from "react-dom";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LockScreen() {
  const dispatch = useDispatch();
  const [pin, setPin] = useState(["", "", "", ""]);
  const [shake, setShake] = useState(false);
  const [dots, setDots] = useState([false, false, false, false]);
  const [time, setTime] = useState(new Date());
  const [unlocking, setUnlocking] = useState(false);
  const inputRefs = useRef([]);

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

  // Numpad unlock — any 4-digit entry unlocks (demo); swap logic as needed
  const handleDigit = (digit) => {
    const idx = pin.findIndex((v) => v === "");
    if (idx === -1) return;
    const next = [...pin];
    next[idx] = digit;
    setPin(next);

    const nextDots = [...dots];
    nextDots[idx] = true;
    setDots(nextDots);

    if (idx === 3) {
      // All digits filled — unlock after brief pause
      setTimeout(() => {
        setUnlocking(true);
        setTimeout(() => dispatch(unlockScreen()), 600);
      }, 200);
    }
  };

  const handleDelete = () => {
    const filled = pin.filter((v) => v !== "");
    if (filled.length === 0) return;
    const idx = filled.length - 1;
    const next = [...pin];
    next[idx] = "";
    setPin(next);
    const nextDots = [...dots];
    nextDots[idx] = false;
    setDots(nextDots);
  };

  const handleUnlockButton = () => {
    setUnlocking(true);
    setTimeout(() => dispatch(unlockScreen()), 600);
  };

  const numpad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [null, "0", "del"],
  ];

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="lockscreen"
        initial={{ opacity: 0 }}
        animate={{ opacity: unlocking ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] flex items-stretch"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        {/* Background — church-like deep overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #0a1628 0%, #1e3a5f 45%, #2a0d14 100%)",
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Watermark cross */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            fontSize: "40rem",
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
            background: "linear-gradient(to right, #c9a84c, #e8d5a3, #c9a84c)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-between w-full py-14 px-6">
          {/* Top — Clock & Parish name */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <p
              className="text-xs tracking-[0.35em] uppercase mb-6"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              St. Faustina Catholic Parish
            </p>

            {/* Time */}
            <p
              className="font-bold text-white"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 6rem)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              {formatTime(time)}
            </p>
            <p
              className="mt-2 text-sm"
              style={{
                color: "rgba(255,255,255,0.45)",
                fontFamily: "sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              {formatDate(time)}
            </p>

            {/* Ornament */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div
                style={{
                  height: "1px",
                  width: "40px",
                  background: "rgba(201,168,76,0.3)",
                }}
              />
              <span style={{ color: "#c9a84c", fontSize: "0.75rem" }}>✟</span>
              <div
                style={{
                  height: "1px",
                  width: "40px",
                  background: "rgba(201,168,76,0.3)",
                }}
              />
            </div>
          </motion.div>

          {/* Middle — Lock card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="w-full max-w-xs"
          >
            {/* Lock icon */}
            <div className="flex justify-center mb-6">
              <div
                className="w-16 h-16 flex items-center justify-center"
                style={{
                  background: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.25)",
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
            </div>

            <p
              className="text-center text-xs tracking-[0.25em] uppercase mb-1"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              Session Locked
            </p>
            <p
              className="text-center text-sm mb-8"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              Enter PIN or click unlock to continue
            </p>

            {/* PIN dots */}
            <motion.div
              animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="flex justify-center gap-4 mb-8"
            >
              {dots.map((filled, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: filled ? 1 : 0.75,
                    backgroundColor: filled
                      ? "#c9a84c"
                      : "rgba(255,255,255,0.15)",
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: 0,
                    border: "1px solid rgba(201,168,76,0.4)",
                  }}
                />
              ))}
            </motion.div>

            {/* Numpad */}
            <div className="grid gap-3">
              {numpad.map((row, ri) => (
                <div key={ri} className="grid grid-cols-3 gap-3">
                  {row.map((key, ci) => {
                    if (key === null) return <div key={ci} />;
                    if (key === "del")
                      return (
                        <button
                          key={ci}
                          onClick={handleDelete}
                          className="flex items-center justify-center py-4 transition-all"
                          style={{
                            background: "rgba(139,38,53,0.15)",
                            border: "1px solid rgba(139,38,53,0.3)",
                            color: "#e87a8a",
                            fontFamily: "sans-serif",
                            fontSize: "0.7rem",
                            letterSpacing: "0.1em",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                              "rgba(139,38,53,0.3)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background =
                              "rgba(139,38,53,0.15)")
                          }
                        >
                          ⌫
                        </button>
                      );
                    return (
                      <button
                        key={ci}
                        onClick={() => handleDigit(key)}
                        className="flex items-center justify-center py-4 transition-all"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "white",
                          fontFamily: "sans-serif",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(201,168,76,0.12)";
                          e.currentTarget.style.borderColor =
                            "rgba(201,168,76,0.4)";
                          e.currentTarget.style.color = "#c9a84c";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.04)";
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)";
                          e.currentTarget.style.color = "white";
                        }}
                      >
                        {key}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(255,255,255,0.08)",
                }}
              />
              <span
                className="text-xs"
                style={{
                  color: "rgba(255,255,255,0.2)",
                  fontFamily: "sans-serif",
                }}
              >
                or
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(255,255,255,0.08)",
                }}
              />
            </div>

            {/* Unlock button */}
            <button
              onClick={handleUnlockButton}
              className="w-full inline-flex items-center justify-center gap-2 py-4 text-xs font-bold tracking-widest uppercase transition-all group"
              style={{
                background: "#c9a84c",
                color: "#0a0a0a",
                fontFamily: "sans-serif",
                clipPath:
                  "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#e8d5a3")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#c9a84c")
              }
            >
              <svg
                className="w-3.5 h-3.5"
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
              Unlock Session
            </button>
          </motion.div>

          {/* Bottom — Parish tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <p
              className="text-xs"
              style={{
                color: "rgba(255,255,255,0.2)",
                fontFamily: "sans-serif",
                letterSpacing: "0.2em",
              }}
            >
              ADMIN / PORTAL
            </p>
          </motion.div>
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
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
