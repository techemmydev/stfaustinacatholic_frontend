import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Church,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  Users,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  fetchAllMassesAdmin,
  createMass,
  updateMass,
  toggleMassStatus,
  deleteMass,
} from "../Redux/slice/Massslice";

export function AdminMassManagement() {
  const dispatch = useDispatch();
  const { adminMasses, loading, actionLoading } = useSelector(
    (state) => state.mass,
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMass, setSelectedMass] = useState(null);

  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [massToDelete, setMassToDelete] = useState(null);

  const [newMass, setNewMass] = useState({
    name: "",
    time: "",
    day: "Sunday",
    maxThanksgivings: 5,
    description: "",
  });

  const [editMassData, setEditMassData] = useState({
    name: "",
    time: "",
    day: "Sunday",
    maxThanksgivings: 5,
    description: "",
  });

  // Fetch masses on mount
  useEffect(() => {
    dispatch(fetchAllMassesAdmin());
  }, [dispatch]);

  const handleAddMass = async () => {
    if (!newMass.name || !newMass.time || !newMass.day) {
      toast.error("Please fill in all required fields");
      return;
    }

    const result = await dispatch(createMass(newMass));

    if (result.error) {
      toast.error(result.payload || "Failed to create mass");
    } else {
      toast.success("Mass created successfully");
      setNewMass({
        name: "",
        time: "",
        day: "Sunday",
        maxThanksgivings: 5,
        description: "",
      });
      setDialogOpen(false);
      dispatch(fetchAllMassesAdmin());
    }
  };

  const handleEditMass = (mass) => {
    setSelectedMass(mass);
    setEditMassData({
      name: mass.name,
      time: mass.time,
      day: mass.day,
      maxThanksgivings: mass.maxThanksgivings,
      description: mass.description || "",
    });
    setEditDialogOpen(true);
  };

  const handleUpdateMass = async () => {
    const result = await dispatch(
      updateMass({
        id: selectedMass._id,
        data: editMassData,
      }),
    );

    if (result.error) {
      toast.error(result.payload || "Failed to update mass");
    } else {
      toast.success("Mass updated successfully");
      setEditDialogOpen(false);
      dispatch(fetchAllMassesAdmin());
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const result = await dispatch(toggleMassStatus(id));

    if (result.error) {
      toast.error(result.payload || "Failed to toggle mass status");
    } else {
      const action = currentStatus ? "deactivated" : "activated";
      toast.success(`Mass ${action} successfully`);
      dispatch(fetchAllMassesAdmin());
    }
  };

  // Opens the confirmation dialog instead of window.confirm
  const confirmDelete = (mass) => {
    setMassToDelete(mass);
    setDeleteDialogOpen(true);
  };

  // Called when user confirms deletion
  const handleDeleteMass = async () => {
    if (!massToDelete) return;
    const result = await dispatch(deleteMass(massToDelete._id));

    if (result.error) {
      toast.error(result.payload || "Failed to delete mass");
    } else {
      toast.success("Mass deleted successfully");
    }
    setDeleteDialogOpen(false);
    setMassToDelete(null);
  };

  const dayOrder = {
    Sunday: 1,
    Monday: 2,
    Tuesday: 3,
    Wednesday: 4,
    Thursday: 5,
    Friday: 6,
    Saturday: 7,
  };

  const sortedMasses = [...adminMasses].sort((a, b) => {
    const dayDiff = dayOrder[a.day] - dayOrder[b.day];
    if (dayDiff !== 0) return dayDiff;
    return a.time.localeCompare(b.time);
  });

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
      <div className="flex justify-between items-center">
        <div>
          <h2
            className="text-2xl text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Mass Management
          </h2>
          <p className="text-gray-600 mt-1">
            Manage mass times for thanksgiving bookings
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Mass
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Masses</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {adminMasses.length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Church className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {adminMasses.filter((m) => m.isActive).length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Inactive</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {adminMasses.filter((m) => !m.isActive).length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <EyeOff className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Capacity</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {adminMasses.reduce((sum, m) => sum + m.maxThanksgivings, 0)}
                </h3>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Masses Table */}
      {adminMasses.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <Church className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3
              className="text-xl text-gray-600 mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              No masses yet
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by creating your first mass time
            </p>
            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Mass
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-md">
          <CardHeader className="border-b bg-gray-50">
            <CardTitle
              className="text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Mass Times
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                      Day
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                      Capacity
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                      Bookings
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
                  {sortedMasses.map((mass) => (
                    <tr
                      key={mass._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {mass.name}
                        </div>
                        {mass.description && (
                          <div className="text-xs text-gray-500 mt-1">
                            {mass.description}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-[#8B2635] mr-2" />
                          <span className="text-sm text-gray-900">
                            {mass.day}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {mass.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {mass.maxThanksgivings}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {mass.currentThanksgivings}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {mass.isActive ? (
                          <Badge className="bg-green-100 text-green-700">
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-700">
                            Inactive
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditMass(mass)}
                            disabled={actionLoading}
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleToggleStatus(mass._id, mass.isActive)
                            }
                            disabled={actionLoading}
                            className={
                              mass.isActive
                                ? "text-orange-600 border-orange-300"
                                : "text-green-600 border-green-300"
                            }
                            title={mass.isActive ? "Deactivate" : "Activate"}
                          >
                            {mass.isActive ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => confirmDelete(mass)}
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

      {/* Add Mass Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Add Mass Time
            </DialogTitle>
            <DialogDescription>
              Create a new mass time for thanksgiving bookings
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Mass Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Sunday Morning Mass"
                value={newMass.name}
                onChange={(e) =>
                  setNewMass({ ...newMass, name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="day">Day *</Label>
                <select
                  id="day"
                  value={newMass.day}
                  onChange={(e) =>
                    setNewMass({ ...newMass, day: e.target.value })
                  }
                  className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                >
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  placeholder="e.g., 8:00 AM"
                  value={newMass.time}
                  onChange={(e) =>
                    setNewMass({ ...newMass, time: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxThanksgivings">Max Thanksgivings</Label>
              <Input
                id="maxThanksgivings"
                type="number"
                min="1"
                value={newMass.maxThanksgivings}
                onChange={(e) =>
                  setNewMass({
                    ...newMass,
                    maxThanksgivings: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <textarea
                id="description"
                placeholder="Any additional information..."
                value={newMass.description}
                onChange={(e) =>
                  setNewMass({ ...newMass, description: e.target.value })
                }
                className="w-full min-h-[80px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddMass}
              disabled={actionLoading}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              {actionLoading ? "Creating..." : "Create Mass"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Mass Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Edit Mass Time
            </DialogTitle>
            <DialogDescription>Update mass information</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Mass Name *</Label>
              <Input
                id="edit-name"
                value={editMassData.name}
                onChange={(e) =>
                  setEditMassData({ ...editMassData, name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-day">Day *</Label>
                <select
                  id="edit-day"
                  value={editMassData.day}
                  onChange={(e) =>
                    setEditMassData({ ...editMassData, day: e.target.value })
                  }
                  className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                >
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-time">Time *</Label>
                <Input
                  id="edit-time"
                  value={editMassData.time}
                  onChange={(e) =>
                    setEditMassData({ ...editMassData, time: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-maxThanksgivings">Max Thanksgivings</Label>
              <Input
                id="edit-maxThanksgivings"
                type="number"
                min="1"
                value={editMassData.maxThanksgivings}
                onChange={(e) =>
                  setEditMassData({
                    ...editMassData,
                    maxThanksgivings: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description (Optional)</Label>
              <textarea
                id="edit-description"
                value={editMassData.description}
                onChange={(e) =>
                  setEditMassData({
                    ...editMassData,
                    description: e.target.value,
                  })
                }
                className="w-full min-h-[80px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateMass}
              disabled={actionLoading}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              {actionLoading ? "Saving..." : "Save Changes"}
            </Button>
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
                Delete Mass
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-gray-900">
                {massToDelete?.name}
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
              onClick={handleDeleteMass}
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
