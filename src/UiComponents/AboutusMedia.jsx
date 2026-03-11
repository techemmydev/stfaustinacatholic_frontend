import React from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";

const AboutusMedia = () => {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: "white",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Badge */}
            <div
              className="absolute -top-3 left-6 z-10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase"
              style={{
                background: "#8B2635",
                color: "white",
                fontFamily: "sans-serif",
              }}
            >
              Parish Story
            </div>

            {/* Video container */}
            <div
              className="w-full aspect-video overflow-hidden relative group"
              style={{
                border: "1px solid #e8e2d9",
                boxShadow: "0 12px 48px rgba(0,0,0,0.1)",
              }}
            >
              <video
                className="w-full h-full object-cover"
                src="/path-to-your-video.mp4"
                controls
                autoPlay={false}
                muted
                loop
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.35)" }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center"
                  style={{ background: "#c9a84c" }}
                >
                  <Play size={22} style={{ color: "#0a0a0a" }} />
                </div>
              </div>
            </div>

            {/* Caption bar */}
            <div
              className="flex items-center justify-between px-5 py-4"
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
                  Featured
                </p>
                <p
                  className="text-sm italic"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  Community Outreach &amp; Parish Life
                </p>
              </div>
              <Play size={16} style={{ color: "#c9a84c" }} />
            </div>
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              Our Story
            </p>
            <h2
              className="text-4xl lg:text-5xl font-bold mb-5 leading-tight"
              style={{ color: "#1e3a5f", lineHeight: 1.1 }}
            >
              Discover Our
              <br />
              <span style={{ color: "#8B2635" }}>Parish Story</span>
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
              className="text-lg leading-relaxed mb-5"
              style={{
                color: "#555",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              At Sts. Peter &amp; Paul Parish, we are a community united by
              faith and service. Explore inspiring stories, witness
              celebrations, and learn how we live out our Catholic mission every
              day.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{
                color: "#777",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              From our rich liturgical traditions to our outreach into the wider
              community, there is always something happening at Sts. Peter &amp;
              Paul that witnesses to the power of the Gospel in everyday life.
            </p>

            {/* Highlights */}
            <div className="flex flex-col gap-3 mb-10">
              {[
                {
                  icon: "🤝",
                  label: "Community Outreach",
                  desc: "Serving the poor and vulnerable in our area",
                },
                {
                  icon: "🕊",
                  label: "Youth Engagement",
                  desc: "Forming the next generation of Catholic disciples",
                },
                {
                  icon: "✟",
                  label: "Special Liturgical Celebrations",
                  desc: "Ordinations, feast days, and parish milestones",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-4"
                  style={{ background: "#faf8f5", border: "1px solid #e8e2d9" }}
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">
                    {item.icon}
                  </span>
                  <div>
                    <p
                      className="font-bold text-sm mb-0.5"
                      style={{ color: "#1e3a5f" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "#aaa", fontFamily: "sans-serif" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/sermons"
              className="inline-flex items-center gap-2 px-7 py-3 text-xs font-bold tracking-widest uppercase transition-all group"
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
              Learn More
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

export default AboutusMedia;
