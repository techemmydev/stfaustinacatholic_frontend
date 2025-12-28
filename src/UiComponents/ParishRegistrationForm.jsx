import React, { useState } from "react";
import logo from "../assets/images/stfaustinaimage.png";
import { Eye, EyeOff } from "lucide-react";

export default function ParishRegistrationForm() {
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    occupation: "",
    maritalStatus: "Single",
    spouseName: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const inputStyle =
    "w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-700 placeholder-gray-400 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/30 outline-none transition font-inter";

  return (
    <div className="min-h-screen bg-[#f9f7f4] py-12 px-4 font-inter lg:py-30">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="St. Faustina Parish"
            className="h-20 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-[#1e3a5f]">
            Parishioner Registration
          </h2>
          <p className="text-gray-600 mt-2">
            Register as a member of St. Faustina Parish
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <section>
            <h3 className="text-xl font-semibold text-[#8B2635] mb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className={inputStyle}
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
              />
              <input
                className={inputStyle}
                type="date"
                name="dob"
                onChange={handleChange}
              />
              <input
                className={inputStyle}
                name="gender"
                placeholder="Gender"
                onChange={handleChange}
              />
              <input
                className={inputStyle}
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
              />
              <input
                className={inputStyle}
                name="address"
                placeholder="Home Address"
                onChange={handleChange}
              />
              <input
                className={inputStyle}
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
              />
              <input
                className={inputStyle}
                name="occupation"
                placeholder="Occupation"
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Family Information */}
          <section>
            <h3 className="text-xl font-semibold text-[#8B2635] mb-4">
              Family Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                className={inputStyle}
                name="maritalStatus"
                onChange={handleChange}
              >
                <option>Single</option>
                <option>Married</option>
                <option>Widowed</option>
                <option>Divorced</option>
              </select>

              {form.maritalStatus === "Married" && (
                <input
                  className={inputStyle}
                  name="spouseName"
                  placeholder="Spouse Name"
                  onChange={handleChange}
                />
              )}
            </div>
          </section>

          {/* Emergency Contact */}
          <section>
            <h3 className="text-xl font-semibold text-[#8B2635] mb-4">
              Emergency Contact
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className={inputStyle}
                name="emergencyContactName"
                placeholder="Contact Name"
                onChange={handleChange}
              />
              <input
                className={inputStyle}
                name="emergencyContactPhone"
                placeholder="Contact Phone"
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Account Security */}
          <section>
            <h3 className="text-xl font-semibold text-[#8B2635] mb-4">
              Account Security
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="relative">
                <input
                  className={inputStyle}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#1e3a5f]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  className={inputStyle}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#1e3a5f]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-[#8B2635] text-white px-10 py-3 rounded-full hover:bg-[#6d1d2a] transition shadow-lg"
            >
              Register as Parishioner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
