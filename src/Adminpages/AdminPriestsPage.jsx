import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Users,
  Plus,
  Mail,
  Phone,
  Calendar,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  AlertTriangle,
  Search,
  X,
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
  fetchPriestsAdmin,
  createPriest,
  updatePriest,
  togglePriestActive,
  deletePriest,
} from "../Redux/slice/Priestslice";

// ── helpers ──────────────────────────────────────────────
const SPECIALIZATION_OPTIONS = [
  "Baptism",
  "Wedding",
  "Confession",
  "Mass",
  "First Communion",
  "Confirmation",
  "Anointing",
  "Funeral",
  "RCIA",
  "Counseling",
];

const STATUS_OPTIONS = ["Available", "On Leave", "Unavailable"];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  photo: "",
  bio: "",
  specializations: [],
  status: "Available",
  isActive: true,
};

const getInitials = (name = "") => {
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? parts[parts.length - 1].charAt(0).toUpperCase()
    : name.charAt(0).toUpperCase();
};

const statusColor = (status) => {
  if (status === "Available") return "bg-green-100 text-green-700";
  if (status === "On Leave") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

export function AdminPriestsPage() {
  const dispatch = useDispatch();
  const { adminPriests, adminLoading, actionLoading } = useSelector(
    (state) => state.priest,
  );

  const [search, setSearch] = useState("");
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [editingPriest, setEditingPriest] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [specInput, setSpecInput] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [priestToDelete, setPriestToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchPriestsAdmin());
  }, [dispatch]);

  // ── form helpers ─────────────────────────────────────

  const openAdd = () => {
    setEditingPriest(null);
    setForm(emptyForm);
    setSpecInput("");
    setFormDialogOpen(true);
  };

  const openEdit = (priest) => {
    setEditingPriest(priest);
    setForm({
      name: priest.name,
      email: priest.email,
      phone: priest.phone || "",
      photo: priest.photo || "",
      bio: priest.bio || "",
      specializations: priest.specializations || [],
      status: priest.status,
      isActive: priest.isActive,
    });
    setSpecInput("");
    setFormDialogOpen(true);
  };

  const toggleSpec = (spec) => {
    setForm((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter((s) => s !== spec)
        : [...prev.specializations, spec],
    }));
  };

  const addCustomSpec = () => {
    const trimmed = specInput.trim();
    if (trimmed && !form.specializations.includes(trimmed)) {
      setForm((prev) => ({
        ...prev,
        specializations: [...prev.specializations, trimmed],
      }));
    }
    setSpecInput("");
  };

  const removeSpec = (spec) => {
    setForm((prev) => ({
      ...prev,
      specializations: prev.specializations.filter((s) => s !== spec),
    }));
  };

  // ── submit ───────────────────────────────────────────

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    if (editingPriest) {
      const result = await dispatch(
        updatePriest({ id: editingPriest._id, data: form }),
      );
      if (result.error) {
        toast.error(result.payload || "Failed to update priest");
      } else {
        toast.success("Priest updated successfully");
        setFormDialogOpen(false);
      }
    } else {
      const result = await dispatch(createPriest(form));
      if (result.error) {
        toast.error(result.payload || "Failed to add priest");
      } else {
        toast.success("Priest added successfully");
        setFormDialogOpen(false);
      }
    }
  };

  // ── toggle active ────────────────────────────────────

  const handleToggle = async (id, current) => {
    const result = await dispatch(togglePriestActive(id));
    if (result.error) {
      toast.error(result.payload || "Failed to toggle");
    } else {
      toast.success(`Priest ${current ? "deactivated" : "activated"}`);
    }
  };

  // ── delete ───────────────────────────────────────────

  const confirmDelete = (priest) => {
    setPriestToDelete(priest);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!priestToDelete) return;
    const result = await dispatch(deletePriest(priestToDelete._id));
    if (result.error) {
      toast.error(result.payload || "Failed to delete priest");
    } else {
      toast.success("Priest deleted successfully");
    }
    setDeleteDialogOpen(false);
    setPriestToDelete(null);
  };

  // ── filtered ─────────────────────────────────────────

  const filtered = adminPriests.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()),
  );

  // ── stats ────────────────────────────────────────────

  const stats = {
    total: adminPriests.length,
    available: adminPriests.filter((p) => p.status === "Available").length,
    onLeave: adminPriests.filter((p) => p.status === "On Leave").length,
    inactive: adminPriests.filter((p) => !p.isActive).length,
  };

  // ── loading state ─────────────────────────────────────

  if (adminLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Priest Management
            </h2>
            <p className="text-gray-600 mt-1">
              Manage priest information and availability
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Total", "Available", "On Leave", "Inactive"].map((label) => (
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
                Loading Priests
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
      <div className="flex justify-between items-center">
        <div>
          <h2
            className="text-2xl text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Priest Management
          </h2>
          <p className="text-gray-600 mt-1">
            Manage priest information and availability
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Priest
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, color: "text-blue-600" },
          {
            label: "Available",
            value: stats.available,
            color: "text-green-600",
          },
          { label: "On Leave", value: stats.onLeave, color: "text-yellow-600" },
          { label: "Inactive", value: stats.inactive, color: "text-red-500" },
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

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search priests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-10"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3
              className="text-xl text-gray-600 mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              No priests found
            </h3>
            <p className="text-gray-500 mb-4">
              Add your first priest to get started
            </p>
            <Button
              onClick={openAdd}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Priest
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((priest) => (
            <Card
              key={priest._id}
              className={`border-0 shadow-md hover:shadow-lg transition-shadow ${!priest.isActive ? "opacity-60" : ""}`}
            >
              <CardHeader className="border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {priest.photo ? (
                      <img
                        src={priest.photo}
                        alt={priest.name}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] flex items-center justify-center flex-shrink-0">
                        <span
                          className="text-white text-lg"
                          style={{ fontFamily: "Playfair Display, serif" }}
                        >
                          {getInitials(priest.name)}
                        </span>
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg text-[#1e3a5f]">
                        {priest.name}
                      </CardTitle>
                      {!priest.isActive && (
                        <span className="text-xs text-red-500 font-medium">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-[#8B2635] flex-shrink-0" />
                    <span className="truncate">{priest.email}</span>
                  </div>
                  {priest.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-[#8B2635] flex-shrink-0" />
                      {priest.phone}
                    </div>
                  )}
                  {priest.bio && (
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {priest.bio}
                    </p>
                  )}
                </div>

                {priest.specializations?.length > 0 && (
                  <div className="pt-3 border-t">
                    <p className="text-xs text-gray-500 mb-2">
                      Specializations
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {priest.specializations.map((spec, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t">
                  <Badge className={statusColor(priest.status)}>
                    {priest.status}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggle(priest._id, priest.isActive)}
                      disabled={actionLoading}
                      className={
                        priest.isActive
                          ? "text-orange-600 border-orange-300"
                          : "text-green-600 border-green-300"
                      }
                      title={priest.isActive ? "Deactivate" : "Activate"}
                    >
                      {priest.isActive ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(priest)}
                      disabled={actionLoading}
                      className="text-[#8B2635] border-[#8B2635] hover:bg-[#8B2635] hover:text-white"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => confirmDelete(priest)}
                      disabled={actionLoading}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ══════════ ADD / EDIT DIALOG ══════════ */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {editingPriest ? "Edit Priest" : "Add Priest"}
            </DialogTitle>
            <DialogDescription>
              {editingPriest
                ? "Update priest information"
                : "Add a new priest to the parish"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input
                  placeholder="e.g. Fr. John Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                  type="email"
                  placeholder="e.g. fr.john@church.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Phone & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <Label>Photo URL</Label>
              <Input
                placeholder="https://..."
                value={form.photo}
                onChange={(e) => setForm({ ...form, photo: e.target.value })}
              />
              {form.photo && (
                <img
                  src={form.photo}
                  alt="preview"
                  className="mt-2 w-20 h-20 object-cover rounded-full border-2 border-gray-200"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label>Bio</Label>
              <textarea
                placeholder="Brief description about this priest..."
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="w-full min-h-[80px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
              />
            </div>

            {/* Specializations */}
            <div className="space-y-2">
              <Label>Specializations</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {SPECIALIZATION_OPTIONS.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => toggleSpec(spec)}
                    className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                      form.specializations.includes(spec)
                        ? "bg-[#8B2635] text-white border-[#8B2635]"
                        : "bg-white text-gray-600 border-gray-300 hover:border-[#8B2635]"
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
              {/* Custom specialization input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom specialization..."
                  value={specInput}
                  onChange={(e) => setSpecInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addCustomSpec())
                  }
                  className="h-9 text-sm"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addCustomSpec}
                >
                  Add
                </Button>
              </div>
              {/* Selected chips */}
              {form.specializations.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {form.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="flex items-center gap-1 px-2.5 py-0.5 bg-[#8B2635]/10 text-[#8B2635] text-xs rounded-full"
                    >
                      {spec}
                      <button
                        onClick={() => removeSpec(spec)}
                        className="hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Active toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={form.isActive}
                onChange={(e) =>
                  setForm({ ...form, isActive: e.target.checked })
                }
                className="w-4 h-4 accent-[#8B2635]"
              />
              <Label htmlFor="isActive">Active (visible to parishioners)</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setFormDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={actionLoading}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              {actionLoading
                ? "Saving..."
                : editingPriest
                  ? "Save Changes"
                  : "Add Priest"}
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
                Delete Priest
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-gray-900">
                "{priestToDelete?.name}"
              </span>
              ? This will also affect any appointments linked to this priest and
              cannot be undone.
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
