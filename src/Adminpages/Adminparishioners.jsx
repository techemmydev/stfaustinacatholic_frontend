import { useState } from "react";
import {
  Search,
  User,
  Mail,
  Phone,
  MapPin,
  Trash2,
  Edit,
  CreditCard,
  Download,
  UserCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function AdminParishioners() {
  const [parishioners, setParishioners] = useState([
    {
      id: "PAR-2024-001",
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, City, State 12345",
      dateOfBirth: "1985-06-15",
      registeredDate: "2024-01-15",
      status: "Active",
      familyMembers: 4,
    },
    {
      id: "PAR-2024-002",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Avenue, City, State 12345",
      dateOfBirth: "1978-03-22",
      registeredDate: "2024-02-20",
      status: "Active",
      familyMembers: 3,
    },
    {
      id: "PAR-2024-003",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 345-6789",
      address: "789 Pine Road, City, State 12345",
      dateOfBirth: "1990-11-08",
      registeredDate: "2024-03-10",
      status: "Active",
      familyMembers: 2,
    },
    {
      id: "PAR-2024-004",
      name: "Michael Chen",
      email: "michael.c@email.com",
      phone: "+1 (555) 456-7890",
      address: "321 Elm Street, City, State 12345",
      dateOfBirth: "1982-09-30",
      registeredDate: "2024-04-05",
      status: "Inactive",
      familyMembers: 5,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [idCardDialogOpen, setIdCardDialogOpen] = useState(false);
  const [selectedParishioner, setSelectedParishioner] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
  });

  const handleEdit = (parishioner) => {
    setSelectedParishioner(parishioner);
    setEditData({
      name: parishioner.name,
      email: parishioner.email,
      phone: parishioner.phone,
      address: parishioner.address,
      dateOfBirth: parishioner.dateOfBirth,
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    setParishioners(
      parishioners.map((p) =>
        p.id === selectedParishioner.id ? { ...p, ...editData } : p,
      ),
    );
    toast.success("Parishioner updated successfully");
    setEditDialogOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this parishioner?")) {
      setParishioners(parishioners.filter((p) => p.id !== id));
      toast.success("Parishioner deleted successfully");
    }
  };

  const handleDeleteAll = () => {
    if (
      window.confirm(
        "Are you sure you want to delete ALL parishioners? This action cannot be undone.",
      )
    ) {
      setParishioners([]);
      toast.success("All parishioners deleted");
    }
  };

  const handleGenerateIDCard = (parishioner) => {
    setSelectedParishioner(parishioner);
    setIdCardDialogOpen(true);
  };

  const handleDownloadIDCard = () => {
    // In production, this would generate a PDF or image
    toast.success("ID Card downloaded successfully");
    setIdCardDialogOpen(false);
  };

  const filteredParishioners = parishioners.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2
            className="text-2xl text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Registered Parishioners
          </h2>
          <p className="text-gray-600 mt-1">
            Manage parishioner information and records
          </p>
        </div>
        <Button
          onClick={handleDeleteAll}
          variant="outline"
          className="text-red-600 border-red-300 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete All
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Parishioners</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {parishioners.length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Members</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {parishioners.filter((p) => p.status === "Active").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Families</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {parishioners.reduce((sum, p) => sum + p.familyMembers, 0)}
                </h3>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">New This Month</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {
                    parishioners.filter((p) => {
                      const registered = new Date(p.registeredDate);
                      const now = new Date();
                      return (
                        registered.getMonth() === now.getMonth() &&
                        registered.getFullYear() === now.getFullYear()
                      );
                    }).length
                  }
                </h3>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-orange-600" />
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
              placeholder="Search by name, email, phone, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </CardContent>
      </Card>

      {/* Parishioners Table */}
      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle
            className="text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            All Parishioners
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    ID / Parishioner
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Contact Information
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Address
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
                {filteredParishioners.map((parishioner) => (
                  <tr
                    key={parishioner.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center">
                          <span
                            className="text-white text-lg"
                            style={{ fontFamily: "Playfair Display, serif" }}
                          >
                            {parishioner.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {parishioner.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {parishioner.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 flex items-center mb-1">
                        <Mail className="w-3 h-3 mr-1 text-gray-400" />
                        {parishioner.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone className="w-3 h-3 mr-1 text-gray-400" />
                        {parishioner.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 flex items-start">
                        <MapPin className="w-3 h-3 mr-1 text-gray-400 mt-1 flex-shrink-0" />
                        <span className="max-w-xs">{parishioner.address}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        className={
                          parishioner.status === "Active"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                        }
                      >
                        {parishioner.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleGenerateIDCard(parishioner)}
                          className="hover:bg-blue-50 hover:text-blue-700"
                        >
                          <CreditCard className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(parishioner)}
                          className="hover:bg-gray-100"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(parishioner.id)}
                          className="hover:bg-red-50 hover:text-red-700"
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

      {/* Empty State */}
      {filteredParishioners.length === 0 && (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <User className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3
              className="text-xl text-gray-600 mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              No parishioners found
            </h3>
            <p className="text-gray-500">Try adjusting your search query</p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Edit Parishioner
            </DialogTitle>
            <DialogDescription>
              Update parishioner information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editData.phone}
                  onChange={(e) =>
                    setEditData({ ...editData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={editData.address}
                onChange={(e) =>
                  setEditData({ ...editData, address: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-dob">Date of Birth</Label>
              <Input
                id="edit-dob"
                type="date"
                value={editData.dateOfBirth}
                onChange={(e) =>
                  setEditData({ ...editData, dateOfBirth: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ID Card Dialog */}
      <Dialog open={idCardDialogOpen} onOpenChange={setIdCardDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Parishioner ID Card
            </DialogTitle>
            <DialogDescription>Preview and download ID card</DialogDescription>
          </DialogHeader>

          {selectedParishioner && (
            <div className="py-4">
              {/* ID Card Preview */}
              <div className="bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] p-6 rounded-lg text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs uppercase tracking-wider opacity-90">
                    Parish ID Card
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center">
                    <User className="w-4 h-4 text-[#1e3a5f]" />
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                    <span
                      className="text-4xl text-[#8B2635]"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {selectedParishioner.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="text-xl mb-1"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {selectedParishioner.name}
                    </h3>
                    <p className="text-sm opacity-90">
                      {selectedParishioner.id}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm border-t border-white/20 pt-4">
                  <div className="flex justify-between">
                    <span className="opacity-75">Status:</span>
                    <span className="font-medium">
                      {selectedParishioner.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Member Since:</span>
                    <span className="font-medium">
                      {new Date(
                        selectedParishioner.registeredDate,
                      ).getFullYear()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Family Members:</span>
                    <span className="font-medium">
                      {selectedParishioner.familyMembers}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-xs text-center opacity-75">
                  Valid until December 31, 2026
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIdCardDialogOpen(false)}
            >
              Close
            </Button>
            <Button
              onClick={handleDownloadIDCard}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download ID Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
