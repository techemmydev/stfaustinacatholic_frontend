import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Users,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AboutusMedia from "@/UiComponents/AboutusMedia";
import CommunityStories from "@/UiComponents/CommunityStories";
import InvitationModal from "@/UiComponents/InvitationModal";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { fetchPriests } from "../Redux/slice/Priestslice";
import FaqSection from "@/UiComponents/Faq";

// ── helpers ── untouched ──────────────────────────────────
const getInitials = (name = "") => {
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? parts[parts.length - 1].charAt(0).toUpperCase()
    : name.charAt(0).toUpperCase();
};

const statusColor = (status) => {
  if (status === "Available") return "bg-green-100 text-green-700";
  if (status === "On Leave") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

// ── data ── untouched ─────────────────────────────────────
const ministries = [
  {
    name: "Youth Ministry",
    description: "Faith formation for teens and young adults",
    icon: "🕊",
  },
  {
    name: "Music Ministry",
    description: "Choir, cantors, and musicians for liturgy",
    icon: "🎵",
  },
  {
    name: "St. Vincent de Paul Society",
    description: "Charitable outreach to those in need",
    icon: "🤝",
  },
  {
    name: "Religious Education",
    description: "Faith formation for children and adults",
    icon: "📖",
  },
  {
    name: "Liturgical Ministers",
    description: "Lectors, Eucharistic ministers, and altar servers",
    icon: "✟",
  },
  {
    name: "Knights of Columbus",
    description: "Catholic men's service organization",
    icon: "⚔",
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

// ══════════════════════════════════════════════════════════
//  PRIESTS SECTION
// ══════════════════════════════════════════════════════════
function PriestsSection() {
  const dispatch = useDispatch();
  const { priests, publicLoading } = useSelector((state) => state.priest);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(fetchPriests());
  }, [dispatch]);

  return (
    <section
      className="py-24"
      style={{
        background: "#faf8f5",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            Shepherds of Our Parish
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#1e3a5f", lineHeight: 1.1 }}
          >
            Meet Our
            <br />
            <span style={{ color: "#8B2635" }}>Parish Priests</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
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
            className="mt-5 max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: "#888", fontFamily: "sans-serif", fontWeight: 300 }}
          >
            Meet the dedicated shepherds who guide, serve, and pray for our
            parish community every day.
          </p>
        </div>

        {/* Loading skeleton */}
        {publicLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{ background: "white", border: "1px solid #e8e2d9" }}
              >
                <div
                  style={{
                    height: "220px",
                    background: "linear-gradient(135deg, #1e3a5f20, #8B263520)",
                  }}
                />
                <div className="p-6 space-y-3">
                  <div
                    className="h-4 rounded"
                    style={{ background: "#f0ece4", width: "70%" }}
                  />
                  <div
                    className="h-3 rounded"
                    style={{ background: "#f0ece4", width: "50%" }}
                  />
                  <div
                    className="h-12 rounded"
                    style={{ background: "#f0ece4" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : priests.length === 0 ? (
          <div
            className="text-center py-20"
            style={{ border: "1px solid #e8e2d9", background: "white" }}
          >
            <Users
              className="w-14 h-14 mx-auto mb-4"
              style={{ color: "#ddd" }}
            />
            <p
              className="text-base"
              style={{ color: "#aaa", fontFamily: "sans-serif" }}
            >
              No priests to display at this time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {priests.map((priest, idx) => (
              <motion.div
                key={priest._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-pointer overflow-hidden"
                style={{
                  background: "white",
                  border: `1px solid ${selected?._id === priest._id ? "#c9a84c" : "#e8e2d9"}`,
                  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onClick={() =>
                  setSelected(selected?._id === priest._id ? null : priest)
                }
              >
                {/* Top banner */}
                <div
                  className="relative overflow-hidden flex flex-col items-center py-10 px-6"
                  style={{
                    background:
                      idx % 2 === 0
                        ? "linear-gradient(135deg, #1e3a5f 0%, #0f2240 100%)"
                        : "linear-gradient(135deg, #8B2635 0%, #6d1d2a 100%)",
                  }}
                >
                  {/* Watermark cross */}
                  <div
                    className="absolute right-4 bottom-0 opacity-10 text-white select-none"
                    style={{ fontSize: "6rem", lineHeight: 1 }}
                  >
                    ✟
                  </div>

                  {/* Gold top bar */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{ height: "3px", background: "#c9a84c" }}
                  />

                  {/* Photo or initials */}
                  {priest.photo ? (
                    <img
                      src={priest.photo}
                      alt={priest.name}
                      className="w-24 h-24 object-cover mb-4 relative z-10"
                      style={{ border: "3px solid rgba(201,168,76,0.6)" }}
                    />
                  ) : (
                    <div
                      className="w-24 h-24 flex items-center justify-center mb-4 relative z-10"
                      style={{
                        border: "3px solid rgba(201,168,76,0.6)",
                        background: "rgba(255,255,255,0.1)",
                      }}
                    >
                      <span className="text-white text-3xl font-bold">
                        {getInitials(priest.name)}
                      </span>
                    </div>
                  )}

                  <h3
                    className="text-white text-xl font-bold text-center mb-2 relative z-10"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {priest.name}
                  </h3>

                  <span
                    className={`text-xs font-semibold tracking-widest uppercase px-3 py-1 relative z-10 ${statusColor(priest.status)}`}
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {priest.status}
                  </span>
                </div>

                {/* Info body */}
                <div className="p-6">
                  <div className="flex flex-col gap-2 mb-4">
                    <a
                      href={`mailto:${priest.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm transition-colors"
                      style={{ color: "#888", fontFamily: "sans-serif" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#8B2635")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#888")
                      }
                    >
                      <Mail
                        size={13}
                        style={{ color: "#c9a84c", flexShrink: 0 }}
                      />
                      <span className="truncate">{priest.email}</span>
                    </a>
                    {priest.phone && (
                      <a
                        href={`tel:${priest.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-sm transition-colors"
                        style={{ color: "#888", fontFamily: "sans-serif" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#8B2635")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#888")
                        }
                      >
                        <Phone
                          size={13}
                          style={{ color: "#c9a84c", flexShrink: 0 }}
                        />
                        {priest.phone}
                      </a>
                    )}
                  </div>

                  {priest.bio && (
                    <>
                      <div
                        style={{
                          height: "1px",
                          background: "#f0ece4",
                          marginBottom: "12px",
                        }}
                      />
                      <p
                        className={`text-sm leading-relaxed transition-all duration-300 ${selected?._id === priest._id ? "" : "line-clamp-2"}`}
                        style={{ color: "#777", fontFamily: "sans-serif" }}
                      >
                        {priest.bio}
                      </p>
                    </>
                  )}

                  {priest.specializations?.length > 0 &&
                    selected?._id === priest._id && (
                      <div
                        className="mt-4 pt-4"
                        style={{ borderTop: "1px solid #f0ece4" }}
                      >
                        <p
                          className="text-xs tracking-widest uppercase mb-2"
                          style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                        >
                          Specializations
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {priest.specializations.map((spec, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 font-semibold tracking-wide uppercase"
                              style={{
                                color: "#8B2635",
                                background: "#8B263510",
                                fontFamily: "sans-serif",
                              }}
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  <div
                    className="mt-4 flex items-center gap-1"
                    style={{ color: "#c9a84c" }}
                  >
                    <span
                      className="text-xs"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {selected?._id === priest._id ? "Collapse" : "Read More"}
                    </span>
                    {selected?._id === priest._id ? (
                      <ChevronUp size={13} />
                    ) : (
                      <ChevronDown size={13} />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
//  ABOUT PAGE
// ══════════════════════════════════════════════════════════
export default function AboutPage() {
  return (
    <>
      <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
        {/* ── HERO ──────────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative flex items-center justify-center overflow-hidden"
          style={{ height: "520px" }}
        >
          {/* Overlay layers */}
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
            src="https://images.unsplash.com/photo-1760319726429-fcda77d3cb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Church Community"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Content */}
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
                Our Story
              </p>
              <h1
                className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight"
                style={{ lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                About Our
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
                Learn about our history, our clergy, and the vibrant community
                that is Sts. Peter &amp; Paul Catholic Parish.
              </p>
            </motion.div>
          </div>

          {/* Slide number */}
          <div
            className="absolute bottom-8 right-6 md:right-16 z-20 text-white/25"
            style={{
              fontFamily: "monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
            }}
          >
            ABOUT / PARISH
          </div>
        </motion.section>

        {/* ── HISTORY STRIP ─────────────────────────────────────── */}
        <section
          className="py-16"
          style={{
            background: "linear-gradient(135deg, #1e3a5f 0%, #0f2240 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
              {[
                {
                  number: "1892",
                  label: "Year Founded",
                  desc: "A century of faith and service to the community",
                },
                {
                  number: "500+",
                  label: "Registered Families",
                  desc: "A growing community united in worship and love",
                },
                {
                  number: "20+",
                  label: "Active Ministries",
                  desc: "Diverse ways to serve God and neighbour",
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

        {/* ── MISSION & VISION ──────────────────────────────────── */}
        <section className="py-24" style={{ background: "white" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left */}
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
                  Our Foundation
                </p>
                <h2
                  className="text-4xl font-bold mb-5 leading-tight"
                  style={{ color: "#1e3a5f", lineHeight: 1.1 }}
                >
                  Mission &amp;
                  <br />
                  <span style={{ color: "#8B2635" }}>Vision</span>
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
                  Sts. Peter &amp; Paul Parish is called to be a beacon of
                  faith, hope, and love in our community. Rooted in the
                  Apostolic tradition of Peter and Paul, we are both the rock
                  upon which faith is built and the missionary Church sent out
                  to proclaim the Good News.
                </p>
                <p
                  className="text-base leading-relaxed mb-10"
                  style={{
                    color: "#777",
                    fontFamily: "sans-serif",
                    fontWeight: 300,
                  }}
                >
                  We are committed to forming disciples through the sacraments,
                  Scripture, and service — welcoming all who seek Christ and
                  nurturing them on their spiritual journey.
                </p>
                <div
                  className="p-6"
                  style={{
                    background: "#faf8f5",
                    borderLeft: "4px solid #c9a84c",
                  }}
                >
                  <p
                    className="text-lg italic mb-2"
                    style={{ color: "#1e3a5f" }}
                  >
                    "You are Peter, and upon this rock I will build my Church."
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    — Matthew 16:18
                  </p>
                </div>
              </motion.div>

              {/* Right: values */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="flex flex-col gap-5"
              >
                {[
                  {
                    icon: "✟",
                    title: "Faith-Centred",
                    desc: "Everything we do flows from our encounter with Christ in the Eucharist, Scripture, and prayer.",
                  },
                  {
                    icon: "❤",
                    title: "Compassionate",
                    desc: "We serve the poor, the vulnerable, and the marginalized as Christ present in our midst.",
                  },
                  {
                    icon: "✦",
                    title: "Welcoming",
                    desc: "Our doors are open to all — the lifelong Catholic, the curious seeker, and the returning faithful.",
                  },
                  {
                    icon: "✿",
                    title: "Missionary",
                    desc: "Like St. Paul, we are called to bring the Gospel beyond our walls and into the world.",
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
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PRIESTS ───────────────────────────────────────────── */}
        <PriestsSection />

        {/* ── COMMUNITY STORIES & MEDIA ─────────────────────────── */}
        <CommunityStories />
        <AboutusMedia />

        {/* ── MINISTRIES ────────────────────────────────────────── */}
        <section className="py-24" style={{ background: "white" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-3"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  Get Involved
                </p>
                <h2 className="text-4xl font-bold" style={{ color: "#1e3a5f" }}>
                  Parish Ministries
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
              <p
                className="max-w-sm text-sm leading-relaxed self-start md:self-auto"
                style={{
                  color: "#888",
                  fontFamily: "sans-serif",
                  fontWeight: 300,
                }}
              >
                There is a place for everyone at Sts. Peter &amp; Paul. Discover
                where God is calling you to serve.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ministries.map((ministry, index) => (
                <motion.div
                  key={ministry.name}
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
                  {/* Hover top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0 group-hover:h-1 transition-all duration-300"
                    style={{
                      background: index % 2 === 0 ? "#8B2635" : "#1e3a5f",
                    }}
                  />

                  <div
                    className="text-3xl mb-4"
                    style={{ color: index % 2 === 0 ? "#8B2635" : "#1e3a5f" }}
                  >
                    {ministry.icon}
                  </div>
                  <h3
                    className="font-bold mb-2"
                    style={{ color: "#1e3a5f", fontSize: "1.05rem" }}
                  >
                    {ministry.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "#888", fontFamily: "sans-serif" }}
                  >
                    {ministry.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase group-hover:gap-2 transition-all"
                    style={{
                      color: index % 2 === 0 ? "#8B2635" : "#1e3a5f",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Learn More <ArrowRight size={12} />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOIN US CTA ───────────────────────────────────────── */}
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
              Be Part of Our Family
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Ready to Get Involved?
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
              className="text-lg mb-10 max-w-xl mx-auto leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.7)",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              Join one of our ministries, register as a parishioner, or speak
              with one of our priests. We would love to welcome you into the
              Sts. Peter &amp; Paul family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all group"
                style={{
                  background: "#c9a84c",
                  color: "#0a0a0a",
                  fontFamily: "sans-serif",
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                Register Now{" "}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold tracking-widest uppercase border transition-all"
                style={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "white",
                  fontFamily: "sans-serif",
                  background: "rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#c9a84c")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")
                }
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>

      <InvitationModal />
      <FaqSection />
    </>
  );
}
