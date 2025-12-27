import { useState, useEffect } from "react";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import AboutusMedia from "@/UiComponents/AboutusMedia";
import CommunityStories from "@/UiComponents/CommunityStories";
import InvitationModal from "@/UiComponents/InvitationModal";

const priests = [
  {
    id: 1,
    name: "Fr. Thomas O'Connor",
    title: "Pastor",
    image:
      "https://images.unsplash.com/photo-1618381752078-11798ce81835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    bio: "Father Thomas has served St. Michael's Parish since 2018. He is passionate about youth ministry, spiritual formation, and building community through faith.",
    email: "fr.thomas@stmichaels.org",
    phone: "(217) 555-1234",
  },
  {
    id: 2,
    name: "Fr. Michael Rodriguez",
    title: "Associate Pastor",
    image:
      "https://images.unsplash.com/photo-1618381752078-11798ce81835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    bio: "Father Michael joined our parish in 2020. He oversees sacramental preparation and is dedicated to helping families grow in their faith journey.",
    email: "fr.michael@stmichaels.org",
    phone: "(217) 555-1235",
  },
  {
    id: 3,
    name: "Deacon James Wilson",
    title: "Permanent Deacon",
    image:
      "https://images.unsplash.com/photo-1618381752078-11798ce81835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    bio: "Deacon James has been serving the community for over 15 years. He leads charitable outreach programs and assists with weddings and baptisms.",
    email: "deacon.james@stmichaels.org",
    phone: "(217) 555-1236",
  },
];

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
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10 " />
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

        {/* Clergy Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center mb-12 text-blue-900 text-3xl font-semibold">
              Meet Our Clergy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {priests.map((priest, index) => (
                <motion.div
                  key={priest.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:translate-y-[-8px] hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={priest.image}
                    alt={priest.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="mb-1 text-blue-900 text-xl font-semibold">
                      {priest.name}
                    </h3>
                    <p className="text-red-800 mb-4 font-medium">
                      {priest.title}
                    </p>
                    <p className="text-gray-600 mb-4">{priest.bio}</p>
                    <div className="space-y-2">
                      <a
                        href={`mailto:${priest.email}`}
                        className="flex items-center gap-2 text-blue-900 hover:text-red-800 transition-colors duration-300"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{priest.email}</span>
                      </a>
                      <a
                        href={`tel:${priest.phone}`}
                        className="flex items-center gap-2 text-blue-900 hover:text-red-800 transition-colors duration-300"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{priest.phone}</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
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
    </>
  );
}
