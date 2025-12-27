import React, { useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Link } from "react-router";

const massSchedule = [
  {
    id: 1,
    day: "Sunday",
    times: ["8:00 AM", "10:30 AM", "12:00 PM", "6:00 PM"],
    type: "sunday",
    location: "Main Church",
    language: "English",
    notes: "10:30 AM Mass includes Children's Liturgy",
  },
  {
    id: 2,
    day: "Monday - Friday",
    times: ["7:00 AM", "12:10 PM"],
    type: "daily",
    location: "Main Church",
    language: "English",
    notes: "",
  },
  {
    id: 3,
    day: "Saturday",
    times: ["8:00 AM", "5:00 PM (Vigil)"],
    type: "daily",
    location: "Main Church",
    language: "English",
    notes: "Confessions 3:30-4:30 PM",
  },
  {
    id: 4,
    day: "First Friday",
    times: ["7:00 PM"],
    type: "special",
    location: "Main Church",
    language: "English",
    notes: "Followed by Eucharistic Adoration until 9:00 PM",
  },
  {
    id: 5,
    day: "Holy Days",
    times: ["7:00 AM", "12:10 PM", "7:00 PM"],
    type: "special",
    location: "Main Church",
    language: "English",
    notes: "Check bulletin for specific dates",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Advent Evening Prayer",
    date: "December 15, 2025",
    time: "7:00 PM",
    description:
      "Join us for a beautiful evening of prayer and reflection during Advent season.",
  },
  {
    id: 2,
    title: "Christmas Eve Mass",
    date: "December 24, 2025",
    time: "5:00 PM, 11:00 PM",
    description:
      "Celebrate the birth of our Savior with special Christmas Eve liturgies.",
  },
  {
    id: 3,
    title: "Christmas Day Mass",
    date: "December 25, 2025",
    time: "8:00 AM, 10:30 AM",
    description: "Christmas Day Masses to celebrate the Nativity of the Lord.",
  },
  {
    id: 4,
    title: "Solemnity of Mary",
    date: "January 1, 2026",
    time: "9:00 AM",
    description: "Holy Day of Obligation - Mary, the Holy Mother of God.",
  },
];

export function MassSchedulePage() {
  const [filter, setFilter] = useState("all");

  const filteredSchedule =
    filter === "all"
      ? massSchedule
      : massSchedule.filter((mass) => mass.type === filter);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-[#d4af37]" />
          </div>
          <h1 className="text-white mb-6">Mass Schedule</h1>
          <p className="text-xl text-gray-200">
            Join us for the celebration of the Eucharist
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-4">
            {["all", "sunday", "daily", "special"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  filter === type
                    ? "bg-[#8B2635] text-white"
                    : "bg-gray-100 text-[#2d2d2d] hover:bg-gray-200"
                }`}
              >
                {type === "all"
                  ? "All Masses"
                  : type === "sunday"
                  ? "Sunday"
                  : type === "daily"
                  ? "Daily Mass"
                  : "Special Events"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mass Schedule */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="mb-8 text-[#1e3a5f] text-center">Regular Mass Times</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchedule.map((mass) => (
            <div
              key={mass.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#8B2635] hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-[#1e3a5f] m-0">{mass.day}</h3>
                <span className="px-3 py-1 bg-[#f9f7f4] text-[#8B2635] text-sm rounded-full">
                  {mass.type === "sunday"
                    ? "Sunday"
                    : mass.type === "daily"
                    ? "Daily"
                    : "Special"}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#d4af37]" />
                  <div className="flex flex-wrap gap-2">
                    {mass.times.map((time, index) => (
                      <span key={index} className="text-[#2d2d2d]">
                        {time}
                        {index < mass.times.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-[#2d2d2d]">{mass.location}</span>
                </div>
              </div>

              {mass.notes && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-[#666666]">{mass.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Special Events */}
      <section className="py-16 bg-[#f9f7f4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="mb-8 text-[#1e3a5f] text-center">
            Upcoming Special Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-[#8B2635] rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0">
                    <span className="text-sm">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                    <span className="text-2xl">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-[#1e3a5f]">{event.title}</h3>
                    <div className="flex items-center gap-2 text-[#8B2635] mb-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <p className="text-[#666666]">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="bg-[#1e3a5f] text-white rounded-lg p-8">
          <h3 className="text-white mb-4">Important Information</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#d4af37] mt-1">•</span>
              <span>
                Please arrive 10-15 minutes before Mass begins to allow time for
                prayer and preparation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#d4af37] mt-1">•</span>
              <span>
                The church is open for private prayer daily from 6:00 AM to 8:00
                PM.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#d4af37] mt-1">•</span>
              <span>
                Confessions are available every Saturday from 3:30-4:30 PM or by
                appointment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#d4af37] mt-1">•</span>
              <span>
                During flu season, receiving Communion on the tongue is
                discouraged. Please receive in the hand.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#f9f7f4] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="mb-6 text-[#1e3a5f]">Questions About Mass Times?</h2>
          <p className="text-lg text-[#666666] mb-8">
            Contact our parish office or book an appointment to speak with one
            of our priests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-appointment"
              className="px-8 py-3 bg-[#8B2635] text-white rounded-full hover:bg-[#6d1d2a] transition-colors shadow-lg"
            >
              Book an Appointment
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-[#1e3a5f] text-white rounded-full hover:bg-[#2d4a6f] transition-colors shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
