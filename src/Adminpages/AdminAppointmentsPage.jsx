import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Check,
  X,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
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

export function AdminAppointmentsPage() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Mock data - would come from backend in production
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "+1 (555) 123-4567",
      type: "Baptism",
      date: "2026-02-15",
      time: "10:00 AM",
      priest: "Fr. John Smith",
      status: "pending",
      notes: "First child baptism. Family would like a small ceremony.",
      submittedAt: "2026-02-08 09:30 AM",
      address: "123 Main St, City, State 12345",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 234-5678",
      type: "Confession",
      date: "2026-02-14",
      time: "2:00 PM",
      priest: "Fr. Michael Brown",
      status: "pending",
      notes: "Regular confession appointment.",
      submittedAt: "2026-02-08 10:15 AM",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 345-6789",
      type: "Wedding",
      date: "2026-03-20",
      time: "11:00 AM",
      priest: "Fr. David Wilson",
      status: "approved",
      notes: "Pre-Cana classes completed. Reception at local hall.",
      submittedAt: "2026-01-15 02:20 PM",
      address: "456 Oak Ave, City, State 12345",
    },
    {
      id: 4,
      name: "Robert Lee",
      email: "robert.lee@email.com",
      phone: "+1 (555) 456-7890",
      type: "Mass Intention",
      date: "2026-02-12",
      time: "9:00 AM",
      priest: "Fr. John Smith",
      status: "approved",
      notes: "In memory of grandmother.",
      submittedAt: "2026-02-01 11:45 AM",
    },
    {
      id: 5,
      name: "Emily Chen",
      email: "emily.chen@email.com",
      phone: "+1 (555) 567-8901",
      type: "First Communion",
      date: "2026-04-05",
      time: "10:30 AM",
      priest: "Fr. Michael Brown",
      status: "pending",
      notes: "Child has completed religious education classes.",
      submittedAt: "2026-02-08 01:00 PM",
    },
    {
      id: 6,
      name: "Michael Torres",
      email: "michael.t@email.com",
      phone: "+1 (555) 678-9012",
      type: "Anointing of the Sick",
      date: "2026-02-10",
      time: "3:00 PM",
      priest: "Fr. John Smith",
      status: "rejected",
      notes: "Rescheduled to different date.",
      submittedAt: "2026-02-05 04:30 PM",
    },
  ]);

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setDialogOpen(true);
  };

  const handleApprove = (id) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "approved" } : apt)),
    );
    toast.success("Appointment approved successfully");
    setDialogOpen(false);
  };

  const handleReject = (id) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "rejected" } : apt)),
    );
    toast.error("Appointment rejected");
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

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === "all" || apt.type === filterType;
    const matchesStatus = filterStatus === "all" || apt.status === filterStatus;
    const matchesTab = activeTab === "all" || apt.status === activeTab;

    return matchesSearch && matchesType && matchesStatus && matchesTab;
  });

  const appointmentCounts = {
    all: appointments.length,
    pending: appointments.filter((apt) => apt.status === "pending").length,
    approved: appointments.filter((apt) => apt.status === "approved").length,
    rejected: appointments.filter((apt) => apt.status === "rejected").length,
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
            Appointment Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name, email, or service type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48 h-11">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Baptism">Baptism</SelectItem>
                <SelectItem value="Wedding">Wedding</SelectItem>
                <SelectItem value="Confession">Confession</SelectItem>
                <SelectItem value="Mass Intention">Mass Intention</SelectItem>
                <SelectItem value="First Communion">First Communion</SelectItem>
                <SelectItem value="Anointing of the Sick">Anointing</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 h-11">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
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
            All ({appointmentCounts.all})
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
          >
            Pending ({appointmentCounts.pending})
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            Approved ({appointmentCounts.approved})
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            Rejected ({appointmentCounts.rejected})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3
                  className="text-xl text-gray-600 mb-2"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  No appointments found
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
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAppointments.map((appointment) => (
                        <tr
                          key={appointment.id}
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
                                  {appointment.name.charAt(0)}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm text-gray-900">
                                  {appointment.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {appointment.email}
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewDetails(appointment)}
                                className="hover:bg-gray-100"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {appointment.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleApprove(appointment.id)
                                    }
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleReject(appointment.id)}
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
              Appointment Details
            </DialogTitle>
            <DialogDescription>
              Review and manage this appointment request
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Current Status</span>
                {getStatusBadge(selectedAppointment.status)}
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h4
                  className="text-lg text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-[#8B2635] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Full Name</p>
                      <p className="text-sm text-gray-900">
                        {selectedAppointment.name}
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
                        {selectedAppointment.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-[#8B2635] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                      <p className="text-sm text-gray-900">
                        {selectedAppointment.phone}
                      </p>
                    </div>
                  </div>
                  {selectedAppointment.address && (
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-[#8B2635] mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Address</p>
                        <p className="text-sm text-gray-900">
                          {selectedAppointment.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Appointment Information */}
              <div className="space-y-4">
                <h4
                  className="text-lg text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Appointment Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-[#8B2635] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Service Type</p>
                      <p className="text-sm text-gray-900">
                        {selectedAppointment.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-[#8B2635] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Assigned Priest
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedAppointment.priest}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-[#8B2635] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Appointment Date
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedAppointment.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-[#8B2635] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Time</p>
                      <p className="text-sm text-gray-900">
                        {selectedAppointment.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <h4
                  className="text-lg text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Additional Notes
                </h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {selectedAppointment.notes}
                  </p>
                </div>
              </div>

              {/* Submission Time */}
              <div className="text-sm text-gray-500">
                Submitted on: {selectedAppointment.submittedAt}
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
            {selectedAppointment?.status === "pending" && (
              <>
                <Button
                  onClick={() => handleReject(selectedAppointment.id)}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedAppointment.id)}
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
