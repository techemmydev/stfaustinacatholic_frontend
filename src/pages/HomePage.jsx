import React from "react";
import { Link } from "react-router"; // ✅ fixed import
import {
  Calendar,
  Heart,
  BookOpen,
  Users,
  ChevronRight,
  Clock,
} from "lucide-react";
import Stats from "@/UiComponents/Stats";
import Testimonial from "@/UiComponents/Testimonial";
import FaithMediaSection from "@/UiComponents/FaithMediaSection";
import Herosection from "@/UiComponents/Herosection";

// Data (used directly inside the component)
const upcomingEvents = [
  {
    id: 1,
    title: "Sunday Mass",
    date: "Every Sunday",
    time: "8:00 AM, 10:30 AM, 6:00 PM",
    type: "Regular Service",
  },
  {
    id: 2,
    title: "Advent Evening Prayer",
    date: "December 15, 2025",
    time: "7:00 PM",
    type: "Special Event",
  },
  {
    id: 3,
    title: "Christmas Eve Mass",
    date: "December 24, 2025",
    time: "5:00 PM, 11:00 PM",
    type: "Holiday Service",
  },
  {
    id: 4,
    title: "First Friday Adoration",
    date: "First Friday Monthly",
    time: "9:00 AM - 5:00 PM",
    type: "Adoration",
  },
];

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
            <h2 className="mb-6 text-[#1e3a5f] text-4xl font-semibold">
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

        {/* Upcoming Events */}
        <section className="py-16 bg-[#f9f7f4]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-[#1e3a5f] m-0 text-4xl font-semibold">
                Upcoming Events
              </h2>
              <Link
                to="/mass-schedule"
                className="text-[#8B2635] hover:text-[#6d1d2a] flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-[#8B2635]" />
                    <span className="text-sm text-[#8B2635]">{event.type}</span>
                  </div>
                  <h3 className="mb-3 text-[#1e3a5f] text-2xl">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-[#666666]">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#d4af37]" />
                      {event.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#d4af37]" />
                      {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-[#1e3a5f] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-white mb-6 text-4xl">Join Us in Worship</h2>
            <p className="text-xl mb-8 text-gray-200">
              Whether you{"\u2019"}re new to the area or seeking a spiritual
              home, we welcome you with open arms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/book-appointment"
                className="px-8 py-3 bg-[#8B2635] text-white rounded-full hover:bg-[#6d1d2a] transition-colors shadow-lg"
              >
                Schedule a Visit
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 bg-white text-[#1e3a5f] rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Stats />
      <Testimonial />
      <FaithMediaSection />
    </>
  );
};

export default HomePage;
