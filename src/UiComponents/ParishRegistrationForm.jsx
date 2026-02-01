import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createParishRegistration,
  resetStatus,
  setSelectedDate,
} from "../Redux/slice/ParishUserRegistrationSlice";
import { Loader2, CheckCircle } from "lucide-react";
import logo from "../assets/images/stfaustinaimage.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CalenderUi from "./CalenderUi";

export default function ParishRegistrationForm() {
  const dispatch = useDispatch();

  // Safe destructuring with default empty object
  const {
    loading,
    success,
    error: serverError,
    selectedDates = {}, // ✅ default to {} if undefined
  } = useSelector((state) => state.parishRegister);

  // Then parsedDate will work safely
  const parsedDate = {
    dob: selectedDates.dob ? new Date(selectedDates.dob) : null,
    baptismDate: selectedDates.baptismDate
      ? new Date(selectedDates.baptismDate)
      : null,
    communionDate: selectedDates.communionDate
      ? new Date(selectedDates.communionDate)
      : null,
    confirmationDate: selectedDates.confirmationDate
      ? new Date(selectedDates.confirmationDate)
      : null,
    marriageDate: selectedDates.marriageDate
      ? new Date(selectedDates.marriageDate)
      : null,
  };

  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    occupation: "",
    maritalStatus: "Single",
    spouseName: "",
    baptismParish: "",
    previousParish: "",
    ministries: [],
    accessibility: "",
  });

  const [sacraments, setSacraments] = useState({
    baptized: "",
    communion: "",
    confirmed: "",
    married: "",
  });

  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* ---------------- Effects ---------------- */
  useEffect(() => {
    if (success) {
      setShowModal(true);
      toast.success("Registration successful! You can now log in.");

      setTimeout(() => {
        setForm({
          fullName: "",
          gender: "",
          address: "",
          phone: "",
          email: "",
          occupation: "",
          maritalStatus: "Single",
          spouseName: "",
          baptismParish: "",
          previousParish: "",
          ministries: [],
          accessibility: "",
        });
        setSacraments({
          baptized: "",
          communion: "",
          confirmed: "",
          married: "",
        });
      }, 500);
    }
  }, [success]);

  useEffect(() => {
    if (serverError) {
      const msg =
        typeof serverError === "string"
          ? serverError
          : serverError.message || "Registration failed";
      setError(msg);
      toast.error(msg);

      setTimeout(() => {
        dispatch(resetStatus());
        setError("");
      }, 5000);
    }
  }, [serverError, dispatch]);

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (error) setError("");
  };

  const handleSacramentChange = (e) => {
    const { name, value } = e.target;
    setSacraments({ ...sacraments, [name]: value });
  };

  const handleMinistryChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      ministries: checked
        ? [...prev.ministries, value]
        : prev.ministries.filter((m) => m !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.gender) {
      toast.error("Please fill all required fields");
      return;
    }

    const finalPayload = {
      fullName: form.fullName,
      dob: selectedDates.dob || null,
      gender: form.gender,
      address: form.address,
      phone: form.phone,
      email: form.email,
      occupation: form.occupation,
      maritalStatus: form.maritalStatus,
      spouseName: form.spouseName,
      previousParish: form.previousParish,
      ministries: form.ministries,
      accessibility: form.accessibility,

      sacraments: {
        baptized: sacraments.baptized === "yes",
        baptismDate:
          sacraments.baptized === "yes" ? selectedDates.baptismDate : null,
        baptismParish: sacraments.baptized === "yes" ? form.baptismParish : "",

        communion: sacraments.communion === "yes",
        communionDate:
          sacraments.communion === "yes" ? selectedDates.communionDate : null,

        confirmed: sacraments.confirmed === "yes",
        confirmationDate:
          sacraments.confirmed === "yes"
            ? selectedDates.confirmationDate
            : null,

        married: sacraments.married === "yes",
        marriageDate:
          sacraments.married === "yes" ? selectedDates.marriageDate : null,
      },
    };

    console.log("FINAL PAYLOAD 👉", finalPayload);
    dispatch(createParishRegistration(finalPayload));
  };

  const handleModalClose = () => {
    setShowModal(false);
    dispatch(resetStatus());
  };

  const inputStyle =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/30 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-[#f9f7f4] py-12 px-4 font-inter lg:py-32">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <img src={logo} alt="Parish Logo" className="h-20 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-[#1e3a5f]">
            Parishioner Registration
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PERSONAL INFORMATION */}
          <section>
            <h3 className="text-xl font-semibold text-[#8B2635] mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="mb-1 text-sm font-medium">Full Name *</span>
                <input
                  className={inputStyle}
                  name="fullName"
                  placeholder="Enter full name"
                  value={form.fullName}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-1 text-sm font-medium">Date of Birth</span>
                <CalenderUi
                  selectedDate={parsedDate.dob}
                  setSelectedDate={(date) =>
                    dispatch(setSelectedDate({ key: "dob", date }))
                  }
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-1 text-sm font-medium">Gender *</span>
                <select
                  className={inputStyle}
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  disabled={loading}
                  required
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="flex flex-col">
                <span className="mb-1 text-sm font-medium">Phone Number</span>
                <input
                  className={inputStyle}
                  name="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-1 text-sm font-medium">Home Address</span>
                <input
                  className={inputStyle}
                  name="address"
                  placeholder="Enter address"
                  value={form.address}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-1 text-sm font-medium">
                  Email Address *
                </span>
                <input
                  className={inputStyle}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-1 text-sm font-medium">Occupation</span>
                <input
                  className={inputStyle}
                  name="occupation"
                  placeholder="Enter occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>
            </div>
          </section>

          {/* FAMILY INFORMATION */}
          <section>
            <h3 className="text-xl font-semibold text-[#8B2635] mb-4">
              Family Information
            </h3>
            <label className="flex flex-col">
              <span className="mb-1 text-sm font-medium">Marital Status</span>
              <select
                className={inputStyle}
                name="maritalStatus"
                value={form.maritalStatus}
                onChange={handleChange}
                disabled={loading}
              >
                <option>Single</option>
                <option>Married</option>
                <option>Widowed</option>
                <option>Divorced</option>
              </select>
            </label>

            {form.maritalStatus === "Married" && (
              <label className="flex flex-col mt-4">
                <span className="mb-1 text-sm font-medium">Spouse Name</span>
                <input
                  className={inputStyle}
                  name="spouseName"
                  placeholder="Enter spouse name"
                  value={form.spouseName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>
            )}
          </section>

          {/* SACRAMENTAL INFORMATION */}
          <section>
            <h3 className="text-xl font-semibold text-[#8B2635] mb-4">
              Sacramental Information
            </h3>

            {/* Baptism */}
            <div>
              <p className="font-medium mb-2">Have you been baptized?</p>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="baptized"
                    value="yes"
                    checked={sacraments.baptized === "yes"}
                    onChange={handleSacramentChange}
                    disabled={loading}
                    className="w-4 h-4"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="baptized"
                    value="no"
                    checked={sacraments.baptized === "no"}
                    onChange={handleSacramentChange}
                    disabled={loading}
                    className="w-4 h-4"
                  />
                  <span>No</span>
                </label>
              </div>

              {sacraments.baptized === "yes" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <span className="mb-1 text-sm font-medium">
                      Baptism Date
                    </span>
                    <CalenderUi
                      selectedDate={parsedDate.baptismDate}
                      setSelectedDate={(date) =>
                        dispatch(setSelectedDate({ key: "baptismDate", date }))
                      }
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="mb-1 text-sm font-medium">
                      Baptism Parish
                    </span>
                    <input
                      className={inputStyle}
                      name="baptismParish"
                      placeholder="Enter parish"
                      value={form.baptismParish}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Communion */}
            <div>
              <p className="font-medium mb-2">
                Have you received First Communion?
              </p>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="communion"
                    value="yes"
                    checked={sacraments.communion === "yes"}
                    onChange={handleSacramentChange}
                    disabled={loading}
                    className="w-4 h-4"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="communion"
                    value="no"
                    checked={sacraments.communion === "no"}
                    onChange={handleSacramentChange}
                    disabled={loading}
                    className="w-4 h-4"
                  />
                  <span>No</span>
                </label>
              </div>
              {sacraments.communion === "yes" && (
                <CalenderUi
                  selectedDate={parsedDate.communionDate}
                  setSelectedDate={(date) =>
                    dispatch(setSelectedDate({ key: "communionDate", date }))
                  }
                />
              )}
            </div>

            {/* Confirmation */}
            <div>
              <p className="font-medium mb-2">
                Have you received Confirmation?
              </p>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="confirmed"
                    value="yes"
                    checked={sacraments.confirmed === "yes"}
                    onChange={handleSacramentChange}
                    disabled={loading}
                    className="w-4 h-4"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="confirmed"
                    value="no"
                    checked={sacraments.confirmed === "no"}
                    onChange={handleSacramentChange}
                    disabled={loading}
                    className="w-4 h-4"
                  />
                  <span>No</span>
                </label>
              </div>
              {sacraments.confirmed === "yes" && (
                <CalenderUi
                  selectedDate={parsedDate.confirmationDate}
                  setSelectedDate={(date) =>
                    dispatch(setSelectedDate({ key: "confirmationDate", date }))
                  }
                />
              )}
            </div>

            {/* Marriage */}
            {form.maritalStatus === "Married" && (
              <div>
                <p className="font-medium mb-2">
                  Are you married in the Catholic Church?
                </p>
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="married"
                      value="yes"
                      checked={sacraments.married === "yes"}
                      onChange={handleSacramentChange}
                      disabled={loading}
                      className="w-4 h-4"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="married"
                      value="no"
                      checked={sacraments.married === "no"}
                      onChange={handleSacramentChange}
                      disabled={loading}
                      className="w-4 h-4"
                    />
                    <span>No</span>
                  </label>
                </div>
                {sacraments.married === "yes" && (
                  <CalenderUi
                    selectedDate={parsedDate.marriageDate}
                    setSelectedDate={(date) =>
                      dispatch(setSelectedDate({ key: "marriageDate", date }))
                    }
                  />
                )}
              </div>
            )}
          </section>

          {/* PARISH LIFE */}
          <section>
            <h3 className="text-xl font-semibold text-[#8B2635] mb-4">
              Parish Life
            </h3>
            <label className="flex flex-col">
              <span className="mb-1 text-sm font-medium">Previous Parish</span>
              <input
                className={inputStyle}
                name="previousParish"
                placeholder="Enter previous parish"
                value={form.previousParish}
                onChange={handleChange}
                disabled={loading}
              />
            </label>

            <div className="mt-4">
              <p className="font-medium mb-2">
                Ministries (Select all that apply)
              </p>
              <div className="space-y-2">
                {[
                  "Choir",
                  "Lector",
                  "Usher",
                  "Youth Ministry",
                  "Catechism",
                ].map((m) => (
                  <label key={m} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={m}
                      checked={form.ministries.includes(m)}
                      onChange={handleMinistryChange}
                      disabled={loading}
                      className="w-4 h-4"
                    />
                    <span>{m}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="flex flex-col mt-4">
              <span className="mb-1 text-sm font-medium">
                Accessibility Needs (if any)
              </span>
              <input
                className={inputStyle}
                name="accessibility"
                placeholder="Enter any accessibility needs"
                value={form.accessibility}
                onChange={handleChange}
                disabled={loading}
              />
            </label>
          </section>

          {/* ACCOUNT SECURITY */}
          <section>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </section>
          {/* SUBMIT */}
          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#8B2635] text-white px-10 py-3 rounded-full hover:bg-[#6d1d28] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-xl max-w-md text-center shadow-xl">
            <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-3">
              Registration Successful
            </h2>
            <p className="text-gray-600 mb-6">
              Your registration has been received. The parish office will
              contact you if further information is required.
            </p>
            <button
              onClick={handleModalClose}
              className="bg-[#8B2635] text-white px-8 py-3 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
