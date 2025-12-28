import React from "react";
import { Link } from "react-router";
import { Home, Church } from "lucide-react";
import logo from "../assets/images/stfaustinaimage.png";

export default function PagenotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-full text-center bg-white shadow-xl rounded-2xl p-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="St. Faustina Parish Catholic Church"
            className="h-20 w-auto"
          />
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center">
            <Church className="w-10 h-10 text-[#1e3a5f]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#1e3a5f] mb-3">
          Page Not Found
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-lg mb-8">
          We’re sorry — the page you’re looking for does not exist or may have
          been moved. Please use the button below to return to the parish
          website.
        </p>

        {/* CTA */}
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-[#8B2635] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#6d1d2a] transition shadow-md"
        >
          <Home className="w-5 h-5" />
          Return to Parish Home
        </Link>

        {/* Footer Note */}
        <p className="text-sm text-gray-400 mt-8">
          St. Faustina Parish Catholic Church
        </p>
      </div>
    </div>
  );
}
