import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Eye,
  Trash2,
  Mail,
  Phone,
  User,
  Clock,
  CheckCheck,
  MessageSquare,
  AlertTriangle,
  BookOpen,
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
  fetchAllContactsAdmin,
  markContactAsRead,
  markContactAsResponded,
  deleteContact,
} from "../Redux/slice/contactsSlice";

export function AdminContactPage() {
  const dispatch = useDispatch();
  const { adminContacts, adminLoading, actionLoading } = useSelector(
    (state) => state.contact,
  );

  const [selectedContact, setSelectedContact] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    dispatch(fetchAllContactsAdmin());
  }, [dispatch]);

  // Auto-mark as read when opening details
  const handleViewDetails = async (contact) => {
    setSelectedContact(contact);
    setDialogOpen(true);
    if (contact.status === "unread") {
      await dispatch(markContactAsRead(contact._id));
    }
  };

  const handleMarkResponded = async (id) => {
    const result = await dispatch(markContactAsResponded(id));
    if (result.error) {
      toast.error(result.payload || "Failed to update status");
    } else {
      toast.success("Marked as responded");
      // update selectedContact if dialog is open
      setSelectedContact((prev) =>
        prev?._id === id ? { ...prev, status: "responded" } : prev,
      );
    }
  };

  const confirmDelete = (contact) => {
    setContactToDelete(contact);
    setDeleteDialogOpen(true);
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteContact(contactToDelete._id));
    if (result.error) {
      toast.error(result.payload || "Failed to delete message");
    } else {
      toast.success("Message deleted successfully");
    }
    setDeleteDialogOpen(false);
    setContactToDelete(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "unread":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            Unread
          </Badge>
        );
      case "read":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Read
          </Badge>
        );
      case "responded":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Responded
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const contacts = adminContacts || [];

  const filteredContacts = contacts.filter((c) => {
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

  // ── Improved loading state ───────────────────────────────────
  if (adminLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2
            className="text-2xl text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Contact Messages
          </h2>
          <p className="text-gray-600 mt-1">
            View and manage messages sent by parishioners
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Total", "Unread", "Read", "Responded"].map((label) => (
            <Card key={label} className="border-0 shadow-md">
              <CardContent className="p-5">
                <p className="text-sm text-gray-400 mb-2">{label}</p>
                <div className="h-8 w-12 bg-gray-200 rounded-md animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-md">
          <CardContent className="py-20 flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-4 border-gray-100" />
              <div className="w-14 h-14 rounded-full border-4 border-t-[#8B2635] border-r-transparent border-b-transparent border-l-transparent animate-spin absolute inset-0" />
            </div>
            <div className="text-center">
              <p
                className="text-lg text-[#1e3a5f]"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Loading Messages
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Please wait while we fetch the records…
              </p>
            </div>
          </CardContent>
        </Card>
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
          View and manage messages sent by parishioners
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total",
            value: counts.all,
            color: "text-blue-600",
            bg: "bg-blue-50",
            Icon: MessageSquare,
          },
          {
            label: "Unread",
            value: counts.unread,
            color: "text-orange-600",
            bg: "bg-orange-50",
            Icon: Mail,
          },
          {
            label: "Read",
            value: counts.read,
            color: "text-blue-600",
            bg: "bg-blue-50",
            Icon: BookOpen,
          },
          {
            label: "Responded",
            value: counts.responded,
            color: "text-green-600",
            bg: "bg-green-50",
            Icon: CheckCheck,
          },
        ].map(({ label, value, color, bg, Icon }) => (
          <Card key={label} className="border-0 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{label}</p>
                  <p
                    className={`text-3xl font-bold ${color}`}
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {value}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
              </div>
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
                "data-[state=active]:bg-blue-600 data-[state=active]:text-white",
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
          {filteredContacts.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <Mail className="w-16 h-16 mx-auto text-gray-300 mb-4" />
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
                          "Status",
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
                      {filteredContacts.map((contact) => (
                        <tr
                          key={contact._id}
                          className={`hover:bg-gray-50 transition-colors ${
                            contact.status === "unread" ? "bg-orange-50/30" : ""
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-sm font-semibold">
                                  {contact.name?.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div
                                  className={`text-sm text-gray-900 ${contact.status === "unread" ? "font-semibold" : "font-medium"}`}
                                >
                                  {contact.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {contact.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {contact.subject || (
                              <span className="text-gray-400 italic">
                                No subject
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 max-w-xs">
                            <p className="text-sm text-gray-700 line-clamp-1">
                              {contact.message}
                            </p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(contact.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(contact.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewDetails(contact)}
                                title="View details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {contact.status !== "responded" && (
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleMarkResponded(contact._id)
                                  }
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
                                onClick={() => confirmDelete(contact)}
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
              Message Details
            </DialogTitle>
            <DialogDescription>Full message from parishioner</DialogDescription>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Current Status</span>
                {getStatusBadge(selectedContact.status)}
              </div>

              {/* Sender Info */}
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
                    {
                      icon: Clock,
                      label: "Received On",
                      value: new Date(selectedContact.createdAt).toLocaleString(
                        "en-US",
                      ),
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
                  <div className="p-3 bg-gray-50 rounded-lg">
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
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
            <Button
              variant="outline"
              onClick={() => confirmDelete(selectedContact)}
              disabled={actionLoading}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
            {selectedContact?.status !== "responded" && (
              <Button
                onClick={() => handleMarkResponded(selectedContact._id)}
                disabled={actionLoading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark as Responded
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Dialog ── */}
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
                {contactToDelete?.name}
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
