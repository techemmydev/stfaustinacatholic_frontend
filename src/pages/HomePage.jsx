import React, { useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  Heart,
  BookOpen,
  Users,
  ChevronRight,
  Clock,
  MapPin,
  Cross,
  Church,
  HandHeart,
  Flame,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import Stats from "@/UiComponents/Stats";
import Testimonial from "@/UiComponents/Testimonial";
import FaithMediaSection from "@/UiComponents/FaithMediaSection";
import Herosection from "@/UiComponents/Herosection";
import MassBookingCTA from "@/UiComponents/MassBookingCTA";
import { fetchPublishedEvents } from "../Redux/slice/Eventslice";
import { fetchPublishedMassSchedules } from "../Redux/slice/Massscheduleslice";
import ParishGallery from "@/UiComponents/Parishgallery";
import ParishPrayerCorner from "@/UiComponents/Parishprayercorner";

const quickLinks = [
  {
    icon: Calendar,
    title: "Mass Times",
    description: "View our weekly Mass schedule and special celebrations",
    link: "/mass-schedule",
    accent: "#8B2635",
  },
  {
    icon: Heart,
    title: "Sacraments",
    description: "Learn about and schedule sacramental celebrations",
    link: "/sacraments",
    accent: "#1e3a5f",
  },
  {
    icon: BookOpen,
    title: "Sermons",
    description: "Watch and listen to recent homilies and teachings",
    link: "/sermons",
    accent: "#8B2635",
  },
  {
    icon: Users,
    title: "Our Community",
    description: "Discover ministries, groups, and ways to get involved",
    link: "/about",
    accent: "#1e3a5f",
  },
];

const pillars = [
  {
    icon: "✟",
    title: "Worship",
    body: "Celebrating the Eucharist and sacraments at the heart of our community life.",
  },
  {
    icon: "✦",
    title: "Formation",
    body: "Growing in faith through Scripture, catechesis, and ongoing spiritual education.",
  },
  {
    icon: "❤",
    title: "Service",
    body: "Living the Gospel by serving the poor, the vulnerable, and our wider community.",
  },
  {
    icon: "✿",
    title: "Fellowship",
    body: "Building lasting bonds through parish groups, ministries, and shared celebrations.",
  },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const { publishedEvents, loading } = useSelector((state) => state.event);
  const { publishedSchedules } = useSelector((state) => state.massSchedule);

  useEffect(() => {
    dispatch(fetchPublishedEvents());
    dispatch(fetchPublishedMassSchedules());
  }, [dispatch]);

  const upcomingEvents = publishedEvents
    .filter((event) => new Date(event.date) >= new Date())
    .slice(0, 4);

  const homepageMassTimes = publishedSchedules.slice(0, 4);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <Herosection />

      <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
        {/* ── WELCOME BANNER ─────────────────────────────────────── */}
        <section
          style={{
            background: "#1e3a5f",
            borderBottom: "3px solid #c9a84c",
          }}
          className="py-5"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="text-white/80 text-sm tracking-widest uppercase text-center md:text-left"
              style={{ fontFamily: "sans-serif", letterSpacing: "0.25em" }}
            >
              Established in Faith · Growing in Grace
            </p>
            <div className="flex items-center gap-6">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-white/60 hover:text-[#c9a84c] transition-colors text-sm"
                style={{ fontFamily: "sans-serif" }}
              >
                <Phone size={14} />
                <span>+1 (234) 567-890</span>
              </a>
              <a
                href="mailto:info@sspeterandpaul.org"
                className="flex items-center gap-2 text-white/60 hover:text-[#c9a84c] transition-colors text-sm"
                style={{ fontFamily: "sans-serif" }}
              >
                <Mail size={14} />
                <span>info@sspeterandpaul.org</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── MISSION ────────────────────────────────────────────── */}
        <section className="py-20" style={{ background: "#faf8f5" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: text */}
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  Who We Are
                </p>
                <h2
                  className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                  style={{ color: "#1e3a5f", lineHeight: 1.1 }}
                >
                  St. Peter &amp; Paul
                  <br />
                  <span style={{ color: "#8B2635" }}>Catholic Parish</span>
                </h2>
                <div
                  className="mb-6"
                  style={{
                    width: "60px",
                    height: "3px",
                    background: "#c9a84c",
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
                  St. Peter &amp; Paul Parish is a vibrant Catholic community
                  devoted to spreading the Gospel, celebrating the sacraments,
                  and serving those in need. We are a welcoming spiritual home
                  where all can encounter Christ and grow in faith together.
                </p>
                <p
                  className="text-base leading-relaxed mb-10"
                  style={{
                    color: "#777",
                    fontFamily: "sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Rooted in the tradition of the Apostles Peter and Paul — one
                  the rock of the Church, the other its great missionary — we
                  are called both to stand firm in faith and to go out to the
                  world with the Good News.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase transition-all group"
                  style={{ color: "#8B2635", fontFamily: "sans-serif" }}
                >
                  Learn Our Story
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>

              {/* Right: pillars grid */}
              <div className="grid grid-cols-2 gap-4">
                {pillars.map((p) => (
                  <div
                    key={p.title}
                    className="p-6 rounded-sm"
                    style={{
                      background: "white",
                      border: "1px solid #e8e2d9",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div className="text-2xl mb-3" style={{ color: "#c9a84c" }}>
                      {p.icon}
                    </div>
                    <h4
                      className="font-bold mb-2"
                      style={{ color: "#1e3a5f", fontSize: "1rem" }}
                    >
                      {p.title}
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "#888",
                        fontFamily: "sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SCRIPTURE BANNER ───────────────────────────────────── */}
        <div
          className="py-10"
          style={{
            background: "linear-gradient(135deg, #1e3a5f 0%, #162d4a 100%)",
            borderTop: "1px solid rgba(201,168,76,0.2)",
            borderBottom: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p
              className="text-xl md:text-2xl italic mb-3"
              style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.6 }}
            >
              "They devoted themselves to the teaching of the apostles, to the
              communal life, to the breaking of the bread and to the prayers."
            </p>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              — Acts 2:42
            </p>
          </div>
        </div>

        {/* ── QUICK LINKS ────────────────────────────────────────── */}
        <section className="py-20" style={{ background: "white" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="text-center mb-14">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Parish Life
              </p>
              <h2 className="text-4xl font-bold" style={{ color: "#1e3a5f" }}>
                Explore Our Parish
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.link}
                  className="group relative overflow-hidden block"
                  style={{
                    background: "white",
                    border: "1px solid #e8e2d9",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* top accent bar */}
                  <div
                    className="h-1 w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: link.accent }}
                  />
                  <div className="p-7">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                      style={{ background: `${link.accent}15` }}
                    >
                      <link.icon
                        className="w-5 h-5"
                        style={{ color: link.accent }}
                      />
                    </div>
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: "#1e3a5f" }}
                    >
                      {link.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-5"
                      style={{
                        color: "#888",
                        fontFamily: "sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {link.description}
                    </p>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase group-hover:gap-2 transition-all"
                      style={{ color: link.accent, fontFamily: "sans-serif" }}
                    >
                      Learn More
                      <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── MASS TIMES ─────────────────────────────────────────── */}
        <section className="py-20" style={{ background: "#faf8f5" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            {/* Section header with View All link */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-3"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  Liturgical Schedule
                </p>
                <h2 className="text-4xl font-bold" style={{ color: "#1e3a5f" }}>
                  Mass Times
                </h2>
              </div>
              <Link
                to="/mass-schedule"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-all group self-start md:self-auto"
                style={{ color: "#8B2635", fontFamily: "sans-serif" }}
              >
                View Full Schedule
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            {homepageMassTimes.length === 0 ? (
              /* ── Empty state ── */
              <div
                className="text-center py-16 border"
                style={{ borderColor: "#e8e2d9", background: "white" }}
              >
                <Clock
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: "#ccc" }}
                />
                <p
                  className="text-base mb-6"
                  style={{ color: "#aaa", fontFamily: "sans-serif" }}
                >
                  Mass schedule coming soon. Please check back.
                </p>
                <Link
                  to="/mass-schedule"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all group"
                  style={{
                    background: "#c9a84c",
                    color: "#0a0a0a",
                    fontFamily: "sans-serif",
                  }}
                >
                  View Schedule Page
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            ) : (
              <>
                {/* ── Cards ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {homepageMassTimes.map((mass, i) => (
                    <div
                      key={mass._id}
                      className="relative overflow-hidden group"
                      style={{
                        background: "white",
                        border: "1px solid #e8e2d9",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                      }}
                    >
                      {/* Coloured top bar */}
                      <div
                        style={{
                          height: "4px",
                          background: i % 2 === 0 ? "#8B2635" : "#1e3a5f",
                        }}
                      />

                      <div className="p-6">
                        {/* Day */}
                        <p
                          className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
                          style={{
                            color: i % 2 === 0 ? "#8B2635" : "#1e3a5f",
                            fontFamily: "sans-serif",
                          }}
                        >
                          {mass.day}
                        </p>

                        {/* Time — large & prominent */}
                        <p
                          className="text-2xl font-bold mb-4"
                          style={{ color: "#1e3a5f", lineHeight: 1.2 }}
                        >
                          {mass.time}
                        </p>

                        {/* Divider */}
                        <div
                          className="mb-4"
                          style={{ height: "1px", background: "#ede8e0" }}
                        />

                        {/* Location */}
                        <p
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "#888", fontFamily: "sans-serif" }}
                        >
                          <MapPin
                            size={13}
                            style={{
                              color: "#c9a84c",
                              marginTop: "2px",
                              flexShrink: 0,
                            }}
                          />
                          {mass.location || "Main Church"}
                        </p>

                        {/* Optional type badge */}
                        {mass.type && (
                          <span
                            className="inline-block mt-3 text-xs font-semibold tracking-widest uppercase px-2 py-0.5"
                            style={{
                              color: "#c9a84c",
                              background: "rgba(201,168,76,0.1)",
                              fontFamily: "sans-serif",
                            }}
                          >
                            {mass.type}
                          </span>
                        )}
                      </div>

                      {/* Gold hover underline */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                        style={{ background: "#c9a84c" }}
                      />
                    </div>
                  ))}
                </div>

                {/* ── Footer CTA banner ── */}
                <div
                  className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5 px-8 py-6"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e3a5f 0%, #162d4a 100%)",
                    borderLeft: "4px solid #c9a84c",
                  }}
                >
                  <div>
                    <p
                      className="text-sm italic mb-1"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      "Come, let us bow down in worship; let us kneel before the
                      Lord our Maker."
                    </p>
                    <p
                      className="text-xs tracking-widest uppercase"
                      style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                    >
                      — Psalm 95:6
                    </p>
                  </div>
                  <Link
                    to="/mass-schedule"
                    className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3 text-xs font-bold tracking-widest uppercase transition-all group"
                    style={{
                      background: "#c9a84c",
                      color: "#0a0a0a",
                      fontFamily: "sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Full Mass Schedule
                    <ArrowRight
                      size={13}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
        {/* ── UPCOMING EVENTS ────────────────────────────────────── */}
        <section className="py-20" style={{ background: "white" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="flex justify-between items-end mb-14">
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-3"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  What's On
                </p>
                <h2 className="text-4xl font-bold" style={{ color: "#1e3a5f" }}>
                  Upcoming Events
                </h2>
              </div>
              <Link
                to="/mass-schedule"
                className="hidden md:inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-all group"
                style={{ color: "#8B2635", fontFamily: "sans-serif" }}
              >
                View All Events
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div
                  className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
                  style={{
                    borderColor: "#8B2635",
                    borderTopColor: "transparent",
                  }}
                />
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div
                className="text-center py-16 border"
                style={{ borderColor: "#e8e2d9", background: "#faf8f5" }}
              >
                <Calendar
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: "#ccc" }}
                />
                <p
                  className="text-base"
                  style={{ color: "#aaa", fontFamily: "sans-serif" }}
                >
                  No upcoming events at this time. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {upcomingEvents.map((event, i) => (
                  <div
                    key={event._id}
                    className="group overflow-hidden"
                    style={{
                      background: "white",
                      border: "1px solid #e8e2d9",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    }}
                  >
                    {event.imageUrl ? (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div
                        className="h-40 flex items-center justify-center"
                        style={{
                          background: i % 2 === 0 ? "#1e3a5f" : "#8B2635",
                        }}
                      >
                        <span className="text-4xl opacity-20 text-white">
                          ✟
                        </span>
                      </div>
                    )}
                    <div className="p-5">
                      <span
                        className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-2 py-1"
                        style={{
                          color: "#8B2635",
                          background: "#8B263510",
                          fontFamily: "sans-serif",
                        }}
                      >
                        {event.category}
                      </span>
                      <h3
                        className="font-bold mb-3 leading-snug"
                        style={{ color: "#1e3a5f", fontSize: "1rem" }}
                      >
                        {event.title}
                      </h3>
                      <div
                        className="space-y-1.5 text-sm"
                        style={{ color: "#888", fontFamily: "sans-serif" }}
                      >
                        <p className="flex items-center gap-2">
                          <Calendar size={13} style={{ color: "#c9a84c" }} />
                          {formatDate(event.date)}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock size={13} style={{ color: "#c9a84c" }} />
                          {event.time}
                        </p>
                        {event.location && (
                          <p className="flex items-center gap-2">
                            <MapPin size={13} style={{ color: "#c9a84c" }} />
                            {event.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Mobile view all */}
            <div className="mt-8 text-center md:hidden">
              <Link
                to="/mass-schedule"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase"
                style={{ color: "#8B2635", fontFamily: "sans-serif" }}
              >
                View All Events <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── MINISTRIES ─────────────────────────────────────────── */}
        <section className="py-20" style={{ background: "#faf8f5" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="text-center mb-14">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Get Involved
              </p>
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: "#1e3a5f" }}
              >
                Parish Ministries
              </h2>
              <p
                className="max-w-xl mx-auto text-base"
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: "🕊", label: "Youth Ministry" },
                { icon: "📖", label: "Bible Study" },
                { icon: "🎵", label: "Choir" },
                { icon: "🤝", label: "Outreach" },
                { icon: "👨‍👩‍👧", label: "Family Life" },
                { icon: "🙏", label: "Prayer Group" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="text-center p-5 group cursor-pointer transition-all"
                  style={{
                    background: "white",
                    border: "1px solid #e8e2d9",
                  }}
                >
                  <div className="text-3xl mb-3">{m.icon}</div>
                  <p
                    className="text-xs font-semibold tracking-wide uppercase"
                    style={{ color: "#1e3a5f", fontFamily: "sans-serif" }}
                  >
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-3 text-xs font-semibold tracking-widest uppercase transition-all border"
                style={{
                  color: "#1e3a5f",
                  borderColor: "#1e3a5f",
                  fontFamily: "sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1e3a5f";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#1e3a5f";
                }}
              >
                View All Ministries <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <section
          className="py-24 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1e3a5f 0%, #0f2240 60%, #8B2635 100%)",
          }}
        >
          {/* Decorative cross watermark */}
          <div
            className="absolute right-10 top-1/2 -translate-y-1/2 text-white/5 select-none pointer-events-none hidden lg:block"
            style={{ fontSize: "20rem", lineHeight: 1 }}
          >
            ✟
          </div>

          <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="max-w-2xl">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-4"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Welcome Home
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Join Us in Worship,
                <br />
                Service &amp; Community
              </h2>
              <div
                className="mb-6"
                style={{ width: "60px", height: "3px", background: "#c9a84c" }}
              />
              <p
                className="text-lg mb-4 leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "sans-serif",
                  fontWeight: 300,
                }}
              >
                Whether you are visiting for the first time, seeking spiritual
                guidance, or looking for a parish to call home — you are welcome
                here. We invite you to encounter Christ in our community.
              </p>
              <p
                className="text-base mb-10"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "sans-serif",
                  fontWeight: 300,
                }}
              >
                Register as a parishioner, book a sacramental appointment, or
                simply come as you are.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all"
                  style={{
                    background: "#c9a84c",
                    color: "#0a0a0a",
                    fontFamily: "sans-serif",
                    clipPath:
                      "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                  }}
                >
                  Register as Parishioner <ArrowRight size={14} />
                </Link>
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold tracking-widest uppercase border transition-all"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "white",
                    fontFamily: "sans-serif",
                    backdropFilter: "blur(4px)",
                    background: "rgba(255,255,255,0.05)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#c9a84c")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.3)")
                  }
                >
                  Book an Appointment
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold tracking-widest uppercase border transition-all"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "sans-serif",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#c9a84c")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.3)")
                  }
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Stats />
      <Testimonial />
      <FaithMediaSection />
      <MassBookingCTA />
      <ParishGallery />
      <ParishPrayerCorner />
    </>
  );
};

export default HomePage;
