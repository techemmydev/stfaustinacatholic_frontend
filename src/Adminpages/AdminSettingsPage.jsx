import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bell, Lock, User, Database, Save, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import {
  fetchAdminProfile,
  updateAdminProfile,
  updateAdminPassword,
  clearSettingsError,
} from "../Redux/slice/Adminsettingsslice";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export function AdminSettingsPage() {
  const dispatch = useDispatch();
  const { profile, loading, actionLoading, error } = useSelector(
    (s) => s.adminSettings,
  );

  // ── local form state ────────────────────────────────────────
  const [profileForm, setProfileForm] = useState({ name: "", email: "" });

  const [notif, setNotif] = useState({
    emailNotifications: true,
    appointmentReminders: true,
    weeklyReports: false,
  });

  const [sysConfig, setSysConfig] = useState({
    autoApproveConfessions: false,
    requireEmailVerification: true,
    maxDailyAppointments: 20,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ── fetch profile on mount ──────────────────────────────────
  useEffect(() => {
    dispatch(fetchAdminProfile());
  }, [dispatch]);

  // ── seed form when profile loads ────────────────────────────
  useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name || "",
        email: profile.email || "",
      });
      if (profile.notifications) {
        setNotif((prev) => ({ ...prev, ...profile.notifications }));
      }
      if (profile.systemConfig) {
        setSysConfig((prev) => ({ ...prev, ...profile.systemConfig }));
      }
    }
  }, [profile]);

  // ── surface Redux errors as toasts ─────────────────────────
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearSettingsError());
    }
  }, [error, dispatch]);

  // ── handlers ────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    if (!profileForm.name.trim()) return toast.error("Name is required.");
    const result = await dispatch(updateAdminProfile(profileForm));
    if (!result.error) toast.success("Profile saved successfully!");
  };

  const handleSaveNotifications = async () => {
    const result = await dispatch(updateAdminProfile({ notifications: notif }));
    if (!result.error) toast.success("Notification preferences saved!");
  };

  const handleSaveSystem = async () => {
    const result = await dispatch(
      updateAdminProfile({ systemConfig: sysConfig }),
    );
    if (!result.error) toast.success("System settings saved!");
  };

  const handleUpdatePassword = async () => {
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      return toast.error("Please fill in all password fields.");
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("New passwords do not match.");
    }
    if (passwords.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }
    const result = await dispatch(
      updateAdminPassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      }),
    );
    if (!result.error) {
      toast.success("Password updated successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2
          className="text-2xl text-[#1e3a5f]"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Settings
        </h2>
        <p className="text-gray-600 mt-1">
          Manage your admin preferences and system settings
        </p>
      </div>

      {/* ── Profile Settings ──────────────────────────────────── */}
      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle
            className="flex items-center text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            <User className="w-5 h-5 mr-2" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {loading ? (
            <>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-28" />
            </>
          ) : (
            <>
              {/* Role + Status badges (read-only, from DB) */}
              {profile && (
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] font-medium">
                    {profile.role}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      profile.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {profile.status}
                  </span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="admin@church.com"
                />
              </div>

              <Button
                onClick={handleSaveProfile}
                disabled={actionLoading}
                className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
              >
                {actionLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Profile
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* ── Password & Security ───────────────────────────────── */}
      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle
            className="flex items-center text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            <Lock className="w-5 h-5 mr-2" />
            Password &amp; Security
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, currentPassword: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, newPassword: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, confirmPassword: e.target.value }))
              }
            />
            {passwords.newPassword &&
              passwords.confirmPassword &&
              passwords.newPassword !== passwords.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
          </div>
          <Button
            onClick={handleUpdatePassword}
            disabled={actionLoading}
            className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
          >
            {actionLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Lock className="w-4 h-4 mr-2" />
            )}
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* ── Notification Preferences ──────────────────────────── */}
      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle
            className="flex items-center text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            <Bell className="w-5 h-5 mr-2" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {[
            {
              key: "emailNotifications",
              label: "Email Notifications",
              desc: "Receive email alerts for new appointments",
            },
            {
              key: "appointmentReminders",
              label: "Appointment Reminders",
              desc: "Get reminders for upcoming appointments",
            },
            {
              key: "weeklyReports",
              label: "Weekly Reports",
              desc: "Receive weekly appointment summaries",
            },
          ].map(({ key, label, desc }, i, arr) => (
            <div key={key}>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">{label}</Label>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
                {loading ? (
                  <div className="w-10 h-5 bg-gray-200 rounded-full animate-pulse" />
                ) : (
                  <Switch
                    checked={notif[key]}
                    onCheckedChange={(val) =>
                      setNotif((n) => ({ ...n, [key]: val }))
                    }
                  />
                )}
              </div>
              {i < arr.length - 1 && <Separator className="mt-6" />}
            </div>
          ))}
          <Button
            onClick={handleSaveNotifications}
            disabled={actionLoading || loading}
            className="bg-[#8B2635] hover:bg-[#6d1d28] text-white mt-2"
          >
            {actionLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Preferences
          </Button>
        </CardContent>
      </Card>

      {/* ── System Configuration ──────────────────────────────── */}
      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle
            className="flex items-center text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            <Database className="w-5 h-5 mr-2" />
            System Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {[
            {
              key: "autoApproveConfessions",
              label: "Auto-approve Confessions",
              desc: "Automatically approve confession appointments",
            },
            {
              key: "requireEmailVerification",
              label: "Require Email Verification",
              desc: "Verify parishioner emails before booking",
            },
          ].map(({ key, label, desc }, i) => (
            <div key={key}>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">{label}</Label>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
                {loading ? (
                  <div className="w-10 h-5 bg-gray-200 rounded-full animate-pulse" />
                ) : (
                  <Switch
                    checked={sysConfig[key]}
                    onCheckedChange={(val) =>
                      setSysConfig((s) => ({ ...s, [key]: val }))
                    }
                  />
                )}
              </div>
              {i === 0 && <Separator className="mt-6" />}
            </div>
          ))}

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="maxAppointments">Maximum Daily Appointments</Label>
            {loading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input
                id="maxAppointments"
                type="number"
                min={1}
                value={sysConfig.maxDailyAppointments}
                onChange={(e) =>
                  setSysConfig((s) => ({
                    ...s,
                    maxDailyAppointments: Number(e.target.value),
                  }))
                }
              />
            )}
            <p className="text-sm text-gray-500">
              Maximum appointments per priest per day
            </p>
          </div>

          <Button
            onClick={handleSaveSystem}
            disabled={actionLoading || loading}
            className="bg-[#8B2635] hover:bg-[#6d1d28] text-white"
          >
            {actionLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save System Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
