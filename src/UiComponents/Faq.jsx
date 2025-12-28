import React, { useState, useRef, useEffect } from "react";

/* ------------------ PARISH FAQ DATA ------------------ */
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
    question: "What sacraments are offered at St. Faustina Parish?",
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
      "St. Faustina Parish is located in our local community and serves families throughout the area. The parish office is open on weekdays during regular business hours. Please visit the Contact page for directions and office times.",
  },
  {
    question: "How can I support the parish?",
    answer:
      "You may support the parish through weekly offerings, online donations, volunteering, or participating in parish events. Your generosity helps sustain our ministries and outreach efforts.",
  },
];

/* ------------------ FAQ ITEM COMPONENT ------------------ */
const FaqItem = ({ question, answer, isOpen, toggleItem }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 px-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition duration-150"
        onClick={toggleItem}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className="text-xl transition-transform duration-300">
          {isOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 12H4"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </span>
      </button>

      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-all duration-500 ease-in-out"
      >
        <div className="pb-4 px-4 text-gray-600">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

/* ------------------ MAIN FAQ SECTION ------------------ */
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-12 font-inter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-[#1e3a5f] mb-8">
          Frequently Asked Questions
        </h2>

        <div className="bg-gray-50 rounded-lg shadow-lg divide-y divide-gray-200">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={index === openIndex}
              toggleItem={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
