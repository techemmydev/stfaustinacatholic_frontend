import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  Calendar,
  BookOpen,
  Heart,
  Users,
  Phone,
  ArrowRight,
} from "lucide-react";

const links = [
  {
    icon: Calendar,
    title: "Mass Schedule",
    desc: "View all weekly and daily Mass times at Sts. Peter & Paul Parish.",
    href: "/mass-schedule",
    color: "#1e3a5f",
  },
  {
    icon: BookOpen,
    title: "Sacraments",
    desc: "Learn about Baptism, Confession, Marriage, and all seven sacraments.",
    href: "/sacraments",
    color: "#8B2635",
  },
  {
    icon: Heart,
    title: "Ministries",
    desc: "Discover how you can serve God and neighbour through our parish ministries.",
    href: "/ministries",
    color: "#1e3a5f",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Join a welcoming family of over 500 registered parish families.",
    href: "/about",
    color: "#8B2635",
  },
  {
    icon: Phone,
    title: "Contact Us",
    desc: "Reach out to the parish office — we are always happy to help.",
    href: "/contact",
    color: "#1e3a5f",
  },
  {
    icon: ArrowRight,
    title: "Book Appointment",
    desc: "Speak with one of our priests about sacraments, counselling, or faith.",
    href: "/book-appointment",
    color: "#8B2635",
  },
];

const ParishQuickLinks = () => {
  return (
    <section
      className="py-24"
      style={{
        background: "#faf8f5",
        fontFamily: "'Georgia','Times New Roman',serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            Everything You Need
          </p>
          <h2 className="text-4xl font-bold mb-5" style={{ color: "#1e3a5f" }}>
            How Can We <span style={{ color: "#8B2635" }}>Help You?</span>
          </h2>
          <div
            style={{
              height: "3px",
              width: "60px",
              background: "#c9a84c",
              margin: "0 auto",
            }}
          />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {links.map(({ icon: Icon, title, desc, href, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to={href}
                className="group flex flex-col h-full p-7 transition-all"
                style={{
                  background: "white",
                  border: "1px solid #e8e2d9",
                  borderTop: `4px solid ${color}`,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(0,0,0,0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 12px rgba(0,0,0,0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 flex items-center justify-center mb-5"
                  style={{ background: `${color}12` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>

                {/* Text */}
                <h3
                  className="font-bold mb-2"
                  style={{ color: "#1e3a5f", fontSize: "1.05rem" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed flex-1 mb-5"
                  style={{
                    color: "#888",
                    fontFamily: "sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {desc}
                </p>

                {/* Arrow link */}
                <span
                  className="inline-flex items-center gap-1 text-xs font-bold tracking-widest uppercase group-hover:gap-2 transition-all"
                  style={{ color, fontFamily: "sans-serif" }}
                >
                  Learn More <ArrowRight size={12} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom scripture */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 py-8 px-10 text-center"
          style={{ background: "#1e3a5f", borderLeft: "4px solid #c9a84c" }}
        >
          <p
            className="text-base italic mb-3"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            "Come to me, all you who are weary and burdened, and I will give you
            rest."
          </p>
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            — Matthew 11:28
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ParishQuickLinks;
