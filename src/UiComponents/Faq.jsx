import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ── FAQ DATA — updated to Sts. Peter & Paul ─────────────── */
const faqData = [
  {
    question: "What are the regular Mass schedules?",
    answer:
      "Our parish offers daily and weekend Masses. Sunday Masses are celebrated in the morning and evening, while weekday Masses are held each morning. Please visit the Mass Schedule page for the most up-to-date times, including Holy Days of Obligation.",
  },
  {
    question: "How can I register as a parishioner?",
    answer:
      "You are warmly welcome to join our parish family. Parish registration forms are available at the parish office and online. You may also register after Mass or contact the parish office for assistance.",
  },
  {
    question: "What sacraments are offered at Sts. Peter & Paul Parish?",
    answer:
      "We offer all seven sacraments of the Catholic Church, including Baptism, Eucharist (First Communion), Confirmation, Reconciliation, Marriage, Anointing of the Sick, and Holy Orders (through the Archdiocese).",
  },
  {
    question: "How do I enroll my child for Baptism or First Communion?",
    answer:
      "Parents may enroll their children by contacting the parish office or the Religious Education (CCD) coordinator. Preparation classes are required for both parents and children prior to receiving the sacraments.",
  },
  {
    question: "Do you offer Confession and Adoration?",
    answer:
      "Yes. Confessions are heard weekly and by appointment. Eucharistic Adoration is also available on scheduled days, offering a quiet time for prayer and reflection before the Blessed Sacrament.",
  },
  {
    question: "How can I request prayers or pastoral assistance?",
    answer:
      "You may submit prayer intentions through our website, call the parish office, or speak directly with one of our priests after Mass. Pastoral visits and spiritual support are available for those in need.",
  },
  {
    question: "Are there ministries or volunteer opportunities?",
    answer:
      "Absolutely. Our parish has many ministries including choir, lectors, altar servers, hospitality, youth ministry, outreach programs, and more. Parishioners are encouraged to share their gifts in service to the Church.",
  },
  {
    question: "Do you offer faith formation for adults and youth?",
    answer:
      "Yes. We provide ongoing faith formation through RCIA, Bible study groups, youth ministry programs, and adult catechesis sessions to help parishioners grow spiritually at every stage of life.",
  },
  {
    question: "Where is the parish located and what are office hours?",
    answer:
      "Sts. Peter & Paul Parish is located in our local community and serves families throughout the area. The parish office is open on weekdays during regular business hours. Please visit the Contact page for directions and office times.",
  },
  {
    question: "How can I support the parish?",
    answer:
      "You may support the parish through weekly offerings, online donations, volunteering, or participating in parish events. Your generosity helps sustain our ministries and outreach efforts.",
  },
];

/* ── FAQ ITEM ─────────────────────────────────────────────── */
const FaqItem = ({ question, answer, isOpen, toggleItem, index }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [isOpen]);

  return (
    <div
      style={{
        border: `1px solid ${isOpen ? "#c9a84c" : "#e8e2d9"}`,
        background: "white",
        transition: "border-color 0.3s",
        marginBottom: "8px",
      }}
    >
      <button
        className="flex justify-between items-center w-full px-6 py-5 text-left"
        onClick={toggleItem}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Number */}
          <span
            className="text-xs font-bold flex-shrink-0 w-6 text-right"
            style={{
              color: isOpen ? "#c9a84c" : "#ccc",
              fontFamily: "sans-serif",
              transition: "color 0.3s",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-sm font-bold"
            style={{
              color: isOpen ? "#1e3a5f" : "#333",
              fontFamily: "'Georgia', serif",
              transition: "color 0.3s",
            }}
          >
            {question}
          </span>
        </div>
        {/* Icon */}
        <div
          className="ml-4 w-7 h-7 flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: isOpen ? "#c9a84c" : "#f5f0e8",
            color: isOpen ? "#0a0a0a" : "#888",
          }}
        >
          <span className="text-lg leading-none font-light">
            {isOpen ? "−" : "+"}
          </span>
        </div>
      </button>

      {/* Answer */}
      <div
        ref={contentRef}
        style={{
          maxHeight: height,
          overflow: "hidden",
          transition: "max-height 0.45s ease-in-out",
        }}
      >
        <div
          className="px-6 pb-5"
          style={{ paddingLeft: "calc(24px + 24px + 16px)" }} // align with question text
        >
          <div
            style={{
              height: "1px",
              background: "#f0ece4",
              marginBottom: "16px",
            }}
          />
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#666", fontFamily: "sans-serif", fontWeight: 300 }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ── MAIN FAQ SECTION ─────────────────────────────────────── */
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-24"
      style={{
        background: "#faf8f5",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left: header */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              Need Help?
            </p>
            <h2
              className="text-4xl font-bold mb-5 leading-tight"
              style={{ color: "#1e3a5f", lineHeight: 1.1 }}
            >
              Frequently
              <br />
              Asked
              <br />
              <span style={{ color: "#8B2635" }}>Questions</span>
            </h2>
            <div
              style={{
                height: "3px",
                width: "60px",
                background: "#c9a84c",
                marginBottom: "24px",
              }}
            />
            <p
              className="text-sm leading-relaxed mb-8"
              style={{
                color: "#888",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              Can't find what you're looking for? Our parish office is always
              happy to help.
            </p>

            {/* Contact card */}
            <div
              className="p-6"
              style={{
                background: "#1e3a5f",
                borderLeft: "4px solid #c9a84c",
              }}
            >
              <p
                className="text-xs tracking-widest uppercase mb-2"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Still have questions?
              </p>
              <p
                className="text-sm italic mb-4"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Contact our parish office directly and we'll be happy to assist
                you.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase group"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Contact Us
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>

            {/* Scripture */}
            <div
              className="mt-5 p-5"
              style={{
                background: "white",
                border: "1px solid #e8e2d9",
                borderLeft: "4px solid #8B2635",
              }}
            >
              <p className="text-sm italic mb-2" style={{ color: "#555" }}>
                "Ask and it will be given to you; seek and you will find."
              </p>
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                — Matthew 7:7
              </p>
            </div>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {faqData.map((item, index) => (
              <FaqItem
                key={index}
                index={index}
                question={item.question}
                answer={item.answer}
                isOpen={index === openIndex}
                toggleItem={() => toggleItem(index)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
