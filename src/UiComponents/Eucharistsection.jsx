// sacraments/EucharistSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Sparkles, ArrowRight, CheckCircle, Calendar } from "lucide-react";

const EucharistSection = () => (
  <div
    style={{
      background: "white",
      border: "1px solid #e8e2d9",
      borderTop: "4px solid #8B2635",
      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      fontFamily: "'Georgia','Times New Roman',serif",
    }}
  >
    <div className="p-8 md:p-10">
      <div className="flex items-start gap-5 mb-6">
        <div
          className="w-14 h-14 flex items-center justify-center flex-shrink-0"
          style={{ background: "#8B263512" }}
        >
          <Sparkles size={26} style={{ color: "#8B2635" }} />
        </div>
        <div>
          <p
            className="text-xs tracking-[0.25em] uppercase mb-1"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            Second Sacrament of Initiation
          </p>
          <h3 className="text-2xl font-bold" style={{ color: "#1e3a5f" }}>
            First Holy Communion
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
            The Eucharist is the source and summit of the Catholic faith. First
            Holy Communion is the moment when a child receives the Body and
            Blood of Jesus Christ for the first time — a profound encounter with
            the living God, typically celebrated around the age of 7 or 8.
          </p>
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "#777", fontFamily: "sans-serif", fontWeight: 300 }}
          >
            Through the Eucharist, we are united with Christ and with the whole
            Church. This sacrament nourishes our souls, strengthens us against
            sin, and draws us ever deeper into the life of the Trinity.
          </p>

          <div
            className="p-4 mb-6"
            style={{ background: "#faf8f5", borderLeft: "3px solid #8B2635" }}
          >
            <p className="text-sm italic mb-1" style={{ color: "#555" }}>
              "I am the bread of life; whoever comes to me shall not hunger, and
              whoever believes in me shall never thirst."
            </p>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              — John 6:35
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
              Celebrated at a special Sunday Mass in May each year. Registration
              and formation begin in September of the prior school year.
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
            "Typically received in second grade (age 7–8)",
            "Two years of Catholic religious education or Catholic school attendance required",
            "First Reconciliation (Confession) must be completed before First Communion",
            "Attendance at parent preparation meetings is mandatory",
            "White dress or suit traditionally worn — a symbol of baptismal purity",
            "Children must be baptised Catholics in good standing",
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
              to="/sacraments/first-communion"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase group"
              style={{ color: "#8B2635", fontFamily: "sans-serif" }}
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

export default EucharistSection;
