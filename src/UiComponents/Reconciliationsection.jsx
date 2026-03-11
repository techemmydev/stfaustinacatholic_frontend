// sacraments/ReconciliationSection.jsx
import React from "react";
import { Link } from "react-router";
import { Heart, ArrowRight, CheckCircle, Calendar } from "lucide-react";

const ReconciliationSection = () => (
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
          <Heart size={26} style={{ color: "#8B2635" }} />
        </div>
        <div>
          <p
            className="text-xs tracking-[0.25em] uppercase mb-1"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            First Sacrament of Healing
          </p>
          <h3 className="text-2xl font-bold" style={{ color: "#1e3a5f" }}>
            Reconciliation (Confession)
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
            Through the Sacrament of Reconciliation, God extends his mercy and
            forgiveness to the penitent. Christ heals us, restores our
            relationship with God and with the Church, and gives us the grace to
            live a renewed Christian life. This sacrament can be received as
            often as needed.
          </p>
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "#777", fontFamily: "sans-serif", fontWeight: 300 }}
          >
            In the confessional, after the examination of conscience and an act
            of contrition, the priest — acting in the person of Christ —
            pronounces absolution, and sins are truly forgiven. The seal of
            confession is absolute and inviolable.
          </p>
          <div
            className="p-4 mb-6"
            style={{ background: "#faf8f5", borderLeft: "3px solid #8B2635" }}
          >
            <p className="text-sm italic mb-1" style={{ color: "#555" }}>
              "Whose sins you forgive are forgiven them, and whose sins you
              retain are retained."
            </p>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              — John 20:23
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
              Every Saturday 3:30–4:30 PM. Also available by appointment
              Monday–Friday. Communal Penance services held during Advent and
              Lent.
            </p>
          </div>
        </div>
        <div>
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#888", fontFamily: "sans-serif" }}
          >
            How to Receive the Sacrament
          </p>
          {[
            "Examination of conscience — prayerfully recall sins since last confession",
            "Approach the confessional during scheduled times or by appointment",
            "Greet the priest and make the Sign of the Cross",
            "State how long it has been since your last confession",
            "Confess your sins honestly and completely",
            "Listen to the priest's counsel and receive your penance",
            "Make a sincere Act of Contrition and receive absolution",
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
              to="/sacraments/confession"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase group"
              style={{ color: "#8B2635", fontFamily: "sans-serif" }}
            >
              Full Details & Schedule
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

export default ReconciliationSection;
