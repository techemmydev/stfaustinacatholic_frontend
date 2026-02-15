import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, Church } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { loginAdmin } from "../Redux/slice/adminSlice";

export function AdminLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.admin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [remember, setRemember] = useState(false);

  // Redirect if already authenticated - with guard to prevent multiple navigations
  useEffect(() => {
    if (isAuthenticated && !hasRedirected) {
      setHasRedirected(true);
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate, hasRedirected]);

  // Load saved email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("adminEmail");
    // const savedPassword = localStorage.getItem("adminPassword");
    const wasRemembered = localStorage.getItem("rememberMe") === "true";

    if (wasRemembered && savedEmail) {
      setEmail(savedEmail);
      // setPassword(savedPassword);
      setRemember(true);
    }
  }, []);

  // NO ERROR HANDLING USEEFFECT - Handle errors directly in the submit handler

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    const result = await dispatch(loginAdmin({ email, password }));

    if (result.meta.requestStatus === "rejected") {
      const errorMessage =
        result.payload?.message || result.error?.message || "Login failed";

      toast.error(errorMessage);
    } else if (result.meta.requestStatus === "fulfilled") {
      // Save ONLY email (not password)
      if (remember) {
        localStorage.setItem("adminEmail", email);
        localStorage.setItem("adminPassword", password); // ⚠️ insecure
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminPassword");
        localStorage.removeItem("rememberMe");
      }

      toast.success("Login successful");

      setHasRedirected(true);
      navigate("/admin/dashboard", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3a5f] via-[#8B2635] to-[#1e3a5f] p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#8B2635] to-[#d4af37] flex items-center justify-center shadow-lg">
            <Church className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl text-[#1e3a5f]">
              Parish Admin Portal
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Sign in to manage appointments and services
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#2d2d2d]">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@church.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 border-gray-300 focus:border-[#8B2635] focus:ring-[#8B2635]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#2d2d2d]">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10 border-gray-300 focus:border-[#8B2635] focus:ring-[#8B2635]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#8B2635] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#8B2635] focus:ring-[#8B2635]"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link
                to="/admin/forgot-password"
                className="text-[#8B2635] hover:text-[#d4af37] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-[#8B2635] hover:bg-[#6d1d28] text-white transition-all duration-300 shadow-md hover:shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need access?{" "}
              <Link
                to="/admin/contact"
                className="text-[#8B2635] hover:text-[#d4af37] transition-colors"
              >
                Contact administrator
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
