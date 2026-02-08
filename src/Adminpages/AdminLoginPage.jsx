import { useState } from "react";
import { useNavigate } from "react-router";
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

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock authentication - in production, this would validate against backend
      if (email && password) {
        localStorage.setItem("adminAuthenticated", "true");
        localStorage.setItem("adminEmail", email);
        toast.success("Login successful");
        navigate("/admin/dashboard");
      } else {
        toast.error("Please enter valid credentials");
      }
      setIsLoading(false);
    }, 1000);
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
                  className="w-4 h-4 rounded border-gray-300 text-[#8B2635] focus:ring-[#8B2635]"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-[#8B2635] hover:text-[#d4af37] transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-[#8B2635] hover:bg-[#6d1d28] text-white transition-all duration-300 shadow-md hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
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
              <a
                href="#"
                className="text-[#8B2635] hover:text-[#d4af37] transition-colors"
              >
                Contact administrator
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Demo Credentials Info */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-md w-full mx-4">
        <p className="text-sm text-center text-gray-700">
          <span className="font-semibold text-[#8B2635]">Demo:</span> Use any
          email and password to login
        </p>
      </div>
    </div>
  );
}
