import { Link } from "react-router";
import logo from "../assets/images/stfaustinaimage.png";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  Clock,
} from "lucide-react";

export function Footer() {
  return (
    <footer style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      {/* ── MAIN FOOTER BODY ──────────────────────────────────── */}
      <div style={{ background: "#0f2240", borderTop: "3px solid #c9a84c" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* ── Col 1: Brand ── */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={logo}
                  alt="Sts. Peter & Paul Parish"
                  className="w-12 h-12 object-cover"
                  style={{ border: "2px solid #c9a84c" }}
                />
                <div>
                  <h3
                    className="font-bold leading-tight text-white"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Sts. Peter &amp; Paul
                  </h3>
                  <p
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    Catholic Parish
                  </p>
                </div>
              </div>

              <p
                className="text-sm leading-relaxed mb-6"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "sans-serif",
                  fontWeight: 300,
                }}
              >
                A welcoming Catholic community dedicated to faith, worship, and
                service — rooted in the tradition of the Apostles Peter and
                Paul.
              </p>

              {/* Social icons */}
              <div className="flex gap-3">
                {[
                  { href: "https://facebook.com", Icon: Facebook },
                  { href: "https://instagram.com", Icon: Instagram },
                  { href: "https://youtube.com", Icon: Youtube },
                ].map(({ href, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center transition-all"
                    style={{
                      border: "1px solid rgba(201,168,76,0.3)",
                      color: "rgba(255,255,255,0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#c9a84c";
                      e.currentTarget.style.color = "#0a0a0a";
                      e.currentTarget.style.borderColor = "#c9a84c";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                      e.currentTarget.style.borderColor =
                        "rgba(201,168,76,0.3)";
                    }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Col 2: Quick Links ── */}
            <div>
              <p
                className="text-xs tracking-[0.25em] uppercase mb-2"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Navigate
              </p>
              <h4
                className="font-bold mb-5 text-white"
                style={{ fontSize: "1rem" }}
              >
                Quick Links
              </h4>
              <div
                className="mb-5"
                style={{ height: "1px", background: "rgba(201,168,76,0.2)" }}
              />
              <ul className="flex flex-col gap-3">
                {[
                  { label: "About Us", to: "/about" },
                  { label: "Sacraments", to: "/sacraments" },
                  { label: "Mass Schedule", to: "/mass-schedule" },
                  { label: "Book Appointment", to: "/book-appointment" },
                  { label: "Sermons & Media", to: "/sermons" },
                  { label: "Parish Registration", to: "/register" },
                  { label: "Contact Us", to: "/contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="flex items-center gap-2 text-sm group transition-all"
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "sans-serif",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#c9a84c")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                      }
                    >
                      <ArrowRight
                        size={12}
                        style={{ color: "#c9a84c", flexShrink: 0 }}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Contact ── */}
            <div>
              <p
                className="text-xs tracking-[0.25em] uppercase mb-2"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Get In Touch
              </p>
              <h4
                className="font-bold mb-5 text-white"
                style={{ fontSize: "1rem" }}
              >
                Contact Us
              </h4>
              <div
                className="mb-5"
                style={{ height: "1px", background: "rgba(201,168,76,0.2)" }}
              />
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <MapPin
                    size={14}
                    style={{
                      color: "#c9a84c",
                      marginTop: "3px",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="text-sm leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: "sans-serif",
                    }}
                  >
                    123 Church Street
                    <br />
                    Springfield, IL 62701
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone
                    size={14}
                    style={{ color: "#c9a84c", flexShrink: 0 }}
                  />
                  <a
                    href="tel:+12175551234"
                    className="text-sm transition-colors"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: "sans-serif",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#c9a84c")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                    }
                  >
                    (217) 555-1234
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={14} style={{ color: "#c9a84c", flexShrink: 0 }} />
                  <a
                    href="mailto:info@sspeterandpaul.org"
                    className="text-sm transition-colors"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: "sans-serif",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#c9a84c")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                    }
                  >
                    info@sspeterandpaul.org
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock
                    size={14}
                    style={{
                      color: "#c9a84c",
                      marginTop: "3px",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="text-sm leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Mon – Fri: 9:00 AM – 5:00 PM
                    <br />
                    Saturday: 10:00 AM – 2:00 PM
                    <br />
                    Sunday: Closed
                  </span>
                </li>
              </ul>
            </div>

            {/* ── Col 4: Newsletter ── */}
            <div>
              <p
                className="text-xs tracking-[0.25em] uppercase mb-2"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Stay Connected
              </p>
              <h4
                className="font-bold mb-5 text-white"
                style={{ fontSize: "1rem" }}
              >
                Parish Newsletter
              </h4>
              <div
                className="mb-5"
                style={{ height: "1px", background: "rgba(201,168,76,0.2)" }}
              />
              <p
                className="text-sm leading-relaxed mb-5"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "sans-serif",
                }}
              >
                Receive weekly bulletins, upcoming events, and spiritual
                reflections directly in your inbox.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                    fontFamily: "sans-serif",
                  }}
                />
                <button
                  className="w-full py-3 text-xs font-bold tracking-widest uppercase transition-all"
                  style={{
                    background: "#c9a84c",
                    color: "#0a0a0a",
                    fontFamily: "sans-serif",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#b8962e")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#c9a84c")
                  }
                >
                  Subscribe
                </button>
              </div>
              <p
                className="text-xs mt-3"
                style={{
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: "sans-serif",
                }}
              >
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        />

        {/* ── Bottom bar ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-center md:text-left"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "sans-serif" }}
          >
            &copy; {new Date().getFullYear()} Sts. Peter &amp; Paul Catholic
            Parish. All rights reserved.
          </p>
          <p
            className="text-xs italic text-center"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            "You are Peter, and upon this rock I will build my Church." —
            Matthew 16:18
          </p>
        </div>
      </div>
    </footer>
  );
}
