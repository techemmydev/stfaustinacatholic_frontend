import { Bell, Lock, User, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export function AdminSettingsPage() {
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

      {/* Profile Settings */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="Admin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="User" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="admin@church.com" />
          </div>
          <Button className="bg-[#8B2635] hover:bg-[#6d1d28] text-white">
            Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle
            className="flex items-center text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            <Lock className="w-5 h-5 mr-2" />
            Password & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Button className="bg-[#8B2635] hover:bg-[#6d1d28] text-white">
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
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
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-gray-500">
                Receive email alerts for new appointments
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Appointment Reminders</Label>
              <p className="text-sm text-gray-500">
                Get reminders for upcoming appointments
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Weekly Reports</Label>
              <p className="text-sm text-gray-500">
                Receive weekly appointment summaries
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
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
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Auto-approve Confessions</Label>
              <p className="text-sm text-gray-500">
                Automatically approve confession appointments
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Require Email Verification</Label>
              <p className="text-sm text-gray-500">
                Verify parishioner emails before booking
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="maxAppointments">Maximum Daily Appointments</Label>
            <Input id="maxAppointments" type="number" defaultValue="20" />
            <p className="text-sm text-gray-500">
              Maximum appointments per priest per day
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
