import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Calendar,
  User,
  Mail,
  Check,
  X,
  Eye,
  Trash2,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  fetchAllThanksgivingsAdmin,
  approveThanksgiving,
  rejectThanksgiving,
  deleteThanksgiving,
} from "../Redux/slice/thanksgivingSlice";

export function AdminMassBooking() {
  const dispatch = useDispatch();
  const { adminThanksgivings, loading, actionLoading } = useSelector(
    (state) => state.thanksgiving,
  );

  const [selectedThanksgiving, setSelectedThanksgiving] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Fetch thanksgivings on mount
  useEffect(() => {
    dispatch(fetchAllThanksgivingsAdmin());
  }, [dispatch]);

  const handleViewDetails = (thanksgiving) => {
    setSelectedThanksgiving(thanksgiving);
    setDialogOpen(true);
  };

  const handleApprove = async (id) => {
    const result = await dispatch(approveThanksgiving(id));
    if (result.error) {
      toast.error(result.payload || "Failed to approve thanksgiving");
    } else {
      toast.success("Thanksgiving approved successfully");
      setDialogOpen(false);
      dispatch(fetchAllThanksgivingsAdmin());
    }
  };

  const handleReject = async (id) => {
    const result = await dispatch(rejectThanksgiving(id));
    if (result.error) {
      toast.error(result.payload || "Failed to reject thanksgiving");
    } else {
      toast.error("Thanksgiving rejected");
      setDialogOpen(false);
      dispatch(fetchAllThanksgivingsAdmin());
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this thanksgiving permanently?",
      )
    ) {
      const result = await dispatch(deleteThanksgiving(id));
      if (result.error) {
        toast.error(result.payload || "Failed to delete thanksgiving");
      } else {
        toast.success("Thanksgiving deleted successfully");
        setDialogOpen(false);
      }
    }
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

  const filteredThanksgivings = adminThanksgivings.filter((thanksgiving) => {
    const matchesSearch =
      thanksgiving.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thanksgiving.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (thanksgiving.mass?.name &&
        thanksgiving.mass.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()));

    const matchesTab = activeTab === "all" || thanksgiving.status === activeTab;

    return matchesSearch && matchesTab;
  });

  const thanksgivingCounts = {
    all: adminThanksgivings.length,
    pending: adminThanksgivings.filter((t) => t.status === "pending").length,
    approved: adminThanksgivings.filter((t) => t.status === "approved").length,
    rejected: adminThanksgivings.filter((t) => t.status === "rejected").length,
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Show loading spinner
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
          Thanksgiving Mass Bookings
        </h2>
        <p className="text-gray-600 mt-1">
          Manage thanksgiving mass intentions from parishioners
        </p>
      </div>

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
                  {thanksgivingCounts.all}
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
                  {thanksgivingCounts.pending}
                </h3>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
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
                  {thanksgivingCounts.approved}
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
                  {thanksgivingCounts.rejected}
                </h3>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <X className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by name, email, or mass..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </CardContent>
      </Card>

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
            All ({thanksgivingCounts.all})
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
          >
            Pending ({thanksgivingCounts.pending})
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            Approved ({thanksgivingCounts.approved})
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            Rejected ({thanksgivingCounts.rejected})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredThanksgivings.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3
                  className="text-xl text-gray-600 mb-2"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  No thanksgiving bookings found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-md">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle
                  className="text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Thanksgiving Bookings
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
                          Mass
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Intention Preview
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredThanksgivings.map((thanksgiving) => (
                        <tr
                          key={thanksgiving._id}
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
                                  {thanksgiving.name.charAt(0)}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {thanksgiving.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {thanksgiving.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {thanksgiving.mass?.name || "N/A"}
                            </div>
                            {thanksgiving.mass?.time && (
                              <div className="text-xs text-gray-500">
                                {thanksgiving.mass.time}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 max-w-xs">
                            <p className="text-sm text-gray-700 line-clamp-2">
                              {thanksgiving.intention}
                            </p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(thanksgiving.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(thanksgiving.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewDetails(thanksgiving)}
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {thanksgiving.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleApprove(thanksgiving._id)
                                    }
                                    disabled={actionLoading}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    title="Approve"
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleReject(thanksgiving._id)
                                    }
                                    disabled={actionLoading}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                    title="Reject"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(thanksgiving._id)}
                                disabled={actionLoading}
                                className="hover:bg-red-50 hover:text-red-700"
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

      {/* Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Thanksgiving Details
            </DialogTitle>
            <DialogDescription>
              Full thanksgiving mass intention details
            </DialogDescription>
          </DialogHeader>

          {selectedThanksgiving && (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Current Status</span>
                {getStatusBadge(selectedThanksgiving.status)}
              </div>

              {/* Parishioner Info */}
              <div className="space-y-4">
                <h4
                  className="text-lg text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Parishioner Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Name</p>
                    <p className="text-sm text-gray-900">
                      {selectedThanksgiving.name}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm text-gray-900">
                      {selectedThanksgiving.email}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Submitted On</p>
                    <p className="text-sm text-gray-900">
                      {formatDate(selectedThanksgiving.createdAt)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Week Key</p>
                    <p className="text-sm text-gray-900">
                      {selectedThanksgiving.weekKey}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mass Details */}
              <div className="space-y-3">
                <h4
                  className="text-lg text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Mass Details
                </h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Mass</p>
                  <p className="text-sm text-gray-900">
                    {selectedThanksgiving.mass?.name || "N/A"}
                  </p>
                  {selectedThanksgiving.mass?.time && (
                    <p className="text-xs text-gray-500 mt-1">
                      Time: {selectedThanksgiving.mass.time}
                    </p>
                  )}
                </div>
              </div>

              {/* Intention */}
              <div className="space-y-3">
                <h4
                  className="text-lg text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Thanksgiving Intention
                </h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedThanksgiving.intention}
                  </p>
                </div>
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
            <Button
              onClick={() => handleDelete(selectedThanksgiving?._id)}
              variant="outline"
              disabled={actionLoading}
              className="w-full sm:w-auto text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            {selectedThanksgiving?.status === "pending" && (
              <>
                <Button
                  onClick={() => handleReject(selectedThanksgiving._id)}
                  disabled={actionLoading}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedThanksgiving._id)}
                  disabled={actionLoading}
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
