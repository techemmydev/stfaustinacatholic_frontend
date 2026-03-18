import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
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
  Printer,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

// ── Ensure admin cookies are sent on all axios requests ────────
axios.defaults.withCredentials = true;

export function AdminParishioners() {
  const dispatch = useDispatch();

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

  // ── Dialog states ──────────────────────────────────────────
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [idCardDialogOpen, setIdCardDialogOpen] = useState(false);
  const [selectedParishioner, setSelectedParishioner] = useState(null);

  // ── Confirmation dialog states ─────────────────────────────
  const [deleteOneOpen, setDeleteOneOpen] = useState(false);
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const idCardRef = useRef(null);

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
  });

  useEffect(() => {
    dispatch(
      fetchParishioners({ search: searchQuery, page: currentPage, limit }),
    );
  }, [dispatch, searchQuery, currentPage, limit]);

  // ── Edit ───────────────────────────────────────────────────
  const handleEdit = (parishioner) => {
    setSelectedParishioner(parishioner);
    setEditData({
      fullName: parishioner.fullName || "",
      email: parishioner.email || "",
      phone: parishioner.phone || "",
      address: parishioner.address || "",
      dob: parishioner.dob ? parishioner.dob.split("T")[0] : "",
      gender: parishioner.gender || "Male",
      maritalStatus: parishioner.maritalStatus || "Single",
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

  // ── Delete one ─────────────────────────────────────────────
  const confirmDeleteOne = (id) => {
    setPendingDeleteId(id);
    setDeleteOneOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await dispatch(deleteParishioner(pendingDeleteId)).unwrap();
      toast.success("Parishioner deleted");
    } catch {
      toast.error("Failed to delete parishioner");
    } finally {
      setDeleteOneOpen(false);
      setPendingDeleteId(null);
    }
  };

  // ── Delete all ─────────────────────────────────────────────
  const handleDeleteAllConfirmed = async () => {
    try {
      await dispatch(deleteAllParishioners()).unwrap();
      toast.success("All parishioners deleted");
    } catch {
      toast.error("Failed to delete all parishioners");
    } finally {
      setDeleteAllOpen(false);
    }
  };

  // ── ID Card ────────────────────────────────────────────────
  const handleGenerateIDCard = (parishioner) => {
    setSelectedParishioner(parishioner);
    setIdCardDialogOpen(true);
  };

  // Opens a print window with just the ID card HTML
  const handlePrintIDCard = () => {
    if (!selectedParishioner) return;

    const sacramentsList = [];
    const s = selectedParishioner.sacraments || {};
    if (s.baptized) sacramentsList.push("Baptism");
    if (s.communion) sacramentsList.push("First Communion");
    if (s.confirmed) sacramentsList.push("Confirmation");
    if (s.married) sacramentsList.push("Marriage");

    const memberSince = new Date(
      selectedParishioner.createdAt || Date.now(),
    ).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const printHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>ID Card – ${selectedParishioner.fullName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { background: #f0f0f0; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: 'Inter', sans-serif; }
            .card {
              width: 85.6mm; height: 54mm;
              background: linear-gradient(135deg, #1e3a5f 0%, #2d5286 50%, #8B2635 100%);
              border-radius: 8px;
              padding: 6mm 7mm;
              color: white;
              position: relative;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            }
            .card::before {
              content: '';
              position: absolute;
              top: -20px; right: -20px;
              width: 60mm; height: 60mm;
              border-radius: 50%;
              background: rgba(255,255,255,0.05);
            }
            .card::after {
              content: '';
              position: absolute;
              bottom: -15px; left: -15px;
              width: 40mm; height: 40mm;
              border-radius: 50%;
              background: rgba(255,255,255,0.04);
            }
            .header { display: flex; align-items: center; gap: 3mm; }
            .cross {
              width: 8mm; height: 8mm; flex-shrink: 0;
              display: flex; align-items: center; justify-content: center;
              color: #c9a84c; font-size: 18px; font-weight: bold;
            }
            .parish-name { font-family: 'Playfair Display', serif; font-size: 7.5pt; line-height: 1.2; color: rgba(255,255,255,0.9); }
            .divider { height: 0.3mm; background: rgba(201,168,76,0.5); margin: 2mm 0; }
            .body { display: flex; gap: 3mm; align-items: center; flex: 1; }
            .avatar {
              width: 14mm; height: 14mm; border-radius: 50%;
              background: rgba(201,168,76,0.25);
              border: 0.5mm solid rgba(201,168,76,0.6);
              display: flex; align-items: center; justify-content: center;
              font-family: 'Playfair Display', serif;
              font-size: 16pt; color: #c9a84c; flex-shrink: 0;
            }
            .info { flex: 1; }
            .name { font-family: 'Playfair Display', serif; font-size: 10pt; font-weight: 700; line-height: 1.2; margin-bottom: 1mm; }
            .detail { font-size: 6.5pt; color: rgba(255,255,255,0.75); line-height: 1.5; }
            .footer { display: flex; justify-content: space-between; align-items: flex-end; }
            .id-num { font-size: 5.5pt; color: rgba(255,255,255,0.5); font-family: monospace; }
            .sacraments { font-size: 5.5pt; color: rgba(201,168,76,0.8); text-align: right; }
            .status-badge {
              display: inline-block; padding: 0.5mm 2mm;
              background: rgba(201,168,76,0.2); border: 0.3mm solid rgba(201,168,76,0.5);
              border-radius: 2mm; font-size: 5.5pt; color: #c9a84c; margin-top: 1mm;
            }
            @media print {
              body { background: white; }
              .card { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <div class="cross">✝</div>
              <div class="parish-name">St. Faustina Catholic Parish<br/>Parishioner Identity Card</div>
            </div>
            <div class="divider"></div>
            <div class="body">
              <div class="avatar">${selectedParishioner.fullName.charAt(0).toUpperCase()}</div>
              <div class="info">
                <div class="name">${selectedParishioner.fullName}</div>
                <div class="detail">${selectedParishioner.email}</div>
                ${selectedParishioner.phone ? `<div class="detail">${selectedParishioner.phone}</div>` : ""}
                <div class="detail">Member since ${memberSince}</div>
                <span class="status-badge">${selectedParishioner.status || "Active"}</span>
              </div>
            </div>
            <div class="footer">
              <div class="id-num">ID: ${selectedParishioner._id}</div>
              ${sacramentsList.length > 0 ? `<div class="sacraments">${sacramentsList.join(" · ")}</div>` : ""}
            </div>
          </div>
          <script>window.onload = () => { window.print(); }<\/script>
        </body>
      </html>
    `;

    const win = window.open("", "_blank", "width=500,height=400");
    win.document.write(printHtml);
    win.document.close();
  };

  const totalPages = Math.ceil(total / limit);

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
        <Button onClick={() => setDeleteAllOpen(true)} variant="destructive">
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 h-11"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
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
                            <div className="text-xs text-gray-400 font-mono">
                              {p._id.slice(-8)}
                            </div>
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
                            title="View ID Card"
                          >
                            <CreditCard className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(p)}
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => confirmDeleteOne(p._id)}
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
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>
      )}

      {/* ── Delete One – AlertDialog ───────────────────────── */}
      <AlertDialog open={deleteOneOpen} onOpenChange={setDeleteOneOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Parishioner</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this parishioner? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirmed}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Delete All – AlertDialog ───────────────────────── */}
      <AlertDialog open={deleteAllOpen} onOpenChange={setDeleteAllOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete All Parishioners</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove <strong>every</strong> parishioner
              record from the database. This action{" "}
              <strong>cannot be undone</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAllConfirmed}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, delete all
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Edit Dialog ────────────────────────────────────── */}
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
              Update parishioner information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {[
              { label: "Full Name *", key: "fullName", type: "text" },
              { label: "Email *", key: "email", type: "email" },
              { label: "Phone", key: "phone", type: "tel" },
              { label: "Address", key: "address", type: "text" },
              { label: "Date of Birth", key: "dob", type: "date" },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="text-sm font-medium">{label}</label>
                <Input
                  type={type}
                  value={editData[key]}
                  onChange={(e) =>
                    setEditData({ ...editData, [key]: e.target.value })
                  }
                />
              </div>
            ))}

            {[
              {
                label: "Gender",
                key: "gender",
                options: ["Male", "Female", "Other"],
              },
              {
                label: "Marital Status",
                key: "maritalStatus",
                options: ["Single", "Married", "Widowed", "Divorced"],
              },
              {
                label: "Status",
                key: "status",
                options: ["Active", "Inactive"],
              },
            ].map(({ label, key, options }) => (
              <div key={key}>
                <label className="text-sm font-medium">{label}</label>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={editData[key]}
                  onChange={(e) =>
                    setEditData({ ...editData, [key]: e.target.value })
                  }
                >
                  {options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            ))}

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

            {/* Sacraments */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3 text-[#1e3a5f]">Sacraments</h4>
              {[
                {
                  key: "baptized",
                  label: "Baptized",
                  dateKey: "baptismDate",
                  extraKey: "baptismParish",
                  extraLabel: "Baptism Parish",
                },
                {
                  key: "communion",
                  label: "First Communion",
                  dateKey: "communionDate",
                },
                {
                  key: "confirmed",
                  label: "Confirmed",
                  dateKey: "confirmationDate",
                },
                {
                  key: "married",
                  label: "Married (Catholic Church)",
                  dateKey: "marriageDate",
                },
              ].map(({ key, label, dateKey, extraKey, extraLabel }) => (
                <div key={key} className="space-y-2 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editData.sacraments[key]}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          sacraments: {
                            ...editData.sacraments,
                            [key]: e.target.checked,
                          },
                        })
                      }
                    />
                    <span className="font-medium text-sm">{label}</span>
                  </label>
                  {editData.sacraments[key] && (
                    <>
                      <Input
                        type="date"
                        value={
                          editData.sacraments[dateKey]?.split("T")[0] || ""
                        }
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            sacraments: {
                              ...editData.sacraments,
                              [dateKey]: e.target.value,
                            },
                          })
                        }
                      />
                      {extraKey && (
                        <Input
                          placeholder={extraLabel}
                          value={editData.sacraments[extraKey] || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              sacraments: {
                                ...editData.sacraments,
                                [extraKey]: e.target.value,
                              },
                            })
                          }
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

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

      {/* ── ID Card Dialog ─────────────────────────────────── */}
      <Dialog open={idCardDialogOpen} onOpenChange={setIdCardDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Parishioner ID Card
            </DialogTitle>
            <DialogDescription>
              Preview and print the identity card
            </DialogDescription>
          </DialogHeader>

          {selectedParishioner && (
            <>
              {/* Card Preview */}
              <div
                ref={idCardRef}
                className="rounded-xl overflow-hidden shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #1e3a5f 0%, #2d5286 50%, #8B2635 100%)",
                  color: "white",
                  padding: "20px",
                  fontFamily: "sans-serif",
                }}
              >
                {/* Card header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl text-[#c9a84c]">✝</span>
                  <div>
                    <p
                      className="text-xs font-semibold opacity-90"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      St. Peterandpaul Catholic Parish
                    </p>
                    <p className="text-[10px] opacity-60">
                      Parishioner Identity Card
                    </p>
                  </div>
                </div>

                <div className="h-px bg-[#c9a84c] opacity-40 mb-3" />

                {/* Body */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                    style={{
                      background: "rgba(201,168,76,0.2)",
                      border: "2px solid rgba(201,168,76,0.5)",
                      fontFamily: "Playfair Display, serif",
                      color: "#c9a84c",
                    }}
                  >
                    {selectedParishioner.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p
                      className="font-bold text-base leading-tight"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {selectedParishioner.fullName}
                    </p>
                    <p className="text-xs opacity-70 mt-0.5">
                      {selectedParishioner.email}
                    </p>
                    {selectedParishioner.phone && (
                      <p className="text-xs opacity-70">
                        {selectedParishioner.phone}
                      </p>
                    )}
                    <p className="text-xs opacity-60 mt-0.5">
                      Member since{" "}
                      {new Date(
                        selectedParishioner.createdAt || Date.now(),
                      ).toLocaleDateString("en-NG", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <span
                      className="inline-block text-[10px] px-2 py-0.5 rounded-full mt-1"
                      style={{
                        background: "rgba(201,168,76,0.2)",
                        border: "1px solid rgba(201,168,76,0.4)",
                        color: "#c9a84c",
                      }}
                    >
                      {selectedParishioner.status || "Active"}
                    </span>
                  </div>
                </div>

                {/* Sacraments */}
                {(() => {
                  const s = selectedParishioner.sacraments || {};
                  const list = [];
                  if (s.baptized) list.push("Baptism");
                  if (s.communion) list.push("Communion");
                  if (s.confirmed) list.push("Confirmation");
                  if (s.married) list.push("Marriage");
                  return list.length > 0 ? (
                    <p className="text-[10px] opacity-50 mt-3 text-right">
                      {list.join(" · ")}
                    </p>
                  ) : null;
                })()}

                {/* Footer */}
                <div className="mt-2">
                  <p className="text-[9px] opacity-30 font-mono">
                    ID: {selectedParishioner._id}
                  </p>
                </div>
              </div>
            </>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIdCardDialogOpen(false)}
            >
              Close
            </Button>
            <Button
              onClick={handlePrintIDCard}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print / Save as PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
