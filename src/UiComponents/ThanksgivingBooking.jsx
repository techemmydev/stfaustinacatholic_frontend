import React, { useState } from "react";
import { toast } from "sonner";

const masses = [
  {
    id: 1,
    name: "Sunday Mass – 7:00 AM",
    booked: 2,
  },
  {
    id: 2,
    name: "Sunday Mass – 9:00 AM",
    booked: 5,
  },
  {
    id: 3,
    name: "Sunday Mass – 11:00 AM",
    booked: 1,
  },
  {
    id: 4,
    name: "Weekday Mass – 6:30 AM",
    booked: 0,
  },
];

const MAX_THANKSGIVING = 5;

export default function ThanksgivingBooking() {
  const [selectedMass, setSelectedMass] = useState("");
  const [name, setName] = useState("");
  const [intention, setIntention] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedMass || !name || !intention) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const mass = masses.find((m) => m.id === Number(selectedMass));

    if (mass.booked >= MAX_THANKSGIVING) {
      toast.error("This Mass already has the maximum number of thanksgivings.");
      return;
    }

    console.log("Thanksgiving booked:", {
      name,
      intention,
      mass: mass.name,
    });

    toast.success("Thanksgiving intention submitted successfully!");

    setName("");
    setIntention("");
    setSelectedMass("");
  };

  return (
    <section className="bg-[#f9f7f4] py-16 px-4 lg:py-35">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#1e3a5f] mb-6">
          Thanksgiving Mass Booking
        </h2>

        <p className="text-center text-gray-600 mb-8">
          You may submit a thanksgiving intention for any available Mass. Each
          Mass accepts a maximum of <strong>5 thanksgiving intentions</strong>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B2635]"
              placeholder="Your full name"
            />
          </div>

          {/* Mass Selection */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Select Mass *
            </label>
            <select
              value={selectedMass}
              onChange={(e) => setSelectedMass(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B2635]"
            >
              <option value="">Choose a Mass...</option>
              {masses.map((mass) => {
                const isFull = mass.booked >= MAX_THANKSGIVING;
                return (
                  <option key={mass.id} value={mass.id} disabled={isFull}>
                    {mass.name} —{" "}
                    {isFull
                      ? "Full"
                      : `${MAX_THANKSGIVING - mass.booked} slots left`}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Intention */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Thanksgiving Intention *
            </label>
            <textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B2635]"
              placeholder="I thank God for..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#8B2635] text-white rounded-full hover:bg-[#6d1d2a] transition"
          >
            Submit Thanksgiving
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          * Submissions are subject to parish approval.
        </p>
      </div>
    </section>
  );
}
