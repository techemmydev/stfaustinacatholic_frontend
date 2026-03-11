import React from "react";
import { Link } from "react-router";
import {
  CalendarCheck,
  Church,
  Clock,
  Heart,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  BookOpen,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

export default function MassBookingCTA() {
  return (
    <>
      {/* ── MASS BOOKING CTA ──────────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #1e3a5f 0%, #162d4a 50%, #8B2635 100%)",
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}
      >
        {/* Decorative elements */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.04]"
          style={{ fontSize: "36rem", color: "white", lineHeight: 1 }}
        >
          ✟
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(to right, transparent, #c9a84c, transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Main CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p
                className="text-xs tracking-[0.3em] uppercase mb-4"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Offerings &amp; Intentions
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Book a Mass or
                <br />
                <span style={{ color: "#c9a84c" }}>Thanksgiving Offering</span>
              </h2>
              <div
                className="mb-6"
                style={{ height: "3px", width: "60px", background: "#c9a84c" }}
              />
              <p
                className="text-lg mb-4 leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "sans-serif",
                  fontWeight: 300,
                }}
              >
                Parishioners are welcome to request Mass intentions and
                Thanksgiving offerings for special occasions, answered prayers,
                and memorials.
              </p>
              <p
                className="text-sm mb-10"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "sans-serif",
                }}
              >
                * Login is required to submit a Mass or Thanksgiving request.
                Each Mass is limited to ensure proper reverence and care.
              </p>

              <Link
                to="/mass-booking"
                className="inline-flex items-center gap-3 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all group"
                style={{
                  background: "#c9a84c",
                  color: "#0a0a0a",
                  fontFamily: "sans-serif",
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                <CalendarCheck size={16} />
                Book a Mass Now
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>

            {/* Right: Info cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              {[
                {
                  icon: Church,
                  title: "Mass Intentions",
                  desc: "Offer a Mass for loved ones, special intentions, or anniversaries. Each intention is remembered at the altar.",
                  accent: "#c9a84c",
                },
                {
                  icon: Heart,
                  title: "Thanksgiving Offerings",
                  desc: "Give thanks to God for blessings received. Limited to 5 per Mass to ensure each offering receives full attention.",
                  accent: "#c9a84c",
                },
                {
                  icon: CalendarCheck,
                  title: "Choose Your Mass",
                  desc: "Select your preferred date, time, and Mass celebration. View the full schedule and reserve your place.",
                  accent: "#c9a84c",
                },
              ].map((card, i) => (
                <div
                  key={card.title}
                  className="flex items-start gap-5 p-5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderLeft: "4px solid rgba(201,168,76,0.6)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(201,168,76,0.15)" }}
                  >
                    <card.icon size={18} style={{ color: "#c9a84c" }} />
                  </div>
                  <div>
                    <h4
                      className="font-bold mb-1 text-sm"
                      style={{ color: "#c9a84c" }}
                    >
                      {card.title}
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "rgba(255,255,255,0.65)",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
