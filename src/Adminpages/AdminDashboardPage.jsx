import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  Users,
  Clock,
  Star,
  PartyPopper,
  MessageSquare,
  UserCheck,
  TrendingUp,
  CalendarCheck,
  Mail,
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
    pending: "bg-orange-100 text-orange-700",
    approved: "bg-green-100 text-green-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };
  return (
    <Badge
      className={`${map[status] || "bg-gray-100 text-gray-700"} hover:opacity-90`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const renderStars = (rating) => (
  <div className="flex items-center space-x-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-3 h-3 ${star <= rating ? "fill-[#d4af37] text-[#d4af37]" : "text-gray-300"}`}
      />
    ))}
  </div>
);

const getCategoryColor = (category) => {
  const colors = {
    Retreat: "bg-purple-100 text-purple-700",
    Festival: "bg-pink-100 text-pink-700",
    Service: "bg-green-100 text-green-700",
    Study: "bg-blue-100 text-blue-700",
    Event: "bg-gray-100 text-gray-700",
  };
  return colors[category] || "bg-gray-100 text-gray-700";
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
  if (status === "Available") return "bg-green-500";
  if (status === "On Leave") return "bg-yellow-500";
  return "bg-red-400";
};

// ── skeleton helpers ──────────────────────────────────────────
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export function AdminDashboardPage() {
  const dispatch = useDispatch();

  // ── selectors ─────────────────────────────────────────────
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

  // ── fetch all on mount ────────────────────────────────────
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

  const approvedReviews = adminTestimonials.filter(
    (r) => r.status === "approved",
  );
  const avgRating =
    approvedReviews.length > 0
      ? (
          approvedReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
          approvedReviews.length
        ).toFixed(1)
      : "—";

  const thisWeekTotal =
    pendingAppointments +
    pendingThanksgivings +
    pendingReviews +
    unreadContacts;

  // ── quick actions (live counts) ────────────────────────────
  const quickActions = [
    {
      title: "View Appointments",
      description: "Manage sacrament appointments",
      icon: Calendar,
      link: "/admin/appointments",
      color: "bg-blue-500",
      count: `${pendingAppointments} pending`,
    },
    {
      title: "Mass Bookings",
      description: "Review mass booking requests",
      icon: CalendarCheck,
      link: "/admin/mass-bookings",
      color: "bg-purple-500",
      count: `${pendingThanksgivings} pending`,
    },
    {
      title: "Moderate Reviews",
      description: "Approve parishioner testimonials",
      icon: MessageSquare,
      link: "/admin/reviews",
      color: "bg-green-500",
      count: `${pendingReviews} pending`,
    },
    {
      title: "Manage Events",
      description: "Add and update parish events",
      icon: PartyPopper,
      link: "/admin/events",
      color: "bg-pink-500",
      count: `${upcomingEventsCount} upcoming`,
    },
  ];

  // ── stat cards config ─────────────────────────────────────
  const stats = [
    {
      title: "Pending Appointments",
      value: pendingAppointments,
      loading: apptLoading,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: `${adminAppointments.length} total`,
      trend: pendingAppointments > 0 ? "up" : "neutral",
    },
    {
      title: "Mass Bookings",
      value: pendingThanksgivings,
      loading: thankLoading,
      icon: CalendarCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: `${adminThanksgivings.length} total`,
      trend: "neutral",
    },
    {
      title: "Total Parishioners",
      value: totalParishioners,
      loading: false,
      icon: UserCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "registered members",
      trend: "up",
    },
    {
      title: "Pending Reviews",
      value: pendingReviews,
      loading: reviewsLoading,
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: `${adminTestimonials.length} total`,
      trend: pendingReviews > 0 ? "up" : "neutral",
    },
    {
      title: "Upcoming Events",
      value: upcomingEventsCount,
      loading: eventsLoading,
      icon: PartyPopper,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      change: `${adminEvents.length} total events`,
      trend: "neutral",
    },
    {
      title: "Average Rating",
      value: avgRating,
      loading: reviewsLoading,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      change: `From ${approvedReviews.length} reviews`,
      trend: "up",
    },
    {
      title: "Active Priests",
      value: activePriests,
      loading: priestsLoading,
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      change: `${adminPriests.length} total priests`,
      trend: "neutral",
    },
    {
      title: "Unread Messages",
      value: unreadContacts,
      loading: contactsLoading,
      icon: Mail,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      change: `${adminContacts.length} total messages`,
      trend: unreadContacts > 0 ? "up" : "neutral",
    },
  ];

  // ── recent slices ─────────────────────────────────────────
  const recentAppointments = [...adminAppointments]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const recentThanksgivings = [...adminThanksgivings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const upcomingEvents = adminEvents
    .filter((e) => e.isPublished && new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const recentReviews = [...adminTestimonials]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  // ── activity feed: merge recent items from all slices ─────
  const activityFeed = [
    ...adminAppointments.slice(0, 3).map((a) => ({
      color: "bg-blue-500",
      text: (
        <>
          <span className="font-medium">New appointment</span> from {a.name} —{" "}
          {a.appointmentType}
        </>
      ),
      date: a.createdAt,
    })),
    ...adminThanksgivings
      .filter((t) => t.status === "approved")
      .slice(0, 2)
      .map((t) => ({
        color: "bg-green-500",
        text: (
          <>
            <span className="font-medium">Mass booking approved</span> for{" "}
            {t.name}
          </>
        ),
        date: t.updatedAt || t.createdAt,
      })),
    ...adminTestimonials.slice(0, 2).map((r) => ({
      color: "bg-yellow-500",
      text: (
        <>
          <span className="font-medium">Review submitted</span> by {r.name}
          {r.rating ? ` — ${r.rating} stars` : ""}
        </>
      ),
      date: r.createdAt,
    })),
    ...adminEvents.slice(0, 2).map((e) => ({
      color: "bg-purple-500",
      text: (
        <>
          <span className="font-medium">Event: </span>
          {e.title}
        </>
      ),
      date: e.createdAt,
    })),
    ...adminContacts.slice(0, 2).map((c) => ({
      color: "bg-pink-500",
      text: (
        <>
          <span className="font-medium">Message received</span> from {c.name}
        </>
      ),
      date: c.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  const timeAgo = (dateStr) => {
    if (!dateStr) return "";
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#8B2635] rounded-lg p-6 text-white shadow-lg">
        <h2
          className="text-2xl mb-2"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Welcome to Parish Admin Dashboard
        </h2>
        <p className="text-gray-100">
          Here's a live overview of your parish activities and pending actions
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="border-0 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    {stat.loading ? (
                      <Skeleton className="h-9 w-14 mb-1" />
                    ) : (
                      <h3
                        className="text-3xl text-[#1e3a5f] mb-1"
                        style={{ fontFamily: "Playfair Display, serif" }}
                      >
                        {stat.value}
                      </h3>
                    )}
                    <div className="flex items-center space-x-1">
                      {stat.trend === "up" && (
                        <TrendingUp className="w-3 h-3 text-green-600" />
                      )}
                      <p className="text-xs text-gray-500">{stat.change}</p>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle
            className="text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <a
                  key={index}
                  href={action.link}
                  className="group relative overflow-hidden rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`${action.color} p-2 rounded-lg text-white`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-[#8B2635] transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        {action.description}
                      </p>
                      <Badge className="text-xs">{action.count}</Badge>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Two Column: Appointments + Mass Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <Card className="border-0 shadow-md">
          <CardHeader className="border-b bg-gray-50 flex flex-row items-center justify-between">
            <CardTitle
              className="text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Recent Appointments
            </CardTitle>
            <a
              href="/admin/appointments"
              className="text-sm text-[#8B2635] hover:underline"
            >
              View all
            </a>
          </CardHeader>
          <CardContent className="p-0">
            {apptLoading ? (
              <div className="p-4 space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                ))}
              </div>
            ) : recentAppointments.length === 0 ? (
              <p className="p-6 text-center text-sm text-gray-400">
                No appointments yet
              </p>
            ) : (
              <div className="divide-y divide-gray-200">
                {recentAppointments.map((apt) => (
                  <div
                    key={apt._id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center flex-shrink-0">
                          <span
                            className="text-white text-sm"
                            style={{ fontFamily: "Playfair Display, serif" }}
                          >
                            {apt.name?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {apt.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {apt.appointmentType}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(apt.status)}
                    </div>
                    <p className="text-xs text-gray-500 ml-13 pl-[52px]">
                      {formatDate(apt.date)} {apt.time ? `at ${apt.time}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Mass Bookings */}
        <Card className="border-0 shadow-md">
          <CardHeader className="border-b bg-gray-50 flex flex-row items-center justify-between">
            <CardTitle
              className="text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Recent Mass Bookings
            </CardTitle>
            <a
              href="/admin/mass-bookings"
              className="text-sm text-[#8B2635] hover:underline"
            >
              View all
            </a>
          </CardHeader>
          <CardContent className="p-0">
            {thankLoading ? (
              <div className="p-4 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                ))}
              </div>
            ) : recentThanksgivings.length === 0 ? (
              <p className="p-6 text-center text-sm text-gray-400">
                No bookings yet
              </p>
            ) : (
              <div className="divide-y divide-gray-200">
                {recentThanksgivings.map((booking) => (
                  <div
                    key={booking._id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] flex items-center justify-center flex-shrink-0">
                          <span
                            className="text-white text-sm"
                            style={{ fontFamily: "Playfair Display, serif" }}
                          >
                            {booking.name?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {booking.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {booking.mass?.name || "Mass Booking"}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                    <p className="text-xs text-gray-500 pl-[52px]">
                      {formatDate(booking.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Three Column: Events + Reviews + Priests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <Card className="border-0 shadow-md">
          <CardHeader className="border-b bg-gray-50 flex flex-row items-center justify-between">
            <CardTitle
              className="text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Upcoming Events
            </CardTitle>
            <a
              href="/admin/events"
              className="text-sm text-[#8B2635] hover:underline"
            >
              View all
            </a>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {eventsLoading ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))
            ) : upcomingEvents.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-4">
                No upcoming events
              </p>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event._id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 flex-1 line-clamp-1">
                      {event.title}
                    </h4>
                    <Badge
                      className={`${getCategoryColor(event.category)} text-xs ml-2 flex-shrink-0`}
                    >
                      {event.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    {formatDate(event.date)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {event.attendees || 0} / {event.maxAttendees}
                    </span>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-[#8B2635] h-1.5 rounded-full"
                        style={{
                          width: `${Math.min(((event.attendees || 0) / event.maxAttendees) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card className="border-0 shadow-md">
          <CardHeader className="border-b bg-gray-50 flex flex-row items-center justify-between">
            <CardTitle
              className="text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Recent Reviews
            </CardTitle>
            <a
              href="/admin/reviews"
              className="text-sm text-[#8B2635] hover:underline"
            >
              View all
            </a>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {reviewsLoading ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))
            ) : recentReviews.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-4">
                No reviews yet
              </p>
            ) : (
              recentReviews.map((review) => (
                <div key={review._id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center flex-shrink-0">
                        <span
                          className="text-white text-xs"
                          style={{ fontFamily: "Playfair Display, serif" }}
                        >
                          {review.name?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {review.name}
                        </p>
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    {getStatusBadge(review.status)}
                  </div>
                  <p className="text-xs text-gray-700 mt-1 line-clamp-2">
                    {review.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(review.createdAt)}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Priest Availability — live from Redux */}
        <Card className="border-0 shadow-md">
          <CardHeader className="border-b bg-gray-50">
            <CardTitle
              className="text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Priest Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {priestsLoading ? (
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="w-3 h-3 rounded-full" />
                </div>
              ))
            ) : adminPriests.filter((p) => p.isActive).length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-4">
                No active priests
              </p>
            ) : (
              adminPriests
                .filter((p) => p.isActive)
                .slice(0, 5)
                .map((priest) => (
                  <div
                    key={priest._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {priest.photo ? (
                        <img
                          src={priest.photo}
                          alt={priest.name}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] flex items-center justify-center flex-shrink-0">
                          <span
                            className="text-white text-sm"
                            style={{ fontFamily: "Playfair Display, serif" }}
                          >
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
                        <p className="text-xs text-gray-500">{priest.status}</p>
                      </div>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${statusDot(priest.status)}`}
                    />
                  </div>
                ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed — derived from real Redux data */}
      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle
            className="text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {activityFeed.length === 0 ? (
            <p className="text-center text-sm text-gray-400">
              No recent activity to show
            </p>
          ) : (
            <div className="space-y-4">
              {activityFeed.map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${item.color}`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{item.text}</p>
                    <p className="text-xs text-gray-400">
                      {timeAgo(item.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
