import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { fetchTestimonials } from "../Redux/slice/testimonialSlice";

import "swiper/css";
import "swiper/css/pagination";

// Helper: get initials
const getInitials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const Testimonial = () => {
  const dispatch = useDispatch();
  const { testimonials, loading } = useSelector((state) => state.testimonial);

  // Fetch testimonials on mount
  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  // Fallback testimonials if backend is empty
  const fallbackTestimonials = [
    {
      name: "Chioma Adekunle",
      role: "Parishioner",
      message:
        "St. Faustina Parish has truly become a spiritual home for my family. Through prayer, the sacraments, and fellowship, our faith continues to grow.",
    },
    {
      name: "Fr. Michael Olatunji",
      role: "Parish Priest",
      message:
        "Our parish community reflects the mercy and love of Christ. Together, we journey in faith, service, and devotion to Divine Mercy.",
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
        "Serving at St. Faustina Parish has strengthened my faith and allowed me to live out the Gospel through service to others.",
    },
  ];

  const displayTestimonials =
    testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section className="py-20 bg-[#f9f7f4] font-inter">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-semibold text-center mb-12 text-[#1e3a5f]"
        >
          Voices From Our Parish Community
        </motion.h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading testimonials...</p>
        ) : (
          /* Slider */
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {displayTestimonials.map((item, index) => (
              <SwiperSlide key={item._id || index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col gap-4 min-h-[240px]"
                >
                  {/* Initials Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#8B2635] flex items-center justify-center text-white font-bold text-lg">
                      {getInitials(item.name)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#1e3a5f]">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#8B2635]">{item.role}</p>
                    </div>
                  </div>

                  {/* Testimony */}
                  <p className="text-gray-700 text-sm leading-relaxed italic">
                    "{item.message}"
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
