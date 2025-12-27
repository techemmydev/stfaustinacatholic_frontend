import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Church, Users, HeartHandshake, CalendarCheck } from "lucide-react";

const stats = [
  {
    id: 1,
    name: "Years of Faith & Service",
    value: 75,
    icon: Church,
    suffix: "+",
    color: "from-[#8B2635] to-[#6d1d2a]",
    bgColor: "bg-red-50",
  },
  {
    id: 2,
    name: "Active Parishioners",
    value: 1200,
    icon: Users,
    suffix: "+",
    color: "from-[#1e3a5f] to-[#2b4d7a]",
    bgColor: "bg-blue-50",
  },
  {
    id: 3,
    name: "Parish Ministries",
    value: 18,
    icon: HeartHandshake,
    suffix: "",
    color: "from-[#d4af37] to-[#b8962e]",
    bgColor: "bg-yellow-50",
  },
  {
    id: 4,
    name: " Liturgical Celebrations",
    value: 250,
    icon: CalendarCheck,
    suffix: "+",
    color: "from-emerald-600 to-green-600",
    bgColor: "bg-green-50",
  },
];

export default function Stats() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 sm:py-24 lg:py-20 overflow-hidden font-inter">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-100/50 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-100/50 to-transparent rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-2 bg-[#f9f7f4] text-[#8B2635] rounded-full text-sm font-semibold mb-4"
          >
            Our Parish in Numbers
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a5f] mb-4"
          >
            A Living Community of Faith
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Serving God and His people through worship, fellowship, and acts of
            mercy rooted in the message of Divine Mercy.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.1,
            });

            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.id}
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="relative flex flex-col items-center gap-4 p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                  {/* Hover Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`relative flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor}`}
                  >
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-10`}
                    />
                    <Icon className="w-8 h-8 text-[#1e3a5f] relative z-10" />
                  </motion.div>

                  {/* Count */}
                  <div className="text-center">
                    <dd className="text-4xl sm:text-5xl font-extrabold text-[#1e3a5f]">
                      {inView ? (
                        <CountUp
                          end={stat.value}
                          duration={2.5}
                          suffix={stat.suffix}
                        />
                      ) : (
                        `0${stat.suffix}`
                      )}
                    </dd>
                    <dt className="mt-2 text-base font-semibold text-gray-600">
                      {stat.name}
                    </dt>
                  </div>

                  {/* Bottom Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} origin-left`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">
            Become part of our parish family and journey with us in faith
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-[#8B2635] text-white font-semibold rounded-xl shadow-lg hover:bg-[#6d1d2a] transition"
          >
            Join Our Parish →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
