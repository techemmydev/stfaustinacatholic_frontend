import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { fetchTestimonials } from "../Redux/slice/testimonialSlice";

import "swiper/css";
import "swiper/css/pagination";

// Helper: get initials — untouched backend logic
const getInitials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const accentColors = ["#8B2635", "#1e3a5f", "#8B2635", "#1e3a5f"];

const Testimonial = () => {
  const dispatch = useDispatch();
  const { testimonials, loading } = useSelector((state) => state.testimonial);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const fallbackTestimonials = [
    {
      name: "Chioma Adekunle",
      role: "Parishioner",
      message:
        "Sts. Peter & Paul Parish has truly become a spiritual home for my family. Through prayer, the sacraments, and fellowship, our faith continues to grow.",
    },
    {
      name: "Fr. Michael Olatunji",
      role: "Parish Priest",
      message:
        "Our parish community reflects the mercy and love of Christ. Together, we journey in faith, service, and devotion to the Apostles Peter and Paul.",
    },
    {
      name: "Aisha Okonkwo",
      role: "Youth Ministry Member",
      message:
        "Being part of the youth ministry has helped me grow spiritually and connect with others who share the same love for Christ and the Church.",
    },
    {
      name: "Ibrahim Abdullahi",
      role: "Church Volunteer",
      message:
        "Serving at Sts. Peter & Paul Parish has strengthened my faith and allowed me to live out the Gospel through service to others.",
    },
  ];

  const displayTestimonials =
    testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: "#0f2240",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Decorative watermark */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] hidden lg:block"
        style={{ fontSize: "28rem", lineHeight: 1, color: "white" }}
      >
        ✟
      </div>

      {/* Gold top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background:
            "linear-gradient(to right, transparent, #c9a84c, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4 text-center"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            Parishioner Stories
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-center"
            style={{ color: "white", lineHeight: 1.1 }}
          >
            Voices From Our
            <br />
            <span style={{ color: "#c9a84c" }}>Parish Community</span>
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "rgba(201,168,76,0.4)",
              }}
            />
            <span style={{ color: "#c9a84c", fontSize: "1.2rem" }}>✟</span>
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "rgba(201,168,76,0.4)",
              }}
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div
              className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: "#c9a84c", borderTopColor: "transparent" }}
            />
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-white/30 !w-2 !h-2",
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-[#c9a84c] !w-6 !rounded-sm",
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-14"
          >
            {displayTestimonials.map((item, index) => (
              <SwiperSlide key={item._id || index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex flex-col h-full"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                    minHeight: "280px",
                  }}
                >
                  {/* Colored top accent */}
                  <div
                    style={{
                      height: "3px",
                      background: accentColors[index % accentColors.length],
                    }}
                  />

                  <div className="p-7 flex flex-col gap-5 flex-1">
                    {/* Large quote mark */}
                    <div
                      style={{
                        fontSize: "4rem",
                        lineHeight: 0.8,
                        color: "#c9a84c",
                        opacity: 0.4,
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      "
                    </div>

                    {/* Message */}
                    <p
                      className="text-sm leading-relaxed flex-1 italic"
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      {item.message}
                    </p>

                    {/* Divider */}
                    <div
                      style={{
                        height: "1px",
                        background: "rgba(255,255,255,0.08)",
                      }}
                    />

                    {/* Author row */}
                    <div className="flex items-center gap-4">
                      <div
                        className="w-11 h-11 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{
                          background: accentColors[index % accentColors.length],
                          clipPath:
                            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                        }}
                      >
                        {getInitials(item.name)}
                      </div>
                      <div>
                        <h3
                          className="font-bold text-sm"
                          style={{ color: "white", letterSpacing: "0.02em" }}
                        >
                          {item.name}
                        </h3>
                        <p
                          className="text-xs tracking-widest uppercase mt-0.5"
                          style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                        >
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 grid grid-cols-3 gap-px"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {[
            { number: "500+", label: "Registered Families" },
            { number: "20+", label: "Active Ministries" },
            { number: "50+", label: "Years of Faith" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center py-6 px-4"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p
                className="text-3xl font-bold mb-1"
                style={{ color: "#c9a84c" }}
              >
                {stat.number}
              </p>
              <p
                className="text-xs tracking-widest uppercase"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "sans-serif",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
