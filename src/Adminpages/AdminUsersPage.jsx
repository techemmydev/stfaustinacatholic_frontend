import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UserPlus,
  Mail,
  Shield,
  MoreVertical,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Zap,
  ZapOff,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  fetchAllAdmins,
  createAdmin,
  updateAdmin,
  toggleAdminStatus,
  deleteAdmin,
  toggleEmergencyAccess,
} from "../Redux/slice/adminSlice";

export function AdminUsersPage() {
  const dispatch = useDispatch();
  const { admins, adminsLoading, actionLoading, currentAdmin } = useSelector(
    (state) => state.admin,
  );

  // ── NEW: check if logged-in user is Super Admin ────────────
  const isSuperAdmin = currentAdmin?.role === "Super Admin";

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // ── NEW: emergency access dialog state ─────────────────────
  const [emergencyDialogOpen, setEmergencyDialogOpen] = useState(false);
  const [emergencyHours, setEmergencyHours] = useState("2");

  // Form state for new user
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Staff",
  });

  // Form state for editing user
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    role: "Staff",
  });

  // Fetch admins on mount
  useEffect(() => {
    dispatch(fetchAllAdmins());
  }, [dispatch]);

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    const result = await dispatch(createAdmin(newUser));

    if (result.error) {
      toast.error(result.payload || "Failed to create admin");
    } else {
      toast.success(`Admin user created successfully`);
      setNewUser({ name: "", email: "", password: "", role: "Staff" });
      setDialogOpen(false);
      dispatch(fetchAllAdmins());
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;

    const result = await dispatch(
      updateAdmin({
        id: selectedUser._id,
        data: editUser,
      }),
    );

    if (result.error) {
      toast.error(result.payload || "Failed to update user");
    } else {
      toast.success("User updated successfully");
      setEditDialogOpen(false);
      setSelectedUser(null);
      dispatch(fetchAllAdmins());
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const result = await dispatch(toggleAdminStatus(id));

    if (result.error) {
      toast.error(result.payload || "Failed to toggle status");
    } else {
      const action = currentStatus === "Active" ? "deactivated" : "activated";
      toast.success(`User ${action} successfully`);
      dispatch(fetchAllAdmins());
    }
  };

  const handleDeleteUser = async (id, role) => {
    if (role === "Super Admin") {
      toast.error("Cannot delete Super Admin account");
      return;
    }

    const result = await dispatch(deleteAdmin(id));

    if (result.error) {
      toast.error(result.payload || "Failed to delete user");
    } else {
      toast.success("User deleted successfully");
    }
  };

  const openEditDialog = (user) => {
    setSelectedUser(user);
    setEditUser({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setEditDialogOpen(true);
  };

  // ── NEW: emergency access handlers ─────────────────────────
  const openEmergencyDialog = (user) => {
    setSelectedUser(user);
    setEmergencyHours("2");
    setEmergencyDialogOpen(true);
  };

  const handleGrantEmergencyAccess = async () => {
    if (!selectedUser) return;
    const result = await dispatch(
      toggleEmergencyAccess({
        id: selectedUser._id,
        grant: true,
        expiryHours: Number(emergencyHours),
      }),
    );
    if (result.error) {
      toast.error(result.payload || "Failed to grant emergency access");
    } else {
      toast.success(
        `Emergency access granted to ${selectedUser.name} for ${emergencyHours} hour(s)`,
      );
      setEmergencyDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleRevokeEmergencyAccess = async (user) => {
    const result = await dispatch(
      toggleEmergencyAccess({ id: user._id, grant: false }),
    );
    if (result.error) {
      toast.error(result.payload || "Failed to revoke emergency access");
    } else {
      toast.success(`Emergency access revoked from ${user.name}`);
    }
  };

  // ── NEW: emergency access helpers ──────────────────────────
  const isEmergencyActive = (user) => {
    if (!user.emergencyAccess) return false;
    if (!user.emergencyAccessExpiresAt) return false;
    return new Date() < new Date(user.emergencyAccessExpiresAt);
  };

  const emergencyExpiryLabel = (user) => {
    if (!user.emergencyAccessExpiresAt) return "";
    const diff = new Date(user.emergencyAccessExpiresAt) - Date.now();
    if (diff <= 0) return "Expired";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return hours > 0 ? `${hours}h ${mins}m left` : `${mins}m left`;
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "Super Admin":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
            Super Admin
          </Badge>
        );
      case "Admin":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Admin
          </Badge>
        );
      case "Staff":
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
            Staff
          </Badge>
        );
      default:
        return <Badge>{role}</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    return status === "Active" ? (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
        Active
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
        Inactive
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString();
  };

  const formatLastLogin = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString();
  };

  if (adminsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-[#8B2635] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2
            className="text-2xl text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Admin User Management
          </h2>
          <p className="text-gray-600 mt-1">
            Manage admin accounts and permissions
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Admin User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <h3
                  className="text-2xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {admins.length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
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
                  className="text-2xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {admins.filter((u) => u.status === "Active").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
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
                  className="text-2xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {admins.filter((u) => u.status === "Inactive").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <UserX className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                {/* NEW: shows active emergency access count */}
                <p className="text-sm text-gray-600 mb-1">Emergency Access</p>
                <h3
                  className="text-2xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {admins.filter((u) => isEmergencyActive(u)).length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle
            className="text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            All Admin Users
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  {/* NEW: Access column */}
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Access
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {admins.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center">
                          <span
                            className="text-white text-sm"
                            style={{ fontFamily: "Playfair Display, serif" }}
                          >
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>

                    {/* NEW: Access hours indicator */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.role === "Super Admin" ? (
                        <span className="text-xs text-gray-400">Always</span>
                      ) : isEmergencyActive(user) ? (
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                          <span className="text-xs text-amber-600 font-medium">
                            Emergency
                          </span>
                          <span className="text-xs text-gray-400">
                            {emergencyExpiryLabel(user)}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-400">
                            7:30am–4pm
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatLastLogin(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openEditDialog(user)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleToggleStatus(user._id, user.status)
                            }
                          >
                            {user.status === "Active" ? (
                              <>
                                <UserX className="w-4 h-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>

                          {/* NEW: Emergency access — Super Admin only */}
                          {isSuperAdmin && user.role !== "Super Admin" && (
                            <>
                              <DropdownMenuSeparator />
                              {isEmergencyActive(user) ? (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleRevokeEmergencyAccess(user)
                                  }
                                  disabled={actionLoading}
                                  className="text-amber-600"
                                >
                                  <ZapOff className="w-4 h-4 mr-2" />
                                  Revoke Emergency Access
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() => openEmergencyDialog(user)}
                                  className="text-amber-600"
                                >
                                  <Zap className="w-4 h-4 mr-2" />
                                  Grant Emergency Access
                                </DropdownMenuItem>
                              )}
                            </>
                          )}

                          {user.role !== "Super Admin" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeleteUser(user._id, user.role)
                                }
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog — unchanged */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Add New Admin User
            </DialogTitle>
            <DialogDescription>
              Create a new administrator account
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@church.com"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select
                value={newUser.role}
                onValueChange={(value) =>
                  setNewUser({ ...newUser, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Staff">Staff - Basic access</SelectItem>
                  <SelectItem value="Admin">Admin - Full access</SelectItem>
                  <SelectItem value="Super Admin">
                    Super Admin - Complete control
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                This determines what permissions the user will have
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddUser}
              disabled={actionLoading}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              {actionLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Create Admin
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog — unchanged */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Edit Admin User
            </DialogTitle>
            <DialogDescription>
              Update user information and permissions
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name *</Label>
              <Input
                id="edit-name"
                placeholder="Enter full name"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email Address *</Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="user@church.com"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-role">Role *</Label>
              <Select
                value={editUser.role}
                onValueChange={(value) =>
                  setEditUser({ ...editUser, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Staff">Staff - Basic access</SelectItem>
                  <SelectItem value="Admin">Admin - Full access</SelectItem>
                  <SelectItem value="Super Admin">
                    Super Admin - Complete control
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleEditUser}
              disabled={actionLoading}
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              {actionLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* NEW: Emergency Access Dialog */}
      <Dialog open={emergencyDialogOpen} onOpenChange={setEmergencyDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-600" />
              </div>
              <DialogTitle
                className="text-xl text-[#1e3a5f]"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Grant Emergency Access
              </DialogTitle>
            </div>
            <DialogDescription>
              Temporarily grant{" "}
              <span className="font-semibold text-gray-800">
                {selectedUser?.name}
              </span>{" "}
              access outside working hours. Access will auto-expire.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-3">
            <Label>Access duration</Label>
            <Select value={emergencyHours} onValueChange={setEmergencyHours}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 hour</SelectItem>
                <SelectItem value="2">2 hours</SelectItem>
                <SelectItem value="4">4 hours</SelectItem>
                <SelectItem value="8">8 hours</SelectItem>
                <SelectItem value="24">24 hours</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-400">
              Access automatically revokes after the selected duration.
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEmergencyDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleGrantEmergencyAccess}
              disabled={actionLoading}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              {actionLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Granting...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Grant Access
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
