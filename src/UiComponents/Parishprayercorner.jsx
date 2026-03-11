import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Sun,
  Moon,
  Heart,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router";

const dailyPrayers = [
  {
    id: "morning",
    time: "Morning",
    icon: Sun,
    title: "Morning Offering",
    prayer:
      "O Jesus, through the Immaculate Heart of Mary, I offer You my prayers, works, joys, and sufferings of this day. In union with the Holy Sacrifice of the Mass throughout the world, I offer them for all the intentions of Your Sacred Heart.",
    source: "Traditional Catholic Prayer",
  },
  {
    id: "angelus",
    time: "Midday",
    icon: Heart,
    title: "The Angelus",
    prayer:
      "The Angel of the Lord declared unto Mary, and she conceived by the Holy Spirit. Hail Mary… Behold the handmaid of the Lord; be it done unto me according to Thy word. Hail Mary… And the Word was made flesh, and dwelt among us. Hail Mary…",
    source: "Recited at 6am, 12pm & 6pm",
  },
  {
    id: "evening",
    time: "Evening",
    icon: Moon,
    title: "Evening Examination",
    prayer:
      "Lord, review with me the events of today. Help me to see where I have fallen short and where I have been faithful. Grant me the grace of a contrite heart, and the peace that comes from Your forgiveness and love.",
    source: "Ignatian Examen",
  },
];

const spiritualResources = [
  {
    icon: "📖",
    title: "Daily Readings",
    desc: "Today's Mass readings from the Lectionary",
    link: "/sermons",
  },
  {
    icon: "🕊",
    title: "Confession Times",
    desc: "Find when the Sacrament of Penance is available",
    link: "/mass-schedule",
  },
  {
    icon: "📿",
    title: "Rosary Guide",
    desc: "Meditate on the mysteries of the Holy Rosary",
    link: "/about",
  },
  {
    icon: "✉",
    title: "Prayer Requests",
    desc: "Submit your intentions to the parish prayer team",
    link: "/mass-booking",
  },
];

const liturgicalSeason = {
  season: "Ordinary Time",
  color: "#2a5f3f",
  colorName: "Green",
  message:
    "During Ordinary Time, the Church reflects on the life and teachings of Christ. It is a season of growth in faith, discipleship, and daily conversion.",
  weekNum: "Seventeenth Week",
};

const ParishPrayerCorner = () => {
  const [openPrayer, setOpenPrayer] = useState("morning");

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
            Pray With Us
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#1e3a5f", lineHeight: 1.1 }}
          >
            The Parish
            <br />
            <span style={{ color: "#8B2635" }}>Prayer Corner</span>
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
            className="mt-6 max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: "#888", fontFamily: "sans-serif", fontWeight: 300 }}
          >
            Nourish your soul with daily prayer. Join thousands of parishioners
            who begin, pause, and end their day in conversation with God.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Liturgical Season card */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-7 relative overflow-hidden"
              style={{
                background: "#1e3a5f",
                borderTop: "4px solid #c9a84c",
              }}
            >
              {/* Watermark */}
              <div
                className="absolute right-4 bottom-2 select-none pointer-events-none opacity-10 text-white"
                style={{ fontSize: "6rem", lineHeight: 1 }}
              >
                ✟
              </div>

              <p
                className="text-xs tracking-[0.25em] uppercase mb-3"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Liturgical Calendar
              </p>
              <h3 className="text-2xl font-bold text-white mb-2">
                {liturgicalSeason.season}
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: liturgicalSeason.color }}
                />
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "sans-serif",
                  }}
                >
                  Liturgical colour: {liturgicalSeason.colorName}
                </span>
              </div>
              <div
                className="mb-4"
                style={{ height: "1px", background: "rgba(255,255,255,0.1)" }}
              />
              <p
                className="text-sm leading-relaxed italic"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {liturgicalSeason.message}
              </p>
              <p
                className="mt-4 text-xs tracking-widest uppercase"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                {liturgicalSeason.weekNum}
              </p>
            </motion.div>

            {/* Spiritual Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p
                className="text-xs tracking-[0.25em] uppercase mb-4"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Spiritual Resources
              </p>
              <div className="flex flex-col gap-3">
                {spiritualResources.map((res) => (
                  <Link
                    key={res.title}
                    to={res.link}
                    className="flex items-center gap-4 p-4 group transition-all"
                    style={{
                      background: "white",
                      border: "1px solid #e8e2d9",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "#c9a84c")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "#e8e2d9")
                    }
                  >
                    <span className="text-xl flex-shrink-0">{res.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-bold mb-0.5"
                        style={{ color: "#1e3a5f" }}
                      >
                        {res.title}
                      </p>
                      <p
                        className="text-xs truncate"
                        style={{ color: "#aaa", fontFamily: "sans-serif" }}
                      >
                        {res.desc}
                      </p>
                    </div>
                    <ArrowRight
                      size={14}
                      style={{ color: "#c9a84c", flexShrink: 0 }}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Daily Prayers accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <p
              className="text-xs tracking-[0.25em] uppercase mb-1"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              Daily Prayers
            </p>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{
                color: "#888",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              Select a prayer time below and take a moment to lift your heart to
              God.
            </p>

            {dailyPrayers.map((p, i) => {
              const isOpen = openPrayer === p.id;
              return (
                <div
                  key={p.id}
                  style={{
                    border: `1px solid ${isOpen ? "#c9a84c" : "#e8e2d9"}`,
                    background: "white",
                    transition: "border-color 0.3s",
                  }}
                >
                  {/* Accordion header */}
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setOpenPrayer(isOpen ? null : p.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isOpen ? "#1e3a5f" : "#f5f0e8",
                          transition: "background 0.3s",
                        }}
                      >
                        <p.icon
                          size={16}
                          style={{ color: isOpen ? "#c9a84c" : "#888" }}
                        />
                      </div>
                      <div>
                        <p
                          className="text-xs tracking-widest uppercase mb-0.5"
                          style={{
                            color: isOpen ? "#c9a84c" : "#aaa",
                            fontFamily: "sans-serif",
                          }}
                        >
                          {p.time}
                        </p>
                        <h4
                          className="font-bold"
                          style={{
                            color: isOpen ? "#1e3a5f" : "#333",
                            fontSize: "1rem",
                          }}
                        >
                          {p.title}
                        </h4>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp
                        size={18}
                        style={{ color: "#c9a84c", flexShrink: 0 }}
                      />
                    ) : (
                      <ChevronDown
                        size={18}
                        style={{ color: "#ccc", flexShrink: 0 }}
                      />
                    )}
                  </button>

                  {/* Accordion body */}
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-5 pb-6 pt-0"
                        style={{ borderTop: "1px solid #f0ece4" }}
                      >
                        <div
                          className="pl-4 mt-4"
                          style={{ borderLeft: "3px solid #c9a84c" }}
                        >
                          <p
                            className="text-base italic leading-loose"
                            style={{ color: "#555" }}
                          >
                            {p.prayer}
                          </p>
                          <p
                            className="text-xs tracking-widest uppercase mt-4"
                            style={{
                              color: "#c9a84c",
                              fontFamily: "sans-serif",
                            }}
                          >
                            — {p.source}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}

            {/* Scripture of the week */}
            <div
              className="p-7 mt-2 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1e3a5f 0%, #0f2240 100%)",
                borderLeft: "4px solid #c9a84c",
              }}
            >
              <div
                className="absolute right-4 bottom-2 opacity-5 select-none text-white"
                style={{ fontSize: "6rem" }}
              >
                ✦
              </div>
              <p
                className="text-xs tracking-[0.25em] uppercase mb-3"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Scripture of the Week
              </p>
              <p
                className="text-lg italic mb-3 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                "Ask and it will be given to you; seek and you will find; knock
                and the door will be opened to you."
              </p>
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                — Matthew 7:7
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ParishPrayerCorner;
