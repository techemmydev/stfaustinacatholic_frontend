import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  Plus,
  Trash2,
  MapPin,
  Clock,
  Users,
  Edit,
  Eye,
  EyeOff,
  ImagePlus,
  X,
  AlertTriangle,
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
  fetchAllEventsAdmin,
  createEvent,
  updateEvent,
  toggleEventPublish,
  deleteEvent,
} from "../Redux/slice/Eventslice";

// ─────────────────────────────────────────────────────────────
// These components MUST live outside AdminEvents so React does
// not unmount/remount them on every keystroke (losing focus).
// ─────────────────────────────────────────────────────────────

function ImageUpload({ preview, onChange, onClear, inputRef, mode }) {
  return (
    <div className="space-y-2">
      <Label>Event Image (optional)</Label>
      {preview ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => onClear(mode)}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#8B2635] hover:bg-[#8B2635]/5 transition-colors">
          <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Click to upload image</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onChange(e, mode)}
          />
        </label>
      )}
    </div>
  );
}

function EventFormFields({
  data,
  setData,
  mode,
  imagePreview,
  editImagePreview,
  handleImageChange,
  clearImage,
  addImageRef,
  editImageRef,
}) {
  return (
    <div className="space-y-4 py-4">
      <ImageUpload
        preview={mode === "add" ? imagePreview : editImagePreview}
        onChange={handleImageChange}
        onClear={clearImage}
        inputRef={mode === "add" ? addImageRef : editImageRef}
        mode={mode}
      />

      <div className="space-y-2">
        <Label>Event Title *</Label>
        <Input
          placeholder="e.g., Parish Youth Retreat"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Description *</Label>
        <textarea
          placeholder="Describe the event..."
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="w-full min-h-[100px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Event Date *</Label>
          <Input
            type="date"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Time *</Label>
          <Input
            placeholder="e.g., 9:00 AM - 5:00 PM"
            value={data.time}
            onChange={(e) => setData({ ...data, time: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Location *</Label>
        <Input
          placeholder="e.g., Parish Hall"
          value={data.location}
          onChange={(e) => setData({ ...data, location: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <select
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent"
          >
            <option value="Event">Event</option>
            <option value="Retreat">Retreat</option>
            <option value="Festival">Festival</option>
            <option value="Study">Bible Study</option>
            <option value="Service">Community Service</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Max Attendees</Label>
          <Input
            type="number"
            min="1"
            value={data.maxAttendees}
            onChange={(e) =>
              setData({ ...data, maxAttendees: parseInt(e.target.value) })
            }
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────

const emptyEvent = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  category: "Event",
  maxAttendees: 50,
  imageUrl: "",
};

export function AdminEvents() {
  const dispatch = useDispatch();
  const { adminEvents, loading, actionLoading } = useSelector(
    (state) => state.event,
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const addImageRef = useRef(null);
  const editImageRef = useRef(null);

  const [newEvent, setNewEvent] = useState({ ...emptyEvent });
  const [editEventData, setEditEventData] = useState({ ...emptyEvent });

  useEffect(() => {
    dispatch(fetchAllEventsAdmin());
  }, [dispatch]);

  const handleImageChange = (e, mode) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (mode === "add") {
        setImagePreview(reader.result);
        setNewEvent((prev) => ({ ...prev, imageUrl: reader.result }));
      } else {
        setEditImagePreview(reader.result);
        setEditEventData((prev) => ({ ...prev, imageUrl: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImage = (mode) => {
    if (mode === "add") {
      setImagePreview(null);
      setNewEvent((prev) => ({ ...prev, imageUrl: "" }));
      if (addImageRef.current) addImageRef.current.value = "";
    } else {
      setEditImagePreview(null);
      setEditEventData((prev) => ({ ...prev, imageUrl: "" }));
      if (editImageRef.current) editImageRef.current.value = "";
    }
  };

  const handleAddEvent = async () => {
    if (
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.time ||
      !newEvent.location
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    const result = await dispatch(createEvent(newEvent));
    if (result.error) {
      toast.error(result.payload || "Failed to create event");
    } else {
      toast.success("Event created successfully");
      setNewEvent({ ...emptyEvent });
      setImagePreview(null);
      setDialogOpen(false);
      dispatch(fetchAllEventsAdmin());
    }
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setEditEventData({
      title: event.title,
      description: event.description,
      date: event.date.split("T")[0],
      time: event.time,
      location: event.location,
      category: event.category,
      maxAttendees: event.maxAttendees,
      imageUrl: event.imageUrl || "",
    });
    setEditImagePreview(event.imageUrl || null);
    setEditDialogOpen(true);
  };

  const handleUpdateEvent = async () => {
    const result = await dispatch(
      updateEvent({ id: selectedEvent._id, data: editEventData }),
    );
    if (result.error) {
      toast.error(result.payload || "Failed to update event");
    } else {
      toast.success("Event updated successfully");
      setEditDialogOpen(false);
      dispatch(fetchAllEventsAdmin());
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    const result = await dispatch(toggleEventPublish(id));
    if (result.error) {
      toast.error(result.payload || "Failed to toggle publish status");
    } else {
      toast.success(
        `Event ${currentStatus ? "unpublished" : "published"} successfully`,
      );
      dispatch(fetchAllEventsAdmin());
    }
  };

  const confirmDelete = (event) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };

  const handleDeleteEvent = async () => {
    const result = await dispatch(deleteEvent(eventToDelete._id));
    if (result.error) {
      toast.error(result.payload || "Failed to delete event");
    } else {
      toast.success("Event deleted successfully");
    }
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Retreat: "bg-purple-100 text-purple-700",
      Festival: "bg-pink-100 text-pink-700",
      Study: "bg-blue-100 text-blue-700",
      Service: "bg-green-100 text-green-700",
      Event: "bg-gray-100 text-gray-700",
    };
    return colors[category] || colors["Event"];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-[#8B2635] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Shared props passed down to EventFormFields
  const sharedFormProps = {
    imagePreview,
    editImagePreview,
    handleImageChange,
    clearImage,
    addImageRef,
    editImageRef,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2
            className="text-2xl text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Events Management
          </h2>
          <p className="text-gray-600 mt-1">
            Manage parish events and activities
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Event
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Events",
            value: adminEvents.length,
            icon: Calendar,
            bg: "bg-blue-50",
            color: "text-blue-600",
          },
          {
            label: "Published",
            value: adminEvents.filter((e) => e.isPublished).length,
            icon: Eye,
            bg: "bg-green-50",
            color: "text-green-600",
          },
          {
            label: "Draft",
            value: adminEvents.filter((e) => !e.isPublished).length,
            icon: EyeOff,
            bg: "bg-orange-50",
            color: "text-orange-600",
          },
          {
            label: "Total Attendees",
            value: adminEvents.reduce((sum, e) => sum + (e.attendees || 0), 0),
            icon: Users,
            bg: "bg-purple-50",
            color: "text-purple-600",
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

      {/* Events Grid */}
      {adminEvents.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3
              className="text-xl text-gray-600 mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              No events yet
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by creating your first parish event
            </p>
            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> Add New Event
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminEvents.map((event) => (
            <Card
              key={event._id}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {event.imageUrl ? (
                <div className="h-40 overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-40 bg-gradient-to-br from-[#1e3a5f]/10 to-[#8B2635]/10 flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-[#8B2635]/30" />
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                  {event.isPublished ? (
                    <Badge className="bg-green-100 text-green-700">
                      Published
                    </Badge>
                  ) : (
                    <Badge className="bg-orange-100 text-orange-700">
                      Draft
                    </Badge>
                  )}
                </div>
                <CardTitle
                  className="text-lg text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {event.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {event.description}
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center text-sm text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-[#8B2635]" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-[#8B2635]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-[#8B2635]" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Users className="w-4 h-4 mr-2 text-[#8B2635]" />
                    <span>
                      {event.attendees || 0} / {event.maxAttendees} attendees
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditEvent(event)}
                    disabled={actionLoading}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleTogglePublish(event._id, event.isPublished)
                    }
                    disabled={actionLoading}
                    className={
                      event.isPublished
                        ? "text-orange-600 border-orange-300"
                        : "text-green-600 border-green-300"
                    }
                  >
                    {event.isPublished ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => confirmDelete(event)}
                    disabled={actionLoading}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ── Add Event Dialog ── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Create New Event
            </DialogTitle>
            <DialogDescription>
              Add a new event to your parish calendar
            </DialogDescription>
          </DialogHeader>

          <EventFormFields
            data={newEvent}
            setData={setNewEvent}
            mode="add"
            {...sharedFormProps}
          />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
                setImagePreview(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddEvent}
              disabled={actionLoading}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              {actionLoading ? "Creating..." : "Create Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit Event Dialog ── */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Edit Event
            </DialogTitle>
            <DialogDescription>Update event information</DialogDescription>
          </DialogHeader>

          <EventFormFields
            data={editEventData}
            setData={setEditEventData}
            mode="edit"
            {...sharedFormProps}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateEvent}
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
                Delete Event
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-gray-900">
                "{eventToDelete?.title}"
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
              onClick={handleDeleteEvent}
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
