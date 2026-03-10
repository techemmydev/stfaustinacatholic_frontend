import { useState, useRef, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
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
  MessageSquare,
  Mail,
  CheckCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { logoutAdmin } from "../Redux/slice/adminSlice";
import { selectNotifications } from "../Redux/slice/Adminsettingsslice";

// ── helpers ───────────────────────────────────────────────────
const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

// ── Notification Bell ─────────────────────────────────────────
function NotificationBell() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { count, items } = useSelector(selectNotifications);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleItemClick = (link) => {
    setOpen(false);
    navigate(link);
  };

  return (
    <div className="relative" ref={ref}>
      {/* Bell button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 text-gray-600 hover:text-[#8B2635] transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {count > 0 && (
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-0.5 flex items-center justify-center bg-[#8B2635] text-white text-[10px] font-bold rounded-full leading-none">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#1e3a5f] to-[#8B2635]">
            <span
              className="text-white text-sm font-semibold"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Notifications
            </span>
            {count > 0 && (
              <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                {count} pending
              </span>
            )}
          </div>

          {/* Items */}
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <CheckCheck className="w-8 h-8 mb-2 text-gray-300" />
                <p className="text-sm">All caught up!</p>
                <p className="text-xs mt-1">No pending actions</p>
              </div>
            ) : (
              items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.link)}
                  className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.color}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 font-medium leading-snug">
                      {item.message}
                    </p>
                    {item.sub && (
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {item.sub}
                      </p>
                    )}
                    {item.date && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {timeAgo(item.date)}
                      </p>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 px-4 py-2">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/admin/dashboard");
                }}
                className="text-xs text-[#8B2635] hover:underline w-full text-center"
              >
                View all on Dashboard →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Layout ───────────────────────────────────────────────
export function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentAdmin } = useSelector((state) => state.admin);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    const result = await dispatch(logoutAdmin());
    if (result.error) {
      toast.error(result.payload || "Logout failed");
    } else {
      toast.success("Logged out successfully");
      navigate("/admin/login", { replace: true });
    }
  };

  const navigationItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Appointments", path: "/admin/appointments", icon: Calendar },
    { name: "Contacts", path: "/admin/contacts", icon: Mail },
    { name: "Sermons", path: "/admin/sermons", icon: MessageSquare },
    { name: "Time Slots", path: "/admin/time-slots", icon: Calendar },
    {
      name: "Mass Thanksgiving",
      path: "/admin/mass-management",
      icon: Calendar,
    },
    { name: "Priests", path: "/admin/priests", icon: Users },
    { name: "Mass Schedule", path: "/admin/mass-schedule", icon: Church },
    { name: "Mass Bookings", path: "/admin/mass-bookings", icon: Calendar },
    { name: "Events", path: "/admin/events", icon: Calendar },
    { name: "Invitations", path: "/admin/invitations", icon: Mail },
    { name: "Testimonials", path: "/admin/reviews", icon: MessageSquare },
    { name: "Parishioners", path: "/admin/parishioners", icon: Users },
    { name: "Admin Users", path: "/admin/users", icon: UserCog },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const adminName = currentAdmin?.name || "Admin User";
  const adminRole = currentAdmin?.role || "Administrator";

  const SidebarContent = ({ onLinkClick }) => (
    <>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onLinkClick}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-white/10 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon
                className={`w-5 h-5 mr-3 flex-shrink-0 ${
                  isActive
                    ? "text-[#d4af37]"
                    : "text-gray-400 group-hover:text-[#d4af37]"
                }`}
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center px-4 py-3 mb-2 bg-white/5 rounded-lg">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center">
            <span
              className="text-[#1e3a5f] font-semibold"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {adminName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {adminName}
            </p>
            <p className="text-xs text-gray-400">{adminRole}</p>
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
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-gradient-to-b from-[#1e3a5f] to-[#152d47] shadow-xl">
          <div className="flex items-center justify-center h-20 px-6 bg-[#8B2635]">
            <Church className="w-8 h-8 text-[#d4af37] mr-3" />
            <span
              className="text-xl text-white"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Parish Admin
            </span>
          </div>
          <SidebarContent />
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
            <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content */}
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
              {/* ↓ Dynamic notification bell */}
              <NotificationBell />

              <div className="hidden lg:flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center">
                  <span
                    className="text-white text-sm font-semibold"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {adminName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-900 font-medium">{adminName}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
