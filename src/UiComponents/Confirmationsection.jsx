// sacraments/ConfirmationSection.jsx
import React from "react";
import { Link } from "react-router";
import { Users, ArrowRight, CheckCircle, Calendar } from "lucide-react";

const ConfirmationSection = () => (
  <div
    style={{
      background: "white",
      border: "1px solid #e8e2d9",
      borderTop: "4px solid #1e3a5f",
      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      fontFamily: "'Georgia','Times New Roman',serif",
    }}
  >
    <div className="p-8 md:p-10">
      <div className="flex items-start gap-5 mb-6">
        <div
          className="w-14 h-14 flex items-center justify-center flex-shrink-0"
          style={{ background: "#1e3a5f12" }}
        >
          <Users size={26} style={{ color: "#1e3a5f" }} />
        </div>
        <div>
          <p
            className="text-xs tracking-[0.25em] uppercase mb-1"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            Third Sacrament of Initiation
          </p>
          <h3 className="text-2xl font-bold" style={{ color: "#1e3a5f" }}>
            Confirmation
          </h3>
        </div>
      </div>
      <div
        style={{ height: "1px", background: "#f0ece4", marginBottom: "24px" }}
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "#555", fontFamily: "sans-serif", fontWeight: 300 }}
          >
            Confirmation completes and deepens the grace of Baptism. Through the
            anointing with sacred Chrism and the laying on of hands, the
            candidate receives the fullness of the Holy Spirit and is
            strengthened to live as a mature, committed witness to Jesus Christ.
          </p>
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "#777", fontFamily: "sans-serif", fontWeight: 300 }}
          >
            The seven gifts of the Holy Spirit — wisdom, understanding, counsel,
            fortitude, knowledge, piety, and fear of the Lord — are imparted to
            confirm and seal the candidate as a soldier of Christ.
          </p>
          <div
            className="p-4 mb-6"
            style={{ background: "#faf8f5", borderLeft: "3px solid #1e3a5f" }}
          >
            <p className="text-sm italic mb-1" style={{ color: "#555" }}>
              "You will receive power when the Holy Spirit comes upon you, and
              you will be my witnesses... to the ends of the earth."
            </p>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              — Acts 1:8
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Calendar
              size={15}
              style={{ color: "#c9a84c", flexShrink: 0, marginTop: "2px" }}
            />
            <p
              className="text-xs leading-relaxed"
              style={{ color: "#888", fontFamily: "sans-serif" }}
            >
              <span className="font-semibold" style={{ color: "#1e3a5f" }}>
                Schedule:{" "}
              </span>
              Celebrated in spring when the bishop visits the parish. A two-year
              preparation programme begins in the autumn for high school
              students.
            </p>
          </div>
        </div>
        <div>
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#888", fontFamily: "sans-serif" }}
          >
            Requirements & Preparation
          </p>
          {[
            "Typically received by high school-aged youth (Year 10–12)",
            "Completion of a two-year Confirmation preparation programme",
            "Choose a confirmed Catholic sponsor who is a practising Catholic aged 16+",
            "30 hours of community service over the preparation period",
            "Attendance at a mandatory Confirmation retreat",
            "Personal interview with a priest or deacon prior to Confirmation",
            "Must be baptised and have received First Communion",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 mb-3">
              <CheckCircle
                size={14}
                style={{ color: "#c9a84c", flexShrink: 0, marginTop: "2px" }}
              />
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#666", fontFamily: "sans-serif" }}
              >
                {item}
              </p>
            </div>
          ))}
          <div className="mt-6 pt-5" style={{ borderTop: "1px solid #f0ece4" }}>
            <Link
              to="/sacraments/confirmation"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase group"
              style={{ color: "#1e3a5f", fontFamily: "sans-serif" }}
            >
              Full Details & Registration
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ConfirmationSection;
