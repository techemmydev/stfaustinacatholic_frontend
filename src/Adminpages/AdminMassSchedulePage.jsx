import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Church,
  Plus,
  Clock,
  Edit,
  Trash2,
  Eye,
  EyeOff,
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
  fetchAllMassSchedulesAdmin,
  createMassSchedule,
  updateMassSchedule,
  toggleMassSchedulePublish,
  deleteMassSchedule,
} from "../Redux/slice/Massscheduleslice";

// ─────────────────────────────────────────────────────────────
// Defined OUTSIDE AdminMassSchedulePage so React does not
// unmount/remount it on every keystroke and lose input focus.
// ─────────────────────────────────────────────────────────────
function ScheduleFormFields({ data, setData }) {
  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Day *</Label>
          <select
            value={data.day}
            onChange={(e) => setData({ ...data, day: e.target.value })}
            className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
          >
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Monday - Friday">Monday - Friday</option>
            <option value="First Friday">First Friday</option>
            <option value="Holy Days">Holy Days</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Time *</Label>
          <Input
            placeholder="e.g., 8:00 AM"
            value={data.time}
            onChange={(e) => setData({ ...data, time: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Type *</Label>
          <select
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
            className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
          >
            <option value="Sunday Mass">Sunday Mass</option>
            <option value="Weekday Mass">Weekday Mass</option>
            <option value="Vigil Mass">Vigil Mass</option>
            <option value="Evening Mass">Evening Mass</option>
            <option value="Special">Special</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Language</Label>
          <Input
            placeholder="e.g., English"
            value={data.language}
            onChange={(e) => setData({ ...data, language: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <Input
          placeholder="e.g., Main Church"
          value={data.location}
          onChange={(e) => setData({ ...data, location: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <textarea
          placeholder="Any additional information..."
          value={data.notes}
          onChange={(e) => setData({ ...data, notes: e.target.value })}
          className="w-full min-h-[80px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────

const emptySchedule = {
  day: "Sunday",
  time: "",
  type: "Sunday Mass",
  language: "English",
  location: "Main Church",
  notes: "",
};

export function AdminMassSchedulePage() {
  const dispatch = useDispatch();
  const { adminSchedules, loading, actionLoading } = useSelector(
    (state) => state.massSchedule,
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const [newSchedule, setNewSchedule] = useState({ ...emptySchedule });
  const [editScheduleData, setEditScheduleData] = useState({
    ...emptySchedule,
  });

  useEffect(() => {
    dispatch(fetchAllMassSchedulesAdmin());
  }, [dispatch]);

  const handleAddSchedule = async () => {
    if (!newSchedule.time) {
      toast.error("Please enter the mass time");
      return;
    }
    const result = await dispatch(createMassSchedule(newSchedule));
    if (result.error) {
      toast.error(result.payload || "Failed to create mass schedule");
    } else {
      toast.success("Mass schedule created successfully");
      setNewSchedule({ ...emptySchedule });
      setDialogOpen(false);
      dispatch(fetchAllMassSchedulesAdmin());
    }
  };

  const handleEditSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    setEditScheduleData({
      day: schedule.day,
      time: schedule.time,
      type: schedule.type,
      language: schedule.language,
      location: schedule.location,
      notes: schedule.notes || "",
    });
    setEditDialogOpen(true);
  };

  const handleUpdateSchedule = async () => {
    const result = await dispatch(
      updateMassSchedule({ id: selectedSchedule._id, data: editScheduleData }),
    );
    if (result.error) {
      toast.error(result.payload || "Failed to update mass schedule");
    } else {
      toast.success("Mass schedule updated successfully");
      setEditDialogOpen(false);
      dispatch(fetchAllMassSchedulesAdmin());
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    const result = await dispatch(toggleMassSchedulePublish(id));
    if (result.error) {
      toast.error(result.payload || "Failed to toggle publish status");
    } else {
      toast.success(
        `Mass schedule ${currentStatus ? "unpublished" : "published"} successfully`,
      );
      dispatch(fetchAllMassSchedulesAdmin());
    }
  };

  const confirmDelete = (schedule) => {
    setScheduleToDelete(schedule);
    setDeleteDialogOpen(true);
  };

  const handleDeleteSchedule = async () => {
    const result = await dispatch(deleteMassSchedule(scheduleToDelete._id));
    if (result.error) {
      toast.error(result.payload || "Failed to delete mass schedule");
    } else {
      toast.success("Mass schedule deleted successfully");
    }
    setDeleteDialogOpen(false);
    setScheduleToDelete(null);
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
      <div className="flex justify-between items-center">
        <div>
          <h2
            className="text-2xl text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Mass Schedule Management
          </h2>
          <p className="text-gray-600 mt-1">
            Manage mass times and assignments
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Total Masses",
            value: adminSchedules.length,
            icon: Church,
            bg: "bg-blue-50",
            color: "text-blue-600",
          },
          {
            label: "Published",
            value: adminSchedules.filter((s) => s.isPublished).length,
            icon: Eye,
            bg: "bg-green-50",
            color: "text-green-600",
          },
          {
            label: "Draft",
            value: adminSchedules.filter((s) => !s.isPublished).length,
            icon: EyeOff,
            bg: "bg-orange-50",
            color: "text-orange-600",
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

      {/* Schedule Table */}
      {adminSchedules.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <Church className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3
              className="text-xl text-gray-600 mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              No mass schedules yet
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by creating your first mass schedule
            </p>
            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Mass Schedule
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
              Weekly Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {[
                      "Day",
                      "Time",
                      "Type",
                      "Language",
                      "Location",
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
                  {adminSchedules.map((schedule) => (
                    <tr
                      key={schedule._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Church className="w-5 h-5 text-[#8B2635] mr-2" />
                          <span className="text-sm text-gray-900">
                            {schedule.day}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {schedule.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline">{schedule.type}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {schedule.language}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {schedule.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {schedule.isPublished ? (
                          <Badge className="bg-green-100 text-green-700">
                            Published
                          </Badge>
                        ) : (
                          <Badge className="bg-orange-100 text-orange-700">
                            Draft
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditSchedule(schedule)}
                            disabled={actionLoading}
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleTogglePublish(
                                schedule._id,
                                schedule.isPublished,
                              )
                            }
                            disabled={actionLoading}
                            className={
                              schedule.isPublished
                                ? "text-orange-600 border-orange-300"
                                : "text-green-600 border-green-300"
                            }
                            title={
                              schedule.isPublished ? "Unpublish" : "Publish"
                            }
                          >
                            {schedule.isPublished ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => confirmDelete(schedule)}
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

      {/* ── Add Dialog ── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Add Mass Schedule
            </DialogTitle>
            <DialogDescription>
              Create a new mass schedule entry
            </DialogDescription>
          </DialogHeader>
          <ScheduleFormFields data={newSchedule} setData={setNewSchedule} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddSchedule}
              disabled={actionLoading}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              {actionLoading ? "Creating..." : "Create Mass Schedule"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ── */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Edit Mass Schedule
            </DialogTitle>
            <DialogDescription>
              Update mass schedule information
            </DialogDescription>
          </DialogHeader>
          <ScheduleFormFields
            data={editScheduleData}
            setData={setEditScheduleData}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateSchedule}
              disabled={actionLoading}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              {actionLoading ? "Saving..." : "Save Changes"}
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
                Delete Mass Schedule
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 leading-relaxed">
              Are you sure you want to permanently delete the{" "}
              <span className="font-semibold text-gray-900">
                {scheduleToDelete?.day} {scheduleToDelete?.time} (
                {scheduleToDelete?.type})
              </span>{" "}
              schedule? This action cannot be undone.
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
              onClick={handleDeleteSchedule}
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
