import React from "react";
import { useParams, Link } from "react-router";
import {
  Droplets,
  Sparkles,
  Users,
  Heart,
  BookHeart,
  HandHeart,
  Calendar,
  CheckCircle,
} from "lucide-react";

const sacramentDetails = {
  baptism: {
    name: "Baptism",
    icon: Droplets,
    image:
      "https://images.unsplash.com/photo-1646063436480-80b8180877ca?auto=format&fit=crop&w=1080&q=80",
    description:
      "Baptism is the first sacrament of initiation into the Catholic Church. Through the waters of baptism, we are cleansed of original sin, become children of God, and are welcomed into the family of the Church.",
    meaning:
      "Baptism marks the beginning of our Christian journey. The water symbolizes death to sin and resurrection to new life in Christ. Parents and godparents promise to raise the child in the faith, teaching them to keep God’s commandments.",
    preparation: [
      "Parents must be registered parishioners of St. Michael’s",
      "Attend a baptismal preparation class (offered monthly)",
      "Choose godparents who are practicing Catholics and confirmed",
      "Provide baptismal certificates for godparents",
      "Schedule baptism at least one month in advance",
    ],
    schedule:
      "Baptisms are typically celebrated on the second and fourth Sunday of each month at 1:00 PM.",
  },

  "first-communion": {
    name: "First Holy Communion",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1648086506504-c7cc0d67efda?auto=format&fit=crop&w=1080&q=80",
    description:
      "First Holy Communion is when a baptized child receives the Eucharist for the first time.",
    meaning:
      "The Eucharist is the source and summit of our Catholic faith, uniting us with Christ and His Church.",
    preparation: [
      "Typically received in second grade",
      "Two years of religious education required",
      "First Reconciliation must be completed first",
      "Attendance at preparation meetings",
    ],
    schedule:
      "Celebrated in May during a special Sunday Mass. Registration begins in the fall.",
  },

  confirmation: {
    name: "Confirmation",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1749199213094-048ae472fa03?auto=format&fit=crop&w=1080&q=80",
    description:
      "Confirmation strengthens the grace of Baptism through the outpouring of the Holy Spirit.",
    meaning:
      "Candidates receive the gifts of the Holy Spirit and are sealed as witnesses of Christ.",
    preparation: [
      "High school-aged students",
      "Completion of preparation program",
      "Choose a confirmed Catholic sponsor",
      "Service hours and retreat required",
    ],
    schedule: "Celebrated in the spring when the bishop visits the parish.",
  },

  confession: {
    name: "Reconciliation (Confession)",
    icon: Heart,
    image:
      "https://images.unsplash.com/photo-1749199213094-048ae472fa03?auto=format&fit=crop&w=1080&q=80",
    description: "Through confession, we receive God’s mercy and forgiveness.",
    meaning:
      "Christ heals and restores our relationship with God through absolution.",
    preparation: [
      "Examination of conscience",
      "Sincere sorrow for sins",
      "Act of Contrition",
    ],
    schedule: "Every Saturday from 3:30–4:30 PM or by appointment.",
  },

  wedding: {
    name: "Holy Matrimony",
    icon: BookHeart,
    image:
      "https://images.unsplash.com/photo-1696238173596-554e92268051?auto=format&fit=crop&w=1080&q=80",
    description:
      "Marriage unites a man and woman in a lifelong covenant of love.",
    meaning:
      "Spouses help each other grow in holiness and reflect Christ’s love.",
    preparation: [
      "Contact parish 6 months in advance",
      "Complete Pre-Cana",
      "Provide sacramental documents",
    ],
    schedule: "Typically celebrated on Saturdays. No weddings during Lent.",
  },

  anointing: {
    name: "Anointing of the Sick",
    icon: HandHeart,
    image:
      "https://images.unsplash.com/photo-1749199213094-048ae472fa03?auto=format&fit=crop&w=1080&q=80",
    description:
      "Offers healing, strength, and peace to the seriously ill or elderly.",
    meaning:
      "The priest anoints with blessed oil, invoking God’s healing grace.",
    preparation: [
      "For the seriously ill or elderly",
      "Contact parish office",
      "Can be received multiple times",
    ],
    schedule:
      "Available anytime by contacting the parish office. Emergency calls welcome.",
  },
};

export function SacramentDetailPage() {
  const { type } = useParams();
  const sacrament = type ? sacramentDetails[type] : null;

  if (!sacrament) {
    return (
      <div className="py-20 text-center">
        <h2 className="mb-4 text-[#1e3a5f]">Sacrament Not Found</h2>
        <Link to="/sacraments" className="text-[#8B2635] hover:underline">
          Return to Sacraments
        </Link>
      </div>
    );
  }

  const Icon = sacrament.icon;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src={sacrament.image}
          alt={sacrament.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon className="w-10 h-10" />
          </div>
          <h1>{sacrament.name}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <p className="text-lg mb-8">{sacrament.description}</p>

        <h2 className="mb-4">The Meaning</h2>
        <p className="mb-8">{sacrament.meaning}</p>

        <h2 className="mb-4">Preparation</h2>
        <ul className="space-y-4 mb-8">
          {sacrament.preparation.map((item, index) => (
            <li key={index} className="flex gap-3">
              <CheckCircle className="text-[#8B2635]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-4">Schedule</h2>
        <div className="flex gap-3 items-start">
          <Calendar className="text-[#8B2635]" />
          <p>{sacrament.schedule}</p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="px-8 py-3 bg-[#8B2635] text-white rounded-full"
          >
            Contact Parish Office
          </Link>
        </div>
      </section>
    </div>
  );
}
