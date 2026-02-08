import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Church,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminEmail");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Appointments",
      path: "/admin/appointments",
      icon: Calendar,
    },
    {
      name: "Priests",
      path: "/admin/priests",
      icon: Users,
    },

    {
      name: "Mass Schedule",
      path: "/admin/mass-schedule",
      icon: Church,
    },
    {
      name: "Mass Bookings",
      path: "/admin/mass-bookings",
      icon: Church,
    },
    {
      name: "Events",
      path: "/admin/events",
      icon: Calendar,
    },
    {
      name: "Parishioners",
      path: "/admin/parishioners",
      icon: Users,
    },

    {
      name: "Admin Users",
      path: "/admin/users",
      icon: UserCog,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const adminEmail = localStorage.getItem("adminEmail") || "admin@church.com";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-gradient-to-b from-[#1e3a5f] to-[#152d47] shadow-xl">
          {/* Logo */}
          <div className="flex items-center justify-center h-20 px-6 bg-[#8B2635]">
            <Church className="w-8 h-8 text-[#d4af37] mr-3" />
            <span
              className="text-xl text-white"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Parish Admin
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-white/10 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mr-3 ${isActive ? "text-[#d4af37]" : "text-gray-400 group-hover:text-[#d4af37]"}`}
                  />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center px-4 py-3 mb-2 bg-white/5 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center">
                <span
                  className="text-[#1e3a5f]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {adminEmail.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm text-white truncate">{adminEmail}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 flex flex-col w-72 bg-gradient-to-b from-[#1e3a5f] to-[#152d47] shadow-xl">
            {/* Logo */}
            <div className="flex items-center justify-between h-20 px-6 bg-[#8B2635]">
              <div className="flex items-center">
                <Church className="w-8 h-8 text-[#d4af37] mr-3" />
                <span
                  className="text-xl text-white"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Parish Admin
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white hover:text-[#d4af37] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-white/10 text-white shadow-lg"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 mr-3 ${isActive ? "text-[#d4af37]" : ""}`}
                    />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Profile & Logout */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center px-4 py-3 mb-2 bg-white/5 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center">
                  <span
                    className="text-[#1e3a5f]"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {adminEmail.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{adminEmail}</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="lg:pl-72">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-4 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-[#8B2635] transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 lg:flex-none">
              <h1
                className="text-xl text-[#1e3a5f]"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {navigationItems.find((item) => item.path === location.pathname)
                  ?.name || "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-[#8B2635] transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#8B2635] rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
