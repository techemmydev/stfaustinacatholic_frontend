import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Eye,
  Check,
  Mail,
  Phone,
  User,
  Trash2,
  AlertTriangle,
  MessageSquare,
  MailOpen,
  CheckCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
  fetchAllContactsAdmin,
  markContactRead,
  markContactResponded,
  deleteContact,
} from "../Redux/slice/adminContactSlice";

// ── helpers ──────────────────────────────────────────────────────────────────

const STATUS_BADGE = {
  unread: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  read: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  responded: "bg-green-100 text-green-700 hover:bg-green-100",
};

const STATUS_LABEL = {
  unread: "Unread",
  read: "Read",
  responded: "Responded",
};

function getStatusBadge(status) {
  return (
    <Badge className={STATUS_BADGE[status] || "bg-gray-100 text-gray-700"}>
      {STATUS_LABEL[status] || status}
    </Badge>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── component ─────────────────────────────────────────────────────────────────

export function AdminContactsPage() {
  const dispatch = useDispatch();
  const {
    contacts = [],
    loading,
    actionLoading,
  } = useSelector((state) => state.adminContact);

  const [selectedContact, setSelectedContact] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    dispatch(fetchAllContactsAdmin());
  }, [dispatch]);

  // ── actions ──────────────────────────────────────────────────────────────

  const handleViewDetails = async (contact) => {
    setSelectedContact(contact);
    setDialogOpen(true);
    // auto-mark as read when opened
    if (contact.status === "unread") {
      const result = await dispatch(markContactRead(contact._id));
      if (!result.error) {
        setSelectedContact((prev) => ({ ...prev, status: "read" }));
      }
    }
  };

  const handleMarkResponded = async (id) => {
    const result = await dispatch(markContactResponded(id));
    if (result.error) {
      toast.error("Failed to update status");
    } else {
      toast.success("Marked as responded");
      setSelectedContact((prev) =>
        prev ? { ...prev, status: "responded" } : prev,
      );
    }
  };

  const confirmDelete = (contact) => {
    setContactToDelete(contact);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteContact(contactToDelete._id));
    if (result.error) {
      toast.error("Failed to delete message");
    } else {
      toast.success("Message deleted successfully");
      setDialogOpen(false);
    }
    setDeleteDialogOpen(false);
    setContactToDelete(null);
  };

  // ── filtering ─────────────────────────────────────────────────────────────

  const filtered = contacts.filter((c) => {
    const matchesSearch =
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || c.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const counts = {
    all: contacts.length,
    unread: contacts.filter((c) => c.status === "unread").length,
    read: contacts.filter((c) => c.status === "read").length,
    responded: contacts.filter((c) => c.status === "responded").length,
  };

  // ── render ────────────────────────────────────────────────────────────────

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
          Contact Messages
        </h2>
        <p className="text-gray-600 mt-1">
          View and manage messages submitted through the contact form
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: counts.all, color: "text-blue-600" },
          { label: "Unread", value: counts.unread, color: "text-orange-600" },
          { label: "Read", value: counts.read, color: "text-blue-500" },
          {
            label: "Responded",
            value: counts.responded,
            color: "text-green-600",
          },
        ].map(({ label, value, color }) => (
          <Card key={label} className="border-0 shadow-md">
            <CardContent className="p-5">
              <p className="text-sm text-gray-500 mb-1">{label}</p>
              <p
                className={`text-3xl font-bold ${color}`}
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, subject, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
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
              value: "unread",
              label: `Unread (${counts.unread})`,
              activeClass:
                "data-[state=active]:bg-orange-500 data-[state=active]:text-white",
            },
            {
              value: "read",
              label: `Read (${counts.read})`,
              activeClass:
                "data-[state=active]:bg-blue-500 data-[state=active]:text-white",
            },
            {
              value: "responded",
              label: `Responded (${counts.responded})`,
              activeClass:
                "data-[state=active]:bg-green-600 data-[state=active]:text-white",
            },
          ].map(({ value, label, activeClass }) => (
            <TabsTrigger key={value} value={value} className={activeClass}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab}>
          {filtered.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3
                  className="text-xl text-gray-600 mb-2"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  No messages found
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
                          "Sender",
                          "Subject",
                          "Message Preview",
                          "Date",
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
                      {filtered.map((c) => (
                        <tr
                          key={c._id}
                          className={`hover:bg-gray-50 transition-colors ${
                            c.status === "unread" ? "font-semibold" : ""
                          }`}
                        >
                          {/* Sender */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-sm font-semibold">
                                  {c.name?.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {c.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {c.email}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Subject */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {c.subject || (
                              <span className="text-gray-400 italic">
                                No subject
                              </span>
                            )}
                          </td>

                          {/* Message Preview */}
                          <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                            <p className="truncate max-w-[200px]">
                              {c.message}
                            </p>
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {new Date(c.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(c.status)}
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewDetails(c)}
                                title="View message"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {c.status !== "responded" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleMarkResponded(c._id)}
                                  disabled={actionLoading}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  title="Mark as responded"
                                >
                                  <CheckCheck className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => confirmDelete(c)}
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

      {/* ── View Details Dialog ─────────────────────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Message Details
            </DialogTitle>
            <DialogDescription>
              Review and manage this contact message
            </DialogDescription>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Current Status</span>
                {getStatusBadge(selectedContact.status)}
              </div>

              {/* Personal Info */}
              <div className="space-y-3">
                <h4
                  className="text-base font-semibold text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Sender Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {
                      icon: User,
                      label: "Full Name",
                      value: selectedContact.name,
                    },
                    {
                      icon: Mail,
                      label: "Email Address",
                      value: selectedContact.email,
                    },
                    {
                      icon: Phone,
                      label: "Phone Number",
                      value: selectedContact.phone || "—",
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

              {/* Subject */}
              {selectedContact.subject && (
                <div className="space-y-2">
                  <h4
                    className="text-base font-semibold text-[#1e3a5f]"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Subject
                  </h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">
                      {selectedContact.subject}
                    </p>
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="space-y-2">
                <h4
                  className="text-base font-semibold text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Message
                </h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-400">
                Received:{" "}
                {selectedContact.createdAt
                  ? new Date(selectedContact.createdAt).toLocaleString("en-US")
                  : "—"}
              </p>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
            {selectedContact?.status !== "responded" && (
              <Button
                onClick={() => handleMarkResponded(selectedContact._id)}
                disabled={actionLoading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCheck className="w-4 h-4 mr-2" /> Mark as Responded
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
                confirmDelete(selectedContact);
              }}
              disabled={actionLoading}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation ─────────────────────────────────────────────── */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <DialogTitle className="text-xl text-gray-900">
                Delete Message
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 leading-relaxed">
              Are you sure you want to permanently delete the message from{" "}
              <span className="font-semibold text-gray-900">
                "{contactToDelete?.name}"
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
