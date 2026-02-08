import { Calendar, Users, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AdminDashboardPage() {
  const stats = [
    {
      title: "Pending Appointments",
      value: "12",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+3 today",
    },
    {
      title: "Approved Today",
      value: "8",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+2 from yesterday",
    },
    {
      title: "Total This Week",
      value: "45",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12 from last week",
    },
    {
      title: "Active Priests",
      value: "5",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "All available",
    },
  ];

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

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 font-inter">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 font-inter">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 font-inter">
            Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="border-0 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <h3
                      className="text-3xl text-[#1e3a5f] mb-1"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {stat.value}
                    </h3>
                    <p className="text-xs text-gray-500">{stat.change}</p>
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

      {/* Recent Appointments */}
      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle
            className="text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Recent Appointments
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Parishioner
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Service Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Priest
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center">
                          <span
                            className="text-white text-sm"
                            style={{ fontFamily: "Playfair Display, serif" }}
                          >
                            {appointment.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm text-gray-900">
                            {appointment.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {appointment.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {appointment.date}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.priest}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(appointment.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader className="border-b bg-gray-50">
            <CardTitle
              className="text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Upcoming Mass Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">Sunday Mass</p>
                  <p className="text-xs text-gray-500">
                    February 9, 2026 - 8:00 AM
                  </p>
                </div>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  Tomorrow
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">Weekday Mass</p>
                  <p className="text-xs text-gray-500">
                    February 10, 2026 - 7:00 AM
                  </p>
                </div>
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                  Mon
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">Evening Mass</p>
                  <p className="text-xs text-gray-500">
                    February 10, 2026 - 6:00 PM
                  </p>
                </div>
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                  Mon
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="border-b bg-gray-50">
            <CardTitle
              className="text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Priest Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] flex items-center justify-center">
                    <span
                      className="text-white text-sm"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      JS
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-900">Fr. John Smith</p>
                    <p className="text-xs text-gray-500">Available</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] flex items-center justify-center">
                    <span
                      className="text-white text-sm"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      MB
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-900">Fr. Michael Brown</p>
                    <p className="text-xs text-gray-500">Available</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] flex items-center justify-center">
                    <span
                      className="text-white text-sm"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      DW
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-900">Fr. David Wilson</p>
                    <p className="text-xs text-gray-500">On leave</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
