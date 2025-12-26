import React, { useState } from "react";

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
    baptismDate: "",
    baptismParish: "",
    communionDate: "",
    confirmationDate: "",
    marriageDate: "",
    previousParish: "",
    ministries: [],
    preferredMass: "",
    accessibility: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const res = await fetch("http://localhost:5000/api/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });

    // const data = await res.json();
    // console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Parish Registration</h2>

      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input name="dob" type="date" onChange={handleChange} />
      <input name="gender" placeholder="Gender" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="occupation"
        placeholder="Occupation"
        onChange={handleChange}
      />

      <select name="maritalStatus" onChange={handleChange}>
        <option>Single</option>
        <option>Married</option>
        <option>Widowed</option>
        <option>Divorced</option>
      </select>

      {form.maritalStatus === "Married" && (
        <input
          name="spouseName"
          placeholder="Spouse Name"
          onChange={handleChange}
        />
      )}

      <input
        name="emergencyContactName"
        placeholder="Emergency Contact Name"
        onChange={handleChange}
      />
      <input
        name="emergencyContactPhone"
        placeholder="Emergency Contact Phone"
        onChange={handleChange}
      />

      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />
      <input
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        onChange={handleChange}
      />

      <button type="submit">Register</button>
    </form>
  );
}
