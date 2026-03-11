// SermonsPage.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Play,
  Volume2,
  Download,
  Calendar,
  Search,
  ArrowRight,
  Mic,
} from "lucide-react";
import { motion } from "framer-motion";
import { fetchSermons, fetchPhotos } from "../Redux/slice/Sermonslice";

export function SermonsPage() {
  const dispatch = useDispatch();
  const { sermons, photos, publicLoading } = useSelector(
    (state) => state.sermon,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    dispatch(fetchSermons());
    dispatch(fetchPhotos());
  }, [dispatch]);

  const filteredSermons = sermons.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || s.type === filterType;
    return matchesSearch && matchesType;
  });

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
          style={{ fontSize: "22rem", lineHeight: 1, top: "-1rem" }}
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
              Faith Formation
            </p>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-4"
              style={{ lineHeight: 1.05 }}
            >
              Sermons
              <br />
              <span style={{ color: "#c9a84c" }}>&amp; Media</span>
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
              Watch and listen to homilies, teachings, and spiritual reflections
              from Sts. Peter &amp; Paul Parish.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SEARCH & FILTER — sticky ── */}
      <div
        className="sticky top-16 z-40"
        style={{
          background: "white",
          borderBottom: "1px solid #e8e2d9",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div
              className="flex-1 flex items-center gap-3 px-4 py-3 w-full"
              style={{ border: "1px solid #e8e2d9", background: "#faf8f5" }}
            >
              <Search size={14} style={{ color: "#c9a84c", flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search sermons, speakers, scripture…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm"
                style={{ color: "#333", fontFamily: "sans-serif" }}
              />
            </div>
            {/* Filters */}
            <div className="flex gap-1">
              {["all", "video", "audio"].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className="px-5 py-3 text-xs font-bold tracking-widest uppercase transition-all"
                  style={{
                    background: filterType === t ? "#1e3a5f" : "transparent",
                    color: filterType === t ? "white" : "#888",
                    border: "1px solid",
                    borderColor: filterType === t ? "#1e3a5f" : "#e8e2d9",
                    fontFamily: "sans-serif",
                  }}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SERMONS GRID ── */}
      <section className="py-20" style={{ background: "#faf8f5" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                From the Pulpit
              </p>
              <h2 className="text-3xl font-bold" style={{ color: "#1e3a5f" }}>
                Recent Sermons
              </h2>
            </div>
            {!publicLoading && filteredSermons.length > 0 && (
              <p
                className="text-xs"
                style={{ color: "#aaa", fontFamily: "sans-serif" }}
              >
                {filteredSermons.length} result
                {filteredSermons.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {publicLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse"
                  style={{ background: "white", border: "1px solid #e8e2d9" }}
                >
                  <div style={{ height: "200px", background: "#f0ece4" }} />
                  <div className="p-6 flex flex-col gap-3">
                    <div
                      style={{
                        height: "10px",
                        background: "#f0ece4",
                        width: "40%",
                      }}
                    />
                    <div
                      style={{
                        height: "14px",
                        background: "#f0ece4",
                        width: "70%",
                      }}
                    />
                    <div
                      style={{
                        height: "10px",
                        background: "#f0ece4",
                        width: "30%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredSermons.length === 0 ? (
            <div
              className="text-center py-20"
              style={{ border: "1px solid #e8e2d9", background: "white" }}
            >
              <Mic
                size={40}
                style={{ color: "#e8e2d9", margin: "0 auto 12px" }}
              />
              <p
                className="text-sm mb-3"
                style={{ color: "#aaa", fontFamily: "sans-serif" }}
              >
                {searchTerm
                  ? "No sermons match your search."
                  : "No sermons available yet."}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSermons.map((sermon, i) => (
                <motion.div
                  key={sermon._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  style={{
                    background: "white",
                    border: "1px solid #e8e2d9",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    className="relative group overflow-hidden"
                    style={{ height: "200px" }}
                  >
                    {sermon.thumbnail ? (
                      <img
                        src={sermon.thumbnail}
                        alt={sermon.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #1e3a5f, #8B2635)",
                        }}
                      >
                        {sermon.type === "video" ? (
                          <Play
                            size={48}
                            style={{ color: "rgba(255,255,255,0.25)" }}
                          />
                        ) : (
                          <Volume2
                            size={48}
                            style={{ color: "rgba(255,255,255,0.25)" }}
                          />
                        )}
                      </div>
                    )}
                    {/* Hover play overlay */}
                    {sermon.mediaUrl && (
                      <a
                        href={sermon.mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "rgba(0,0,0,0.5)" }}
                      >
                        <div
                          className="w-14 h-14 flex items-center justify-center"
                          style={{ background: "#c9a84c" }}
                        >
                          {sermon.type === "video" ? (
                            <Play size={22} style={{ color: "#0a0a0a" }} />
                          ) : (
                            <Volume2 size={22} style={{ color: "#0a0a0a" }} />
                          )}
                        </div>
                      </a>
                    )}
                    {/* Type + duration badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span
                        className="px-2 py-1 text-xs font-semibold uppercase capitalize"
                        style={{
                          background: "#1e3a5f",
                          color: "white",
                          fontFamily: "sans-serif",
                        }}
                      >
                        {sermon.type}
                      </span>
                    </div>
                    {sermon.duration && (
                      <span
                        className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold"
                        style={{
                          background: "rgba(0,0,0,0.6)",
                          color: "#c9a84c",
                          fontFamily: "monospace",
                        }}
                      >
                        {sermon.duration}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={11} style={{ color: "#c9a84c" }} />
                      <span
                        className="text-xs"
                        style={{ color: "#aaa", fontFamily: "sans-serif" }}
                      >
                        {formatDate(sermon.date)}
                      </span>
                    </div>

                    <h3
                      className="font-bold mb-1"
                      style={{
                        color: "#1e3a5f",
                        fontSize: "1rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {sermon.title}
                    </h3>
                    <p
                      className="text-xs font-semibold mb-3"
                      style={{ color: "#8B2635", fontFamily: "sans-serif" }}
                    >
                      {sermon.speaker}
                    </p>
                    <p
                      className="text-sm leading-relaxed mb-4 line-clamp-2"
                      style={{
                        color: "#777",
                        fontFamily: "sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {sermon.description}
                    </p>

                    <div
                      className="flex items-center justify-between pt-4"
                      style={{ borderTop: "1px solid #f0ece4" }}
                    >
                      <span
                        className="text-xs italic"
                        style={{ color: "#aaa", fontFamily: "sans-serif" }}
                      >
                        {sermon.scripture}
                      </span>
                      {sermon.mediaUrl && (
                        <a
                          href={sermon.mediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 flex items-center justify-center transition-all"
                          style={{ background: "#faf8f5", color: "#888" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#c9a84c";
                            e.currentTarget.style.color = "#0a0a0a";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#faf8f5";
                            e.currentTarget.style.color = "#888";
                          }}
                          title="Open media"
                        >
                          <Download size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section className="py-20" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-12">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              Parish Life in Pictures
            </p>
            <h2 className="text-3xl font-bold" style={{ color: "#1e3a5f" }}>
              Photo Gallery
            </h2>
          </div>

          {photos.length === 0 && !publicLoading ? (
            <p
              className="text-center py-12 text-sm"
              style={{ color: "#aaa", fontFamily: "sans-serif" }}
            >
              No photos yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo, i) => (
                <motion.div
                  key={photo._id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative overflow-hidden"
                  style={{ height: "240px" }}
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
                    }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="font-bold text-white text-sm">
                        {photo.title}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                      >
                        {formatDate(photo.date)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SUBSCRIBE ── */}
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
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            Stay Connected
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Never Miss a Sermon
          </h2>
          <p
            className="text-base mb-10 max-w-xl mx-auto"
            style={{
              color: "rgba(255,255,255,0.65)",
              fontFamily: "sans-serif",
              fontWeight: 300,
            }}
          >
            Subscribe to our YouTube channel and podcast to receive every homily
            and teaching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all"
              style={{
                background: "#c9a84c",
                color: "#0a0a0a",
                fontFamily: "sans-serif",
                clipPath:
                  "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              }}
            >
              Subscribe on YouTube <ArrowRight size={13} />
            </button>
            <button
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
              Listen on Podcast <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
