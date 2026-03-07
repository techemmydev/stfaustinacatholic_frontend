import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Play,
  Volume2,
  Image,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  AlertTriangle,
  Calendar,
  Clock,
  Link,
  BookOpen,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  fetchSermonsAdmin,
  createSermon,
  updateSermon,
  toggleSermonPublished,
  deleteSermon,
  fetchPhotosAdmin,
  createPhoto,
  updatePhoto,
  togglePhotoPublished,
  deletePhoto,
} from "../Redux/slice/sermonSlice";

// ── helpers ──────────────────────────────────────────────
const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

const toInputDate = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

const emptySermon = {
  title: "",
  speaker: "",
  date: "",
  duration: "",
  type: "video",
  thumbnail: "",
  mediaUrl: "",
  description: "",
  scripture: "",
  isPublished: true,
};

const emptyPhoto = {
  title: "",
  date: "",
  image: "",
  caption: "",
  isPublished: true,
};

export function AdminSermonsPage() {
  const dispatch = useDispatch();
  const {
    adminSermons,
    adminSermonsLoading,
    adminPhotos,
    adminPhotosLoading,
    actionLoading,
  } = useSelector((state) => state.sermon);

  const [activeTab, setActiveTab] = useState("sermons");

  // ── sermon dialog state ──────────────────────────────
  const [sermonDialogOpen, setSermonDialogOpen] = useState(false);
  const [editingSermon, setEditingSermon] = useState(null);
  const [sermonForm, setSermonForm] = useState(emptySermon);
  const [sermonSearch, setSermonSearch] = useState("");

  // ── photo dialog state ───────────────────────────────
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [photoForm, setPhotoForm] = useState(emptyPhoto);
  const [photoSearch, setPhotoSearch] = useState("");

  // ── delete dialog ────────────────────────────────────
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { kind: 'sermon'|'photo', item }

  useEffect(() => {
    dispatch(fetchSermonsAdmin());
    dispatch(fetchPhotosAdmin());
  }, [dispatch]);

  // ════════════════════════════════════════
  //  SERMON HANDLERS
  // ════════════════════════════════════════

  const openAddSermon = () => {
    setEditingSermon(null);
    setSermonForm(emptySermon);
    setSermonDialogOpen(true);
  };

  const openEditSermon = (sermon) => {
    setEditingSermon(sermon);
    setSermonForm({
      title: sermon.title,
      speaker: sermon.speaker,
      date: toInputDate(sermon.date),
      duration: sermon.duration,
      type: sermon.type,
      thumbnail: sermon.thumbnail || "",
      mediaUrl: sermon.mediaUrl || "",
      description: sermon.description || "",
      scripture: sermon.scripture || "",
      isPublished: sermon.isPublished,
    });
    setSermonDialogOpen(true);
  };

  const handleSermonSubmit = async () => {
    if (
      !sermonForm.title ||
      !sermonForm.speaker ||
      !sermonForm.date ||
      !sermonForm.duration
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (editingSermon) {
      const result = await dispatch(
        updateSermon({ id: editingSermon._id, data: sermonForm }),
      );
      if (result.error) {
        toast.error(result.payload || "Failed to update sermon");
      } else {
        toast.success("Sermon updated successfully");
        setSermonDialogOpen(false);
      }
    } else {
      const result = await dispatch(createSermon(sermonForm));
      if (result.error) {
        toast.error(result.payload || "Failed to create sermon");
      } else {
        toast.success("Sermon created successfully");
        setSermonDialogOpen(false);
      }
    }
  };

  const handleToggleSermon = async (id, current) => {
    const result = await dispatch(toggleSermonPublished(id));
    if (result.error) {
      toast.error(result.payload || "Failed to toggle");
    } else {
      toast.success(`Sermon ${current ? "unpublished" : "published"}`);
    }
  };

  // ════════════════════════════════════════
  //  PHOTO HANDLERS
  // ════════════════════════════════════════

  const openAddPhoto = () => {
    setEditingPhoto(null);
    setPhotoForm(emptyPhoto);
    setPhotoDialogOpen(true);
  };

  const openEditPhoto = (photo) => {
    setEditingPhoto(photo);
    setPhotoForm({
      title: photo.title,
      date: toInputDate(photo.date),
      image: photo.image,
      caption: photo.caption || "",
      isPublished: photo.isPublished,
    });
    setPhotoDialogOpen(true);
  };

  const handlePhotoSubmit = async () => {
    if (!photoForm.title || !photoForm.date || !photoForm.image) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (editingPhoto) {
      const result = await dispatch(
        updatePhoto({ id: editingPhoto._id, data: photoForm }),
      );
      if (result.error) {
        toast.error(result.payload || "Failed to update photo");
      } else {
        toast.success("Photo updated successfully");
        setPhotoDialogOpen(false);
      }
    } else {
      const result = await dispatch(createPhoto(photoForm));
      if (result.error) {
        toast.error(result.payload || "Failed to add photo");
      } else {
        toast.success("Photo added successfully");
        setPhotoDialogOpen(false);
      }
    }
  };

  const handleTogglePhoto = async (id, current) => {
    const result = await dispatch(togglePhotoPublished(id));
    if (result.error) {
      toast.error(result.payload || "Failed to toggle");
    } else {
      toast.success(`Photo ${current ? "hidden" : "published"}`);
    }
  };

  // ════════════════════════════════════════
  //  DELETE HANDLERS
  // ════════════════════════════════════════

  const confirmDelete = (kind, item) => {
    setDeleteTarget({ kind, item });
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { kind, item } = deleteTarget;
    const action = kind === "sermon" ? deleteSermon : deletePhoto;
    const result = await dispatch(action(item._id));
    if (result.error) {
      toast.error(result.payload || "Failed to delete");
    } else {
      toast.success(
        `${kind === "sermon" ? "Sermon" : "Photo"} deleted successfully`,
      );
    }
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  // ── filtered lists ───────────────────────────────────
  const filteredSermons = adminSermons.filter(
    (s) =>
      s.title.toLowerCase().includes(sermonSearch.toLowerCase()) ||
      s.speaker.toLowerCase().includes(sermonSearch.toLowerCase()),
  );

  const filteredPhotos = adminPhotos.filter((p) =>
    p.title.toLowerCase().includes(photoSearch.toLowerCase()),
  );

  // ── stats ────────────────────────────────────────────
  const sermonStats = {
    total: adminSermons.length,
    published: adminSermons.filter((s) => s.isPublished).length,
    video: adminSermons.filter((s) => s.type === "video").length,
    audio: adminSermons.filter((s) => s.type === "audio").length,
  };

  const photoStats = {
    total: adminPhotos.length,
    published: adminPhotos.filter((p) => p.isPublished).length,
  };

  // ── loading state ─────────────────────────────────────
  if (adminSermonsLoading && adminPhotosLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2
            className="text-2xl text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Sermons & Media
          </h2>
          <p className="text-gray-600 mt-1">Manage sermons and photo gallery</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Total Sermons", "Published", "Video", "Audio"].map((label) => (
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
                Loading Media
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
          Sermons & Media
        </h2>
        <p className="text-gray-600 mt-1">Manage sermons and photo gallery</p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-white border shadow-sm p-1">
          <TabsTrigger
            value="sermons"
            className="data-[state=active]:bg-[#8B2635] data-[state=active]:text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Sermons ({adminSermons.length})
          </TabsTrigger>
          <TabsTrigger
            value="gallery"
            className="data-[state=active]:bg-[#8B2635] data-[state=active]:text-white"
          >
            <Image className="w-4 h-4 mr-2" />
            Gallery ({adminPhotos.length})
          </TabsTrigger>
        </TabsList>

        {/* ══════════════ SERMONS TAB ══════════════ */}
        <TabsContent value="sermons" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total",
                value: sermonStats.total,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                label: "Published",
                value: sermonStats.published,
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                label: "Video",
                value: sermonStats.video,
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                label: "Audio",
                value: sermonStats.audio,
                color: "text-orange-600",
                bg: "bg-orange-50",
              },
            ].map(({ label, value, color, bg }) => (
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

          {/* Search + Add */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search sermons by title or speaker..."
                value={sermonSearch}
                onChange={(e) => setSermonSearch(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
            <Button
              onClick={openAddSermon}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Sermon
            </Button>
          </div>

          {/* Table */}
          {filteredSermons.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <Play className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3
                  className="text-xl text-gray-600 mb-2"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  No sermons yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Get started by adding your first sermon
                </p>
                <Button
                  onClick={openAddSermon}
                  className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Sermon
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
                  All Sermons
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        {[
                          "Sermon",
                          "Speaker",
                          "Date",
                          "Duration",
                          "Type",
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
                      {filteredSermons.map((sermon) => (
                        <tr
                          key={sermon._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {sermon.thumbnail ? (
                                <img
                                  src={sermon.thumbnail}
                                  alt={sermon.title}
                                  className="w-12 h-10 object-cover rounded flex-shrink-0"
                                />
                              ) : (
                                <div className="w-12 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] rounded flex items-center justify-center flex-shrink-0">
                                  {sermon.type === "video" ? (
                                    <Play className="w-4 h-4 text-white" />
                                  ) : (
                                    <Volume2 className="w-4 h-4 text-white" />
                                  )}
                                </div>
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                  {sermon.title}
                                </div>
                                {sermon.scripture && (
                                  <div className="text-xs text-gray-500">
                                    {sermon.scripture}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {sermon.speaker}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(sermon.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {sermon.duration}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              className={
                                sermon.type === "video"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-orange-100 text-orange-700"
                              }
                            >
                              {sermon.type}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {sermon.isPublished ? (
                              <Badge className="bg-green-100 text-green-700">
                                Published
                              </Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-600">
                                Draft
                              </Badge>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openEditSermon(sermon)}
                                disabled={actionLoading}
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleToggleSermon(
                                    sermon._id,
                                    sermon.isPublished,
                                  )
                                }
                                disabled={actionLoading}
                                className={
                                  sermon.isPublished
                                    ? "text-orange-600 border-orange-300"
                                    : "text-green-600 border-green-300"
                                }
                                title={
                                  sermon.isPublished ? "Unpublish" : "Publish"
                                }
                              >
                                {sermon.isPublished ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => confirmDelete("sermon", sermon)}
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

        {/* ══════════════ GALLERY TAB ══════════════ */}
        <TabsContent value="gallery" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-sm">
            {[
              {
                label: "Total Photos",
                value: photoStats.total,
                color: "text-blue-600",
              },
              {
                label: "Published",
                value: photoStats.published,
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

          {/* Search + Add */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search photos by title..."
                value={photoSearch}
                onChange={(e) => setPhotoSearch(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
            <Button
              onClick={openAddPhoto}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Photo
            </Button>
          </div>

          {/* Grid */}
          {filteredPhotos.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <Image className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3
                  className="text-xl text-gray-600 mb-2"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  No photos yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Add your first gallery photo
                </p>
                <Button
                  onClick={openAddPhoto}
                  className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Photo
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <Card
                  key={photo._id}
                  className="border-0 shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-48 object-cover"
                    />
                    {!photo.isPublished && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Badge className="bg-gray-800 text-white">Hidden</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {photo.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {formatDate(photo.date)}
                        </p>
                        {photo.caption && (
                          <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                            {photo.caption}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditPhoto(photo)}
                          disabled={actionLoading}
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleTogglePhoto(photo._id, photo.isPublished)
                          }
                          disabled={actionLoading}
                          className={
                            photo.isPublished
                              ? "text-orange-600 border-orange-300"
                              : "text-green-600 border-green-300"
                          }
                          title={photo.isPublished ? "Hide" : "Publish"}
                        >
                          {photo.isPublished ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => confirmDelete("photo", photo)}
                          disabled={actionLoading}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* ══════════ ADD / EDIT SERMON DIALOG ══════════ */}
      <Dialog open={sermonDialogOpen} onOpenChange={setSermonDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {editingSermon ? "Edit Sermon" : "Add Sermon"}
            </DialogTitle>
            <DialogDescription>
              {editingSermon
                ? "Update sermon details"
                : "Add a new sermon or teaching"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                placeholder="e.g. The Light of Christ in Advent"
                value={sermonForm.title}
                onChange={(e) =>
                  setSermonForm({ ...sermonForm, title: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Speaker *</Label>
                <Input
                  placeholder="e.g. Fr. Thomas O'Connor"
                  value={sermonForm.speaker}
                  onChange={(e) =>
                    setSermonForm({ ...sermonForm, speaker: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Date *</Label>
                <Input
                  type="date"
                  value={sermonForm.date}
                  onChange={(e) =>
                    setSermonForm({ ...sermonForm, date: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration *</Label>
                <Input
                  placeholder="e.g. 18:32"
                  value={sermonForm.duration}
                  onChange={(e) =>
                    setSermonForm({ ...sermonForm, duration: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Type *</Label>
                <select
                  value={sermonForm.type}
                  onChange={(e) =>
                    setSermonForm({ ...sermonForm, type: e.target.value })
                  }
                  className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                >
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Scripture Reference</Label>
              <Input
                placeholder="e.g. Isaiah 9:2-7"
                value={sermonForm.scripture}
                onChange={(e) =>
                  setSermonForm({ ...sermonForm, scripture: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Thumbnail URL</Label>
              <Input
                placeholder="https://..."
                value={sermonForm.thumbnail}
                onChange={(e) =>
                  setSermonForm({ ...sermonForm, thumbnail: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Media URL (video/audio link)</Label>
              <Input
                placeholder="https://youtube.com/... or audio link"
                value={sermonForm.mediaUrl}
                onChange={(e) =>
                  setSermonForm({ ...sermonForm, mediaUrl: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                placeholder="Brief description of this sermon..."
                value={sermonForm.description}
                onChange={(e) =>
                  setSermonForm({ ...sermonForm, description: e.target.value })
                }
                className="w-full min-h-[80px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="sermonPublished"
                checked={sermonForm.isPublished}
                onChange={(e) =>
                  setSermonForm({
                    ...sermonForm,
                    isPublished: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-[#8B2635]"
              />
              <Label htmlFor="sermonPublished">Publish immediately</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSermonDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSermonSubmit}
              disabled={actionLoading}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              {actionLoading
                ? "Saving..."
                : editingSermon
                  ? "Save Changes"
                  : "Add Sermon"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ══════════ ADD / EDIT PHOTO DIALOG ══════════ */}
      <Dialog open={photoDialogOpen} onOpenChange={setPhotoDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {editingPhoto ? "Edit Photo" : "Add Photo"}
            </DialogTitle>
            <DialogDescription>
              {editingPhoto
                ? "Update photo details"
                : "Add a new photo to the gallery"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                placeholder="e.g. Christmas Mass 2024"
                value={photoForm.title}
                onChange={(e) =>
                  setPhotoForm({ ...photoForm, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Date *</Label>
              <Input
                type="date"
                value={photoForm.date}
                onChange={(e) =>
                  setPhotoForm({ ...photoForm, date: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Image URL *</Label>
              <Input
                placeholder="https://..."
                value={photoForm.image}
                onChange={(e) =>
                  setPhotoForm({ ...photoForm, image: e.target.value })
                }
              />
              {photoForm.image && (
                <img
                  src={photoForm.image}
                  alt="preview"
                  className="mt-2 w-full h-40 object-cover rounded-lg"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Caption (Optional)</Label>
              <Input
                placeholder="Short caption..."
                value={photoForm.caption}
                onChange={(e) =>
                  setPhotoForm({ ...photoForm, caption: e.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="photoPublished"
                checked={photoForm.isPublished}
                onChange={(e) =>
                  setPhotoForm({ ...photoForm, isPublished: e.target.checked })
                }
                className="w-4 h-4 accent-[#8B2635]"
              />
              <Label htmlFor="photoPublished">Publish immediately</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPhotoDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handlePhotoSubmit}
              disabled={actionLoading}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              {actionLoading
                ? "Saving..."
                : editingPhoto
                  ? "Save Changes"
                  : "Add Photo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ══════════ DELETE CONFIRMATION ══════════ */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <DialogTitle className="text-xl text-gray-900">
                Delete {deleteTarget?.kind === "sermon" ? "Sermon" : "Photo"}
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-gray-900">
                "{deleteTarget?.item?.title}"
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
