import { Link } from "react-router";
import {
  Droplets,
  Sparkles,
  Users,
  Heart,
  BookHeart,
  HandHeart,
} from "lucide-react";

const sacraments = [
  {
    id: "baptism",
    name: "Baptism",
    icon: Droplets,
    description:
      "The sacrament of initiation into the Christian faith, washing away original sin and welcoming new members into the Church.",
    color: "bg-blue-500",
    requirements:
      "For infants, parents must be registered parishioners. Adults seeking baptism should contact RCIA.",
  },
  {
    id: "first-communion",
    name: "First Holy Communion",
    icon: Sparkles,
    description:
      "The first reception of the Eucharist, typically received around age 7-8 after preparation.",
    color: "bg-yellow-500",
    requirements:
      "Two years of religious education or Catholic school attendance required.",
  },
  {
    id: "confirmation",
    name: "Confirmation",
    icon: Users,
    description:
      "The sacrament that completes baptismal grace, conferring the gifts of the Holy Spirit.",
    color: "bg-red-500",
    requirements:
      "Youth typically receive Confirmation in high school after completing preparation program.",
  },
  {
    id: "confession",
    name: "Reconciliation (Confession)",
    icon: Heart,
    description:
      "The sacrament of healing where sins are forgiven through the ministry of the priest.",
    color: "bg-purple-500",
    requirements: "Available every Saturday 3:30-4:30 PM or by appointment.",
  },
  {
    id: "wedding",
    name: "Holy Matrimony",
    icon: BookHeart,
    description:
      "The sacrament uniting a man and woman in lifelong covenant of love and faithfulness.",
    color: "bg-pink-500",
    requirements:
      "Couples must contact the parish at least 6 months prior to desired wedding date.",
  },
  {
    id: "anointing",
    name: "Anointing of the Sick",
    icon: HandHeart,
    description:
      "The sacrament of healing for those seriously ill, infirm, or facing surgery.",
    color: "bg-green-500",
    requirements:
      "Available upon request. Contact the parish office for pastoral care visits.",
  },
];

export function SacramentsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl text-[#d4af37]">✟</span>
          </div>
          <h1 className="text-white mb-6">The Seven Sacraments</h1>
          <p className="text-xl text-gray-200">
            Encounter Christ through the sacred signs and celebrations of our
            Catholic faith
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-lg text-[#666666]">
            The sacraments are efficacious signs of grace, instituted by Christ
            and entrusted to the Church, by which divine life is dispensed to
            us. Through the sacraments, we encounter Jesus Christ and receive
            the graces we need to live as faithful disciples.
          </p>
        </div>
      </section>

      {/* Sacraments Grid */}
      <section className="py-16 bg-[#f9f7f4]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sacraments.map((sacrament) => (
              <Link
                key={sacrament.id}
                to={`/sacraments/${sacrament.id}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <div className={`${sacrament.color} h-2`} />
                <div className="p-6">
                  <div
                    className={`${sacrament.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <sacrament.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-[#1e3a5f]">{sacrament.name}</h3>
                  <p className="text-[#666666] mb-4">{sacrament.description}</p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-[#8B2635]">
                      {sacrament.requirements}
                    </p>
                  </div>
                  <div className="mt-4 text-[#8B2635] group-hover:translate-x-2 transition-transform inline-block">
                    Learn More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 max-w-4xl mx-auto px-4 text-center">
        <h2 className="mb-6 text-[#1e3a5f]">Ready to Schedule a Sacrament?</h2>
        <p className="text-lg text-[#666666] mb-8">
          Our clergy and staff are here to help guide you through the
          preparation process. Book an appointment to discuss sacramental
          preparation.
        </p>
        <Link
          to="/book-appointment"
          className="inline-block px-8 py-3 bg-[#8B2635] text-white rounded-full hover:bg-[#6d1d2a] transition-colors shadow-lg"
        >
          Book an Appointment
        </Link>
      </section>
    </div>
  );
}
