import { useState } from "react";
import {
  Search,
  Star,
  Check,
  X,
  Eye,
  Trash2,
  MessageSquare,
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

export function AdminReviews() {
  const [selectedReview, setSelectedReview] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock data - replace with API call
  const [reviews, setReviews] = useState([
    {
      id: 1,
      parishionerName: "Maria Santos",
      parishionerId: "PAR-2024-001",
      email: "maria.santos@email.com",
      rating: 5,
      title: "Wonderful Parish Community",
      review:
        "I have been a member of this parish for 5 years now and I am continually blessed by the warm and welcoming community. The priests are caring and deliver meaningful homilies every week. Highly recommend!",
      category: "General",
      status: "pending",
      submittedAt: "2026-02-08 10:30 AM",
    },
    {
      id: 2,
      parishionerName: "John Doe",
      parishionerId: "PAR-2024-002",
      email: "john.doe@email.com",
      rating: 4,
      title: "Great Youth Programs",
      review:
        "The youth ministry programs are excellent. My teenagers really enjoy the weekly meetings and retreats. Would love to see more family events though.",
      category: "Youth Ministry",
      status: "approved",
      submittedAt: "2026-02-07 03:15 PM",
    },
    {
      id: 3,
      parishionerName: "Sarah Johnson",
      parishionerId: "PAR-2024-003",
      email: "sarah.j@email.com",
      rating: 5,
      title: "Beautiful Mass Celebrations",
      review:
        "The Sunday masses are beautifully celebrated with wonderful music and meaningful liturgy. The choir is amazing and the church is always well-maintained.",
      category: "Liturgy",
      status: "approved",
      submittedAt: "2026-02-06 11:20 AM",
    },
    {
      id: 4,
      parishionerName: "Michael Chen",
      parishionerId: "PAR-2024-004",
      email: "michael.c@email.com",
      rating: 3,
      title: "Parking Could Be Better",
      review:
        "Love the parish community but parking on Sundays is quite challenging. Perhaps consider adding more parking spaces or shuttle service.",
      category: "Facilities",
      status: "pending",
      submittedAt: "2026-02-08 09:45 AM",
    },
    {
      id: 5,
      parishionerName: "Emily Rodriguez",
      parishionerId: "PAR-2024-005",
      email: "emily.r@email.com",
      rating: 2,
      title: "Communication Needs Improvement",
      review:
        "Sometimes it is hard to get updates about parish events. Would be great to have a better newsletter or app for communication.",
      category: "Communication",
      status: "rejected",
      submittedAt: "2026-02-05 02:30 PM",
    },
    {
      id: 6,
      parishionerName: "Robert Taylor",
      parishionerId: "PAR-2024-006",
      email: "robert.t@email.com",
      rating: 5,
      title: "Outstanding Outreach Programs",
      review:
        "The community service and outreach programs are exceptional. It is wonderful to see our parish making such a positive impact in the local community.",
      category: "Outreach",
      status: "pending",
      submittedAt: "2026-02-08 01:00 PM",
    },
  ]);

  const handleViewDetails = (review) => {
    setSelectedReview(review);
    setDialogOpen(true);
  };

  const handleApprove = (id) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, status: "approved" } : review,
      ),
    );
    toast.success("Review approved and will be displayed on website");
    setDialogOpen(false);
  };

  const handleReject = (id) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, status: "rejected" } : review,
      ),
    );
    toast.error("Review rejected");
    setDialogOpen(false);
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this review permanently?")
    ) {
      setReviews(reviews.filter((review) => review.id !== id));
      toast.success("Review deleted successfully");
      setDialogOpen(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            Pending Review
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
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "fill-[#d4af37] text-[#d4af37]" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.parishionerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.review.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === "all" || review.status === activeTab;

    return matchesSearch && matchesTab;
  });

  const reviewCounts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2
          className="text-2xl text-[#1e3a5f]"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Parishioner Reviews
        </h2>
        <p className="text-gray-600 mt-1">
          Manage and moderate parishioner testimonials and feedback
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Reviews</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {reviewCounts.all}
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Rating</p>
                <div className="flex items-center space-x-2">
                  <h3
                    className="text-3xl text-[#1e3a5f]"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {averageRating}
                  </h3>
                  <Star className="w-6 h-6 fill-[#d4af37] text-[#d4af37]" />
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
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
                  {reviewCounts.pending}
                </h3>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-orange-600" />
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
                  {reviewCounts.approved}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
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
              placeholder="Search reviews by parishioner name, title, content, or category..."
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
            All ({reviewCounts.all})
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
          >
            Pending ({reviewCounts.pending})
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            Approved ({reviewCounts.approved})
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            Rejected ({reviewCounts.rejected})
          </TabsTrigger>
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
                  No reviews found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredReviews.map((review) => (
                <Card
                  key={review.id}
                  className="border-0 shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      {/* Left Side - Review Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center flex-shrink-0">
                              <span
                                className="text-white text-lg"
                                style={{
                                  fontFamily: "Playfair Display, serif",
                                }}
                              >
                                {review.parishionerName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h4 className="text-base text-gray-900 font-medium">
                                {review.parishionerName}
                              </h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <span>{review.parishionerId}</span>
                                <span>•</span>
                                <span>{review.submittedAt}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {renderStars(review.rating)}
                          <Badge variant="outline" className="text-xs">
                            {review.category}
                          </Badge>
                        </div>

                        <div>
                          <h3
                            className="text-lg text-[#1e3a5f] mb-2"
                            style={{ fontFamily: "Playfair Display, serif" }}
                          >
                            {review.title}
                          </h3>
                          <p className="text-gray-700 text-sm line-clamp-2">
                            {review.review}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          {getStatusBadge(review.status)}
                        </div>
                      </div>

                      {/* Right Side - Actions */}
                      <div className="flex md:flex-col gap-2 md:items-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(review)}
                          className="flex-1 md:flex-none hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4 md:mr-2" />
                          <span className="hidden md:inline">View</span>
                        </Button>
                        {review.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(review.id)}
                              className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Check className="w-4 h-4 md:mr-2" />
                              <span className="hidden md:inline">Approve</span>
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleReject(review.id)}
                              className="flex-1 md:flex-none bg-red-600 hover:bg-red-700 text-white"
                            >
                              <X className="w-4 h-4 md:mr-2" />
                              <span className="hidden md:inline">Reject</span>
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(review.id)}
                          className="flex-1 md:flex-none hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 md:mr-2" />
                          <span className="hidden md:inline">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
              Review Details
            </DialogTitle>
            <DialogDescription>
              Full review and parishioner information
            </DialogDescription>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Current Status</span>
                {getStatusBadge(selectedReview.status)}
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
                      {selectedReview.parishionerName}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">ID</p>
                    <p className="text-sm text-gray-900">
                      {selectedReview.parishionerId}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm text-gray-900">
                      {selectedReview.email}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Category</p>
                    <p className="text-sm text-gray-900">
                      {selectedReview.category}
                    </p>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-3">
                <h4
                  className="text-lg text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Review
                </h4>
                <div className="flex items-center space-x-2 mb-2">
                  {renderStars(selectedReview.rating)}
                  <span className="text-sm text-gray-600">
                    ({selectedReview.rating}/5)
                  </span>
                </div>
                <h3
                  className="text-xl text-gray-900 mb-2"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {selectedReview.title}
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{selectedReview.review}</p>
                </div>
              </div>

              {/* Submission Time */}
              <div className="text-sm text-gray-500">
                Submitted on: {selectedReview.submittedAt}
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
              onClick={() => handleDelete(selectedReview?.id)}
              variant="outline"
              className="w-full sm:w-auto text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Review
            </Button>
            {selectedReview?.status === "pending" && (
              <>
                <Button
                  onClick={() => handleReject(selectedReview.id)}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedReview.id)}
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
