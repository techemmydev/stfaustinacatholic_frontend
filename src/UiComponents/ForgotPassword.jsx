import React from "react";
import logo from "../assets/images/stfaustinaimage.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";

export function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f7f4] px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <img src={logo} alt="St. Faustina Parish" className="mx-auto h-20" />
          <CardTitle className="text-2xl text-[#1e3a5f]">
            Reset Your Password
          </CardTitle>
          <p className="text-sm text-gray-600">
            Enter your email and we’ll send you instructions
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-5">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="parishioner@email.com"
                required
              />
            </div>

            <Button className="w-full bg-[#8B2635] hover:bg-[#6d1d2a] rounded-full">
              Send Reset Link
            </Button>

            <p className="text-center text-sm">
              <Link to="/login" className="text-[#8B2635] hover:underline">
                Back to Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
