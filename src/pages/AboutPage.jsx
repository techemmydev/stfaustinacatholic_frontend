import { useState, useEffect } from "react";
import { Mail, Phone, Users } from "lucide-react";
import { motion } from "framer-motion";
import AboutusMedia from "@/UiComponents/AboutusMedia";
import CommunityStories from "@/UiComponents/CommunityStories";
import InvitationModal from "@/UiComponents/InvitationModal";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { fetchPriests } from "../Redux/slice/priestSlice";
import FaqSection from "@/UiComponents/Faq";

// ── helpers ──────────────────────────────────────────────
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

// ── data ─────────────────────────────────────────────────
const ministries = [
  {
    name: "Youth Ministry",
    description: "Faith formation for teens and young adults",
  },
  {
    name: "Music Ministry",
    description: "Choir, cantors, and musicians for liturgy",
  },
  {
    name: "St. Vincent de Paul Society",
    description: "Charitable outreach to those in need",
  },
  {
    name: "Religious Education",
    description: "Faith formation for children and adults",
  },
  {
    name: "Liturgical Ministers",
    description: "Lectors, Eucharistic ministers, and altar servers",
  },
  {
    name: "Knights of Columbus",
    description: "Catholic men's service organization",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
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
    <section className="py-20 bg-[#f9f7f4]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#8B2635]/10 rounded-full mb-4">
            <Users className="w-7 h-7 text-[#8B2635]" />
          </div>
          <h2
            className="text-3xl md:text-4xl text-[#1e3a5f] mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Our Priests
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto rounded-full mb-4" />
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Meet the dedicated shepherds of our parish community
          </p>
        </div>

        {/* Loading skeleton */}
        {publicLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="bg-gradient-to-br from-[#1e3a5f]/10 to-[#8B2635]/10 p-8 flex flex-col items-center">
                  <div className="w-28 h-28 rounded-full bg-gray-200 mb-4" />
                  <div className="h-5 w-36 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-12 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : priests.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No priests to display at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {priests.map((priest) => (
              <div
                key={priest._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() =>
                  setSelected(selected?._id === priest._id ? null : priest)
                }
              >
                {/* Top banner */}
                <div className="bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] p-8 flex flex-col items-center relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-4 border-white/10" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border-4 border-white/10" />

                  {priest.photo ? (
                    <img
                      src={priest.photo}
                      alt={priest.name}
                      className="w-28 h-28 rounded-full object-cover border-4 border-white/30 mb-4 relative z-10"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-white/15 border-4 border-white/30 flex items-center justify-center mb-4 relative z-10">
                      <span
                        className="text-white text-4xl"
                        style={{ fontFamily: "Playfair Display, serif" }}
                      >
                        {getInitials(priest.name)}
                      </span>
                    </div>
                  )}

                  <h3
                    className="text-white text-xl text-center mb-2 relative z-10"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {priest.name}
                  </h3>
                  <Badge
                    className={`${statusColor(priest.status)} relative z-10`}
                  >
                    {priest.status}
                  </Badge>
                </div>

                {/* Info */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <a
                      href={`mailto:${priest.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center text-sm text-gray-600 hover:text-[#8B2635] transition-colors"
                    >
                      <Mail className="w-4 h-4 mr-2 text-[#8B2635] flex-shrink-0" />
                      <span className="truncate">{priest.email}</span>
                    </a>
                    {priest.phone && (
                      <a
                        href={`tel:${priest.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center text-sm text-gray-600 hover:text-[#8B2635] transition-colors"
                      >
                        <Phone className="w-4 h-4 mr-2 text-[#8B2635] flex-shrink-0" />
                        {priest.phone}
                      </a>
                    )}
                  </div>

                  {priest.bio && (
                    <p
                      className={`text-sm text-gray-500 leading-relaxed transition-all duration-300 ${
                        selected?._id === priest._id ? "" : "line-clamp-2"
                      }`}
                    >
                      {priest.bio}
                    </p>
                  )}

                  {priest.specializations?.length > 0 && (
                    <div className="pt-3 border-t">
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                        Specializations
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {priest.specializations.map((spec, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-xs border-[#8B2635]/30 text-[#8B2635]"
                          >
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-[#8B2635] text-right">
                    {selected?._id === priest._id
                      ? "Click to collapse ↑"
                      : "Click for more ↓"}
                  </p>
                </div>
              </div>
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
      <div className="font-inter">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-96 flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
          <img
            src="https://images.unsplash.com/photo-1760319726429-fcda77d3cb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Church Community"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="mb-4 text-4xl font-bold">About Our Parish</h1>
            <p className="text-xl text-gray-200">
              Learn about our history, clergy, and vibrant community
            </p>
          </div>
        </motion.section>

        {/* Priests Section */}
        <PriestsSection />

        <CommunityStories />
        <AboutusMedia />

        {/* Ministries Section */}
        <section className="py-16 max-w-7xl mx-auto px-4">
          <h2 className="text-center mb-6 text-blue-900 text-3xl font-semibold">
            Parish Ministries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.map((ministry, index) => (
              <motion.div
                key={ministry.name}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-800 cursor-pointer hover:translate-y-[-6px] hover:shadow-lg transition-all duration-300"
              >
                <h3 className="mb-2 text-blue-900 text-lg font-semibold">
                  {ministry.name}
                </h3>
                <p className="text-gray-600">{ministry.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <InvitationModal />
      <FaqSection />
    </>
  );
}
