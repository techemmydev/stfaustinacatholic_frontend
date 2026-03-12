import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Images,
  Eye,
  Trash2,
  Plus,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  Pencil,
  Upload,
  Tag,
  Calendar,
  Globe,
  EyeOff,
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
  fetchGalleryPhotosAdmin,
  createGalleryPhoto,
  updateGalleryPhoto,
  toggleGalleryPhotoPublished,
  deleteGalleryPhoto,
} from "../Redux/slice/Galleryslice";

const CATEGORIES = [
  "Liturgy",
  "Sacraments",
  "Community",
  "Special Events",
  "Youth",
  "Outreach",
  "Other",
];

const emptyForm = {
  title: "",
  date: "",
  image: "",
  caption: "",
  category: "",
  isPublished: true,
};

export function AdminGalleryPage() {
  const dispatch = useDispatch();
  const { adminPhotos, adminLoading, error } = useSelector(
    (state) => state.gallery,
  );

  // ── UI state ─────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // View dialog
  const [viewPhoto, setViewPhoto] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Add / Edit dialog
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null); // null = add mode
  const [form, setForm] = useState(emptyForm);
  const [formLoading, setFormLoading] = useState(false);

  // Delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ── Fetch on mount ───────────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchGalleryPhotosAdmin());
  }, [dispatch]);

  // ── Derived counts ───────────────────────────────────────────────
  const counts = {
    all: adminPhotos.length,
    published: adminPhotos.filter((p) => p.isPublished).length,
    unpublished: adminPhotos.filter((p) => !p.isPublished).length,
  };

  // ── Filtered list ────────────────────────────────────────────────
  const filtered = adminPhotos.filter((photo) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      photo.title.toLowerCase().includes(q) ||
      (photo.caption && photo.caption.toLowerCase().includes(q)) ||
      (photo.category && photo.category.toLowerCase().includes(q));

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "published" && photo.isPublished) ||
      (activeTab === "unpublished" && !photo.isPublished);

    return matchesSearch && matchesTab;
  });

  // ── Helpers ──────────────────────────────────────────────────────
  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ── Open Add dialog ──────────────────────────────────────────────
  const openAddDialog = () => {
    setEditingPhoto(null);
    setForm(emptyForm);
    setFormDialogOpen(true);
  };

  // ── Open Edit dialog ─────────────────────────────────────────────
  const openEditDialog = (photo) => {
    setEditingPhoto(photo);
    setForm({
      title: photo.title,
      date: photo.date ? photo.date.slice(0, 10) : "",
      image: photo.image,
      caption: photo.caption || "",
      category: photo.category || "",
      isPublished: photo.isPublished,
    });
    setViewDialogOpen(false);
    setFormDialogOpen(true);
  };

  // ── Submit Add / Edit ────────────────────────────────────────────
  const handleFormSubmit = async () => {
    if (!form.title || !form.date || !form.image) {
      toast.error("Title, date and image URL are required.");
      return;
    }

    setFormLoading(true);
    let result;

    if (editingPhoto) {
      result = await dispatch(
        updateGalleryPhoto({ id: editingPhoto._id, updates: form }),
      );
    } else {
      result = await dispatch(createGalleryPhoto(form));
    }

    setFormLoading(false);

    if (result.error) {
      toast.error(result.payload || "Operation failed.");
    } else {
      toast.success(
        editingPhoto ? "Photo updated." : "Photo added successfully.",
      );
      setFormDialogOpen(false);
      dispatch(fetchGalleryPhotosAdmin());
    }
  };

  // ── Toggle published ─────────────────────────────────────────────
  const handleToggle = async (photo) => {
    const result = await dispatch(toggleGalleryPhotoPublished(photo._id));
    if (result.error) {
      toast.error(result.payload || "Failed to toggle status.");
    } else {
      toast.success(
        result.payload.isPublished ? "Photo published." : "Photo unpublished.",
      );
      dispatch(fetchGalleryPhotosAdmin());
    }
  };

  // ── Delete ───────────────────────────────────────────────────────
  const confirmDelete = (photo) => {
    setPhotoToDelete(photo);
    setViewDialogOpen(false);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!photoToDelete) return;
    setDeleteLoading(true);
    const result = await dispatch(deleteGalleryPhoto(photoToDelete._id));
    setDeleteLoading(false);

    if (result.error) {
      toast.error(result.payload || "Failed to delete photo.");
    } else {
      toast.success("Photo deleted successfully.");
    }
    setDeleteDialogOpen(false);
    setPhotoToDelete(null);
  };

  // ── Loading state ────────────────────────────────────────────────
  if (adminLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-[#8B2635] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-2xl text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Parish Gallery
          </h2>
          <p className="text-gray-600 mt-1">
            Manage photos displayed on the parish website
          </p>
        </div>
        <Button
          onClick={openAddDialog}
          className="bg-[#8B2635] hover:bg-[#6d1d2a] text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Photo
        </Button>
      </div>

      {/* ── Stat cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Photos</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {counts.all}
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Images className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Published</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {counts.published}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Unpublished</p>
                <h3
                  className="text-3xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {counts.unpublished}
                </h3>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <EyeOff className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Search ─────────────────────────────────────────────────── */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by title, caption, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Tabs ───────────────────────────────────────────────────── */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-white border shadow-sm p-1">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-[#8B2635] data-[state=active]:text-white"
          >
            All ({counts.all})
          </TabsTrigger>
          <TabsTrigger
            value="published"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            Published ({counts.published})
          </TabsTrigger>
          <TabsTrigger
            value="unpublished"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Unpublished ({counts.unpublished})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filtered.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <Images className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3
                  className="text-xl text-gray-600 mb-2"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  No photos found
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery
                    ? "Try adjusting your search."
                    : "Add your first gallery photo to get started."}
                </p>
                {!searchQuery && (
                  <Button
                    onClick={openAddDialog}
                    className="bg-[#8B2635] hover:bg-[#6d1d2a] text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Photo
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-md">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle
                  className="text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Gallery Photos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Photo
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Title & Caption
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Date
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
                      {filtered.map((photo) => (
                        <tr
                          key={photo._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          {/* Thumbnail */}
                          <td className="px-6 py-4">
                            <div
                              className="w-16 h-16 overflow-hidden rounded flex-shrink-0 bg-gray-100"
                              style={{ minWidth: "64px" }}
                            >
                              <img
                                src={photo.image}
                                alt={photo.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            </div>
                          </td>

                          {/* Title & Caption */}
                          <td className="px-6 py-4 max-w-xs">
                            <p className="text-sm font-medium text-gray-900">
                              {photo.title}
                            </p>
                            {photo.caption && (
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                {photo.caption}
                              </p>
                            )}
                          </td>

                          {/* Category */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {photo.category ? (
                              <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                                {photo.category}
                              </Badge>
                            ) : (
                              <span className="text-xs text-gray-400">—</span>
                            )}
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(photo.date)}
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {photo.isPublished ? (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                Published
                              </Badge>
                            ) : (
                              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                                Unpublished
                              </Badge>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setViewPhoto(photo);
                                  setViewDialogOpen(true);
                                }}
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openEditDialog(photo)}
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleToggle(photo)}
                                title={
                                  photo.isPublished ? "Unpublish" : "Publish"
                                }
                                className={
                                  photo.isPublished
                                    ? "hover:bg-orange-50 hover:text-orange-600"
                                    : "hover:bg-green-50 hover:text-green-600"
                                }
                              >
                                {photo.isPublished ? (
                                  <ToggleRight className="w-4 h-4 text-green-600" />
                                ) : (
                                  <ToggleLeft className="w-4 h-4 text-gray-400" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => confirmDelete(photo)}
                                className="hover:bg-red-50 hover:text-red-700"
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

      {/* ── View Dialog ─────────────────────────────────────────────── */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Photo Details
            </DialogTitle>
            <DialogDescription>
              Full details for this gallery photo
            </DialogDescription>
          </DialogHeader>

          {viewPhoto && (
            <div className="space-y-6">
              {/* Image preview */}
              <div
                className="w-full overflow-hidden rounded-lg"
                style={{ height: "280px" }}
              >
                <img
                  src={viewPhoto.image}
                  alt={viewPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Status</span>
                {viewPhoto.isPublished ? (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Published
                  </Badge>
                ) : (
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                    Unpublished
                  </Badge>
                )}
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Title</p>
                  <p className="text-sm text-gray-900 font-medium">
                    {viewPhoto.title}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Category</p>
                  <p className="text-sm text-gray-900">
                    {viewPhoto.category || "—"}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Date</p>
                  <p className="text-sm text-gray-900">
                    {formatDate(viewPhoto.date)}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Added On</p>
                  <p className="text-sm text-gray-900">
                    {formatDate(viewPhoto.createdAt)}
                  </p>
                </div>
              </div>

              {viewPhoto.caption && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Caption</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {viewPhoto.caption}
                  </p>
                </div>
              )}

              <div className="p-4 bg-gray-50 rounded-lg break-all">
                <p className="text-xs text-gray-500 mb-1">Image URL</p>
                <p className="text-xs text-gray-700">{viewPhoto.image}</p>
              </div>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            <Button
              variant="outline"
              onClick={() => confirmDelete(viewPhoto)}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <Button
              onClick={() => openEditDialog(viewPhoto)}
              className="bg-[#1e3a5f] hover:bg-[#0f2240] text-white"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Add / Edit Dialog ───────────────────────────────────────── */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {editingPhoto ? "Edit Photo" : "Add New Photo"}
            </DialogTitle>
            <DialogDescription>
              {editingPhoto
                ? "Update the details for this gallery photo."
                : "Fill in the details to add a new photo to the gallery."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                name="title"
                value={form.title}
                onChange={handleFormChange}
                placeholder="e.g. Sunday Mass — Pentecost 2025"
                className="h-11"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Image URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  name="image"
                  value={form.image}
                  onChange={handleFormChange}
                  placeholder="https://your-cdn.com/photo.jpg"
                  className="pl-10 h-11"
                />
              </div>
              {/* Live preview */}
              {form.image && (
                <div
                  className="mt-2 w-full overflow-hidden rounded border border-gray-200"
                  style={{ height: "160px" }}
                >
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleFormChange}
                  className="pl-10 h-11"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  className="w-full pl-10 h-11 border border-gray-200 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent"
                >
                  <option value="">— No Category —</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Caption */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Caption{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                name="caption"
                value={form.caption}
                onChange={handleFormChange}
                placeholder="A brief description of the photo..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:border-transparent resize-none"
              />
            </div>

            {/* Published toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">Published</p>
                <p className="text-xs text-gray-500">
                  Visible on the public gallery
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    isPublished: !prev.isPublished,
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  form.isPublished ? "bg-[#8B2635]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    form.isPublished ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setFormDialogOpen(false)}
              disabled={formLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleFormSubmit}
              disabled={formLoading}
              className="bg-[#8B2635] hover:bg-[#6d1d2a] text-white"
            >
              {formLoading
                ? editingPhoto
                  ? "Saving..."
                  : "Adding..."
                : editingPhoto
                  ? "Save Changes"
                  : "Add Photo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Dialog ──────────────────────────────── */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <DialogTitle className="text-xl text-gray-900">
                Delete Photo
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-gray-900">
                "{photoToDelete?.title}"
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteLoading ? "Deleting..." : "Yes, Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
