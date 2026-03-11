// SacramentsPage.jsx — clean main page, all sacraments in sub-components
import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Sub-components — one per sacrament
import BaptismSection from "../UiComponents/Baptismsection";
import EucharistSection from "../UiComponents/Eucharistsection";
import ConfirmationSection from "../UiComponents/Confirmationsection";
import ReconciliationSection from "../UiComponents/Reconciliationsection";
import {
  MatrimonySection,
  AnointingSection,
  HolyOrdersSection,
} from "../UiComponents/Servicesacraments";

// ── Sacrament category headers ─────────────────────────────
const CategoryHeader = ({ label, title, color }) => (
  <div className="flex items-center gap-6 mb-8 mt-16 first:mt-0">
    <div>
      <p
        className="text-xs tracking-[0.3em] uppercase mb-1"
        style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
      >
        {label}
      </p>
      <h2
        className="text-2xl font-bold"
        style={{ color, fontFamily: "'Georgia',serif" }}
      >
        {title}
      </h2>
    </div>
    <div className="flex-1 h-px" style={{ background: "#e8e2d9" }} />
  </div>
);

// ── Main component ─────────────────────────────────────────
export function SacramentsPage() {
  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif" }}>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{ height: "520px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1e3a5f 0%, #0f2240 55%, #8B2635 100%)",
          }}
        />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Watermark */}
        <div
          className="absolute right-12 top-1/2 -translate-y-1/2 opacity-5 text-white select-none hidden lg:block"
          style={{
            fontSize: "28rem",
            lineHeight: 1,
            fontFamily: "Georgia, serif",
          }}
        >
          ✟
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="max-w-2xl"
          >
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              Sacred Signs of Grace
            </p>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-5"
              style={{ lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              The Seven
              <br />
              <span style={{ color: "#c9a84c" }}>Sacraments</span>
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
                color: "rgba(255,255,255,0.72)",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              Encounter Christ through the sacred signs and celebrations of our
              Catholic faith. Through the sacraments, divine life is dispensed
              to us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO STRIP ───────────────────────────────────── */}
      <section style={{ background: "#1e3a5f" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-10">
          <div
            className="grid grid-cols-3 divide-x"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {[
              {
                label: "Sacraments of Initiation",
                items: "Baptism · Eucharist · Confirmation",
                color: "#c9a84c",
              },
              {
                label: "Sacraments of Healing",
                items: "Reconciliation · Anointing of the Sick",
                color: "#c9a84c",
              },
              {
                label: "Sacraments of Service",
                items: "Holy Orders · Holy Matrimony",
                color: "#c9a84c",
              },
            ].map((cat) => (
              <div key={cat.label} className="px-8 first:pl-0 last:pr-0">
                <p
                  className="text-xs tracking-widest uppercase mb-1"
                  style={{ color: cat.color, fontFamily: "sans-serif" }}
                >
                  {cat.label}
                </p>
                <p
                  className="text-sm text-white opacity-70"
                  style={{ fontFamily: "sans-serif", fontWeight: 300 }}
                >
                  {cat.items}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO TEXT ────────────────────────────────────── */}
      <section className="py-16" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              What Are the Sacraments?
            </p>
            <h2
              className="text-3xl font-bold mb-5"
              style={{ color: "#1e3a5f" }}
            >
              Efficacious Signs of Grace
            </h2>
            <div
              style={{
                height: "3px",
                width: "60px",
                background: "#c9a84c",
                margin: "0 auto 20px",
              }}
            />
            <p
              className="text-base leading-relaxed"
              style={{
                color: "#666",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              The sacraments are efficacious signs of grace, instituted by
              Christ and entrusted to the Church, by which divine life is
              dispensed to us. The Catholic Church recognises seven sacraments,
              each corresponding to a key stage of the Christian life — from
              birth in faith at Baptism to its ultimate fulfilment in eternal
              life.
            </p>
          </div>
        </div>
      </section>

      {/* ── SACRAMENTS SECTIONS ───────────────────────────── */}
      <section className="pb-24" style={{ background: "#faf8f5" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-16">
          {/* Initiation */}
          <CategoryHeader
            label="Group One"
            title="Sacraments of Initiation"
            color="#1e3a5f"
          />
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <BaptismSection />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <EucharistSection />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <ConfirmationSection />
            </motion.div>
          </div>

          {/* Healing */}
          <CategoryHeader
            label="Group Two"
            title="Sacraments of Healing"
            color="#8B2635"
          />
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ReconciliationSection />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <AnointingSection />
            </motion.div>
          </div>

          {/* Service */}
          <CategoryHeader
            label="Group Three"
            title="Sacraments of Service"
            color="#2a5f3f"
          />
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <MatrimonySection />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <HolyOrdersSection />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────── */}
      <section
        className="py-16 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e3a5f, #0f2240 60%, #8B2635)",
        }}
      >
        <div
          className="absolute right-10 opacity-5 text-white select-none"
          style={{ fontSize: "20rem", lineHeight: 1, top: "-2rem" }}
        >
          ✟
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Schedule a Sacrament?
          </h2>
          <p
            className="text-base mb-10 max-w-xl mx-auto"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "sans-serif",
              fontWeight: 300,
            }}
          >
            Our clergy and staff are here to guide you through every step of the
            preparation process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all"
              style={{
                background: "#c9a84c",
                color: "#0a0a0a",
                fontFamily: "sans-serif",
                clipPath:
                  "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              }}
            >
              Book an Appointment <ArrowRight size={13} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all"
              style={{
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
                fontFamily: "sans-serif",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#c9a84c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")
              }
            >
              Contact Parish Office <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
