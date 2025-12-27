import { Link } from "react-router";
import logo from "../assets/images/stfaustinaimage.png";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="flex flex-col items-center text-center px-4">
            {/* Logo */}

            {/* Parish Info */}
            <div>
              <div className="flex items-center gap-2 justify-center mb-4">
                <div className="mb-4">
                  <img
                    src={logo}
                    alt="St. Faustina Parish"
                    className="w-14 h-14 rounded-full object-cover border-4 border-[#8B2635]"
                  />
                </div>

                <h3 className="text-white m-0">
                  St. Faustina{"\u2019"}s Parish
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                A welcoming Catholic community dedicated to faith, worship, and
                service since 1892.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-[#d4af37] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/sacraments"
                  className="text-gray-300 hover:text-[#d4af37] transition-colors"
                >
                  Sacraments
                </Link>
              </li>
              <li>
                <Link
                  to="/mass-schedule"
                  className="text-gray-300 hover:text-[#d4af37] transition-colors"
                >
                  Mass Schedule
                </Link>
              </li>
              <li>
                <Link
                  to="/book-appointment"
                  className="text-gray-300 hover:text-[#d4af37] transition-colors"
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/sermons"
                  className="text-gray-300 hover:text-[#d4af37] transition-colors"
                >
                  Sermons & Media
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  123 Church Street
                  <br />
                  Springfield, IL 62701
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                <a
                  href="tel:+12175551234"
                  className="text-gray-300 hover:text-[#d4af37] transition-colors"
                >
                  (217) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                <a
                  href="mailto:parish@stmichaels.org"
                  className="text-gray-300 hover:text-[#d4af37] transition-colors"
                >
                  parish@stmichaels.org
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h4 className="text-white mb-4">Office Hours</h4>
            <p className="text-gray-300 mb-4">
              Monday - Friday: 9:00 AM - 5:00 PM
              <br />
              Saturday: 10:00 AM - 2:00 PM
              <br />
              Sunday: Closed
            </p>
            <h4 className="text-white mb-3">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#8B2635] rounded-full flex items-center justify-center hover:bg-[#6d1d2a] transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#8B2635] rounded-full flex items-center justify-center hover:bg-[#6d1d2a] transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#8B2635] rounded-full flex items-center justify-center hover:bg-[#6d1d2a] transition-colors"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} St. Faustina {"\u2019"}s Parish.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
