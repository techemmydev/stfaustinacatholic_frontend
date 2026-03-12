// sacraments/ReconciliationSection.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import {
  Heart,
  ArrowRight,
  CheckCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Cross,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const confessionSteps = [
  {
    step: "I",
    title: "Prepare Your Heart",
    desc: "Find a quiet place. Ask the Holy Spirit to help you see your soul clearly and approach this sacrament with sincerity and humility.",
  },
  {
    step: "II",
    title: "Examination of Conscience",
    desc: "Prayerfully review your thoughts, words, and actions since your last confession. Consider how you have loved God and neighbour.",
  },
  {
    step: "III",
    title: "Act of Contrition",
    desc: "Stir up sorrow for your sins — not merely from fear of punishment, but from love of God whom you have offended.",
  },
  {
    step: "IV",
    title: "Enter the Confessional",
    desc: "Greet the priest, make the Sign of the Cross, and state how long it has been since your last confession.",
  },
  {
    step: "V",
    title: "Confess Your Sins",
    desc: "Speak honestly and completely. Do not hold back out of shame — the priest is bound by the absolute seal of confession.",
  },
  {
    step: "VI",
    title: "Receive Counsel & Penance",
    desc: "Listen to the priest's guidance and accept your penance with a willing heart. It is a sign of your desire to make amends.",
  },
  {
    step: "VII",
    title: "Absolution",
    desc: 'The priest extends his hands and pronounces absolution: "I absolve you from your sins in the name of the Father, and of the Son, and of the Holy Spirit." Your sins are truly forgiven.',
  },
  {
    step: "VIII",
    title: "Give Thanks & Do Your Penance",
    desc: "After leaving the confessional, kneel and complete your penance promptly. Offer a prayer of thanksgiving for God's mercy.",
  },
];

const examinationAreas = [
  {
    category: "Love of God",
    questions: [
      "Have I neglected daily prayer or treated it as a burden?",
      "Have I missed Mass on Sundays or Holy Days without grave reason?",
      "Have I received Holy Communion unworthily or in a state of mortal sin?",
      "Have I doubted or denied any teaching of the Catholic faith?",
      "Have I used God's name in vain or spoken blasphemy?",
    ],
  },
  {
    category: "Love of Neighbour",
    questions: [
      "Have I harboured anger, hatred, or a refusal to forgive?",
      "Have I spoken unkindly, gossiped, or damaged someone's reputation?",
      "Have I stolen, cheated, or been dishonest in any way?",
      "Have I failed to help those in need when I was able?",
      "Have I given scandal or led others into sin?",
    ],
  },
  {
    category: "Love of Self & Chastity",
    questions: [
      "Have I indulged in impure thoughts, words, or actions?",
      "Have I abused alcohol, drugs, or other substances?",
      "Have I been lazy, prideful, or given to excessive vanity?",
      "Have I despaired of God's mercy or presumed upon it?",
      "Have I neglected my duties as a spouse, parent, or child?",
    ],
  },
];

const accordionSections = [
  {
    id: "before",
    label: "Before Confession",
    tag: "Preparatory Prayer",
    prayer: `Come, Holy Spirit, enlighten my mind and soften my heart. Help me to see myself as God sees me — with honesty, humility, and hope. I desire to make a good confession and to receive with gratitude the mercy that flows from the Cross of Christ. Blessed Virgin Mary, Mother of Mercy, intercede for me. Saint Joseph, patron of the interior life, pray for me. Amen.`,
    source: "Prayer before the Sacrament of Penance",
  },
  {
    id: "contrition",
    label: "Act of Contrition",
    tag: "Said within the Confessional",
    prayer: `O my God, I am heartily sorry for having offended Thee, and I detest all my sins, because I dread the loss of Heaven and the pains of Hell, but most of all because they offend Thee, my God, Who art all good and deserving of all my love. I firmly resolve, with the help of Thy grace, to confess my sins, to do penance, and to amend my life. Amen.`,
    source: "Traditional Act of Contrition",
  },
  {
    id: "after",
    label: "After Confession",
    tag: "Prayer of Thanksgiving",
    prayer: `Lord Jesus Christ, I thank You for the gift of Your mercy. Through this holy sacrament, You have washed me clean and restored me to the joy of Your friendship. I am unworthy of such love, yet You give it freely. May I never take Your grace for granted. Strengthen me by Your Spirit that I may avoid sin and grow daily in holiness. Immaculate Heart of Mary, keep me close to your Son. Amen.`,
    source: "Prayer of Thanksgiving after Absolution",
  },
];

const ReconciliationSection = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [openExam, setOpenExam] = useState(null);

  return (
    <div className="font-inter bg-white border border-parish-border border-t-4 border-t-parish-red shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
      <div className="p-8 md:p-10">
        {/* ── Section header ─────────────────────────────────────── */}
        <div className="flex items-start gap-5 mb-6">
          <div className="w-14 h-14 flex items-center justify-center shrink-0 bg-parish-red/[0.07]">
            <Heart size={26} className="text-parish-red" />
          </div>
          <div>
            <p className="text-xs tracking-[0.25em] uppercase mb-1 text-parish-gold">
              First Sacrament of Healing
            </p>
            <h3 className="text-2xl font-bold text-parish-navy">
              Reconciliation (Confession)
            </h3>
          </div>
        </div>

        <div className="h-px bg-parish-muted mb-8" />

        {/* ── Intro ──────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-sm leading-relaxed mb-4 text-[#555] font-light">
              Through the Sacrament of Reconciliation, God extends His mercy and
              forgiveness to the penitent. Christ heals us, restores our
              relationship with God and with the Church, and gives us the grace
              to live a renewed Christian life. This sacrament can be received
              as often as needed.
            </p>
            <p className="text-sm leading-relaxed mb-6 text-[#777] font-light">
              In the confessional, after the examination of conscience and an
              act of contrition, the priest — acting in the person of Christ —
              pronounces absolution, and sins are truly forgiven. The seal of
              confession is absolute and inviolable.
            </p>
            <div className="p-4 mb-6 bg-parish-cream border-l-[3px] border-parish-red">
              <p className="text-sm italic mb-1 text-[#555]">
                "Whose sins you forgive are forgiven them, and whose sins you
                retain are retained."
              </p>
              <p className="text-xs tracking-widest uppercase text-parish-gold">
                — John 20:23
              </p>
            </div>
          </div>
          <div>
            <div className="p-4 mb-4 bg-parish-cream border-l-[3px] border-parish-navy">
              <p className="text-sm italic mb-1 text-[#555]">
                "God is rich in mercy. His mercy endures for ever. He does not
                wish the death of the sinner, but that he turn back to Him and
                live."
              </p>
              <p className="text-xs tracking-widest uppercase text-parish-gold">
                — Ezekiel 33:11
              </p>
            </div>
            <div className="flex items-start gap-3 bg-parish-navy/[0.04] p-4 border border-parish-border">
              <Calendar
                size={15}
                className="text-parish-gold shrink-0 mt-0.5"
              />
              <p className="text-xs leading-relaxed text-[#888]">
                <span className="font-semibold text-parish-navy">
                  Schedule:{" "}
                </span>
                Every Saturday 3:30–4:30 PM. Also available by appointment
                Monday–Friday. Communal Penance services held during Advent and
                Lent.
              </p>
            </div>
          </div>
        </div>

        {/* ── Step-by-step guide ─────────────────────────────────── */}
        <div className="mb-12">
          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] uppercase mb-2 text-parish-gold">
              A Complete Guide
            </p>
            <h4 className="text-2xl font-bold text-parish-navy">
              How to Make a Good Confession
            </h4>
            <div className="h-[3px] w-[50px] bg-parish-gold mt-3" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {confessionSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`flex items-start gap-4 p-5 border ${i % 2 === 0 ? "border-l-4 border-l-parish-red border-parish-border" : "border-l-4 border-l-parish-navy border-parish-border"} bg-white`}
              >
                <div
                  className={`w-9 h-9 flex items-center justify-center shrink-0 text-xs font-bold tracking-widest ${i % 2 === 0 ? "bg-parish-red text-white" : "bg-parish-navy text-parish-gold"}`}
                >
                  {s.step}
                </div>
                <div>
                  <h5 className="font-bold mb-1 text-parish-navy text-[0.9rem]">
                    {s.title}
                  </h5>
                  <p className="text-xs leading-relaxed text-[#777] font-light">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Prayers accordion ──────────────────────────────────── */}
        <div className="mb-12">
          <div className="mb-6">
            <p className="text-xs tracking-[0.3em] uppercase mb-2 text-parish-gold">
              Prayers for the Sacrament
            </p>
            <h4 className="text-2xl font-bold text-parish-navy">
              Pray Before, During &amp; After
            </h4>
            <div className="h-[3px] w-[50px] bg-parish-gold mt-3" />
          </div>

          <div className="flex flex-col gap-3">
            {accordionSections.map((sec) => {
              const isOpen = openAccordion === sec.id;
              return (
                <div
                  key={sec.id}
                  className={`border transition-colors duration-300 ${isOpen ? "border-parish-gold" : "border-parish-border"} bg-white`}
                >
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setOpenAccordion(isOpen ? null : sec.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? "bg-parish-navy" : "bg-parish-cream"}`}
                      >
                        <BookOpen
                          size={15}
                          className={
                            isOpen ? "text-parish-gold" : "text-[#888]"
                          }
                        />
                      </div>
                      <div>
                        <p
                          className={`text-xs tracking-widest uppercase mb-0.5 transition-colors duration-300 ${isOpen ? "text-parish-gold" : "text-[#aaa]"}`}
                        >
                          {sec.tag}
                        </p>
                        <h5
                          className={`font-bold text-base transition-colors duration-300 ${isOpen ? "text-parish-navy" : "text-[#333]"}`}
                        >
                          {sec.label}
                        </h5>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp
                        size={18}
                        className="text-parish-gold shrink-0"
                      />
                    ) : (
                      <ChevronDown size={18} className="text-[#ccc] shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 pt-0 border-t border-parish-muted">
                          <div className="pl-4 mt-4 border-l-[3px] border-parish-gold">
                            <p className="text-base italic leading-loose text-[#555]">
                              {sec.prayer}
                            </p>
                            <p className="text-xs tracking-widest uppercase mt-4 text-parish-gold">
                              — {sec.source}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Examination of Conscience ──────────────────────────── */}
        <div className="mb-10">
          <div className="mb-6">
            <p className="text-xs tracking-[0.3em] uppercase mb-2 text-parish-gold">
              Self-Reflection
            </p>
            <h4 className="text-2xl font-bold text-parish-navy">
              Examination of Conscience
            </h4>
            <div className="h-[3px] w-[50px] bg-parish-gold mt-3 mb-4" />
            <p className="text-sm text-[#777] font-light leading-relaxed max-w-2xl">
              Before approaching the confessional, spend time in quiet
              reflection. Ask the Holy Spirit to illuminate your conscience. The
              following questions are a guide — not an exhaustive list.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {examinationAreas.map((area, i) => {
              const isOpen = openExam === area.category;
              return (
                <div
                  key={area.category}
                  className={`border transition-colors duration-300 ${isOpen ? "border-parish-gold" : "border-parish-border"}`}
                >
                  <button
                    className="w-full flex items-center justify-between p-5 text-left bg-white"
                    onClick={() => setOpenExam(isOpen ? null : area.category)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-9 h-9 flex items-center justify-center shrink-0 text-xs font-bold tracking-widest transition-colors duration-300 ${isOpen ? (i % 2 === 0 ? "bg-parish-red text-white" : "bg-parish-navy text-parish-gold") : "bg-parish-cream text-[#888]"}`}
                      >
                        {["I", "II", "III"][i]}
                      </div>
                      <h5
                        className={`font-bold text-base transition-colors duration-300 ${isOpen ? "text-parish-navy" : "text-[#333]"}`}
                      >
                        {area.category}
                      </h5>
                    </div>
                    {isOpen ? (
                      <ChevronUp
                        size={18}
                        className="text-parish-gold shrink-0"
                      />
                    ) : (
                      <ChevronDown size={18} className="text-[#ccc] shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 bg-parish-cream border-t border-parish-muted">
                          <div className="pt-4 flex flex-col gap-3">
                            {area.questions.map((q) => (
                              <div key={q} className="flex items-start gap-3">
                                <CheckCircle
                                  size={13}
                                  className="text-parish-gold shrink-0 mt-0.5"
                                />
                                <p className="text-sm leading-relaxed text-[#555] font-light italic">
                                  {q}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Scripture banner ───────────────────────────────────── */}
        <div className="p-7 relative overflow-hidden bg-gradient-to-br from-parish-navy to-[#0f2240] border-l-4 border-parish-gold mb-8">
          <div className="absolute right-4 bottom-2 opacity-5 select-none pointer-events-none text-white text-[6rem] leading-none">
            ✟
          </div>
          <p className="text-xs tracking-[0.25em] uppercase mb-3 text-parish-gold">
            The Heart of the Sacrament
          </p>
          <p className="text-lg italic mb-3 leading-relaxed text-white/90">
            "There will be more joy in heaven over one sinner who repents than
            over ninety-nine righteous people who have no need of repentance."
          </p>
          <p className="text-xs tracking-widest uppercase text-parish-gold">
            — Luke 15:7
          </p>
        </div>

        {/* ── Footer CTA ─────────────────────────────────────────── */}
        <div className="pt-5 border-t border-parish-muted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-[#aaa] font-light max-w-sm leading-relaxed">
            For first confessions, RCIA, or if you have been away from the
            Church for a long time, please contact the parish office to arrange
            a personal meeting with a priest.
          </p>
          <Link
            to="/sacraments/confession"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-parish-red group whitespace-nowrap"
          >
            Full Details &amp; Schedule
            <ArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReconciliationSection;
