import { useState } from "react";
import {
  Calendar,
  Plus,
  Trash2,
  MapPin,
  Clock,
  Users,
  Edit,
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

export function AdminEvents() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Parish Youth Retreat",
      description:
        "A spiritual retreat for young adults ages 18-35. Join us for a weekend of prayer, fellowship, and growth.",
      date: "2026-03-15",
      time: "9:00 AM - 5:00 PM",
      location: "St. Mary Retreat Center",
      category: "Retreat",
      attendees: 45,
      maxAttendees: 60,
      imageUrl: null,
    },
    {
      id: 2,
      title: "Annual Parish Festival",
      description:
        "Celebrate our parish community with food, music, games, and fellowship for all ages.",
      date: "2026-04-20",
      time: "12:00 PM - 8:00 PM",
      location: "Parish Grounds",
      category: "Festival",
      attendees: 250,
      maxAttendees: 500,
      imageUrl: null,
    },
    {
      id: 3,
      title: "Bible Study Series",
      description:
        "Weekly Bible study focusing on the Gospel of John. All are welcome to join.",
      date: "2026-02-12",
      time: "7:00 PM - 8:30 PM",
      location: "Parish Hall",
      category: "Study",
      attendees: 25,
      maxAttendees: 40,
      imageUrl: null,
    },
    {
      id: 4,
      title: "Community Service Day",
      description:
        "Join us in serving our local community through various outreach projects.",
      date: "2026-03-05",
      time: "8:00 AM - 2:00 PM",
      location: "Various Locations",
      category: "Service",
      attendees: 35,
      maxAttendees: 50,
      imageUrl: null,
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "Event",
    maxAttendees: 50,
  });

  const handleAddEvent = () => {
    if (
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.time ||
      !newEvent.location
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const event = {
      id: events.length + 1,
      ...newEvent,
      attendees: 0,
    };

    setEvents([...events, event]);
    toast.success("Event created successfully");

    // Reset form
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "Event",
      maxAttendees: 50,
    });
    setDialogOpen(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
    toast.success("Event deleted successfully");
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
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
            Upcoming Events
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Events</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {events.length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Attendees</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {events.reduce((sum, event) => sum + event.attendees, 0)}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Available Spots</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {events.reduce(
                    (sum, event) =>
                      sum + (event.maxAttendees - event.attendees),
                    0,
                  )}
                </h3>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card
            key={event.id}
            className="border-0 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-3">
                <Badge
                  className={`${getCategoryColor(event.category)} hover:${getCategoryColor(event.category)}`}
                >
                  {event.category}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
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

              <div className="space-y-2">
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
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1 text-gray-400" />
                    <span>
                      {event.attendees} / {event.maxAttendees}
                    </span>
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#8B2635] h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(event.attendees / event.maxAttendees) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3
              className="text-xl text-gray-600 mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              No upcoming events
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by creating your first parish event
            </p>
            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Event
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Event Dialog */}
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

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Parish Youth Retreat"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                placeholder="Describe the event..."
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                className="w-full min-h-[100px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Event Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                  value={newEvent.time}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, time: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g., Parish Hall"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={newEvent.category}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, category: e.target.value })
                  }
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
                <Label htmlFor="maxAttendees">Max Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  min="1"
                  value={newEvent.maxAttendees}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      maxAttendees: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddEvent}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
