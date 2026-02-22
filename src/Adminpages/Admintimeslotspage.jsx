import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Clock,
  Plus,
  Trash2,
  AlertTriangle,
  Calendar,
  Users,
  ToggleLeft,
  ToggleRight,
  Zap,
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
import {
  fetchSlotsForDate,
  createSlot,
  createBulkSlots,
  updateSlot,
  deleteSlot,
} from "../Redux/slice/Timeslotslice";

// ─── Predefined time options ──────────────────────────────────
const TIME_OPTIONS = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

// Preset templates
const PRESETS = {
  "Full Day (9AM–5PM)": [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ],
  "Morning Only (9AM–12PM)": [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
  ],
  "Afternoon Only (1PM–5PM)": [
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ],
  "Saturday (10AM–2PM)": [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
  ],
};

// ─── Defined OUTSIDE to avoid focus-loss bug ──────────────────
function SlotRow({
  slot,
  onToggle,
  onDelete,
  onCapacityChange,
  actionLoading,
}) {
  const [editingCapacity, setEditingCapacity] = useState(false);
  const [capacityValue, setCapacityValue] = useState(slot.maxCapacity);
  const remaining = slot.maxCapacity - slot.bookedCount;
  const isFull = slot.bookedCount >= slot.maxCapacity;

  const handleCapacitySave = () => {
    const val = parseInt(capacityValue);
    if (!val || val < slot.bookedCount) {
      toast.error(
        `Capacity can't be less than current bookings (${slot.bookedCount})`,
      );
      setCapacityValue(slot.maxCapacity);
    } else {
      onCapacityChange(slot._id, val);
    }
    setEditingCapacity(false);
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#8B2635]" />
          <span className="text-sm font-medium text-gray-900">{slot.time}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {editingCapacity ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={slot.bookedCount || 1}
              value={capacityValue}
              onChange={(e) => setCapacityValue(e.target.value)}
              onBlur={handleCapacitySave}
              onKeyDown={(e) => e.key === "Enter" && handleCapacitySave()}
              autoFocus
              className="w-16 px-2 py-1 text-sm border border-[#8B2635] rounded-md focus:outline-none"
            />
          </div>
        ) : (
          <button
            onClick={() => setEditingCapacity(true)}
            className="text-sm text-gray-700 hover:text-[#8B2635] hover:underline cursor-pointer"
            title="Click to edit"
          >
            {slot.maxCapacity} max
          </button>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-100 rounded-full h-2 w-24">
            <div
              className={`h-2 rounded-full transition-all ${isFull ? "bg-red-500" : "bg-green-500"}`}
              style={{
                width: `${Math.min((slot.bookedCount / slot.maxCapacity) * 100, 100)}%`,
              }}
            />
          </div>
          <span className="text-xs text-gray-500">
            {slot.bookedCount}/{slot.maxCapacity}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isFull ? (
          <Badge className="bg-red-100 text-red-700">Full</Badge>
        ) : (
          <Badge className="bg-green-100 text-green-700">
            {remaining} left
          </Badge>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => onToggle(slot._id, !slot.isAvailable)}
          disabled={actionLoading}
          className="flex items-center gap-1.5 text-sm"
          title={slot.isAvailable ? "Click to disable" : "Click to enable"}
        >
          {slot.isAvailable ? (
            <>
              <ToggleRight className="w-5 h-5 text-green-600" />
              <span className="text-green-700">Active</span>
            </>
          ) : (
            <>
              <ToggleLeft className="w-5 h-5 text-gray-400" />
              <span className="text-gray-500">Disabled</span>
            </>
          )}
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onDelete(slot)}
          disabled={actionLoading}
          className="text-red-600 border-red-300 hover:bg-red-50"
          title={
            slot.bookedCount > 0
              ? "Has bookings – cannot delete"
              : "Delete slot"
          }
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  );
}

// ─────────────────────────────────────────────────────────────
export function AdminTimeSlotsPage() {
  const dispatch = useDispatch();
  const { slots, loading, actionLoading } = useSelector(
    (state) => state.timeSlot,
  );

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState(null);

  // Single slot form
  const [newSlot, setNewSlot] = useState({ time: "", maxCapacity: 5 });

  // Bulk form
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [bulkCapacity, setBulkCapacity] = useState(5);

  useEffect(() => {
    if (selectedDate) dispatch(fetchSlotsForDate(selectedDate));
  }, [selectedDate, dispatch]);

  // ── Single slot ──────────────────────────────────────────────
  const handleAddSlot = async () => {
    if (!newSlot.time) {
      toast.error("Please select a time");
      return;
    }
    const result = await dispatch(
      createSlot({ date: selectedDate, ...newSlot }),
    );
    if (result.error) {
      toast.error(result.payload || "Failed to create slot");
    } else {
      toast.success("Slot created");
      setNewSlot({ time: "", maxCapacity: 5 });
      setAddDialogOpen(false);
      dispatch(fetchSlotsForDate(selectedDate));
    }
  };

  // ── Bulk slots ───────────────────────────────────────────────
  const toggleTime = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time],
    );
  };

  const applyPreset = (times) => setSelectedTimes(times);

  const handleBulkCreate = async () => {
    if (selectedTimes.length === 0) {
      toast.error("Please select at least one time");
      return;
    }
    const result = await dispatch(
      createBulkSlots({
        date: selectedDate,
        times: selectedTimes,
        maxCapacity: bulkCapacity,
      }),
    );
    if (result.error) {
      toast.error(result.payload || "Failed to create slots");
    } else {
      toast.success(result.payload?.message || "Slots created");
      setSelectedTimes([]);
      setBulkCapacity(5);
      setBulkDialogOpen(false);
      dispatch(fetchSlotsForDate(selectedDate));
    }
  };

  // ── Toggle availability ──────────────────────────────────────
  const handleToggle = async (id, isAvailable) => {
    const result = await dispatch(updateSlot({ id, data: { isAvailable } }));
    if (result.error) {
      toast.error(result.payload || "Failed to update slot");
    } else {
      toast.success(`Slot ${isAvailable ? "enabled" : "disabled"}`);
    }
  };

  // ── Capacity inline edit ────────────────────────────────────
  const handleCapacityChange = async (id, maxCapacity) => {
    const result = await dispatch(updateSlot({ id, data: { maxCapacity } }));
    if (result.error)
      toast.error(result.payload || "Failed to update capacity");
    else toast.success("Capacity updated");
  };

  // ── Delete ───────────────────────────────────────────────────
  const confirmDelete = (slot) => {
    if (slot.bookedCount > 0) {
      toast.error(`Cannot delete: slot has ${slot.bookedCount} booking(s)`);
      return;
    }
    setSlotToDelete(slot);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteSlot(slotToDelete._id));
    if (result.error) {
      toast.error(result.payload || "Failed to delete slot");
    } else {
      toast.success("Slot deleted");
    }
    setDeleteDialogOpen(false);
    setSlotToDelete(null);
  };

  // ── Stats ────────────────────────────────────────────────────
  const totalSlots = slots.length;
  const totalCapacity = slots.reduce((s, sl) => s + sl.maxCapacity, 0);
  const totalBooked = slots.reduce((s, sl) => s + sl.bookedCount, 0);
  const totalRemaining = totalCapacity - totalBooked;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2
            className="text-2xl text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Time Slot Management
          </h2>
          <p className="text-gray-600 mt-1">
            Create and manage available appointment slots by date
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setBulkDialogOpen(true)}
            className="border-[#8B2635] text-[#8B2635] hover:bg-[#8B2635]/5"
          >
            <Zap className="w-4 h-4 mr-2" />
            Quick Generate
          </Button>
          <Button
            onClick={() => setAddDialogOpen(true)}
            className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Slot
          </Button>
        </div>
      </div>

      {/* Date Picker */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#8B2635]" />
              <Label className="text-gray-700 font-medium">Select Date</Label>
            </div>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
            <span className="text-sm text-gray-500">
              {selectedDate &&
                new Date(selectedDate + "T00:00:00").toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  },
                )}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Slots",
            value: totalSlots,
            icon: Clock,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Total Capacity",
            value: totalCapacity,
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            label: "Booked",
            value: totalBooked,
            icon: Users,
            color: "text-orange-600",
            bg: "bg-orange-50",
          },
          {
            label: "Available",
            value: totalRemaining,
            icon: Users,
            color: "text-green-600",
            bg: "bg-green-50",
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="border-0 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
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

      {/* Slots Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-[#8B2635] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : slots.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <Clock className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3
              className="text-xl text-gray-600 mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              No slots for this date
            </h3>
            <p className="text-gray-500 mb-6">
              Use <strong>Quick Generate</strong> to create a full day of slots
              at once, or add individual slots.
            </p>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => setBulkDialogOpen(true)}
                className="border-[#8B2635] text-[#8B2635]"
              >
                <Zap className="w-4 h-4 mr-2" /> Quick Generate
              </Button>
              <Button
                onClick={() => setAddDialogOpen(true)}
                className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Slot
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-md">
          <CardHeader className="border-b bg-gray-50">
            <CardTitle
              className="text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Slots for{" "}
              {new Date(selectedDate + "T00:00:00").toLocaleDateString(
                "en-US",
                { weekday: "long", month: "long", day: "numeric" },
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {[
                      "Time",
                      "Capacity",
                      "Bookings",
                      "Status",
                      "Available",
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
                  {slots.map((slot) => (
                    <SlotRow
                      key={slot._id}
                      slot={slot}
                      onToggle={handleToggle}
                      onDelete={confirmDelete}
                      onCapacityChange={handleCapacityChange}
                      actionLoading={actionLoading}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Add Single Slot Dialog ── */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle
              className="text-xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Add Time Slot
            </DialogTitle>
            <DialogDescription>
              Add a single slot for{" "}
              {new Date(selectedDate + "T00:00:00").toLocaleDateString(
                "en-US",
                { weekday: "long", month: "long", day: "numeric" },
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Time *</Label>
              <select
                value={newSlot.time}
                onChange={(e) =>
                  setNewSlot({ ...newSlot, time: e.target.value })
                }
                className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
              >
                <option value="">Select a time...</option>
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Max Capacity</Label>
              <Input
                type="number"
                min="1"
                value={newSlot.maxCapacity}
                onChange={(e) =>
                  setNewSlot({
                    ...newSlot,
                    maxCapacity: parseInt(e.target.value) || 1,
                  })
                }
              />
              <p className="text-xs text-gray-500">
                How many appointments can be booked in this slot
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddSlot}
              disabled={actionLoading}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              {actionLoading ? "Creating..." : "Add Slot"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Quick Generate (Bulk) Dialog ── */}
      <Dialog open={bulkDialogOpen} onOpenChange={setBulkDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Quick Generate Slots
            </DialogTitle>
            <DialogDescription>
              Select a preset or pick individual times for{" "}
              {new Date(selectedDate + "T00:00:00").toLocaleDateString(
                "en-US",
                { weekday: "long", month: "long", day: "numeric" },
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Presets */}
            <div className="space-y-2">
              <Label>Quick Presets</Label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(PRESETS).map(([label, times]) => (
                  <button
                    key={label}
                    onClick={() => applyPreset(times)}
                    className="px-3 py-1.5 text-sm rounded-full border border-[#8B2635] text-[#8B2635] hover:bg-[#8B2635] hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedTimes([])}
                  className="px-3 py-1.5 text-sm rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  Clear all
                </button>
              </div>
            </div>

            {/* Time grid */}
            <div className="space-y-2">
              <Label>Select Times ({selectedTimes.length} selected)</Label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {TIME_OPTIONS.map((time) => (
                  <button
                    key={time}
                    onClick={() => toggleTime(time)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                      selectedTimes.includes(time)
                        ? "bg-[#8B2635] text-white border-[#8B2635]"
                        : "bg-white text-gray-700 border-gray-200 hover:border-[#8B2635] hover:text-[#8B2635]"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Capacity */}
            <div className="space-y-2">
              <Label>Max Capacity per Slot</Label>
              <Input
                type="number"
                min="1"
                value={bulkCapacity}
                onChange={(e) => setBulkCapacity(parseInt(e.target.value) || 1)}
                className="w-32"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleBulkCreate}
              disabled={actionLoading || selectedTimes.length === 0}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              {actionLoading
                ? "Creating..."
                : `Create ${selectedTimes.length} Slot${selectedTimes.length !== 1 ? "s" : ""}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation ── */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <DialogTitle className="text-xl text-gray-900">
                Delete Slot
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete the{" "}
              <span className="font-semibold text-gray-900">
                {slotToDelete?.time}
              </span>{" "}
              slot? This cannot be undone.
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
