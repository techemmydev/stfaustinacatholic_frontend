// SacramentDetailPage.jsx
import React from "react";
import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import {
  Droplets,
  Sparkles,
  Users,
  Heart,
  BookHeart,
  HandHeart,
  Calendar,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Crown,
} from "lucide-react";

const sacramentDetails = {
  baptism: {
    name: "Baptism",
    tagline: "First Sacrament of Initiation",
    icon: Droplets,
    accent: "#1e3a5f",
    image:
      "https://images.unsplash.com/photo-1646063436480-80b8180877ca?auto=format&fit=crop&w=1080&q=80",
    description:
      "Baptism is the first and foundational sacrament of initiation into the Catholic Church. Through the waters of Baptism, original sin is washed away, we become children of God, heirs of heaven, and members of the Body of Christ. The Holy Spirit is given to us for the first time, and we are sealed as Christians forever.",
    theology:
      "The grace of Baptism incorporates us into the Church, makes us temples of the Holy Spirit, and configures us to Christ. Baptism is necessary for salvation for those who know this truth. The rite involves the pouring of water and the Trinitarian formula: 'I baptise you in the name of the Father and of the Son and of the Holy Spirit.'",
    scripture: {
      text: "Go and make disciples of all nations, baptising them in the name of the Father and of the Son and of the Holy Spirit.",
      ref: "Matthew 28:19",
    },
    preparation: [
      "Parents must be registered parishioners of Sts. Peter & Paul Parish",
      "Attend a Baptismal preparation class (offered monthly on the first Saturday)",
      "Choose godparents who are practising, confirmed Catholics in good standing",
      "Provide baptismal certificates of both godparents",
      "Adults seeking Baptism should contact the RCIA programme coordinator",
      "Schedule at least one month in advance through the parish office",
    ],
    schedule:
      "Baptisms are typically celebrated on the 2nd and 4th Sunday of each month at 1:00 PM. Private family Baptisms may be arranged on other days by appointment.",
  },
  "first-communion": {
    name: "First Holy Communion",
    tagline: "Second Sacrament of Initiation",
    icon: Sparkles,
    accent: "#8B2635",
    image:
      "https://images.unsplash.com/photo-1648086506504-c7cc0d67efda?auto=format&fit=crop&w=1080&q=80",
    description:
      "First Holy Communion is the moment when a baptised child receives the Body and Blood of Jesus Christ for the first time. The Eucharist is the source and summit of the Catholic faith — the living presence of Christ under the appearances of bread and wine.",
    theology:
      "At Mass, through the words of consecration spoken by the priest, the bread and wine truly become the Body and Blood of Christ — this is called transubstantiation. Reception of Holy Communion unites us intimately with Christ, forgives venial sins, and strengthens us against future sin. It is truly Christ himself we receive.",
    scripture: {
      text: "I am the bread of life; whoever comes to me shall not hunger, and whoever believes in me shall never thirst.",
      ref: "John 6:35",
    },
    preparation: [
      "Typically received in second grade (around age 7–8)",
      "Two years of Catholic religious education or Catholic school attendance required",
      "First Reconciliation (Confession) must be completed before First Communion",
      "Attendance at mandatory parent preparation meetings throughout the year",
      "White dress or suit traditionally worn as a symbol of baptismal purity",
      "Children must be baptised Catholics who regularly attend Sunday Mass",
    ],
    schedule:
      "Celebrated at a special Sunday Mass in May each year. Registration and faith formation begin in September of the prior academic year.",
  },
  confirmation: {
    name: "Confirmation",
    tagline: "Third Sacrament of Initiation",
    icon: Users,
    accent: "#1e3a5f",
    image:
      "https://images.unsplash.com/photo-1749199213094-048ae472fa03?auto=format&fit=crop&w=1080&q=80",
    description:
      "Confirmation completes and deepens the grace of Baptism, conferring the fullness of the Holy Spirit upon the candidate. Through the anointing with sacred Chrism and the laying on of hands by the bishop, the confirmed are strengthened to live as mature, committed witnesses to Jesus Christ in the world.",
    theology:
      "The seven gifts of the Holy Spirit — wisdom, understanding, counsel, fortitude, knowledge, piety, and fear of the Lord — are imparted at Confirmation. The candidate chooses a Confirmation name, usually that of a saint who will serve as a special patron and model of Christian life.",
    scripture: {
      text: "You will receive power when the Holy Spirit comes upon you, and you will be my witnesses... to the ends of the earth.",
      ref: "Acts 1:8",
    },
    preparation: [
      "Typically received by high school students (ages 15–17)",
      "Completion of a two-year Confirmation preparation programme",
      "Choose a confirmed, practising Catholic sponsor aged 16 or older",
      "Minimum of 30 hours of community service during the preparation period",
      "Attendance at a mandatory Confirmation retreat (overnight, held in February)",
      "Personal interview with the pastor or deacon prior to Confirmation",
      "Must be baptised and have received First Eucharist",
    ],
    schedule:
      "Celebrated in spring when the bishop visits the parish. Preparation begins each September.",
  },
  confession: {
    name: "Reconciliation",
    tagline: "First Sacrament of Healing",
    icon: Heart,
    accent: "#8B2635",
    image:
      "https://images.unsplash.com/photo-1749199213094-048ae472fa03?auto=format&fit=crop&w=1080&q=80",
    description:
      "Through the Sacrament of Reconciliation, God extends his boundless mercy and forgiveness to the penitent. Christ heals and restores our relationship with God and with the Church, and grants us the grace to live a renewed Christian life. This sacrament can — and should — be received regularly.",
    theology:
      "In the confessional, after the examination of conscience and an act of contrition, the priest — acting in the person of Christ — pronounces absolution, and sins are truly, completely, and immediately forgiven. The seal of confession is absolute, perpetual, and inviolable. The priest is forever forbidden to reveal anything heard in confession.",
    scripture: {
      text: "Whose sins you forgive are forgiven them, and whose sins you retain are retained.",
      ref: "John 20:23",
    },
    preparation: [
      "Prayerfully make an examination of conscience before approaching the sacrament",
      "Have genuine sorrow for sins and a firm purpose of amendment",
      "Approach the confessional during scheduled times or by appointment",
      "Confess all mortal sins in kind and number; venial sins are also encouraged",
      "Listen attentively to the priest's counsel and receive your penance",
      "Make a sincere Act of Contrition and receive absolution",
      "Complete your assigned penance as soon as possible after confession",
    ],
    schedule:
      "Every Saturday 3:30–4:30 PM. Also available by appointment Monday–Friday. Communal Penance services are held during Advent and Lent.",
  },
  wedding: {
    name: "Holy Matrimony",
    tagline: "First Sacrament of Service",
    icon: BookHeart,
    accent: "#1e3a5f",
    image:
      "https://images.unsplash.com/photo-1696238173596-554e92268051?auto=format&fit=crop&w=1080&q=80",
    description:
      "Holy Matrimony is the sacrament by which a baptised man and woman establish a lifelong, exclusive, and fruitful covenant of love before God and the Church. In Catholic marriage, the spouses themselves are the ministers of the sacrament — they confer it upon each other in the presence of a priest and the community.",
    theology:
      "The marriage covenant, by which a man and a woman establish a partnership of their whole life, is by its nature ordered toward the good of the spouses and the procreation and education of offspring. Marriage is both a natural institution and a supernatural sacrament, and it may not be dissolved except by death.",
    scripture: {
      text: "What God has joined together, no human being must separate.",
      ref: "Matthew 19:6",
    },
    preparation: [
      "Contact the parish office at least 6 months prior to the desired wedding date",
      "At least one party must be a baptised Catholic",
      "Completion of a Pre-Cana marriage preparation programme",
      "Provide baptismal, Confirmation, and First Communion certificates (obtained within 6 months)",
      "Declaration of freedom to marry — no previous Church or civil marriages",
      "Complete the FOCCUS or similar couple compatibility inventory",
      "Meet with the officiating priest at least twice during the preparation process",
    ],
    schedule:
      "Typically celebrated on Saturdays. Weddings are not celebrated during Lent. The church diary fills quickly — please contact us as early as possible.",
  },
  anointing: {
    name: "Anointing of the Sick",
    tagline: "Second Sacrament of Healing",
    icon: HandHeart,
    accent: "#8B2635",
    image:
      "https://images.unsplash.com/photo-1749199213094-048ae472fa03?auto=format&fit=crop&w=1080&q=80",
    description:
      "The Anointing of the Sick is the sacrament through which the Church entrusts to the suffering and glorified Lord those who are seriously ill — that he may relieve and save them. Through anointing with blessed oil and the laying on of hands, Christ offers healing, strength, peace, and the forgiveness of sins.",
    theology:
      "This sacrament is not reserved only for those at the point of death — it may be received by anyone facing serious illness, major surgery, or the frailty of old age, and it may be received more than once during the same illness. The effects of this sacrament include union with Christ's Passion, strength, peace, forgiveness of sins, and sometimes physical healing.",
    scripture: {
      text: "Is anyone among you sick? Let him call for the elders of the Church, and let them pray over him, anointing him with oil in the name of the Lord.",
      ref: "James 5:14",
    },
    preparation: [
      "For the seriously ill, elderly, or those facing major surgery",
      "May also be received by those with serious mental illness",
      "Contact the parish office at any time — emergency calls answered 24 hours",
      "Hospital, nursing home, and home visits can be arranged by the parish",
      "The sacrament may be received more than once during the same illness",
      "If possible, combine with the Sacrament of Reconciliation",
      "A communal Anointing Mass is celebrated twice yearly at the parish",
    ],
    schedule:
      "Available at any time by contacting the parish office. Emergency pastoral care is available 24 hours a day. Please do not hesitate to call.",
  },
};

export function SacramentDetailPage() {
  const { type } = useParams();
  const sacrament = type ? sacramentDetails[type] : null;

  if (!sacrament) {
    return (
      <div
        className="py-20 text-center"
        style={{ fontFamily: "'Georgia',serif" }}
      >
        <h2 className="mb-4" style={{ color: "#1e3a5f" }}>
          Sacrament Not Found
        </h2>
        <Link
          to="/sacraments"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase"
          style={{ color: "#8B2635", fontFamily: "sans-serif" }}
        >
          <ArrowLeft size={13} /> Return to Sacraments
        </Link>
      </div>
    );
  }

  const Icon = sacrament.icon;

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif" }}>
      {/* ── HERO ── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ height: "480px" }}
      >
        <div className="absolute inset-0">
          <img
            src={sacrament.image}
            alt={sacrament.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Icon size={22} style={{ color: "#c9a84c" }} />
              </div>
              <p
                className="text-xs tracking-[0.3em] uppercase"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                {sacrament.tagline}
              </p>
            </div>
            <h1
              className="text-5xl font-bold text-white mb-3"
              style={{ lineHeight: 1.05 }}
            >
              {sacrament.name}
            </h1>
            <div
              style={{ height: "3px", width: "60px", background: "#c9a84c" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <div style={{ background: "#1e3a5f" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-3 flex items-center gap-2">
          <Link
            to="/sacraments"
            className="text-xs tracking-widest uppercase hover:text-yellow-400 transition-colors"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "sans-serif" }}
          >
            Sacraments
          </Link>
          <span
            style={{
              color: "rgba(255,255,255,0.25)",
              fontFamily: "sans-serif",
            }}
          >
            /
          </span>
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            {sacrament.name}
          </span>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <section className="py-20" style={{ background: "#faf8f5" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: main content */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{
                  background: "white",
                  border: "1px solid #e8e2d9",
                  borderTop: `4px solid ${sacrament.accent}`,
                }}
              >
                <div className="p-8">
                  <p
                    className="text-xs tracking-[0.25em] uppercase mb-3"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    Overview
                  </p>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      color: "#555",
                      fontFamily: "sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    {sacrament.description}
                  </p>
                </div>
              </motion.div>

              {/* Theology */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.05 }}
                style={{ background: "white", border: "1px solid #e8e2d9" }}
              >
                <div className="p-8">
                  <p
                    className="text-xs tracking-[0.25em] uppercase mb-3"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    Theology & Meaning
                  </p>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      color: "#555",
                      fontFamily: "sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    {sacrament.theology}
                  </p>
                </div>
              </motion.div>

              {/* Scripture */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="p-8"
                style={{
                  background: "#1e3a5f",
                  borderLeft: "4px solid #c9a84c",
                }}
              >
                <p
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  Sacred Scripture
                </p>
                <p
                  className="text-lg italic mb-3"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  "{sacrament.scripture.text}"
                </p>
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  — {sacrament.scripture.ref}
                </p>
              </motion.div>

              {/* Preparation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                style={{ background: "white", border: "1px solid #e8e2d9" }}
              >
                <div className="p-8">
                  <p
                    className="text-xs tracking-[0.25em] uppercase mb-5"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    Requirements & Preparation
                  </p>
                  <div className="flex flex-col gap-4">
                    {sacrament.preparation.map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div
                          className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${sacrament.accent}12` }}
                        >
                          <CheckCircle
                            size={13}
                            style={{ color: sacrament.accent }}
                          />
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "#666", fontFamily: "sans-serif" }}
                        >
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: sidebar */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-24 self-start">
              {/* Schedule */}
              <div
                style={{
                  background: "white",
                  border: "1px solid #e8e2d9",
                  borderTop: "4px solid #c9a84c",
                }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={14} style={{ color: "#c9a84c" }} />
                    <p
                      className="text-xs tracking-widest uppercase"
                      style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                    >
                      Schedule
                    </p>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "#666",
                      fontFamily: "sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    {sacrament.schedule}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div style={{ background: "#1e3a5f" }}>
                <div className="p-6">
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    Ready to Begin?
                  </p>
                  <p
                    className="text-sm mb-5"
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Our clergy and staff are here to guide you.
                  </p>
                  <Link
                    to="/book-appointment"
                    className="block text-center py-3 mb-3 text-xs font-bold tracking-widest uppercase transition-all"
                    style={{
                      background: "#c9a84c",
                      color: "#0a0a0a",
                      fontFamily: "sans-serif",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#b8963d")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#c9a84c")
                    }
                  >
                    Book an Appointment
                  </Link>
                  <Link
                    to="/contact"
                    className="block text-center py-3 text-xs font-bold tracking-widest uppercase transition-all"
                    style={{
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                      fontFamily: "sans-serif",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "#c9a84c")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.2)")
                    }
                  >
                    Contact Parish Office
                  </Link>
                </div>
              </div>

              {/* Back link */}
              <Link
                to="/sacraments"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase"
                style={{ color: "#888", fontFamily: "sans-serif" }}
              >
                <ArrowLeft size={12} /> All Sacraments
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
