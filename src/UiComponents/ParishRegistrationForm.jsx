import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createParishRegistration,
  resetStatus,
  setSelectedDate,
} from "../Redux/slice/ParishUserRegistrationSlice";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
import logo from "../assets/images/stfaustinaimage.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import CalenderUi from "./CalenderUi";

const ministryList = [
  "Choir",
  "Lector",
  "Usher",
  "Youth Ministry",
  "Catechism",
];

const sectionTitleStyle = {
  color: "#1e3a5f",
  fontFamily: "'Georgia', 'Times New Roman', serif",
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "4px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid #e8e2d9",
  background: "#faf8f5",
  outline: "none",
  fontFamily: "sans-serif",
  color: "#1e3a5f",
  fontSize: "0.9rem",
  borderRadius: 0,
};

const labelStyle = {
  display: "block",
  fontSize: "0.7rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#c9a84c",
  fontFamily: "sans-serif",
  marginBottom: "6px",
};

const SectionHeader = ({ number, title, accent = "#8B2635" }) => (
  <div className="flex items-center gap-4 mb-8">
    <div
      className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
      style={{ background: accent, fontFamily: "sans-serif" }}
    >
      {number}
    </div>
    <div>
      <div
        style={{
          height: "2px",
          width: "40px",
          background: "#c9a84c",
          marginBottom: "6px",
        }}
      />
      <h3 style={sectionTitleStyle}>{title}</h3>
    </div>
  </div>
);

export default function ParishRegistrationForm() {
  const dispatch = useDispatch();
  const {
    loading,
    success,
    error: serverError,
    selectedDates = {},
  } = useSelector((state) => state.parishRegister);

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

  useEffect(() => {
    if (success) {
      setShowModal(true);
      toast.success("Registration successful!");
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
    dispatch(createParishRegistration(finalPayload));
  };

  const handleModalClose = () => {
    setShowModal(false);
    dispatch(resetStatus());
  };

  const RadioGroup = ({ name, value, onChange, disabled }) => (
    <div className="flex gap-6 mt-2">
      {["yes", "no"].map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-2 cursor-pointer"
          style={{ fontFamily: "sans-serif" }}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={onChange}
            disabled={disabled}
            className="w-4 h-4"
            style={{ accentColor: "#8B2635" }}
          />
          <span className="text-sm capitalize" style={{ color: "#555" }}>
            {opt === "yes" ? "Yes" : "No"}
          </span>
        </label>
      ))}
    </div>
  );

  return (
    <div
      className="min-h-screen py-12 px-4 lg:py-24"
      style={{
        background: "#faf8f5",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <img src={logo} alt="Parish Logo" className="h-20 mx-auto mb-6" />
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
          >
            Join Our Community
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#1e3a5f", lineHeight: 1.1 }}
          >
            Parishioner
            <br />
            <span style={{ color: "#8B2635" }}>Registration</span>
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "rgba(201,168,76,0.4)",
              }}
            />
            <span style={{ color: "#c9a84c" }}>✟</span>
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "rgba(201,168,76,0.4)",
              }}
            />
          </div>
          <p
            className="mt-5 max-w-lg mx-auto text-base leading-relaxed"
            style={{ color: "#888", fontFamily: "sans-serif", fontWeight: 300 }}
          >
            We are delighted to welcome you into the St. Faustina family. Please
            complete the form below.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            background: "white",
            border: "1px solid #e8e2d9",
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
          }}
        >
          {/* Gold top bar */}
          <div
            style={{
              height: "4px",
              background:
                "linear-gradient(to right, #c9a84c, #e8d5a3, #c9a84c)",
            }}
          />

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-14">
            {/* ── 1. PERSONAL INFORMATION ──────────────────────────── */}
            <section>
              <SectionHeader
                number="01"
                title="Personal Information"
                accent="#8B2635"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>
                    Full Name <span style={{ color: "#8B2635" }}>*</span>
                  </label>
                  <input
                    style={inputStyle}
                    name="fullName"
                    placeholder="Enter full name"
                    value={form.fullName}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                    onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Date of Birth</label>
                  <CalenderUi
                    selectedDate={parsedDate.dob}
                    setSelectedDate={(date) =>
                      dispatch(setSelectedDate({ key: "dob", date }))
                    }
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Gender <span style={{ color: "#8B2635" }}>*</span>
                  </label>
                  <select
                    style={inputStyle}
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                    onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    style={inputStyle}
                    name="phone"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={loading}
                    onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                    onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Home Address</label>
                  <input
                    style={inputStyle}
                    name="address"
                    placeholder="Enter address"
                    value={form.address}
                    onChange={handleChange}
                    disabled={loading}
                    onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                    onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Email Address <span style={{ color: "#8B2635" }}>*</span>
                  </label>
                  <input
                    style={inputStyle}
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                    onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                  />
                </div>

                <div className="md:col-span-2">
                  <label style={labelStyle}>Occupation</label>
                  <input
                    style={inputStyle}
                    name="occupation"
                    placeholder="Enter occupation"
                    value={form.occupation}
                    onChange={handleChange}
                    disabled={loading}
                    onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                    onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                  />
                </div>
              </div>
            </section>

            <div style={{ height: "1px", background: "#f0ece4" }} />

            {/* ── 2. FAMILY INFORMATION ────────────────────────────── */}
            <section>
              <SectionHeader
                number="02"
                title="Family Information"
                accent="#1e3a5f"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>Marital Status</label>
                  <select
                    style={inputStyle}
                    name="maritalStatus"
                    value={form.maritalStatus}
                    onChange={handleChange}
                    disabled={loading}
                    onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                    onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                  >
                    <option>Single</option>
                    <option>Married</option>
                    <option>Widowed</option>
                    <option>Divorced</option>
                  </select>
                </div>

                {form.maritalStatus === "Married" && (
                  <div>
                    <label style={labelStyle}>Spouse Name</label>
                    <input
                      style={inputStyle}
                      name="spouseName"
                      placeholder="Enter spouse name"
                      value={form.spouseName}
                      onChange={handleChange}
                      disabled={loading}
                      onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                      onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                    />
                  </div>
                )}
              </div>
            </section>

            <div style={{ height: "1px", background: "#f0ece4" }} />

            {/* ── 3. SACRAMENTAL INFORMATION ───────────────────────── */}
            <section>
              <SectionHeader
                number="03"
                title="Sacramental Information"
                accent="#8B2635"
              />
              <div className="space-y-8">
                {/* Baptism */}
                <div
                  className="p-6"
                  style={{
                    border: "1px solid #e8e2d9",
                    borderLeft: "4px solid #8B2635",
                  }}
                >
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    Sacrament
                  </p>
                  <p className="font-bold mb-3" style={{ color: "#1e3a5f" }}>
                    Have you been baptized?
                  </p>
                  <RadioGroup
                    name="baptized"
                    value={sacraments.baptized}
                    onChange={handleSacramentChange}
                    disabled={loading}
                  />
                  {sacraments.baptized === "yes" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                      <div>
                        <label style={labelStyle}>Baptism Date</label>
                        <CalenderUi
                          selectedDate={parsedDate.baptismDate}
                          setSelectedDate={(date) =>
                            dispatch(
                              setSelectedDate({ key: "baptismDate", date }),
                            )
                          }
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Baptism Parish</label>
                        <input
                          style={inputStyle}
                          name="baptismParish"
                          placeholder="Enter parish"
                          value={form.baptismParish}
                          onChange={handleChange}
                          disabled={loading}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#c9a84c")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#e8e2d9")
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Communion */}
                <div
                  className="p-6"
                  style={{
                    border: "1px solid #e8e2d9",
                    borderLeft: "4px solid #1e3a5f",
                  }}
                >
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    Sacrament
                  </p>
                  <p className="font-bold mb-3" style={{ color: "#1e3a5f" }}>
                    Have you received First Communion?
                  </p>
                  <RadioGroup
                    name="communion"
                    value={sacraments.communion}
                    onChange={handleSacramentChange}
                    disabled={loading}
                  />
                  {sacraments.communion === "yes" && (
                    <div className="mt-5">
                      <label style={labelStyle}>Communion Date</label>
                      <CalenderUi
                        selectedDate={parsedDate.communionDate}
                        setSelectedDate={(date) =>
                          dispatch(
                            setSelectedDate({ key: "communionDate", date }),
                          )
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Confirmation */}
                <div
                  className="p-6"
                  style={{
                    border: "1px solid #e8e2d9",
                    borderLeft: "4px solid #8B2635",
                  }}
                >
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    Sacrament
                  </p>
                  <p className="font-bold mb-3" style={{ color: "#1e3a5f" }}>
                    Have you received Confirmation?
                  </p>
                  <RadioGroup
                    name="confirmed"
                    value={sacraments.confirmed}
                    onChange={handleSacramentChange}
                    disabled={loading}
                  />
                  {sacraments.confirmed === "yes" && (
                    <div className="mt-5">
                      <label style={labelStyle}>Confirmation Date</label>
                      <CalenderUi
                        selectedDate={parsedDate.confirmationDate}
                        setSelectedDate={(date) =>
                          dispatch(
                            setSelectedDate({ key: "confirmationDate", date }),
                          )
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Marriage */}
                {form.maritalStatus === "Married" && (
                  <div
                    className="p-6"
                    style={{
                      border: "1px solid #e8e2d9",
                      borderLeft: "4px solid #1e3a5f",
                    }}
                  >
                    <p
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                    >
                      Sacrament
                    </p>
                    <p className="font-bold mb-3" style={{ color: "#1e3a5f" }}>
                      Are you married in the Catholic Church?
                    </p>
                    <RadioGroup
                      name="married"
                      value={sacraments.married}
                      onChange={handleSacramentChange}
                      disabled={loading}
                    />
                    {sacraments.married === "yes" && (
                      <div className="mt-5">
                        <label style={labelStyle}>Marriage Date</label>
                        <CalenderUi
                          selectedDate={parsedDate.marriageDate}
                          setSelectedDate={(date) =>
                            dispatch(
                              setSelectedDate({ key: "marriageDate", date }),
                            )
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            <div style={{ height: "1px", background: "#f0ece4" }} />

            {/* ── 4. PARISH LIFE ───────────────────────────────────── */}
            <section>
              <SectionHeader number="04" title="Parish Life" accent="#1e3a5f" />
              <div className="space-y-6">
                <div>
                  <label style={labelStyle}>Previous Parish</label>
                  <input
                    style={inputStyle}
                    name="previousParish"
                    placeholder="Enter previous parish"
                    value={form.previousParish}
                    onChange={handleChange}
                    disabled={loading}
                    onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                    onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Ministries (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {ministryList.map((m) => (
                      <label
                        key={m}
                        className="flex items-center gap-3 p-3 cursor-pointer transition-all"
                        style={{
                          border: `1px solid ${form.ministries.includes(m) ? "#c9a84c" : "#e8e2d9"}`,
                          background: form.ministries.includes(m)
                            ? "#faf8f5"
                            : "white",
                        }}
                      >
                        <input
                          type="checkbox"
                          value={m}
                          checked={form.ministries.includes(m)}
                          onChange={handleMinistryChange}
                          disabled={loading}
                          style={{
                            accentColor: "#8B2635",
                            width: "16px",
                            height: "16px",
                          }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: "#555", fontFamily: "sans-serif" }}
                        >
                          {m}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Accessibility Needs (if any)</label>
                  <input
                    style={inputStyle}
                    name="accessibility"
                    placeholder="Enter any accessibility needs"
                    value={form.accessibility}
                    onChange={handleChange}
                    disabled={loading}
                    onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                    onBlur={(e) => (e.target.style.borderColor = "#e8e2d9")}
                  />
                </div>
              </div>
            </section>

            {/* Error */}
            {error && (
              <div
                className="p-4"
                style={{
                  background: "#fff5f5",
                  border: "1px solid #fed7d7",
                  borderLeft: "4px solid #e53e3e",
                }}
              >
                <p
                  className="text-sm"
                  style={{ color: "#c53030", fontFamily: "sans-serif" }}
                >
                  {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-12 py-4 text-xs font-bold tracking-widest uppercase transition-all group"
                style={{
                  background: loading ? "#ccc" : "#c9a84c",
                  color: "#0a0a0a",
                  fontFamily: "sans-serif",
                  cursor: loading ? "not-allowed" : "pointer",
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />{" "}
                    Registering...
                  </>
                ) : (
                  <>
                    Register Now{" "}
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* ── Success Modal ──────────────────────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-md w-full mx-4 text-center"
            style={{
              background: "white",
              border: "1px solid #e8e2d9",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                height: "4px",
                background:
                  "linear-gradient(to right, #c9a84c, #e8d5a3, #c9a84c)",
              }}
            />
            <div className="p-10">
              <CheckCircle
                size={56}
                className="mx-auto mb-5"
                style={{ color: "#16a34a" }}
              />
              <p
                className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
              >
                Welcome to the Parish
              </p>
              <h2
                className="text-3xl font-bold mb-4"
                style={{ color: "#1e3a5f" }}
              >
                Registration
                <br />
                Successful
              </h2>
              <div className="flex items-center justify-center gap-4 mb-5">
                <div
                  style={{
                    height: "1px",
                    width: "40px",
                    background: "rgba(201,168,76,0.4)",
                  }}
                />
                <span style={{ color: "#c9a84c" }}>✟</span>
                <div
                  style={{
                    height: "1px",
                    width: "40px",
                    background: "rgba(201,168,76,0.4)",
                  }}
                />
              </div>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "#888", fontFamily: "sans-serif" }}
              >
                Your registration has been received. The parish office will
                contact you if further information is required.
              </p>
              <button
                onClick={handleModalClose}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 text-xs font-bold tracking-widest uppercase"
                style={{
                  background: "#c9a84c",
                  color: "#0a0a0a",
                  fontFamily: "sans-serif",
                  clipPath:
                    "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
