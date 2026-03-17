import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Trash2,
  AlertTriangle,
  TrendingUp,
  Mail,
  Phone,
  RefreshCw,
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
  fetchAllDonationsAdmin,
  fetchDonationStats,
  deleteDonation,
} from "../Redux/slice/Donationslice";

const PROJECT_LABELS = {
  general: "General Parish Fund",
  building: "Building & Maintenance",
  education: "Religious Education",
  outreach: "Charitable Outreach",
};

const FREQUENCY_LABELS = {
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
  none: "—",
};

export function AdminDonationsPage() {
  const dispatch = useDispatch();
  const { adminDonations, stats, adminLoading } = useSelector(
    (state) => state.donation,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewDonation, setViewDonation] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllDonationsAdmin());
    dispatch(fetchDonationStats());
  }, [dispatch]);

  // ── Counts ───────────────────────────────────────────────────────
  const counts = {
    all: adminDonations.length,
    success: adminDonations.filter((d) => d.status === "success").length,
    pending: adminDonations.filter((d) => d.status === "pending").length,
    failed: adminDonations.filter(
      (d) => d.status === "failed" || d.status === "abandoned",
    ).length,
  };

  // ── Filter ───────────────────────────────────────────────────────
  const filtered = adminDonations.filter((d) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      d.name.toLowerCase().includes(q) ||
      d.email.toLowerCase().includes(q) ||
      (d.paystackReference && d.paystackReference.toLowerCase().includes(q)) ||
      (PROJECT_LABELS[d.project] || "").toLowerCase().includes(q);

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "success" && d.status === "success") ||
      (activeTab === "pending" && d.status === "pending") ||
      (activeTab === "failed" &&
        (d.status === "failed" || d.status === "abandoned"));

    return matchesSearch && matchesTab;
  });

  // ── Helpers ──────────────────────────────────────────────────────
  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Success
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Failed
          </Badge>
        );
      case "abandoned":
        return (
          <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">
            Abandoned
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // ── Delete ───────────────────────────────────────────────────────
  const confirmDelete = (donation) => {
    setDonationToDelete(donation);
    setViewDialogOpen(false);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!donationToDelete) return;
    setDeleteLoading(true);
    const result = await dispatch(deleteDonation(donationToDelete._id));
    setDeleteLoading(false);
    if (result.error) {
      toast.error(result.payload || "Failed to delete.");
    } else {
      toast.success("Donation record deleted.");
    }
    setDeleteDialogOpen(false);
    setDonationToDelete(null);
  };

  const handleRefresh = () => {
    dispatch(fetchAllDonationsAdmin());
    dispatch(fetchDonationStats());
    toast.success("Refreshed.");
  };

  // ── Loading ──────────────────────────────────────────────────────
  if (adminLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-[#8B2635] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-2xl text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Donations
          </h2>
          <p className="text-gray-600 mt-1">
            Track and manage all parish donations
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* ── Stat cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Raised (₦)</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  ₦{stats ? Number(stats.totalAmount).toLocaleString() : "0"}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Successful</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {counts.success}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
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
                  {counts.pending}
                </h3>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Failed / Abandoned</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {counts.failed}
                </h3>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Search ─────────────────────────────────────────────────── */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by name, email, reference, or project…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Tabs ───────────────────────────────────────────────────── */}
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
            All ({counts.all})
          </TabsTrigger>
          <TabsTrigger
            value="success"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            Successful ({counts.success})
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Pending ({counts.pending})
          </TabsTrigger>
          <TabsTrigger
            value="failed"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            Failed ({counts.failed})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filtered.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <DollarSign className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3
                  className="text-xl text-gray-600 mb-2"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  No donations found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters.
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
                  Donation Records
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Donor
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Project
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filtered.map((donation) => (
                        <tr
                          key={donation._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          {/* Donor */}
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-[#8B2635] to-[#c9a84c] flex items-center justify-center">
                                <span
                                  className="text-white text-sm font-bold"
                                  style={{
                                    fontFamily: "Playfair Display, serif",
                                  }}
                                >
                                  {donation.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">
                                  {donation.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {donation.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          {/* Amount */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm font-bold text-[#1e3a5f]">
                              ₦{Number(donation.amount).toLocaleString()}
                            </p>
                          </td>
                          {/* Project */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-700">
                              {PROJECT_LABELS[donation.project] ||
                                donation.project}
                            </p>
                          </td>
                          {/* Type */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 capitalize">
                              {donation.donationType}
                            </Badge>
                          </td>
                          {/* Status */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(donation.status)}
                          </td>
                          {/* Date */}
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                            {formatDate(donation.createdAt)}
                          </td>
                          {/* Actions */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setViewDonation(donation);
                                  setViewDialogOpen(true);
                                }}
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => confirmDelete(donation)}
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

      {/* ── View Dialog ─────────────────────────────────────────────── */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Donation Details
            </DialogTitle>
            <DialogDescription>Full record for this donation</DialogDescription>
          </DialogHeader>

          {viewDonation && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Status</span>
                {getStatusBadge(viewDonation.status)}
              </div>

              {/* Amount highlight */}
              <div
                className="p-5 text-center rounded-lg"
                style={{
                  background: "linear-gradient(135deg, #1e3a5f, #0f2240)",
                  border: "2px solid #c9a84c",
                }}
              >
                <p
                  className="text-xs tracking-widest uppercase mb-1"
                  style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                >
                  Donation Amount
                </p>
                <p
                  className="text-4xl font-bold text-white"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  ₦{Number(viewDonation.amount).toLocaleString()}
                </p>
              </div>

              {/* Donor info */}
              <div>
                <h4
                  className="text-lg text-[#1e3a5f] mb-3"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Donor Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Full Name</p>
                    <p className="text-sm text-gray-900 font-medium">
                      {viewDonation.name}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Email</p>
                      <p className="text-sm text-gray-900">
                        {viewDonation.email}
                      </p>
                    </div>
                  </div>
                  {viewDonation.phone && (
                    <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                        <p className="text-sm text-gray-900">
                          {viewDonation.phone}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Submitted</p>
                    <p className="text-sm text-gray-900">
                      {formatDate(viewDonation.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Donation info */}
              <div>
                <h4
                  className="text-lg text-[#1e3a5f] mb-3"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Donation Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Project</p>
                    <p className="text-sm text-gray-900">
                      {PROJECT_LABELS[viewDonation.project] ||
                        viewDonation.project}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Type</p>
                    <p className="text-sm text-gray-900 capitalize">
                      {viewDonation.donationType}
                    </p>
                  </div>
                  {viewDonation.donationType === "recurring" && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Frequency</p>
                      <p className="text-sm text-gray-900">
                        {FREQUENCY_LABELS[viewDonation.frequency]}
                      </p>
                    </div>
                  )}
                  {viewDonation.verifiedAt && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Verified At</p>
                      <p className="text-sm text-gray-900">
                        {formatDate(viewDonation.verifiedAt)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              {viewDonation.message && (
                <div>
                  <h4
                    className="text-lg text-[#1e3a5f] mb-3"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Personal Note
                  </h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 leading-relaxed italic">
                      "{viewDonation.message}"
                    </p>
                  </div>
                </div>
              )}

              {/* Reference */}
              <div className="p-4 bg-gray-50 rounded-lg break-all">
                <p className="text-xs text-gray-500 mb-1">Paystack Reference</p>
                <p className="text-xs font-mono text-gray-700">
                  {viewDonation.paystackReference || "—"}
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            <Button
              variant="outline"
              onClick={() => confirmDelete(viewDonation)}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Dialog ───────────────────────────────────────────── */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <DialogTitle className="text-xl text-gray-900">
                Delete Donation Record
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600">
              Are you sure you want to permanently delete the donation record
              for{" "}
              <span className="font-semibold text-gray-900">
                {donationToDelete?.name}
              </span>{" "}
              (₦{Number(donationToDelete?.amount || 0).toLocaleString()})? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteLoading ? "Deleting..." : "Yes, Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
