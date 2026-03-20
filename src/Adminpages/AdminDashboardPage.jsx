import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
  Calendar,
  Users,
  Clock,
  PartyPopper,
  MessageSquare,
  UserCheck,
  CalendarCheck,
  Mail,
  ArrowRight,
  Activity,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ── slice imports ─────────────────────────────────────────────
import { fetchAllAppointmentsAdmin } from "../Redux/slice/BookingAppointSlice";
import { fetchAllThanksgivingsAdmin } from "../Redux/slice/thanksgivingSlice";
import { fetchAllEventsAdmin } from "../Redux/slice/Eventslice";
import { fetchAllTestimonialsAdmin } from "../Redux/slice/testimonialSlice";
import { fetchPriestsAdmin } from "../Redux/slice/Priestslice";
import { fetchAllContactsAdmin } from "../Redux/slice/contactsSlice";
import { fetchParishioners } from "../Redux/slice/ParishUserRegistrationSlice";

// ── helpers ───────────────────────────────────────────────────
const getStatusBadge = (status) => {
  const map = {
    pending: "bg-amber-50 text-amber-700 border border-amber-200",
    approved: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    rejected: "bg-red-50 text-red-700 border border-red-200",
    unread: "bg-blue-50 text-blue-700 border border-blue-200",
  };
  return (
    <Badge
      className={`${map[status] || "bg-gray-50 text-gray-700 border border-gray-200"} hover:opacity-90 font-medium text-[11px] px-2 py-0.5`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const getCategoryColor = (category) => {
  const colors = {
    Retreat: "bg-violet-50 text-violet-700",
    Festival: "bg-rose-50 text-rose-700",
    Service: "bg-emerald-50 text-emerald-700",
    Study: "bg-sky-50 text-sky-700",
    Event: "bg-gray-50 text-gray-700",
  };
  return colors[category] || "bg-gray-50 text-gray-700";
};

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

const statusDot = (status) => {
  if (status === "Available") return "bg-emerald-500";
  if (status === "On Leave") return "bg-amber-400";
  return "bg-red-400";
};

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-100 rounded-lg ${className}`} />
);

const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ title, value, loading, icon: Icon, accent, sub, link }) {
  return (
    <Link to={link || "#"}>
      <div className="group bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer h-full">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: accent + "18" }}
          >
            <Icon className="w-5 h-5" style={{ color: accent }} />
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" />
        </div>
        {loading ? (
          <Skeleton className="h-8 w-16 mb-2" />
        ) : (
          <p
            className="text-3xl font-semibold text-[#1e3a5f] mb-1"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {value}
          </p>
        )}
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
          {title}
        </p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </Link>
  );
}

export function AdminDashboardPage() {
  const dispatch = useDispatch();

  const { adminAppointments = [], loading: apptLoading } = useSelector(
    (s) => s.appointment || {},
  );
  const { adminThanksgivings = [], loading: thankLoading } = useSelector(
    (s) => s.thanksgiving || {},
  );
  const { adminEvents = [], loading: eventsLoading } = useSelector(
    (s) => s.event || {},
  );
  const { adminTestimonials = [], loading: reviewsLoading } = useSelector(
    (s) => s.testimonial || {},
  );
  const { adminPriests = [], adminLoading: priestsLoading } = useSelector(
    (s) => s.priest || {},
  );
  const { adminContacts = [], adminLoading: contactsLoading } = useSelector(
    (s) => s.contact || {},
  );
  const { total: totalParishioners = 0 } = useSelector(
    (s) => s.parishRegister || {},
  );

  useEffect(() => {
    dispatch(fetchAllAppointmentsAdmin());
    dispatch(fetchAllThanksgivingsAdmin());
    dispatch(fetchAllEventsAdmin());
    dispatch(fetchAllTestimonialsAdmin());
    dispatch(fetchPriestsAdmin());
    dispatch(fetchAllContactsAdmin());
    dispatch(fetchParishioners({ search: "", page: 1, limit: 10 }));
  }, [dispatch]);

  // ── derived stats ─────────────────────────────────────────
  const pendingAppointments = adminAppointments.filter(
    (a) => a.status === "pending",
  ).length;
  const pendingThanksgivings = adminThanksgivings.filter(
    (t) => t.status === "pending",
  ).length;
  const upcomingEventsCount = adminEvents.filter(
    (e) => e.isPublished && new Date(e.date) >= new Date(),
  ).length;
  const pendingReviews = adminTestimonials.filter(
    (r) => r.status === "pending",
  ).length;
  const activePriests = adminPriests.filter((p) => p.isActive).length;
  const unreadContacts = adminContacts.filter(
    (c) => c.status === "unread",
  ).length;

  const recentAppointments = [...adminAppointments]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const recentThanksgivings = [...adminThanksgivings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const upcomingEvents = adminEvents
    .filter((e) => e.isPublished && new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);

  const recentReviews = [...adminTestimonials]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const activityFeed = [
    ...adminAppointments.slice(0, 3).map((a) => ({
      color: "#3b82f6",
      icon: Calendar,
      text: `New appointment from ${a.name}`,
      sub: a.appointmentType,
      date: a.createdAt,
    })),
    ...adminThanksgivings
      .filter((t) => t.status === "approved")
      .slice(0, 2)
      .map((t) => ({
        color: "#10b981",
        icon: CalendarCheck,
        text: `Mass booking approved for ${t.name}`,
        sub: t.mass?.name || "Mass booking",
        date: t.updatedAt || t.createdAt,
      })),
    ...adminTestimonials.slice(0, 2).map((r) => ({
      color: "#f59e0b",
      icon: MessageSquare,
      text: `Review submitted by ${r.name}`,
      sub: r.role || "Parishioner",
      date: r.createdAt,
    })),
    ...adminContacts
      .filter((c) => c.status === "unread")
      .slice(0, 2)
      .map((c) => ({
        color: "#8b5cf6",
        icon: Mail,
        text: `New message from ${c.name}`,
        sub: c.subject || "No subject",
        date: c.createdAt,
      })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7);

  const stats = [
    {
      title: "Pending Appointments",
      value: pendingAppointments,
      loading: apptLoading,
      icon: Clock,
      accent: "#f97316",
      sub: `${adminAppointments.length} total`,
      link: "/admin/appointments",
    },
    {
      title: "Mass Bookings",
      value: pendingThanksgivings,
      loading: thankLoading,
      icon: CalendarCheck,
      accent: "#3b82f6",
      sub: `${adminThanksgivings.length} total`,
      link: "/admin/mass-bookings",
    },
    {
      title: "Parishioners",
      value: totalParishioners,
      loading: false,
      icon: UserCheck,
      accent: "#8b5cf6",
      sub: "registered members",
      link: "/admin/parishioners",
    },
    {
      title: "Pending Reviews",
      value: pendingReviews,
      loading: reviewsLoading,
      icon: MessageSquare,
      accent: "#10b981",
      sub: `${adminTestimonials.length} total`,
      link: "/admin/reviews",
    },
    {
      title: "Upcoming Events",
      value: upcomingEventsCount,
      loading: eventsLoading,
      icon: PartyPopper,
      accent: "#ec4899",
      sub: `${adminEvents.length} total events`,
      link: "/admin/events",
    },
    {
      title: "Active Priests",
      value: activePriests,
      loading: priestsLoading,
      icon: Users,
      accent: "#6366f1",
      sub: `${adminPriests.length} total`,
      link: "/admin/priests",
    },
    {
      title: "Unread Messages",
      value: unreadContacts,
      loading: contactsLoading,
      icon: Mail,
      accent: "#06b6d4",
      sub: `${adminContacts.length} total`,
      link: "/admin/contacts",
    },
    {
      title: "Total Activities",
      value:
        adminAppointments.length +
        adminThanksgivings.length +
        adminTestimonials.length,
      loading: apptLoading,
      icon: Activity,
      accent: "#8B2635",
      sub: "across all modules",
      link: "/admin/dashboard",
    },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* ── Welcome Banner ──────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e3a5f] via-[#2d5286] to-[#8B2635] p-8 text-white shadow-xl">
        {/* decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-32 w-20 h-20 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-2">
              Parish Administration
            </p>
            <h2
              className="text-3xl md:text-4xl mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Welcome Back
            </h2>
            <p className="text-white/70 text-sm max-w-md">
              Here's a live overview of all parish activities, pending actions,
              and recent submissions.
            </p>
          </div>

          {/* Summary pills */}
          <div className="flex flex-wrap gap-3">
            {[
              {
                label: "Pending",
                value:
                  pendingAppointments + pendingThanksgivings + pendingReviews,
                color: "bg-amber-400/20 text-amber-200 border-amber-400/30",
              },
              {
                label: "Unread",
                value: unreadContacts,
                color: "bg-blue-400/20 text-blue-200 border-blue-400/30",
              },
              {
                label: "Events",
                value: upcomingEventsCount,
                color:
                  "bg-emerald-400/20 text-emerald-200 border-emerald-400/30",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className={`border rounded-xl px-4 py-3 ${color} backdrop-blur-sm`}
              >
                <p className="text-2xl font-bold leading-none mb-0.5">
                  {value}
                </p>
                <p className="text-xs opacity-80 uppercase tracking-wide">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats Grid ──────────────────────────────────────── */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      </div>

      {/* ── Main Content Grid ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments — takes 2 cols */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden h-full">
            <CardHeader className="border-b border-gray-50 bg-white px-6 py-4">
              <div className="flex items-center justify-between">
                <CardTitle
                  className="text-[#1e3a5f] text-base"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Recent Appointments
                </CardTitle>
                <Link
                  to="/admin/appointments"
                  className="flex items-center gap-1 text-xs text-[#8B2635] hover:underline font-medium"
                >
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {apptLoading ? (
                <div className="p-6 space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-36" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : recentAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <Calendar className="w-10 h-10 mb-3 text-gray-200" />
                  <p className="text-sm">No appointments yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {recentAppointments.map((apt) => (
                    <div
                      key={apt._id}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span
                          className="text-white text-sm font-semibold"
                          style={{ fontFamily: "Playfair Display, serif" }}
                        >
                          {apt.name?.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {apt.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {apt.appointmentType} · {formatDate(apt.date)}
                        </p>
                      </div>
                      {getStatusBadge(apt.status)}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed — 1 col */}
        <div>
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden h-full">
            <CardHeader className="border-b border-gray-50 bg-white px-6 py-4">
              <div className="flex items-center justify-between">
                <CardTitle
                  className="text-[#1e3a5f] text-base"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Live Activity
                </CardTitle>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-gray-400">Live</span>
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {activityFeed.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-8">
                  No recent activity
                </p>
              ) : (
                <div className="space-y-3">
                  {activityFeed.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: item.color + "18" }}
                        >
                          <Icon
                            className="w-4 h-4"
                            style={{ color: item.color }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-800 leading-snug">
                            {item.text}
                          </p>
                          <p className="text-xs text-gray-400 truncate mt-0.5">
                            {item.sub}
                          </p>
                          <p className="text-[10px] text-gray-300 mt-1">
                            {timeAgo(item.date)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Second Row ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mass Bookings */}
        <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-50 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle
                className="text-[#1e3a5f] text-base"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Mass Bookings
              </CardTitle>
              <Link
                to="/admin/mass-bookings"
                className="flex items-center gap-1 text-xs text-[#8B2635] hover:underline font-medium"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {thankLoading ? (
              <div className="p-4 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : recentThanksgivings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <CalendarCheck className="w-8 h-8 mb-2 text-gray-200" />
                <p className="text-sm">No bookings yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentThanksgivings.map((b) => (
                  <div
                    key={b._id}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-semibold">
                        {b.name?.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {b.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(b.createdAt)}
                      </p>
                    </div>
                    {getStatusBadge(b.status)}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-50 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle
                className="text-[#1e3a5f] text-base"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Upcoming Events
              </CardTitle>
              <Link
                to="/admin/events"
                className="flex items-center gap-1 text-xs text-[#8B2635] hover:underline font-medium"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {eventsLoading ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))
            ) : upcomingEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <PartyPopper className="w-8 h-8 mb-2 text-gray-200" />
                <p className="text-sm">No upcoming events</p>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div
                  key={event._id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100/70 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#8B2635]/10 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-[#8B2635] uppercase leading-none">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                    <span className="text-sm font-bold text-[#8B2635] leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        className={`${getCategoryColor(event.category)} text-[10px] px-1.5 py-0`}
                      >
                        {event.category}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {event.attendees || 0}/{event.maxAttendees}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Priest Availability */}
        <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-50 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle
                className="text-[#1e3a5f] text-base"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Priest Availability
              </CardTitle>
              <span className="text-xs text-gray-400">
                {activePriests} active
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            {priestsLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))
            ) : adminPriests.filter((p) => p.isActive).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <Users className="w-8 h-8 mb-2 text-gray-200" />
                <p className="text-sm">No active priests</p>
              </div>
            ) : (
              adminPriests
                .filter((p) => p.isActive)
                .slice(0, 5)
                .map((priest) => (
                  <div
                    key={priest._id}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {priest.photo ? (
                        <img
                          src={priest.photo}
                          alt={priest.name}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-gray-100"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-semibold">
                            {priest.name
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {priest.name}
                        </p>
                        <p className="text-xs text-gray-400">{priest.status}</p>
                      </div>
                    </div>
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${statusDot(priest.status)} ring-2 ring-white shadow-sm`}
                    />
                  </div>
                ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Bottom Row: Reviews + Contacts ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reviews */}
        <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-50 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle
                className="text-[#1e3a5f] text-base"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Recent Reviews
              </CardTitle>
              <Link
                to="/admin/reviews"
                className="flex items-center gap-1 text-xs text-[#8B2635] hover:underline font-medium"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {reviewsLoading ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))
            ) : recentReviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <MessageSquare className="w-8 h-8 mb-2 text-gray-200" />
                <p className="text-sm">No reviews yet</p>
              </div>
            ) : (
              recentReviews.map((review) => (
                <div
                  key={review._id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100/70 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">
                      {review.name?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-medium text-gray-900">
                        {review.name}
                      </p>
                      {getStatusBadge(review.status)}
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {review.message}
                    </p>
                    <p className="text-[10px] text-gray-300 mt-1">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Unread Contacts */}
        <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-50 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle
                className="text-[#1e3a5f] text-base"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Unread Messages
              </CardTitle>
              <Link
                to="/admin/contacts"
                className="flex items-center gap-1 text-xs text-[#8B2635] hover:underline font-medium"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {contactsLoading ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))
            ) : adminContacts.filter((c) => c.status === "unread").length ===
              0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <Mail className="w-8 h-8 mb-2 text-gray-200" />
                <p className="text-sm">No unread messages</p>
              </div>
            ) : (
              adminContacts
                .filter((c) => c.status === "unread")
                .slice(0, 4)
                .map((contact) => (
                  <div
                    key={contact._id}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100/70 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#2d5286] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-semibold">
                        {contact.name?.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-medium text-gray-900">
                          {contact.name}
                        </p>
                        <span className="text-[10px] text-gray-400">
                          {timeAgo(contact.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {contact.subject || contact.email}
                      </p>
                    </div>
                  </div>
                ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
