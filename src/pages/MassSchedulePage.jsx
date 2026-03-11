// MassSchedulePage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, Clock, MapPin, Globe, ArrowRight, Info } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { fetchPublishedMassSchedules } from "../Redux/slice/Massscheduleslice";
import { fetchPublishedEvents } from "../Redux/slice/Eventslice";

// ── filter tabs ────────────────────────────────────────────
const FILTERS = [
  { key: "all", label: "All Masses" },
  { key: "sunday", label: "Sunday" },
  { key: "daily", label: "Daily Mass" },
  { key: "special", label: "Special" },
];

// ── type badge colours ─────────────────────────────────────
const typeColor = (type) => {
  if (type === "Sunday Mass") return "#1e3a5f";
  if (type === "Evening Mass" || type === "Weekday Mass") return "#8B2635";
  return "#2a5f3f";
};

export function MassSchedulePage() {
  const dispatch = useDispatch();
  const { publishedSchedules, loading: scheduleLoading } = useSelector(
    (state) => state.massSchedule,
  );
  const { publishedEvents, loading: eventsLoading } = useSelector(
    (state) => state.event,
  );
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchPublishedMassSchedules());
    dispatch(fetchPublishedEvents());
  }, [dispatch]);

  const getFiltered = () => {
    if (filter === "all") return publishedSchedules;
    return publishedSchedules.filter((s) => {
      if (filter === "sunday") return s.type === "Sunday Mass";
      if (filter === "daily")
        return s.type === "Weekday Mass" || s.type === "Evening Mass";
      if (filter === "special") return s.type === "Special";
      return true;
    });
  };

  const filtered = getFiltered();

  const upcomingEvents = publishedEvents
    .filter((e) => new Date(e.date) >= new Date())
    .slice(0, 4);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif" }}>
      {/* ── HERO ── */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{ height: "440px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1e3a5f 0%, #0f2240 55%, #8B2635 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute right-12 opacity-5 text-white select-none hidden lg:block"
          style={{
            fontSize: "22rem",
            lineHeight: 1,
            top: "-1rem",
            fontFamily: "Georgia",
          }}
        >
          ✟
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              Celebrate the Eucharist
            </p>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-4"
              style={{ lineHeight: 1.05 }}
            >
              Mass
              <br />
              <span style={{ color: "#c9a84c" }}>Schedule</span>
            </h1>
            <div
              style={{
                height: "3px",
                width: "60px",
                background: "#c9a84c",
                marginBottom: "16px",
              }}
            />
            <p
              className="text-base"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              Join us for the celebration of the Eucharist — the source and
              summit of our faith.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER TABS — sticky ── */}
      <div
        className="sticky top-16 z-40"
        style={{
          background: "#1e3a5f",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex gap-1 py-3">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all"
                style={{
                  background: filter === key ? "#c9a84c" : "transparent",
                  color: filter === key ? "#0a0a0a" : "rgba(255,255,255,0.5)",
                  fontFamily: "sans-serif",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MASS SCHEDULE CARDS ── */}
      <section className="py-20" style={{ background: "#faf8f5" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Regular Times
              </p>
              <h2 className="text-3xl font-bold" style={{ color: "#1e3a5f" }}>
                Mass Schedule
              </h2>
            </div>
            {filtered.length > 0 && (
              <p
                className="text-xs"
                style={{ color: "#aaa", fontFamily: "sans-serif" }}
              >
                {filtered.length} mass{filtered.length !== 1 ? "es" : ""} shown
              </p>
            )}
          </div>

          {scheduleLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    border: "1px solid #e8e2d9",
                    height: "180px",
                  }}
                  className="animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-20"
              style={{ border: "1px solid #e8e2d9", background: "white" }}
            >
              <Calendar
                size={40}
                style={{ color: "#e8e2d9", margin: "0 auto 12px" }}
              />
              <p
                className="text-sm"
                style={{ color: "#aaa", fontFamily: "sans-serif" }}
              >
                No mass schedules available at this time.
              </p>
              <button
                onClick={() => setFilter("all")}
                className="mt-4 text-xs font-bold tracking-widest uppercase"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                View All Masses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((mass, i) => (
                <motion.div
                  key={mass._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  style={{
                    background: "white",
                    border: "1px solid #e8e2d9",
                    borderLeft: `4px solid ${typeColor(mass.type)}`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <h3
                        className="font-bold text-lg"
                        style={{ color: "#1e3a5f" }}
                      >
                        {mass.day}
                      </h3>
                      <span
                        className="px-2 py-1 text-xs font-semibold"
                        style={{
                          background: `${typeColor(mass.type)}12`,
                          color: typeColor(mass.type),
                          fontFamily: "sans-serif",
                        }}
                      >
                        {mass.type}
                      </span>
                    </div>

                    <div
                      style={{
                        height: "1px",
                        background: "#f0ece4",
                        marginBottom: "14px",
                      }}
                    />

                    {/* Details */}
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-3">
                        <Clock
                          size={13}
                          style={{ color: "#c9a84c", flexShrink: 0 }}
                        />
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "#333", fontFamily: "sans-serif" }}
                        >
                          {mass.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin
                          size={13}
                          style={{ color: "#c9a84c", flexShrink: 0 }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: "#666", fontFamily: "sans-serif" }}
                        >
                          {mass.location}
                        </span>
                      </div>
                      {mass.language && (
                        <div className="flex items-center gap-3">
                          <Globe
                            size={13}
                            style={{ color: "#c9a84c", flexShrink: 0 }}
                          />
                          <span
                            className="text-xs"
                            style={{ color: "#888", fontFamily: "sans-serif" }}
                          >
                            {mass.language}
                          </span>
                        </div>
                      )}
                    </div>

                    {mass.notes && (
                      <div
                        className="mt-4 pt-4 flex items-start gap-2"
                        style={{ borderTop: "1px solid #f0ece4" }}
                      >
                        <Info
                          size={11}
                          style={{
                            color: "#c9a84c",
                            flexShrink: 0,
                            marginTop: "2px",
                          }}
                        />
                        <p
                          className="text-xs italic"
                          style={{ color: "#aaa", fontFamily: "sans-serif" }}
                        >
                          {mass.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      {upcomingEvents.length > 0 && (
        <section className="py-20" style={{ background: "white" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="mb-12">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Coming Up
              </p>
              <h2 className="text-3xl font-bold" style={{ color: "#1e3a5f" }}>
                Special Events
              </h2>
            </div>

            {eventsLoading ? (
              <div className="grid md:grid-cols-2 gap-5">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#faf8f5",
                      border: "1px solid #e8e2d9",
                      height: "160px",
                    }}
                    className="animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-5">
                {upcomingEvents.map((event, i) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    style={{
                      background: "#faf8f5",
                      border: "1px solid #e8e2d9",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                    }}
                  >
                    <div className="flex items-stretch">
                      {/* Date badge */}
                      <div
                        className="flex flex-col items-center justify-center px-5 py-5 flex-shrink-0"
                        style={{
                          background: i % 2 === 0 ? "#1e3a5f" : "#8B2635",
                          minWidth: "70px",
                        }}
                      >
                        <span
                          className="text-xs uppercase tracking-widest text-white opacity-70"
                          style={{ fontFamily: "sans-serif" }}
                        >
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </span>
                        <span className="text-3xl font-bold text-white leading-none">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>
                      {/* Content */}
                      <div className="p-5 flex-1">
                        {event.category && (
                          <p
                            className="text-xs tracking-widest uppercase mb-1"
                            style={{
                              color: "#c9a84c",
                              fontFamily: "sans-serif",
                            }}
                          >
                            {event.category}
                          </p>
                        )}
                        <h4
                          className="font-bold mb-2"
                          style={{ color: "#1e3a5f", fontSize: "0.95rem" }}
                        >
                          {event.title}
                        </h4>
                        <div className="flex flex-wrap gap-4">
                          {event.time && (
                            <div className="flex items-center gap-1.5">
                              <Clock size={11} style={{ color: "#c9a84c" }} />
                              <span
                                className="text-xs"
                                style={{
                                  color: "#888",
                                  fontFamily: "sans-serif",
                                }}
                              >
                                {event.time}
                              </span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin size={11} style={{ color: "#c9a84c" }} />
                              <span
                                className="text-xs"
                                style={{
                                  color: "#888",
                                  fontFamily: "sans-serif",
                                }}
                              >
                                {event.location}
                              </span>
                            </div>
                          )}
                        </div>
                        {event.description && (
                          <p
                            className="text-xs mt-2 line-clamp-2"
                            style={{ color: "#aaa", fontFamily: "sans-serif" }}
                          >
                            {event.description}
                          </p>
                        )}
                        {event.maxAttendees && (
                          <p
                            className="text-xs mt-2"
                            style={{ color: "#bbb", fontFamily: "sans-serif" }}
                          >
                            {event.attendees || 0} / {event.maxAttendees}{" "}
                            registered
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── IMPORTANT INFO ── */}
      <section className="py-16" style={{ background: "#faf8f5" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-2 gap-6">
            <div
              style={{ background: "#1e3a5f", borderLeft: "4px solid #c9a84c" }}
            >
              <div className="p-8">
                <p
                  className="text-xs tracking-[0.25em] uppercase mb-3"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  Pastoral Notes
                </p>
                <h3 className="text-xl font-bold text-white mb-5">
                  Important Information
                </h3>
                {[
                  "Please arrive 10–15 minutes before Mass for prayer and preparation.",
                  "The church is open for private prayer daily from 6:00 AM to 8:00 PM.",
                  "Confessions are available every Saturday 3:30–4:30 PM or by appointment.",
                  "During flu season, receiving Communion in the hand is encouraged.",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 mb-3 last:mb-0"
                  >
                    <span
                      style={{
                        color: "#c9a84c",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      ✟
                    </span>
                    <p
                      className="text-sm"
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "white", border: "1px solid #e8e2d9" }}>
              <div className="p-8">
                <p
                  className="text-xs tracking-[0.25em] uppercase mb-3"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  Confession & Adoration
                </p>
                <h3
                  className="text-xl font-bold mb-5"
                  style={{ color: "#1e3a5f" }}
                >
                  Liturgical Life
                </h3>
                {[
                  { label: "Confession", value: "Every Saturday 3:30–4:30 PM" },
                  {
                    label: "Eucharistic Adoration",
                    value: "Thursdays 6:00–8:00 PM",
                  },
                  {
                    label: "Rosary",
                    value: "30 minutes before Sunday morning Mass",
                  },
                  {
                    label: "Chaplet of Divine Mercy",
                    value: "Fridays at 3:00 PM",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-3"
                    style={{ borderBottom: "1px solid #f0ece4" }}
                  >
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#333", fontFamily: "sans-serif" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "#888", fontFamily: "sans-serif" }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e3a5f, #0f2240 60%, #8B2635)",
        }}
      >
        <div
          className="absolute right-10 opacity-5 text-white select-none"
          style={{ fontSize: "18rem", lineHeight: 1, top: "-1rem" }}
        >
          ✟
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Questions About Mass Times?
          </h2>
          <p
            className="text-base mb-10 max-w-xl mx-auto"
            style={{
              color: "rgba(255,255,255,0.65)",
              fontFamily: "sans-serif",
              fontWeight: 300,
            }}
          >
            Contact our parish office or book an appointment to speak with one
            of our priests.
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
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase"
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
              Contact Us <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
