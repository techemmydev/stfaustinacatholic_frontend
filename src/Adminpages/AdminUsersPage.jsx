import { useState } from "react";
import {
  UserPlus,
  Mail,
  Shield,
  MoreVertical,
  Edit,
  Trash2,
  UserCheck,
  UserX,
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

export function AdminUsersPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Parish Administrator",
      email: "admin@church.com",
      role: "Super Admin",
      status: "Active",
      createdAt: "2024-01-15",
      lastLogin: "2026-02-08 09:30 AM",
    },
    {
      id: 2,
      name: "Fr. John Smith",
      email: "fr.john@church.com",
      role: "Admin",
      status: "Active",
      createdAt: "2024-03-20",
      lastLogin: "2026-02-07 02:15 PM",
    },
    {
      id: 3,
      name: "Maria Santos",
      email: "maria.s@church.com",
      role: "Staff",
      status: "Active",
      createdAt: "2024-06-10",
      lastLogin: "2026-02-08 08:00 AM",
    },
    {
      id: 4,
      name: "John Doe",
      email: "john.d@church.com",
      role: "Staff",
      status: "Inactive",
      createdAt: "2023-11-05",
      lastLogin: "2025-12-20 04:30 PM",
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form state for new user
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Staff",
  });

  // Form state for editing user
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    role: "Staff",
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const user = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: "Never",
    };

    setUsers([...users, user]);
    toast.success(`Invitation sent to ${newUser.email}`);

    // Reset form
    setNewUser({ name: "", email: "", role: "Staff" });
    setDialogOpen(false);
  };

  const handleEditUser = () => {
    if (!selectedUser) return;

    setUsers(
      users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              name: editUser.name,
              email: editUser.email,
              role: editUser.role,
            }
          : user,
      ),
    );

    toast.success("User updated successfully");
    setEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleToggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user,
      ),
    );

    const user = users.find((u) => u.id === id);
    toast.success(
      `${user?.name} ${user?.status === "Active" ? "deactivated" : "activated"}`,
    );
  };

  const handleDeleteUser = (id) => {
    const user = users.find((u) => u.id === id);
    if (user?.role === "Super Admin") {
      toast.error("Cannot delete Super Admin account");
      return;
    }

    setUsers(users.filter((user) => user.id !== id));
    toast.success("User deleted successfully");
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
          Invite Admin User
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
                  {users.length}
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
                  {users.filter((u) => u.status === "Active").length}
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
                  {users.filter((u) => u.status === "Inactive").length}
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
                <p className="text-sm text-gray-600 mb-1">Super Admins</p>
                <h3
                  className="text-2xl text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {users.filter((u) => u.role === "Super Admin").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
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
                {users.map((user) => (
                  <tr
                    key={user.id}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.lastLogin}
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
                            onClick={() => handleToggleStatus(user.id)}
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
                          {user.role !== "Super Admin" && (
                            <DropdownMenuItem
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
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

      {/* Add User Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle
              className="text-2xl text-[#1e3a5f]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Invite New Admin User
            </DialogTitle>
            <DialogDescription>
              Send an invitation email to add a new administrator to the system
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
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
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
              className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
