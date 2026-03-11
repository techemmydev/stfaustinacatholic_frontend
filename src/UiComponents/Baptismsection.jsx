// sacraments/BaptismSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Droplets, ArrowRight, CheckCircle, Calendar } from "lucide-react";

const BaptismSection = () => (
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
      {/* Header */}
      <div className="flex items-start gap-5 mb-6">
        <div
          className="w-14 h-14 flex items-center justify-center flex-shrink-0"
          style={{ background: "#1e3a5f12" }}
        >
          <Droplets size={26} style={{ color: "#1e3a5f" }} />
        </div>
        <div>
          <p
            className="text-xs tracking-[0.25em] uppercase mb-1"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            First Sacrament of Initiation
          </p>
          <h3 className="text-2xl font-bold" style={{ color: "#1e3a5f" }}>
            Baptism
          </h3>
        </div>
      </div>

      <div
        style={{ height: "1px", background: "#f0ece4", marginBottom: "24px" }}
      />

      {/* Two columns */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "#555", fontFamily: "sans-serif", fontWeight: 300 }}
          >
            Baptism is the first sacrament of initiation into the Catholic
            Church. Through the waters of Baptism, original sin is washed away,
            we become children of God, and are welcomed into the family of the
            Church. It is the foundation of the entire Christian life.
          </p>
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "#777", fontFamily: "sans-serif", fontWeight: 300 }}
          >
            The water symbolises death to sin and resurrection to new life in
            Christ. Parents and godparents solemnly promise to raise the child
            in the faith, teaching them to keep God's commandments.
          </p>

          {/* Scripture */}
          <div
            className="p-4 mb-6"
            style={{
              background: "#faf8f5",
              borderLeft: "3px solid #1e3a5f",
            }}
          >
            <p className="text-sm italic mb-1" style={{ color: "#555" }}>
              "Go and make disciples of all nations, baptising them in the name
              of the Father and of the Son and of the Holy Spirit."
            </p>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              — Matthew 28:19
            </p>
          </div>

          {/* Schedule */}
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
              Baptisms are typically celebrated on the 2nd and 4th Sunday of
              each month at 1:00 PM. Private family Baptisms may be arranged by
              appointment.
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
            "Parents must be registered parishioners of Sts. Peter & Paul Parish",
            "Attend a Baptismal preparation class (offered monthly on the first Saturday)",
            "Choose godparents who are practising, confirmed Catholics in good standing",
            "Provide baptismal certificates of both godparents",
            "Adults seeking Baptism should contact the RCIA programme",
            "Schedule at least one month in advance by contacting the parish office",
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
              to="/sacraments/baptism"
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

export default BaptismSection;
