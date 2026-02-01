import React, { useState } from "react";
import logo from "../assets/images/stfaustinaimage.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f7f4] px-4 font-inter">
      <Card className="w-full max-w-md shadow-xl border border-[#1e3a5f]/20">
        <CardHeader className="text-center space-y-4">
          <img src={logo} alt="St. Faustina Parish" className="mx-auto h-20" />
          <CardTitle className="text-2xl text-[#1e3a5f]">Admin Login</CardTitle>
          <p className="text-sm text-gray-600">
            Sign in to manage parish records and services
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input type="email" placeholder="admin@parish.com" required />
            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              <Label>Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1e3a5f]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-[#8B2635]"
              />
              <Label htmlFor="rememberMe" className="text-sm">
                Remember Me
              </Label>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/admin-forgot-password"
                className="text-sm text-[#8B2635] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <Button className="w-full bg-[#8B2635] hover:bg-[#6d1d2a] rounded-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
