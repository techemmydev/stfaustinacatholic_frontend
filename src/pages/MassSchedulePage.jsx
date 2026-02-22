import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, Clock, MapPin, Globe } from "lucide-react";
import { Link } from "react-router";
import { fetchPublishedMassSchedules } from "../Redux/slice/Massscheduleslice";
import { fetchPublishedEvents } from "../Redux/slice/Eventslice";

export function MassSchedulePage() {
  const dispatch = useDispatch();
  const { publishedSchedules, loading: scheduleLoading } = useSelector(
    (state) => state.massSchedule,
  );
  const { publishedEvents, loading: eventsLoading } = useSelector(
    (state) => state.event,
  );

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchPublishedMassSchedules());
    dispatch(fetchPublishedEvents());
  }, [dispatch]);

  const getFilteredSchedules = () => {
    if (filter === "all") return publishedSchedules;
    return publishedSchedules.filter((schedule) => {
      if (filter === "sunday") return schedule.type === "Sunday Mass";
      if (filter === "daily")
        return (
          schedule.type === "Weekday Mass" || schedule.type === "Evening Mass"
        );
      if (filter === "special") return schedule.type === "Special";
      return true;
    });
  };

  const filteredSchedule = getFilteredSchedules();

  // Only upcoming events (date >= today)
  const upcomingEvents = publishedEvents
    .filter((event) => new Date(event.date) >= new Date())
    .slice(0, 4);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

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

      {/* Mass Schedule Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="mb-8 text-[#1e3a5f] text-center">Regular Mass Times</h2>

        {scheduleLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#8B2635] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredSchedule.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">
              No mass schedules available at this time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchedule.map((mass) => (
              <div
                key={mass._id}
                className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#8B2635] hover:shadow-lg transition-shadow"
              >
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-[#1e3a5f] text-xl font-semibold m-0">
                    {mass.day}
                  </h3>
                  <span className="px-3 py-1 bg-[#f9f7f4] text-[#8B2635] text-xs font-medium rounded-full whitespace-nowrap">
                    {mass.type}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                    <span className="text-[#2d2d2d] font-medium">
                      {mass.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                    <span className="text-[#2d2d2d]">{mass.location}</span>
                  </div>

                  {mass.language && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {mass.language}
                      </span>
                    </div>
                  )}
                </div>

                {mass.notes && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-[#666666] italic">
                      {mass.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Special Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 bg-[#f9f7f4]">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="mb-8 text-[#1e3a5f] text-center">
              Upcoming Special Events
            </h2>

            {eventsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-[#8B2635] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Event image if available */}
                    {event.imageUrl && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Date badge */}
                        <div className="w-16 h-16 bg-[#8B2635] rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0">
                          <span className="text-xs uppercase tracking-wide">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                            })}
                          </span>
                          <span className="text-2xl font-bold leading-none">
                            {new Date(event.date).getDate()}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Category badge */}
                          <span className="inline-block px-2 py-0.5 bg-[#f9f7f4] text-[#8B2635] text-xs rounded-full mb-2">
                            {event.category}
                          </span>
                          <h3 className="text-[#1e3a5f] text-lg font-semibold mb-2 leading-snug">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-2 text-[#8B2635] mb-2 text-sm">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{event.time}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2 text-gray-500 mb-2 text-sm">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.description && (
                            <p className="text-[#666666] text-sm line-clamp-2">
                              {event.description}
                            </p>
                          )}
                          {/* Attendees info */}
                          {event.maxAttendees && (
                            <p className="text-xs text-gray-400 mt-2">
                              {event.attendees || 0} / {event.maxAttendees}{" "}
                              registered
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Additional Info */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="bg-[#1e3a5f] text-white rounded-xl p-8">
          <h3 className="text-white mb-4">Important Information</h3>
          <ul className="space-y-3">
            {[
              "Please arrive 10-15 minutes before Mass begins to allow time for prayer and preparation.",
              "The church is open for private prayer daily from 6:00 AM to 8:00 PM.",
              "Confessions are available every Saturday from 3:30-4:30 PM or by appointment.",
              "During flu season, receiving Communion on the tongue is discouraged. Please receive in the hand.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#d4af37] mt-1 flex-shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
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
