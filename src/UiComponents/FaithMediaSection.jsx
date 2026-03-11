import React from "react";
import { motion } from "framer-motion";
import { Play, Radio, BookOpen, ArrowRight } from "lucide-react";

const FaithMediaSection = () => {
  const mediaHighlights = [
    {
      icon: Play,
      label: "Video Homilies",
      desc: "Watch weekly sermons and special liturgical addresses.",
    },
    {
      icon: Radio,
      label: "Live Streams",
      desc: "Join Mass and parish events from anywhere in the world.",
    },
    {
      icon: BookOpen,
      label: "Catechesis",
      desc: "Faith formation talks, reflections, and teaching series.",
    },
  ];

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: "#faf8f5",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Subtle background cross pattern */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(201,168,76,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Section label */}
        <div className="mb-14">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            Parish Media
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: "#1e3a5f", lineHeight: 1.1, maxWidth: "560px" }}
            >
              Grow Your Faith
              <br />
              <span style={{ color: "#8B2635" }}>No Matter Where You Are</span>
            </h2>
            <a
              href="/sermons"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase self-start lg:self-auto group transition-all"
              style={{ color: "#8B2635", fontFamily: "sans-serif" }}
            >
              Explore All Media
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
          <div
            className="mt-6"
            style={{ height: "3px", width: "60px", background: "#c9a84c" }}
          />
        </div>

        {/* Main grid: video left, content right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Video embed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Featured label */}
            <div
              className="absolute -top-3 left-6 z-10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase"
              style={{
                background: "#8B2635",
                color: "white",
                fontFamily: "sans-serif",
              }}
            >
              Featured
            </div>

            {/* Video */}
            <div
              className="w-full aspect-video overflow-hidden"
              style={{
                border: "1px solid #e8e2d9",
                boxShadow: "0 12px 48px rgba(0,0,0,0.12)",
              }}
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/8R0E_u6D76M?si=2gVdIXm5MxmzM4iu"
                title="Catholic Media"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Caption */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: "#1e3a5f",
                borderLeft: "4px solid #c9a84c",
              }}
            >
              <div>
                <p
                  className="text-xs font-bold tracking-widest uppercase mb-0.5"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  Ordination 2025
                </p>
                <p
                  className="text-sm italic"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  Priestly &amp; Diaconate Ordinations — 28.06.2025
                </p>
              </div>
              <Play size={18} style={{ color: "#c9a84c", flexShrink: 0 }} />
            </div>
          </motion.div>

          {/* Right: text + highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <p
              className="text-lg leading-relaxed"
              style={{
                color: "#555",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              From inspiring homilies and catechetical teachings to
              documentaries and coverage of important liturgical celebrations,
              our parish media ministry brings the faith closer to you —
              wherever you are in the world.
            </p>

            <p
              className="text-base leading-relaxed"
              style={{
                color: "#777",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              Stay connected to St. Peter &amp; Paul Parish through our growing
              library of spiritual content. Subscribe to our channel and never
              miss a moment of grace.
            </p>

            {/* Highlight items */}
            <div className="flex flex-col gap-4">
              {mediaHighlights.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-4"
                  style={{
                    background: "white",
                    border: "1px solid #e8e2d9",
                    borderLeft: `4px solid ${i % 2 === 0 ? "#8B2635" : "#1e3a5f"}`,
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: i % 2 === 0 ? "#8B263510" : "#1e3a5f10",
                    }}
                  >
                    <item.icon
                      size={18}
                      style={{ color: i % 2 === 0 ? "#8B2635" : "#1e3a5f" }}
                    />
                  </div>
                  <div>
                    <h4
                      className="font-bold text-sm mb-1"
                      style={{ color: "#1e3a5f" }}
                    >
                      {item.label}
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: "#888", fontFamily: "sans-serif" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/sermons"
              className="self-start inline-flex items-center gap-2 px-7 py-3 text-xs font-bold tracking-widest uppercase transition-all group"
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
              See More Videos
              <ArrowRight
                size={13}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FaithMediaSection;
