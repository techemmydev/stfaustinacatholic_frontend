import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Heart,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router";

// ── Angelus verses (call & response format) ──────────────────────
const angelusVerses = [
  { type: "verse", text: "V. The Angel of the Lord declared unto Mary," },
  { type: "response", text: "R. And she conceived by the Holy Spirit." },
  { type: "hailmary", label: "Hail Mary…" },
  { type: "verse", text: "V. Behold the handmaid of the Lord;" },
  { type: "response", text: "R. Be it done unto me according to Thy word." },
  { type: "hailmary", label: "Hail Mary…" },
  { type: "verse", text: "V. And the Word was made flesh," },
  { type: "response", text: "R. And dwelt among us." },
  { type: "hailmary", label: "Hail Mary…" },
  { type: "verse", text: "V. Pray for us, O holy Mother of God," },
  {
    type: "response",
    text: "R. That we may be made worthy of the promises of Christ.",
  },
  {
    type: "collect",
    label: "Let us pray",
    text: "Pour forth, we beseech Thee, O Lord, Thy grace into our hearts; that we, to whom the Incarnation of Christ, Thy Son, was made known by the message of an angel, may by His Passion and Cross be brought to the glory of His Resurrection, through the same Christ our Lord. Amen.",
  },
];

// ── Regina Caeli (Easter Season replacement for Angelus) ─────────
const reginaCaeliVerses = [
  { type: "verse", text: "V. Queen of Heaven, rejoice, alleluia;" },
  {
    type: "response",
    text: "R. For He whom thou didst merit to bear, alleluia,",
  },
  { type: "verse", text: "V. Has risen as He said, alleluia;" },
  { type: "response", text: "R. Pray for us to God, alleluia." },
  { type: "verse", text: "V. Rejoice and be glad, O Virgin Mary, alleluia;" },
  { type: "response", text: "R. For the Lord has truly risen, alleluia." },
  {
    type: "collect",
    label: "Let us pray",
    text: "O God, who gave joy to the world through the resurrection of Thy Son, our Lord Jesus Christ, grant, we beseech Thee, that through the intercession of the Virgin Mary, His Mother, we may obtain the joys of everlasting life, through the same Christ our Lord. Amen.",
  },
];

const dailyPrayers = [
  {
    id: "morning",
    time: "Morning",
    icon: Sun,
    title: "Morning Offering",
    type: "simple",
    prayer:
      "O Jesus, through the Immaculate Heart of Mary, I offer You my prayers, works, joys, and sufferings of this day. In union with the Holy Sacrifice of the Mass throughout the world, I offer them for all the intentions of Your Sacred Heart.",
    source: "Traditional Catholic Prayer",
  },
  {
    id: "angelus",
    time: "Midday",
    icon: Heart,
    title: "The Angelus / Regina Caeli",
    type: "angelus",
    source: "Recited at 6am, 12pm & 6pm",
  },
  {
    id: "evening",
    time: "Evening",
    icon: Moon,
    title: "Evening Examination",
    type: "simple",
    prayer:
      "Lord, review with me the events of today. Help me to see where I have fallen short and where I have been faithful. Grant me the grace of a contrite heart, and the peace that comes from Your forgiveness and love.",
    source: "Ignatian Examen",
  },
];

// ── Parish Prayers (replaces Liturgical Season card) ─────────────
const parishPrayers = [
  {
    id: "faustina",
    title: "Prayer to St. Faustina",
    text: "Saint Faustina Kowalska, Apostle of Divine Mercy, you who saw the merciful face of Christ and received His message of love for the world — intercede for us. Obtain for our parish the grace of deep trust in God's mercy, true repentance for sin, and a burning desire to bring His compassion to all we meet. Amen.",
    tag: "Patron of our Parish",
  },
  {
    id: "parish",
    title: "Prayer for Our Parish",
    text: "Lord Jesus Christ, You who promised to be present wherever two or three are gathered in Your name — bless our parish community. Unite us in faith, hope, and charity. May our worship be holy, our fellowship warm, and our service generous. Raise up among us priests, religious, and lay faithful who will carry Your light to the world. Amen.",
    tag: "Community Prayer",
  },
  {
    id: "mercy",
    title: "Chaplet of Divine Mercy",
    text: 'Begin with: Our Father… Hail Mary… Apostles\' Creed…\n\nOn the large beads say: "Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, our Lord Jesus Christ, in atonement for our sins and those of the whole world."\n\nOn the small beads say (10×): "For the sake of His sorrowful Passion, have mercy on us and on the whole world."\n\nConclude (3×): "Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world."',
    tag: "Given to St. Faustina",
  },
];

const spiritualResources = [
  {
    icon: "📖",
    title: "Daily Readings",
    desc: "Today's Mass readings from the Lectionary",
    link: "https://www.ewtn.com/daily-readings",
    external: true,
  },
  {
    icon: "🕊",
    title: "Confession Times",
    desc: "Find when the Sacrament of Penance is available",
    link: "/sacraments/confession",
    external: false,
  },
  {
    icon: "📿",
    title: "Rosary Guide",
    desc: "Meditate on the mysteries of the Holy Rosary",
    link: "https://marian.org/mary/rosary/how-to-pray",
    external: true,
  },
  {
    icon: "✉",
    title: "Prayer Requests",
    desc: "Submit your intentions to the parish prayer team",
    link: "/mass-booking",
    external: false,
  },
];

// ── Angelus/Regina Caeli body ─────────────────────────────────────
const AngelusBody = () => {
  const [mode, setMode] = useState("angelus");
  const verses = mode === "angelus" ? angelusVerses : reginaCaeliVerses;

  return (
    <div>
      {/* Toggle */}
      <div
        className="flex mb-5 overflow-hidden"
        style={{ border: "1px solid #e8e2d9" }}
      >
        {[
          { key: "angelus", label: "The Angelus", sub: "Ordinary Time" },
          { key: "reginacaeli", label: "Regina Caeli", sub: "Easter Season" },
        ].map((opt) => (
          <button
            key={opt.key}
            onClick={() => setMode(opt.key)}
            className="flex-1 py-3 px-4 text-left transition-all"
            style={{
              background: mode === opt.key ? "#1e3a5f" : "#faf8f5",
              borderRight: opt.key === "angelus" ? "1px solid #e8e2d9" : "none",
            }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase"
              style={{
                color: mode === opt.key ? "#c9a84c" : "#aaa",
                fontFamily: "sans-serif",
              }}
            >
              {opt.label}
            </p>
            <p
              className="text-[10px] mt-0.5"
              style={{
                color: mode === opt.key ? "rgba(255,255,255,0.45)" : "#ccc",
                fontFamily: "sans-serif",
              }}
            >
              {opt.sub}
            </p>
          </button>
        ))}
      </div>

      {/* Verses */}
      <div className="flex flex-col gap-2">
        {verses.map((v, i) => {
          if (v.type === "verse")
            return (
              <p
                key={i}
                className="text-sm leading-relaxed"
                style={{ color: "#555" }}
              >
                <span style={{ color: "#1e3a5f", fontWeight: 700 }}>
                  {v.text.split(" ")[0]}
                </span>{" "}
                {v.text.slice(v.text.indexOf(" ") + 1)}
              </p>
            );
          if (v.type === "response")
            return (
              <p
                key={i}
                className="text-sm leading-relaxed pl-4"
                style={{ color: "#555" }}
              >
                <span style={{ color: "#8B2635", fontWeight: 700 }}>
                  {v.text.split(" ")[0]}
                </span>{" "}
                <em>{v.text.slice(v.text.indexOf(" ") + 1)}</em>
              </p>
            );
          if (v.type === "hailmary")
            return (
              <div
                key={i}
                className="my-1 py-2 px-3"
                style={{ background: "#faf8f5", border: "1px solid #f0ece4" }}
              >
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  {v.label}
                </p>
              </div>
            );
          if (v.type === "collect")
            return (
              <div
                key={i}
                className="mt-3 pt-3"
                style={{ borderTop: "1px solid #f0ece4" }}
              >
                <p
                  className="text-xs tracking-widest uppercase mb-2"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  {v.label}
                </p>
                <p
                  className="text-sm italic leading-relaxed"
                  style={{ color: "#555" }}
                >
                  {v.text}
                </p>
              </div>
            );
          return null;
        })}
      </div>

      <p
        className="text-xs tracking-widest uppercase mt-4"
        style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
      >
        — Recited at 6am, 12pm &amp; 6pm
      </p>
    </div>
  );
};

// ── Parish Prayers card (left column) ────────────────────────────
const ParishPrayersCard = () => {
  const [openPrayer, setOpenPrayer] = useState("faustina");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden"
      style={{ borderTop: "4px solid #c9a84c" }}
    >
      {/* Watermark */}
      <div
        className="absolute right-4 bottom-2 select-none pointer-events-none opacity-[0.04] text-parish-navy"
        style={{ fontSize: "6rem", lineHeight: 1, color: "#1e3a5f" }}
      >
        ✟
      </div>

      <div style={{ background: "#1e3a5f" }} className="px-6 py-5">
        <p
          className="text-xs tracking-[0.25em] uppercase mb-1"
          style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
        >
          Pray with the Parish
        </p>
        <h3 className="text-xl font-bold text-white">Parish Prayers</h3>
      </div>

      <div style={{ background: "white" }}>
        {parishPrayers.map((prayer, i) => {
          const isOpen = openPrayer === prayer.id;
          return (
            <div
              key={prayer.id}
              style={{
                borderBottom:
                  i < parishPrayers.length - 1 ? "1px solid #f0ece4" : "none",
                borderLeft: `3px solid ${isOpen ? "#c9a84c" : "transparent"}`,
                transition: "border-color 0.3s",
              }}
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpenPrayer(isOpen ? null : prayer.id)}
              >
                <div>
                  <p
                    className="text-[10px] tracking-widest uppercase mb-0.5"
                    style={{
                      color: isOpen ? "#c9a84c" : "#bbb",
                      fontFamily: "sans-serif",
                      transition: "color 0.3s",
                    }}
                  >
                    {prayer.tag}
                  </p>
                  <h4
                    className="font-bold text-sm"
                    style={{
                      color: isOpen ? "#1e3a5f" : "#444",
                      transition: "color 0.3s",
                    }}
                  >
                    {prayer.title}
                  </h4>
                </div>
                {isOpen ? (
                  <ChevronUp
                    size={15}
                    style={{ color: "#c9a84c", flexShrink: 0 }}
                  />
                ) : (
                  <ChevronDown
                    size={15}
                    style={{ color: "#ccc", flexShrink: 0 }}
                  />
                )}
              </button>

              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5" style={{ background: "#faf8f5" }}>
                    <p
                      className="text-sm italic leading-relaxed whitespace-pre-line"
                      style={{ color: "#555" }}
                    >
                      {prayer.text}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

// ── Main component ────────────────────────────────────────────────
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
          {/* ── Left column ──────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* Parish Prayers card (replaces Liturgical Season) */}
            <ParishPrayersCard />

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
                {spiritualResources.map((res) =>
                  res.external ? (
                    <a
                      key={res.title}
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
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
                    </a>
                  ) : (
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
                  ),
                )}
              </div>
            </motion.div>
          </div>

          {/* ── Right column — Daily Prayers accordion ───────────── */}
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

            {dailyPrayers.map((p) => {
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
                          {/* Simple prayers (Morning / Evening) */}
                          {p.type === "simple" && (
                            <>
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
                            </>
                          )}

                          {/* Angelus / Regina Caeli */}
                          {p.type === "angelus" && <AngelusBody />}
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
