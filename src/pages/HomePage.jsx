import React, { useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  Heart,
  BookOpen,
  Users,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import Stats from "@/UiComponents/Stats";
import Testimonial from "@/UiComponents/Testimonial";
import FaithMediaSection from "@/UiComponents/FaithMediaSection";
import Herosection from "@/UiComponents/Herosection";
import MassBookingCTA from "@/UiComponents/MassBookingCTA";
import { fetchPublishedEvents } from "../Redux/slice/Eventslice";

const quickLinks = [
  {
    icon: Calendar,
    title: "Mass Times",
    description: "View our weekly Mass schedule and special celebrations",
    link: "/mass-schedule",
    color: "bg-[#8B2635]",
  },
  {
    icon: Heart,
    title: "Sacraments",
    description: "Learn about and schedule sacramental celebrations",
    link: "/sacraments",
    color: "bg-[#1e3a5f]",
  },
  {
    icon: BookOpen,
    title: "Sermons",
    description: "Watch and listen to recent homilies and teachings",
    link: "/sermons",
    color: "bg-[#8B2635]",
  },
  {
    icon: Users,
    title: "Our Community",
    description: "Discover ministries, groups, and ways to get involved",
    link: "/about",
    color: "bg-[#1e3a5f]",
  },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const { publishedEvents, loading } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(fetchPublishedEvents());
  }, [dispatch]);

  // Only show upcoming events (date >= today), max 4
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
    <>
      <Herosection />
      <div className="font-inter">
        {/* Mission Section */}
        <section className="py-16 bg-[#f9f7f4]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-[#8B2635] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-[#d4af37]">✟</span>
            </div>
            <h2 className="mb-6 text-[#1e3a5f] text-3xl font-semibold">
              Our Mission
            </h2>
            <p className="text-lg text-[#666666] font-inter">
              St. Faustina Parish is a vibrant Catholic community dedicated to
              spreading the Gospel, celebrating the sacraments, and serving
              those in need. We strive to be a welcoming spiritual home where
              all can encounter Christ and grow in faith together.
            </p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 max-w-7xl mx-auto px-4">
          <h2 className="text-center mb-12 text-[#1e3a5f] text-4xl font-semibold">
            Explore Our Parish
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                to={link.link}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
              >
                <div
                  className={`${link.color} w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <link.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="mb-2 text-[#1e3a5f] text-2xl">{link.title}</h3>
                <p className="text-[#666666] mb-4">{link.description}</p>
                <div className="flex items-center text-[#8B2635] group-hover:gap-2 transition-all">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Upcoming Events — "View All" links to /events */}
        <section className="py-16 bg-[#f9f7f4]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-[#1e3a5f] m-0 text-4xl font-semibold">
                Upcoming Events
              </h2>
              {/* ✅ Fixed: links to /events, not /mass-schedule */}
              <Link
                to="/mass-schedule"
                className="text-[#8B2635] hover:text-[#6d1d2a] flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-[#8B2635] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">
                  No upcoming events at this time. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {upcomingEvents.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    {/* Event image */}
                    {event.imageUrl ? (
                      <div className="h-36 overflow-hidden">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-36 bg-gradient-to-br from-[#1e3a5f]/10 to-[#8B2635]/10 flex items-center justify-center">
                        <Calendar className="w-10 h-10 text-[#8B2635]/30" />
                      </div>
                    )}

                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 bg-[#f9f7f4] text-[#8B2635] rounded-full">
                          {event.category}
                        </span>
                      </div>
                      <h3 className="mb-3 text-[#1e3a5f] text-lg font-semibold leading-snug">
                        {event.title}
                      </h3>
                      <div className="space-y-1.5 text-[#666666] text-sm">
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                          {formatDate(event.date)}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                          {event.time}
                        </p>
                        {event.location && (
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                            {event.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-[#1e3a5f] text-white">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-white mb-6 text-4xl font-bold">
              Join Us in Worship, Service, and Community
            </h2>
            <p className="text-xl mb-4 text-gray-200">
              Our parish is a place of prayer, compassion, and belonging.
              Whether you are visiting for the first time, seeking spiritual
              guidance, or looking for a parish to call home, we welcome you
              with open hearts.
            </p>
            <p className="text-lg mb-10 text-gray-300">
              Attend Mass, schedule an appointment with a priest, or register as
              a parishioner to enjoy full access to parish services and
              programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-10 py-4 bg-[#8B2635] text-white rounded-full hover:bg-[#6d1d2a] transition-colors shadow-lg font-semibold"
              >
                Register as a Parishioner
              </Link>
              <Link
                to="/book-appointment"
                className="px-10 py-4 bg-white text-[#1e3a5f] rounded-full hover:bg-gray-100 transition-colors shadow-lg font-medium"
              >
                Schedule an Appointment
              </Link>
              <Link
                to="/contact"
                className="px-10 py-4 border border-white/60 text-white rounded-full hover:bg-white/10 transition-colors shadow-lg font-medium"
              >
                Contact the Parish Office
              </Link>
            </div>
            <p className="mt-10 text-sm text-gray-300 max-w-3xl mx-auto">
              "They devoted themselves to the teaching of the apostles and to
              the communal life, to the breaking of the bread and to the
              prayers."
              <br />
              <span className="italic">— Acts 2:42</span>
            </p>
          </div>
        </section>
      </div>
      <Stats />
      <Testimonial />
      <FaithMediaSection />
      <MassBookingCTA />
    </>
  );
};

export default HomePage;
