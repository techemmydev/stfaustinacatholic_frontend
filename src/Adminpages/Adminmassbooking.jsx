import { useState } from "react";
import {
  Search,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Check,
  X,
  Eye,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export function AdminMassBooking() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMassType, setFilterMassType] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Mock data - replace with API call
  const [bookings, setBookings] = useState([
    {
      id: 1,
      parishionerName: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "+1 (555) 123-4567",
      massType: "Thanksgiving Mass",
      date: "2026-02-20",
      time: "10:00 AM",
      intention: "Thanksgiving for family blessings and good health",
      numberOfAttendees: 15,
      specialRequests: "Please include special prayer for my mother",
      status: "pending",
      submittedAt: "2026-02-08 09:30 AM",
    },
    {
      id: 2,
      parishionerName: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 234-5678",
      massType: "Memorial Mass",
      date: "2026-02-25",
      time: "9:00 AM",
      intention: "In loving memory of my father, Robert Doe",
      numberOfAttendees: 30,
      specialRequests: "Family will provide flowers",
      status: "approved",
      submittedAt: "2026-02-01 02:15 PM",
    },
    {
      id: 3,
      parishionerName: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 345-6789",
      massType: "Anniversary Mass",
      date: "2026-03-10",
      time: "11:00 AM",
      intention: "50th Wedding Anniversary celebration",
      numberOfAttendees: 40,
      specialRequests: "Would like to renew vows during mass",
      status: "pending",
      submittedAt: "2026-02-07 11:20 AM",
    },
    {
      id: 4,
      parishionerName: "Michael Chen",
      email: "michael.c@email.com",
      phone: "+1 (555) 456-7890",
      massType: "Healing Mass",
      date: "2026-02-18",
      time: "6:00 PM",
      intention: "For healing and recovery of my sister",
      numberOfAttendees: 10,
      specialRequests: "None",
      status: "rejected",
      submittedAt: "2026-02-05 04:30 PM",
    },
    {
      id: 5,
      parishionerName: "Emily Rodriguez",
      email: "emily.r@email.com",
      phone: "+1 (555) 567-8901",
      massType: "Thanksgiving Mass",
      date: "2026-02-22",
      time: "8:00 AM",
      intention: "Thanksgiving for successful business venture",
      numberOfAttendees: 20,
      specialRequests: "None",
      status: "pending",
      submittedAt: "2026-02-08 10:45 AM",
    },
  ]);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setDialogOpen(true);
  };

  const handleApprove = (id) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: "approved" } : booking,
      ),
    );
    toast.success("Mass booking approved successfully");
    setDialogOpen(false);
  };

  const handleReject = (id) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: "rejected" } : booking,
      ),
    );
    toast.error("Mass booking rejected");
    setDialogOpen(false);
  };

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

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.parishionerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.massType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMassType =
      filterMassType === "all" || booking.massType === filterMassType;
    const matchesTab = activeTab === "all" || booking.status === activeTab;

    return matchesSearch && matchesMassType && matchesTab;
  });

  const bookingCounts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    approved: bookings.filter((b) => b.status === "approved").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle
            className="text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Mass Booking Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name, email, or mass type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <Select value={filterMassType} onValueChange={setFilterMassType}>
              <SelectTrigger className="w-full md:w-56 h-11">
                <SelectValue placeholder="Filter by mass type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Mass Types</SelectItem>
                <SelectItem value="Thanksgiving Mass">
                  Thanksgiving Mass
                </SelectItem>
                <SelectItem value="Memorial Mass">Memorial Mass</SelectItem>
                <SelectItem value="Anniversary Mass">
                  Anniversary Mass
                </SelectItem>
                <SelectItem value="Healing Mass">Healing Mass</SelectItem>
                <SelectItem value="Birthday Mass">Birthday Mass</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {bookingCounts.all}
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {bookingCounts.pending}
                </h3>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Filter className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {bookingCounts.approved}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rejected</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {bookingCounts.rejected}
                </h3>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <X className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Status Filtering */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-white border shadow-sm p-1">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-[#8B2635] data-[state=active]:text-white"
          >
            All ({bookingCounts.all})
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
          >
            Pending ({bookingCounts.pending})
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            Approved ({bookingCounts.approved})
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            Rejected ({bookingCounts.rejected})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredBookings.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3
                  className="text-xl text-gray-600 mb-2"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  No mass bookings found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Parishioner
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Mass Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Attendees
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center">
                                <span
                                  className="text-white text-sm"
                                  style={{
                                    fontFamily: "Playfair Display, serif",
                                  }}
                                >
                                  {booking.parishionerName.charAt(0)}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm text-gray-900">
                                  {booking.parishionerName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {booking.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {booking.massType}
                            </div>
                            <div className="text-xs text-gray-500 max-w-xs truncate">
                              {booking.intention}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {booking.date}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.time}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {booking.numberOfAttendees} people
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(booking.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewDetails(booking)}
                                className="hover:bg-gray-100"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {booking.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleApprove(booking.id)}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleReject(booking.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Mass Booking Details
            </DialogTitle>
            <DialogDescription>
              Review and manage this mass booking request
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Current Status</span>
                {getStatusBadge(selectedBooking.status)}
              </div>

              {/* Parishioner Information */}
              <div className="space-y-4">
                <h4
                  className="text-lg text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Parishioner Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-[#8B2635] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Full Name</p>
                      <p className="text-sm text-gray-900">
                        {selectedBooking.parishionerName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-[#8B2635] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Email Address
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedBooking.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-[#8B2635] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                      <p className="text-sm text-gray-900">
                        {selectedBooking.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-[#8B2635] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Number of Attendees
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedBooking.numberOfAttendees} people
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mass Details */}
              <div className="space-y-4">
                <h4
                  className="text-lg text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Mass Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-[#8B2635] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Mass Type</p>
                      <p className="text-sm text-gray-900">
                        {selectedBooking.massType}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-[#8B2635] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Date & Time</p>
                      <p className="text-sm text-gray-900">
                        {selectedBooking.date} at {selectedBooking.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Intention */}
              <div className="space-y-2">
                <h4
                  className="text-lg text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Mass Intention
                </h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {selectedBooking.intention}
                  </p>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <h4
                  className="text-lg text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Special Requests
                </h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {selectedBooking.specialRequests}
                  </p>
                </div>
              </div>

              {/* Submission Time */}
              <div className="text-sm text-gray-500">
                Submitted on: {selectedBooking.submittedAt}
              </div>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
            {selectedBooking?.status === "pending" && (
              <>
                <Button
                  onClick={() => handleReject(selectedBooking.id)}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedBooking.id)}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
