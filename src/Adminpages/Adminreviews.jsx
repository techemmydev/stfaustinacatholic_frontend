import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Check,
  X,
  Eye,
  Trash2,
  MessageSquare,
  EyeOff,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  fetchAllTestimonialsAdmin,
  approveTestimonial,
  rejectTestimonial,
  deleteTestimonial,
  toggleTestimonialVisibility,
} from "../Redux/slice/testimonialSlice";

export function AdminReviews() {
  const dispatch = useDispatch();
  const { adminTestimonials, loading, actionLoading } = useSelector(
    (state) => state.testimonial,
  );

  const [selectedReview, setSelectedReview] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // ── Delete confirmation state ──────────────────────────────
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAllTestimonialsAdmin());
  }, [dispatch]);

  const handleViewDetails = (review) => {
    setSelectedReview(review);
    setDialogOpen(true);
  };

  const handleApprove = async (id) => {
    const result = await dispatch(approveTestimonial(id));
    if (result.error) {
      toast.error(result.payload || "Failed to approve testimonial");
    } else {
      toast.success("Testimonial approved and will be displayed on website");
      setDialogOpen(false);
      dispatch(fetchAllTestimonialsAdmin());
    }
  };

  const handleReject = async (id) => {
    const result = await dispatch(rejectTestimonial(id));
    if (result.error) {
      toast.error(result.payload || "Failed to reject testimonial");
    } else {
      toast.error("Testimonial rejected");
      setDialogOpen(false);
      dispatch(fetchAllTestimonialsAdmin());
    }
  };

  // ── Open delete confirmation ───────────────────────────────
  const confirmDelete = (review) => {
    setReviewToDelete(review);
    setDeleteDialogOpen(true);
    setDialogOpen(false);
  };

  const handleDeleteConfirmed = async () => {
    const result = await dispatch(deleteTestimonial(reviewToDelete._id));
    if (result.error) {
      toast.error(result.payload || "Failed to delete testimonial");
    } else {
      toast.success("Review deleted successfully");
    }
    setDeleteDialogOpen(false);
    setReviewToDelete(null);
  };

  const handleToggleVisibility = async (id) => {
    const result = await dispatch(toggleTestimonialVisibility(id));
    if (result.error) {
      toast.error(result.payload || "Failed to toggle visibility");
    } else {
      toast.success("Visibility updated successfully");
      dispatch(fetchAllTestimonialsAdmin());
    }
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

  const getVisibilityBadge = (isVisible) =>
    isVisible ? (
      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
        Visible
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
        Hidden
      </Badge>
    );

  const filteredReviews = adminTestimonials.filter((review) => {
    const matchesSearch =
      review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || review.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const reviewCounts = {
    all: adminTestimonials.length,
    pending: adminTestimonials.filter((r) => r.status === "pending").length,
    approved: adminTestimonials.filter((r) => r.status === "approved").length,
    rejected: adminTestimonials.filter((r) => r.status === "rejected").length,
  };

  const visibleCount = adminTestimonials.filter((r) => r.isVisible).length;

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
          Parishioner Testimonials
        </h2>
        <p className="text-gray-600 mt-1">
          Manage and moderate parishioner testimonials and feedback
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Reviews",
            value: reviewCounts.all,
            icon: MessageSquare,
            bg: "bg-blue-50",
            color: "text-blue-600",
          },
          {
            label: "Visible on Site",
            value: visibleCount,
            icon: Eye,
            bg: "bg-purple-50",
            color: "text-purple-600",
          },
          {
            label: "Pending",
            value: reviewCounts.pending,
            icon: MessageSquare,
            bg: "bg-orange-50",
            color: "text-orange-600",
          },
          {
            label: "Approved",
            value: reviewCounts.approved,
            icon: Check,
            bg: "bg-green-50",
            color: "text-green-600",
          },
        ].map(({ label, value, icon: Icon, bg, color }) => (
          <Card key={label} className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{label}</p>
                  <h3
                    className="text-3xl text-[#1e3a5f]"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {value}
                  </h3>
                </div>
                <div
                  className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search testimonials by name, role, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
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
          {[
            {
              value: "all",
              label: `All (${reviewCounts.all})`,
              active:
                "data-[state=active]:bg-[#8B2635] data-[state=active]:text-white",
            },
            {
              value: "pending",
              label: `Pending (${reviewCounts.pending})`,
              active:
                "data-[state=active]:bg-orange-600 data-[state=active]:text-white",
            },
            {
              value: "approved",
              label: `Approved (${reviewCounts.approved})`,
              active:
                "data-[state=active]:bg-green-600 data-[state=active]:text-white",
            },
            {
              value: "rejected",
              label: `Rejected (${reviewCounts.rejected})`,
              active:
                "data-[state=active]:bg-red-600 data-[state=active]:text-white",
            },
          ].map(({ value, label, active }) => (
            <TabsTrigger key={value} value={value} className={active}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredReviews.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3
                  className="text-xl text-gray-600 mb-2"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  No testimonials found
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
                  Testimonials
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        {[
                          "Parishioner",
                          "Message Preview",
                          "Status",
                          "Visibility",
                          "Date",
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
                      {filteredReviews.map((review) => (
                        <tr
                          key={review._id}
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
                                  {review.name.charAt(0)}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {review.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {review.role}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 max-w-xs">
                            <p className="text-sm text-gray-700 line-clamp-2">
                              {review.message}
                            </p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(review.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {review.status === "approved" &&
                              getVisibilityBadge(review.isVisible)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewDetails(review)}
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {review.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleApprove(review._id)}
                                    disabled={actionLoading}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    title="Approve"
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleReject(review._id)}
                                    disabled={actionLoading}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                    title="Reject"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                              {review.status === "approved" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleToggleVisibility(review._id)
                                  }
                                  disabled={actionLoading}
                                  title={
                                    review.isVisible
                                      ? "Hide from Website"
                                      : "Show on Website"
                                  }
                                >
                                  {review.isVisible ? (
                                    <EyeOff className="w-4 h-4" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => confirmDelete(review)}
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

      {/* ── Delete Confirmation AlertDialog ───────────────────── */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete the review from{" "}
              <span className="font-semibold text-gray-900">
                {reviewToDelete?.name}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirmed}
              disabled={actionLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {actionLoading ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Details Dialog ─────────────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Testimonial Details
            </DialogTitle>
            <DialogDescription>
              Full testimonial and parishioner information
            </DialogDescription>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Current Status</span>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedReview.status)}
                  {selectedReview.status === "approved" &&
                    getVisibilityBadge(selectedReview.isVisible)}
                </div>
              </div>

              <div className="space-y-4">
                <h4
                  className="text-lg text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Parishioner Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Name", value: selectedReview.name },
                    { label: "Role", value: selectedReview.role },
                    {
                      label: "Submitted On",
                      value: new Date(
                        selectedReview.createdAt,
                      ).toLocaleString(),
                    },
                    { label: "ID", value: selectedReview._id },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">{label}</p>
                      <p className="text-sm text-gray-900 truncate">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4
                  className="text-lg text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Full Testimonial
                </h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedReview.message}
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
              variant="outline"
              onClick={() => confirmDelete(selectedReview)}
              disabled={actionLoading}
              className="w-full sm:w-auto text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
            {selectedReview?.status === "approved" && (
              <Button
                onClick={() => handleToggleVisibility(selectedReview._id)}
                disabled={actionLoading}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
              >
                {selectedReview.isVisible ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide from Website
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Show on Website
                  </>
                )}
              </Button>
            )}
            {selectedReview?.status === "pending" && (
              <>
                <Button
                  onClick={() => handleReject(selectedReview._id)}
                  disabled={actionLoading}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                >
                  <X className="w-4 h-4 mr-2" /> Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedReview._id)}
                  disabled={actionLoading}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="w-4 h-4 mr-2" /> Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
