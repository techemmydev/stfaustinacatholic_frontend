import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ArrowRight } from "lucide-react";

// Replace these with real image imports e.g: import img1 from "../assets/images/gallery1.jpg"
// For now using styled placeholder tiles
const galleryItems = [
  {
    id: 1,
    label: "Sunday Mass",
    category: "Liturgy",
    bg: "linear-gradient(135deg, #1e3a5f 0%, #0f2240 100%)",
    symbol: "✟",
    span: "lg:col-span-2",
  },
  {
    id: 2,
    label: "Baptism Celebration",
    category: "Sacraments",
    bg: "linear-gradient(135deg, #8B2635 0%, #6d1d2a 100%)",
    symbol: "✦",
    span: "",
  },
  {
    id: 3,
    label: "Youth Ministry",
    category: "Community",
    bg: "linear-gradient(135deg, #2a5f3f 0%, #1a3d28 100%)",
    symbol: "✿",
    span: "",
  },
  {
    id: 4,
    label: "Ordination 2025",
    category: "Special Events",
    bg: "linear-gradient(135deg, #5f4a1e 0%, #3d2e10 100%)",
    symbol: "✟",
    span: "",
  },
  {
    id: 5,
    label: "Choir Ministry",
    category: "Community",
    bg: "linear-gradient(135deg, #1e3a5f 0%, #8B2635 100%)",
    symbol: "♪",
    span: "lg:col-span-2",
  },
  {
    id: 6,
    label: "Christmas Vigil",
    category: "Liturgy",
    bg: "linear-gradient(135deg, #162d4a 0%, #0a1520 100%)",
    symbol: "✦",
    span: "",
  },
  {
    id: 7,
    label: "First Communion",
    category: "Sacraments",
    bg: "linear-gradient(135deg, #8B2635 0%, #1e3a5f 100%)",
    symbol: "✟",
    span: "",
  },
  {
    id: 8,
    label: "Parish Feast Day",
    category: "Special Events",
    bg: "linear-gradient(135deg, #3d2e10 0%, #8B2635 100%)",
    symbol: "✿",
    span: "",
  },
];

const categories = [
  "All",
  "Liturgy",
  "Sacraments",
  "Community",
  "Special Events",
];

const ParishGallery = () => {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    active === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === active);

  return (
    <section
      className="py-24"
      style={{
        background: "white",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              Parish Life in Pictures
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "#1e3a5f", lineHeight: 1.1 }}
            >
              Our Parish
              <br />
              <span style={{ color: "#8B2635" }}>Gallery</span>
            </h2>
            <div
              className="mt-5"
              style={{ height: "3px", width: "60px", background: "#c9a84c" }}
            />
          </div>
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase group transition-all self-start md:self-auto"
            style={{ color: "#8B2635", fontFamily: "sans-serif" }}
          >
            View Full Gallery
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-all"
              style={{
                fontFamily: "sans-serif",
                background: active === cat ? "#1e3a5f" : "transparent",
                color: active === cat ? "white" : "#888",
                border: `1px solid ${active === cat ? "#1e3a5f" : "#e8e2d9"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`relative group cursor-pointer overflow-hidden ${item.span}`}
                style={{ height: "220px" }}
                onClick={() => setLightbox(item)}
              >
                {/* Background tile (replace with <img> when you have real images) */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: item.bg }}
                >
                  <span
                    className="text-white/10 select-none"
                    style={{ fontSize: "6rem" }}
                  >
                    {item.symbol}
                  </span>
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    background: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <ZoomIn
                    size={28}
                    style={{ color: "#c9a84c" }}
                    className="mb-2"
                  />
                  <p
                    className="text-white text-sm font-bold text-center px-4"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {item.label}
                  </p>
                </div>

                {/* Category badge */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ background: "rgba(201,168,76,0.9)" }}
                >
                  <p
                    className="text-xs font-bold tracking-widest uppercase text-center"
                    style={{ color: "#0a0a0a", fontFamily: "sans-serif" }}
                  >
                    {item.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              style={{ background: "rgba(0,0,0,0.92)" }}
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="w-full flex items-center justify-center"
                  style={{
                    height: "380px",
                    background: lightbox.bg,
                    position: "relative",
                  }}
                >
                  <span
                    className="text-white/10 select-none"
                    style={{ fontSize: "10rem" }}
                  >
                    {lightbox.symbol}
                  </span>
                  {/* Bottom label */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-6 py-4"
                    style={{
                      background: "rgba(0,0,0,0.6)",
                      borderTop: "2px solid #c9a84c",
                    }}
                  >
                    <p
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                    >
                      {lightbox.category}
                    </p>
                    <p
                      className="text-white font-bold"
                      style={{ fontSize: "1.1rem" }}
                    >
                      {lightbox.label}
                    </p>
                  </div>
                </div>

                {/* Close */}
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute -top-4 -right-4 w-10 h-10 flex items-center justify-center transition-all"
                  style={{ background: "#c9a84c", color: "#0a0a0a" }}
                >
                  <X size={18} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ParishGallery;
