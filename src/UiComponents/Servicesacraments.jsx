// sacraments/MatrimonySection.jsx
import React from "react";
import { Link } from "react-router";
import { BookHeart, ArrowRight, CheckCircle, Calendar } from "lucide-react";

export const MatrimonySection = () => (
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
          <BookHeart size={26} style={{ color: "#1e3a5f" }} />
        </div>
        <div>
          <p
            className="text-xs tracking-[0.25em] uppercase mb-1"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            First Sacrament of Service
          </p>
          <h3 className="text-2xl font-bold" style={{ color: "#1e3a5f" }}>
            Holy Matrimony
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
            Holy Matrimony is the sacrament by which a baptised man and woman
            establish a lifelong, exclusive covenant of love and fidelity, open
            to the gift of children. In Catholic marriage, the spouses
            themselves are the ministers of the sacrament — they confer it upon
            each other before God and the Church.
          </p>
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "#777", fontFamily: "sans-serif", fontWeight: 300 }}
          >
            Marriage is both a natural institution and a supernatural sacrament.
            Spouses help each other grow in holiness and together reflect
            Christ's faithful, self-giving love for his Church.
          </p>
          <div
            className="p-4 mb-6"
            style={{ background: "#faf8f5", borderLeft: "3px solid #1e3a5f" }}
          >
            <p className="text-sm italic mb-1" style={{ color: "#555" }}>
              "What God has joined together, no human being must separate."
            </p>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              — Matthew 19:6
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
              Typically celebrated on Saturdays. Weddings are not celebrated
              during Lent. Contact the parish at least 6 months in advance.
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
            "Contact the parish office at least 6 months prior to the desired date",
            "At least one party must be a baptised Catholic",
            "Completion of Pre-Cana (marriage preparation) programme",
            "Provide baptismal, Confirmation, and First Communion certificates",
            "Freedom to marry — no prior civil or Church marriages",
            "FOCCUS or similar couple compatibility inventory",
            "Meet with the officiating priest at least twice prior to the wedding",
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
              to="/sacraments/wedding"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase group"
              style={{ color: "#1e3a5f", fontFamily: "sans-serif" }}
            >
              Full Details & Enquiry
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

// ─────────────────────────────────────────────────────────────

// sacraments/AnointingSection.jsx
import { HandHeart } from "lucide-react";

export const AnointingSection = () => (
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
          <HandHeart size={26} style={{ color: "#8B2635" }} />
        </div>
        <div>
          <p
            className="text-xs tracking-[0.25em] uppercase mb-1"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            Second Sacrament of Healing
          </p>
          <h3 className="text-2xl font-bold" style={{ color: "#1e3a5f" }}>
            Anointing of the Sick
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
            The Anointing of the Sick is the sacrament by which the Church
            entrusts to the suffering and glorified Lord those who are seriously
            ill — that he may relieve and save them. Through the anointing with
            blessed oil and the laying on of hands, Christ offers healing,
            strength, peace, and the forgiveness of sins.
          </p>
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "#777", fontFamily: "sans-serif", fontWeight: 300 }}
          >
            This sacrament is not reserved for those near death. It may be
            received by anyone facing serious illness, major surgery, or the
            frailty of old age. It may also be received more than once during
            the course of an illness.
          </p>
          <div
            className="p-4 mb-6"
            style={{ background: "#faf8f5", borderLeft: "3px solid #8B2635" }}
          >
            <p className="text-sm italic mb-1" style={{ color: "#555" }}>
              "Is anyone among you sick? Let him call for the elders of the
              Church, and let them pray over him, anointing him with oil in the
              name of the Lord."
            </p>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              — James 5:14
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
              Available at any time by contacting the parish office. Emergency
              pastoral calls are answered 24 hours a day. A communal Anointing
              Mass is celebrated twice yearly.
            </p>
          </div>
        </div>
        <div>
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#888", fontFamily: "sans-serif" }}
          >
            Who May Receive This Sacrament
          </p>
          {[
            "Anyone who is seriously or chronically ill, or facing major surgery",
            "The elderly who are weakened by frailty, even without a specific illness",
            "Children who are seriously ill and have reached the age of reason",
            "Those suffering from serious mental illness may also receive the sacrament",
            "May be received more than once during the same illness if the condition worsens",
            "Hospital and home visits can be arranged by contacting the parish office",
            "In an emergency, a priest can be called 24 hours a day",
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
              to="/sacraments/anointing"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase group"
              style={{ color: "#8B2635", fontFamily: "sans-serif" }}
            >
              Request Pastoral Visit
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

// ─────────────────────────────────────────────────────────────

// sacraments/HolyOrdersSection.jsx
import { Crown } from "lucide-react";

export const HolyOrdersSection = () => (
  <div
    style={{
      background: "white",
      border: "1px solid #e8e2d9",
      borderTop: "4px solid #2a5f3f",
      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      fontFamily: "'Georgia','Times New Roman',serif",
    }}
  >
    <div className="p-8 md:p-10">
      <div className="flex items-start gap-5 mb-6">
        <div
          className="w-14 h-14 flex items-center justify-center flex-shrink-0"
          style={{ background: "#2a5f3f12" }}
        >
          <Crown size={26} style={{ color: "#2a5f3f" }} />
        </div>
        <div>
          <p
            className="text-xs tracking-[0.25em] uppercase mb-1"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            Second Sacrament of Service
          </p>
          <h3 className="text-2xl font-bold" style={{ color: "#1e3a5f" }}>
            Holy Orders
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
            Holy Orders is the sacrament through which the mission entrusted by
            Christ to his Apostles continues to be exercised in the Church. It
            confers a sacred power for the service of the faithful and
            encompasses three degrees: the episcopate (bishops), the
            presbyterate (priests), and the diaconate (deacons).
          </p>
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "#777", fontFamily: "sans-serif", fontWeight: 300 }}
          >
            Ordinations take place at the Cathedral through the Archdiocese. If
            you feel called to the priesthood or diaconate, our parish is here
            to walk with you in discernment and to support your vocation
            journey.
          </p>
          <div
            className="p-4 mb-6"
            style={{ background: "#faf8f5", borderLeft: "3px solid #2a5f3f" }}
          >
            <p className="text-sm italic mb-1" style={{ color: "#555" }}>
              "You did not choose me, but I chose you and appointed you that you
              should go and bear fruit."
            </p>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
            >
              — John 15:16
            </p>
          </div>
        </div>
        <div>
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#888", fontFamily: "sans-serif" }}
          >
            Discernment & Vocation Support
          </p>
          {[
            "Speak with your pastor about your sense of calling",
            "Contact the Archdiocesan Vocations Office for guidance",
            "Priestly formation takes place in a seminary over several years",
            "The permanent diaconate is open to single and married men",
            "Our parish supports vocation through prayer, formation, and encouragement",
            "Annual Vocations Sunday celebrated each May in parishes worldwide",
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
              to="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase group"
              style={{ color: "#2a5f3f", fontFamily: "sans-serif" }}
            >
              Begin Discernment
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
