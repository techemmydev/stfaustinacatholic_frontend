import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Eye,
  Check,
  X,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Trash2,
  AlertTriangle,
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
import {
  fetchAllAppointmentsAdmin,
  approveAppointment,
  rejectAppointment,
  deleteAppointment,
} from "../Redux/slice/BookingAppointSlice";

const appointmentTypeLabels = {
  mass: "Mass Attendance",
  baptism: "Baptism Preparation",
  "first-communion": "First Communion Preparation",
  confirmation: "Confirmation Preparation",
  confession: "Confession/Reconciliation",
  wedding: "Wedding Planning",
  general: "General Consultation",
};

export function AdminAppointmentsPage() {
  const dispatch = useDispatch();
  const { adminAppointments, loading, actionLoading } = useSelector(
    (state) => state.appointment,
  );

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    dispatch(fetchAllAppointmentsAdmin());
  }, [dispatch]);

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setDialogOpen(true);
  };

  const handleApprove = async (id) => {
    const result = await dispatch(approveAppointment(id));
    if (result.error) {
      toast.error("Failed to approve appointment");
    } else {
      toast.success("Appointment approved successfully");
      setDialogOpen(false);
      dispatch(fetchAllAppointmentsAdmin());
    }
  };

  const handleReject = async (id) => {
    const result = await dispatch(rejectAppointment(id));
    if (result.error) {
      toast.error("Failed to reject appointment");
    } else {
      toast.error("Appointment rejected");
      setDialogOpen(false);
      dispatch(fetchAllAppointmentsAdmin());
    }
  };

  const confirmDelete = (appointment) => {
    setAppointmentToDelete(appointment);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteAppointment(appointmentToDelete._id));
    if (result.error) {
      toast.error("Failed to delete appointment");
    } else {
      toast.success("Appointment deleted successfully");
    }
    setDeleteDialogOpen(false);
    setAppointmentToDelete(null);
  };

  const getStatusBadge = (status) => {
    const map = {
      pending: "bg-orange-100 text-orange-700 hover:bg-orange-100",
      approved: "bg-green-100 text-green-700 hover:bg-green-100",
      rejected: "bg-red-100 text-red-700 hover:bg-red-100",
    };
    return (
      <Badge className={map[status] || "bg-gray-100 text-gray-700"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const appointments = adminAppointments || [];

  const filteredAppointments = appointments.filter((apt) => {
    const label =
      appointmentTypeLabels[apt.appointmentType] || apt.appointmentType;
    const matchesSearch =
      apt.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      label?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      filterType === "all" || apt.appointmentType === filterType;
    const matchesTab = activeTab === "all" || apt.status === activeTab;
    return matchesSearch && matchesType && matchesTab;
  });

  const counts = {
    all: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    approved: appointments.filter((a) => a.status === "approved").length,
    rejected: appointments.filter((a) => a.status === "rejected").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-[#8B2635] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2
          className="text-2xl text-[#1e3a5f]"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Appointment Management
        </h2>
        <p className="text-gray-600 mt-1">
          Review, approve, and manage parishioner appointment requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total",
            value: counts.all,
            color: "bg-blue-50 text-blue-600",
          },
          {
            label: "Pending",
            value: counts.pending,
            color: "bg-orange-50 text-orange-600",
          },
          {
            label: "Approved",
            value: counts.approved,
            color: "bg-green-50 text-green-600",
          },
          {
            label: "Rejected",
            value: counts.rejected,
            color: "bg-red-50 text-red-600",
          },
        ].map(({ label, value, color }) => (
          <Card key={label} className="border-0 shadow-md">
            <CardContent className="p-5">
              <p className="text-sm text-gray-500 mb-1">{label}</p>
              <p
                className={`text-3xl font-bold ${color.split(" ")[1]}`}
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filter */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or service type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-52 h-10">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.entries(appointmentTypeLabels).map(([val, label]) => (
                  <SelectItem key={val} value={val}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="bg-white border shadow-sm p-1">
          {[
            {
              value: "all",
              label: `All (${counts.all})`,
              activeClass:
                "data-[state=active]:bg-[#8B2635] data-[state=active]:text-white",
            },
            {
              value: "pending",
              label: `Pending (${counts.pending})`,
              activeClass:
                "data-[state=active]:bg-orange-500 data-[state=active]:text-white",
            },
            {
              value: "approved",
              label: `Approved (${counts.approved})`,
              activeClass:
                "data-[state=active]:bg-green-600 data-[state=active]:text-white",
            },
            {
              value: "rejected",
              label: `Rejected (${counts.rejected})`,
              activeClass:
                "data-[state=active]:bg-red-600 data-[state=active]:text-white",
            },
          ].map(({ value, label, activeClass }) => (
            <TabsTrigger key={value} value={value} className={activeClass}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab}>
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
                        {[
                          "Parishioner",
                          "Service Type",
                          "Date & Time",
                          "Status",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAppointments.map((apt) => (
                        <tr
                          key={apt._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-sm font-semibold">
                                  {apt.name?.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {apt.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {apt.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {appointmentTypeLabels[apt.appointmentType] ||
                              apt.appointmentType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(apt.date)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {apt.time}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(apt.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewDetails(apt)}
                                title="View details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {apt.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleApprove(apt._id)}
                                    disabled={actionLoading}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    title="Approve"
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleReject(apt._id)}
                                    disabled={actionLoading}
                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                    title="Reject"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => confirmDelete(apt)}
                                disabled={actionLoading}
                                className="text-red-600 border-red-300 hover:bg-red-50"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
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

      {/* ── View Details Dialog ── */}
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
              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Current Status</span>
                {getStatusBadge(selectedAppointment.status)}
              </div>

              {/* Personal Info */}
              <div className="space-y-3">
                <h4
                  className="text-base font-semibold text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {
                      icon: User,
                      label: "Full Name",
                      value: selectedAppointment.name,
                    },
                    {
                      icon: Mail,
                      label: "Email Address",
                      value: selectedAppointment.email,
                    },
                    {
                      icon: Phone,
                      label: "Phone Number",
                      value: selectedAppointment.phone,
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <Icon className="w-4 h-4 text-[#8B2635] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                        <p className="text-sm text-gray-900">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appointment Info */}
              <div className="space-y-3">
                <h4
                  className="text-base font-semibold text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Appointment Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {
                      icon: Calendar,
                      label: "Service Type",
                      value:
                        appointmentTypeLabels[
                          selectedAppointment.appointmentType
                        ] || selectedAppointment.appointmentType,
                    },
                    {
                      icon: Calendar,
                      label: "Appointment Date",
                      value: formatDate(selectedAppointment.date),
                    },
                    {
                      icon: Clock,
                      label: "Time",
                      value: selectedAppointment.time,
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <Icon className="w-4 h-4 text-[#8B2635] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                        <p className="text-sm text-gray-900">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedAppointment.notes && (
                <div className="space-y-2">
                  <h4
                    className="text-base font-semibold text-[#1e3a5f]"
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
              )}

              <p className="text-xs text-gray-400">
                Submitted:{" "}
                {selectedAppointment.createdAt
                  ? new Date(selectedAppointment.createdAt).toLocaleString(
                      "en-US",
                    )
                  : "—"}
              </p>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
            {selectedAppointment?.status === "pending" && (
              <>
                <Button
                  onClick={() => handleReject(selectedAppointment._id)}
                  disabled={actionLoading}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <X className="w-4 h-4 mr-2" /> Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedAppointment._id)}
                  disabled={actionLoading}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="w-4 h-4 mr-2" /> Approve
                </Button>
              </>
            )}
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
                confirmDelete(selectedAppointment);
              }}
              disabled={actionLoading}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Modal ── */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <DialogTitle className="text-xl text-gray-900">
                Delete Appointment
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 leading-relaxed">
              Are you sure you want to permanently delete the appointment for{" "}
              <span className="font-semibold text-gray-900">
                "{appointmentToDelete?.name}"
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={actionLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {actionLoading ? "Deleting..." : "Yes, Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
