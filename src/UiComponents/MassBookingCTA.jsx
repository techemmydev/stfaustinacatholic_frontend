import React from "react";
import { Link } from "react-router";
import { CalendarCheck, Church } from "lucide-react";

export default function MassBookingCTA() {
  return (
    <section className="bg-[#1e3a5f] py-20 px-4 font-inter">
      <div className="max-w-5xl mx-auto text-center text-white">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
          <Church className="w-10 h-10 text-[#d4af37]" />
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Book a Mass or Thanksgiving Offering
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-8">
          Parishioners are welcome to request Mass intentions and Thanksgiving
          offerings for special occasions, answered prayers, and memorials. Each
          Mass has a limited number of thanksgiving intentions to ensure proper
          reverence.
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 rounded-lg p-6">
            <h4 className="text-[#d4af37] font-semibold mb-2">
              Mass Intentions
            </h4>
            <p className="text-sm text-gray-200">
              Offer a Mass for loved ones, special intentions, or anniversaries.
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-6">
            <h4 className="text-[#d4af37] font-semibold mb-2">
              Thanksgiving Offerings
            </h4>
            <p className="text-sm text-gray-200">
              Give thanks to God for blessings received (limited to 5 per Mass).
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-6">
            <h4 className="text-[#d4af37] font-semibold mb-2">
              Select Your Mass
            </h4>
            <p className="text-sm text-gray-200">
              Choose your preferred date, time, and Mass celebration.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          to="/mass-booking"
          className="inline-flex items-center gap-3 bg-[#8B2635] px-10 py-4 rounded-full text-white font-semibold hover:bg-[#6d1d2a] transition shadow-lg"
        >
          <CalendarCheck className="w-5 h-5" />
          Book a Mass Now
        </Link>

        {/* Footer Note */}
        <p className="text-sm text-gray-300 mt-6">
          * Login is required to submit a Mass or Thanksgiving request.
        </p>
      </div>
    </section>
  );
}
