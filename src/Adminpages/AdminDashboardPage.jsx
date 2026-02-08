import {
  Calendar,
  Users,
  Clock,
  CheckCircle,
  Star,
  PartyPopper,
  MessageSquare,
  UserCheck,
  TrendingUp,
  CalendarCheck,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AdminDashboardPage() {
  // Statistics data
  const stats = [
    {
      title: "Pending Appointments",
      value: "12",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+3 today",
      trend: "up",
    },
    {
      title: "Mass Bookings",
      value: "8",
      icon: CalendarCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "3 pending",
      trend: "neutral",
    },
    {
      title: "Total Parishioners",
      value: "342",
      icon: UserCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+15 this month",
      trend: "up",
    },
    {
      title: "Pending Reviews",
      value: "5",
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "2 new today",
      trend: "up",
    },
    {
      title: "Upcoming Events",
      value: "6",
      icon: PartyPopper,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      change: "Next: Feb 15",
      trend: "neutral",
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      change: "From 127 reviews",
      trend: "up",
    },
    {
      title: "Active Priests",
      value: "5",
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      change: "All available",
      trend: "neutral",
    },
    {
      title: "This Week Total",
      value: "45",
      icon: TrendingUp,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      change: "+12 from last week",
      trend: "up",
    },
  ];

  // Recent appointments
  const recentAppointments = [
    {
      id: 1,
      name: "Maria Santos",
      type: "Baptism",
      date: "2026-02-15",
      time: "10:00 AM",
      priest: "Fr. John Smith",
      status: "pending",
    },
    {
      id: 2,
      name: "John Doe",
      type: "Confession",
      date: "2026-02-14",
      time: "2:00 PM",
      priest: "Fr. Michael Brown",
      status: "pending",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      type: "Wedding",
      date: "2026-03-20",
      time: "11:00 AM",
      priest: "Fr. David Wilson",
      status: "approved",
    },
    {
      id: 4,
      name: "Robert Lee",
      type: "Mass Intention",
      date: "2026-02-12",
      time: "9:00 AM",
      priest: "Fr. John Smith",
      status: "approved",
    },
  ];

  // Recent mass bookings
  const recentMassBookings = [
    {
      id: 1,
      name: "Emily Rodriguez",
      massType: "Thanksgiving Mass",
      date: "2026-02-22",
      attendees: 20,
      status: "pending",
    },
    {
      id: 2,
      name: "Michael Chen",
      massType: "Memorial Mass",
      date: "2026-02-25",
      attendees: 30,
      status: "approved",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      massType: "Anniversary Mass",
      date: "2026-03-10",
      attendees: 40,
      status: "pending",
    },
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Parish Youth Retreat",
      date: "2026-03-15",
      attendees: 45,
      maxAttendees: 60,
      category: "Retreat",
    },
    {
      id: 2,
      title: "Annual Parish Festival",
      date: "2026-04-20",
      attendees: 250,
      maxAttendees: 500,
      category: "Festival",
    },
    {
      id: 3,
      title: "Community Service Day",
      date: "2026-03-05",
      attendees: 35,
      maxAttendees: 50,
      category: "Service",
    },
  ];

  // Recent reviews
  const recentReviews = [
    {
      id: 1,
      name: "Maria Santos",
      rating: 5,
      title: "Wonderful Parish Community",
      status: "pending",
      date: "2026-02-08",
    },
    {
      id: 2,
      name: "John Doe",
      rating: 4,
      title: "Great Youth Programs",
      status: "approved",
      date: "2026-02-07",
    },
    {
      id: 3,
      name: "Robert Taylor",
      rating: 5,
      title: "Outstanding Outreach Programs",
      status: "pending",
      date: "2026-02-08",
    },
  ];

  // Quick actions data
  const quickActions = [
    {
      title: "View Appointments",
      description: "Manage sacrament appointments",
      icon: Calendar,
      link: "/admin/appointments",
      color: "bg-blue-500",
      count: "12 pending",
    },
    {
      title: "Mass Bookings",
      description: "Review mass booking requests",
      icon: CalendarCheck,
      link: "/admin/mass-bookings",
      color: "bg-purple-500",
      count: "3 new",
    },
    {
      title: "Moderate Reviews",
      description: "Approve parishioner testimonials",
      icon: MessageSquare,
      link: "/admin/reviews",
      color: "bg-green-500",
      count: "5 pending",
    },
    {
      title: "Manage Events",
      description: "Add and update parish events",
      icon: PartyPopper,
      link: "/admin/events",
      color: "bg-pink-500",
      count: "6 upcoming",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating ? "fill-[#d4af37] text-[#d4af37]" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      Retreat: "bg-purple-100 text-purple-700",
      Festival: "bg-pink-100 text-pink-700",
      Service: "bg-green-100 text-green-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#8B2635] rounded-lg p-6 text-white shadow-lg">
        <h2
          className="text-2xl mb-2"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Welcome to Parish Admin Dashboard
        </h2>
        <p className="text-gray-100">
          Here's an overview of your parish activities and pending actions
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
                    <h3
                      className="text-3xl text-[#1e3a5f] mb-1"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {stat.value}
                    </h3>
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

      {/* Two Column Layout */}
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
            <div className="divide-y divide-gray-200">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center">
                        <span
                          className="text-white text-sm"
                          style={{ fontFamily: "Playfair Display, serif" }}
                        >
                          {appointment.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {appointment.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {appointment.type}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </div>
                  <div className="ml-13 text-xs text-gray-600 space-y-1">
                    <p>
                      {appointment.date} at {appointment.time}
                    </p>
                    <p>{appointment.priest}</p>
                  </div>
                </div>
              ))}
            </div>
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
            <div className="divide-y divide-gray-200">
              {recentMassBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] flex items-center justify-center">
                        <span
                          className="text-white text-sm"
                          style={{ fontFamily: "Playfair Display, serif" }}
                        >
                          {booking.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {booking.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {booking.massType}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                  <div className="ml-13 text-xs text-gray-600 space-y-1">
                    <p>{booking.date}</p>
                    <p>{booking.attendees} attendees expected</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Three Column Layout */}
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
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900 flex-1">
                    {event.title}
                  </h4>
                  <Badge
                    className={`${getCategoryColor(event.category)} text-xs ml-2`}
                  >
                    {event.category}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{event.date}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {event.attendees} / {event.maxAttendees}
                  </span>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-[#8B2635] h-1.5 rounded-full"
                      style={{
                        width: `${(event.attendees / event.maxAttendees) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
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
            {recentReviews.map((review) => (
              <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center">
                      <span
                        className="text-white text-xs"
                        style={{ fontFamily: "Playfair Display, serif" }}
                      >
                        {review.name.charAt(0)}
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
                <p className="text-xs text-gray-700 mb-1 line-clamp-2">
                  {review.title}
                </p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Priest Availability */}
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
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] flex items-center justify-center">
                  <span
                    className="text-white text-sm"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    JS
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Fr. John Smith
                  </p>
                  <p className="text-xs text-gray-500">12 appointments</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] flex items-center justify-center">
                  <span
                    className="text-white text-sm"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    MB
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Fr. Michael Brown
                  </p>
                  <p className="text-xs text-gray-500">8 appointments</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] flex items-center justify-center">
                  <span
                    className="text-white text-sm"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    DW
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Fr. David Wilson
                  </p>
                  <p className="text-xs text-gray-500">On leave</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
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
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Mass booking approved</span> for
                  Emily Rodriguez
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">New appointment request</span>{" "}
                  from Maria Santos
                </p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-purple-500"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">New event created:</span> Parish
                  Youth Retreat
                </p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Review submitted</span> by John
                  Doe - 4 stars
                </p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-pink-500"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">
                    New parishioner registered:
                  </span>{" "}
                  Robert Taylor
                </p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
