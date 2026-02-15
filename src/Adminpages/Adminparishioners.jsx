import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchParishioners,
  updateParishioner,
  deleteParishioner,
  deleteAllParishioners,
} from "../Redux/slice/ParishUserRegistrationSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Trash2,
  Edit,
  CreditCard,
  Download,
  UserCheck,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function AdminParishioners() {
  const dispatch = useDispatch();

  // ✅ FIX: Get loading state properly from Redux
  const {
    parishioners = [],
    total = 0,
    loading,
  } = useSelector(
    (state) =>
      state.parishRegister || { parishioners: [], total: 0, loading: false },
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [idCardDialogOpen, setIdCardDialogOpen] = useState(false);
  const [selectedParishioner, setSelectedParishioner] = useState(null);

  const [editData, setEditData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "Male",
    maritalStatus: "Single",
    spouseName: "",
    sacraments: {
      baptized: false,
      baptismDate: "",
      baptismParish: "",
      communion: false,
      communionDate: "",
      confirmed: false,
      confirmationDate: "",
      married: false,
      marriageDate: "",
    },
    previousParish: "",
    ministries: [],
    accessibility: "",
    status: "Active",
    registeredDate: new Date().toISOString(),
  });

  useEffect(() => {
    dispatch(
      fetchParishioners({ search: searchQuery, page: currentPage, limit }),
    );
  }, [dispatch, searchQuery, currentPage, limit]);

  const handleEdit = (parishioner) => {
    setSelectedParishioner(parishioner);
    setEditData({
      fullName: parishioner.fullName,
      email: parishioner.email,
      phone: parishioner.phone || "",
      address: parishioner.address || "",
      dob: parishioner.dob ? parishioner.dob.split("T")[0] : "",
      gender: parishioner.gender,
      maritalStatus: parishioner.maritalStatus,
      spouseName: parishioner.spouseName || "",
      sacraments: parishioner.sacraments || {
        baptized: false,
        baptismDate: "",
        baptismParish: "",
        communion: false,
        communionDate: "",
        confirmed: false,
        confirmationDate: "",
        married: false,
        marriageDate: "",
      },
      previousParish: parishioner.previousParish || "",
      ministries: parishioner.ministries || [],
      accessibility: parishioner.accessibility || "",
      status: parishioner.status || "Active",
      registeredDate: parishioner.createdAt || new Date().toISOString(),
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await dispatch(
        updateParishioner({ id: selectedParishioner._id, data: editData }),
      ).unwrap();
      toast.success("Parishioner updated successfully");
      setEditDialogOpen(false);
    } catch {
      toast.error("Failed to update parishioner");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this parishioner?")) {
      try {
        await dispatch(deleteParishioner(id)).unwrap();
        toast.success("Parishioner deleted");
      } catch {
        toast.error("Failed to delete parishioner");
      }
    }
  };

  const handleDeleteAll = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete ALL parishioners? This cannot be undone.",
      )
    ) {
      try {
        await dispatch(deleteAllParishioners()).unwrap();
        toast.success("All parishioners deleted");
      } catch {
        toast.error("Failed to delete all parishioners");
      }
    }
  };

  const handleGenerateIDCard = (parishioner) => {
    setSelectedParishioner(parishioner);
    setIdCardDialogOpen(true);
  };

  const handleDownloadIDCard = () => {
    toast.success("ID Card downloaded successfully");
    setIdCardDialogOpen(false);
  };

  const totalPages = Math.ceil(total / limit);

  // ✅ FIX: Consistent loading UI matching AdminUsersPage
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
      <div className="flex justify-between items-center">
        <div>
          <h2
            className="text-2xl text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Parishioner Management
          </h2>
          <p className="text-gray-600 mt-1">
            Manage all registered parishioners
          </p>
        </div>
        <Button onClick={handleDeleteAll} variant="destructive">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete All
        </Button>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-md">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by name, email, or phone..."
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
            All Parishioners ({total})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {parishioners.length === 0 ? (
            <p className="p-6 text-center text-gray-500">
              No parishioners found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                      Name / ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                      Phone
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
                  {parishioners.map((p) => (
                    <tr
                      key={p._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center">
                            <span
                              className="text-white text-sm"
                              style={{ fontFamily: "Playfair Display, serif" }}
                            >
                              {p.fullName.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {p.fullName}
                            </div>
                            <div className="text-xs text-gray-500">{p._id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {p.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {p.phone || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          className={
                            p.status === "Active"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                          }
                        >
                          {p.status || "Active"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleGenerateIDCard(p)}
                            title="Generate ID Card"
                          >
                            <CreditCard className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(p)}
                            title="Edit Parishioner"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(p._id)}
                            title="Delete Parishioner"
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
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              className={
                currentPage === i + 1 ? "bg-[#8B2635] hover:bg-[#6d1d28]" : ""
              }
            >
              {i + 1}
            </Button>
          ))}
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Edit Parishioner
            </DialogTitle>
            <DialogDescription>
              Update all parishioner information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Full Name *</label>
              <Input
                value={editData.fullName}
                onChange={(e) =>
                  setEditData({ ...editData, fullName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email *</label>
              <Input
                type="email"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={editData.phone}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Address</label>
              <Input
                value={editData.address}
                onChange={(e) =>
                  setEditData({ ...editData, address: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Date of Birth</label>
              <Input
                type="date"
                value={editData.dob}
                onChange={(e) =>
                  setEditData({ ...editData, dob: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Gender</label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={editData.gender}
                onChange={(e) =>
                  setEditData({ ...editData, gender: e.target.value })
                }
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Marital Status</label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={editData.maritalStatus}
                onChange={(e) =>
                  setEditData({ ...editData, maritalStatus: e.target.value })
                }
              >
                <option>Single</option>
                <option>Married</option>
                <option>Widowed</option>
                <option>Divorced</option>
              </select>
            </div>

            {editData.maritalStatus === "Married" && (
              <div>
                <label className="text-sm font-medium">Spouse Name</label>
                <Input
                  value={editData.spouseName}
                  onChange={(e) =>
                    setEditData({ ...editData, spouseName: e.target.value })
                  }
                />
              </div>
            )}

            {/* Sacraments Section */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Sacraments</h4>

              {/* Baptized */}
              <div className="space-y-2 mb-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editData.sacraments.baptized}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        sacraments: {
                          ...editData.sacraments,
                          baptized: e.target.checked,
                        },
                      })
                    }
                  />
                  <span className="font-medium">Baptized</span>
                </label>

                {editData.sacraments.baptized && (
                  <>
                    <Input
                      type="date"
                      placeholder="Baptism Date"
                      value={
                        editData.sacraments.baptismDate?.split("T")[0] || ""
                      }
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          sacraments: {
                            ...editData.sacraments,
                            baptismDate: e.target.value,
                          },
                        })
                      }
                    />
                    <Input
                      placeholder="Baptism Parish"
                      value={editData.sacraments.baptismParish || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          sacraments: {
                            ...editData.sacraments,
                            baptismParish: e.target.value,
                          },
                        })
                      }
                    />
                  </>
                )}
              </div>

              {/* Communion */}
              <div className="space-y-2 mb-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editData.sacraments.communion}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        sacraments: {
                          ...editData.sacraments,
                          communion: e.target.checked,
                        },
                      })
                    }
                  />
                  <span className="font-medium">First Communion</span>
                </label>

                {editData.sacraments.communion && (
                  <Input
                    type="date"
                    placeholder="Communion Date"
                    value={
                      editData.sacraments.communionDate?.split("T")[0] || ""
                    }
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        sacraments: {
                          ...editData.sacraments,
                          communionDate: e.target.value,
                        },
                      })
                    }
                  />
                )}
              </div>

              {/* Confirmed */}
              <div className="space-y-2 mb-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editData.sacraments.confirmed}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        sacraments: {
                          ...editData.sacraments,
                          confirmed: e.target.checked,
                        },
                      })
                    }
                  />
                  <span className="font-medium">Confirmed</span>
                </label>

                {editData.sacraments.confirmed && (
                  <Input
                    type="date"
                    placeholder="Confirmation Date"
                    value={
                      editData.sacraments.confirmationDate?.split("T")[0] || ""
                    }
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        sacraments: {
                          ...editData.sacraments,
                          confirmationDate: e.target.value,
                        },
                      })
                    }
                  />
                )}
              </div>

              {/* Married */}
              <div className="space-y-2 mb-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editData.sacraments.married}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        sacraments: {
                          ...editData.sacraments,
                          married: e.target.checked,
                        },
                      })
                    }
                  />
                  <span className="font-medium">Married (Catholic Church)</span>
                </label>

                {editData.sacraments.married && (
                  <Input
                    type="date"
                    placeholder="Marriage Date"
                    value={
                      editData.sacraments.marriageDate?.split("T")[0] || ""
                    }
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        sacraments: {
                          ...editData.sacraments,
                          marriageDate: e.target.value,
                        },
                      })
                    }
                  />
                )}
              </div>
            </div>

            {/* Parish life */}
            <div>
              <label className="text-sm font-medium">Previous Parish</label>
              <Input
                value={editData.previousParish}
                onChange={(e) =>
                  setEditData({ ...editData, previousParish: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Accessibility Needs</label>
              <Input
                value={editData.accessibility}
                onChange={(e) =>
                  setEditData({ ...editData, accessibility: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Ministries (comma separated)
              </label>
              <Input
                value={editData.ministries.join(", ")}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    ministries: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={editData.status}
                onChange={(e) =>
                  setEditData({ ...editData, status: e.target.value })
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
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
            <div className="p-6 bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] text-white rounded-lg shadow-lg">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-2">
                  {selectedParishioner.fullName}
                </h3>
                <p className="text-sm opacity-90">Parishioner ID Card</p>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">ID:</span>{" "}
                  {selectedParishioner._id}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {selectedParishioner.status || "Active"}
                </p>
                <p>
                  <span className="font-semibold">Member Since:</span>{" "}
                  {new Date(
                    selectedParishioner.createdAt || Date.now(),
                  ).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedParishioner.email}
                </p>
                {selectedParishioner.phone && (
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {selectedParishioner.phone}
                  </p>
                )}
                {selectedParishioner.ministries &&
                  selectedParishioner.ministries.length > 0 && (
                    <p>
                      <span className="font-semibold">Ministries:</span>{" "}
                      {selectedParishioner.ministries.join(", ")}
                    </p>
                  )}
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
