import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { toast, Toaster } from "sonner";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    toast.success("Message sent successfully!");

    // Clear form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f7f4] py-16  px-4 font-inter">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="mb-4 text-[#1e3a5f]">Thank You for Reaching Out!</h2>
          <p className="text-lg text-[#666666] mb-6">
            Your message has been sent successfully. We typically respond within
            24-48 hours. If your matter is urgent, please call our parish office
            directly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
              });
            }}
            className="px-8 py-3 bg-[#8B2635] text-white rounded-full hover:bg-[#6d1d2a] transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-inter">
      <Toaster position="top-right" richColors />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] py-20 lg:py-30 text-white font-inter">
        <div className="max-w-4xl mx-auto px-4 text-center lg:mt-10">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-[#d4af37]" />
          </div>
          <h1 className="text-white mb-6">Contact Us</h1>
          <p className="text-xl text-gray-200">
            We’re here to help. Reach out with questions, prayer requests, or
            feedback.
          </p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#8B2635] rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2 text-[#1e3a5f]">Address</h3>
              <p className="text-[#666666]">
                123 Church Street
                <br />
                Springfield, IL 62701
                <br />
                United States
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#8B2635] rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2 text-[#1e3a5f]">Phone</h3>
              <p className="text-[#666666] mb-2">
                <a href="tel:+12175551234" className="hover:text-[#8B2635]">
                  Office: (217) 555-1234
                </a>
              </p>
              <p className="text-[#666666]">
                <a href="tel:+12175551235" className="hover:text-[#8B2635]">
                  Emergency: (217) 555-1235
                </a>
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#8B2635] rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2 text-[#1e3a5f]">Email</h3>
              <p className="text-[#666666] mb-2">
                <a
                  href="mailto:parish@stmichaels.org"
                  className="hover:text-[#8B2635]"
                >
                  parish@stmichaels.org
                </a>
              </p>
              <p className="text-[#666666]">
                <a
                  href="mailto:office@stmichaels.org"
                  className="hover:text-[#8B2635]"
                >
                  office@stmichaels.org
                </a>
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-[#8B2635] rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2 text-[#1e3a5f]">Office Hours</h3>
              <div className="text-[#666666] space-y-1">
                <p>Monday - Friday:</p>
                <p className="pl-4">9:00 AM - 5:00 PM</p>
                <p className="mt-2">Saturday:</p>
                <p className="pl-4">10:00 AM - 2:00 PM</p>
                <p className="mt-2">Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="mb-6 text-[#1e3a5f]">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-[#2d2d2d]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B2635] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-[#2d2d2d]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B2635] focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-[#2d2d2d]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B2635] focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-[#2d2d2d]">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B2635] focus:border-transparent"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-[#2d2d2d]">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B2635] focus:border-transparent resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-[#8B2635] text-white rounded-full hover:bg-[#6d1d2a] transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-[#f9f7f4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="mb-8 text-[#1e3a5f] text-center">Visit Us</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3057.9676037374545!2d-89.65063668462644!3d39.78172997944672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88750f7d4f6c9e13%3A0x6c8b2b3b2f2b0a7!2sSpringfield%2C%20IL!5e0!3m2!1sen!2sus!4v1639586789123!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="St. Michael's Parish Location"
            />
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#1e3a5f] text-white rounded-lg p-8">
            <h3 className="text-white mb-4">Pastoral Emergency</h3>
            <p className="text-gray-200 mb-4">
              If you or a family member are seriously ill, hospitalized, or in
              danger of death, please contact the parish office immediately or
              call our emergency line. A priest is available 24/7 for the
              Sacrament of Anointing of the Sick and spiritual care.
            </p>
            <a
              href="tel:+12175551235"
              className="inline-block px-8 py-3 bg-[#8B2635] text-white rounded-full hover:bg-[#6d1d2a] transition-colors"
            >
              Call Emergency Line
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
