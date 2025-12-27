import React, { useState } from "react";
import {
  Heart,
  Calendar,
  DollarSign,
  CheckCircle,
  CreditCard,
  Banknote,
} from "lucide-react";
import { toast, Toaster } from "sonner";

const donationProjects = [
  {
    id: "general",
    title: "General Parish Fund",
    description: "Support day-to-day operations, ministries, and programs",
    icon: Heart,
    color: "bg-[#8B2635]",
  },
  {
    id: "building",
    title: "Building & Maintenance",
    description: "Help maintain and improve our church facilities",
    icon: Banknote,
    color: "bg-[#1e3a5f]",
  },
  {
    id: "education",
    title: "Religious Education",
    description: "Support faith formation programs for all ages",
    icon: Heart,
    color: "bg-[#8B2635]",
  },
  {
    id: "outreach",
    title: "Charitable Outreach",
    description: "Serve the poor and those in need in our community",
    icon: Heart,
    color: "bg-[#1e3a5f]",
  },
];

export function DonatePage() {
  const [donationType, setDonationType] = useState("one-time");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [project, setProject] = useState("general");
  const [frequency, setFrequency] = useState("monthly");
  const [submitted, setSubmitted] = useState(false);

  const predefinedAmounts = ["25", "50", "100", "250", "500"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalAmount = amount === "custom" ? customAmount : amount;

    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }

    console.log("Donation submitted:", {
      type: donationType,
      amount: finalAmount,
      project,
      frequency: donationType === "recurring" ? frequency : null,
    });

    setSubmitted(true);
    toast.success("Thank you for your generous donation!");
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f7f4] py-16 px-4 font-inter">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="mb-4 text-[#1e3a5f]">
            Thank You for Your Generosity!
          </h2>
          <p className="text-lg text-[#666666] mb-6">
            Your {donationType === "recurring" ? "recurring " : ""}donation of $
            {amount === "custom" ? customAmount : amount} has been processed
            successfully. Your support helps us continue our mission of faith,
            worship, and service.
          </p>
          <div className="bg-[#f9f7f4] rounded-lg p-6 mb-6">
            <p className="text-[#2d2d2d]">
              A receipt has been sent to your email for tax purposes. May God
              bless you for your generosity!
            </p>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setAmount("");
              setCustomAmount("");
            }}
            className="px-8 py-3 bg-[#8B2635] text-white rounded-full hover:bg-[#6d1d2a] transition-colors"
          >
            Make Another Donation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-inter">
      <Toaster position="top-right" richColors />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center mt-10">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-[#d4af37]" />
          </div>
          <h1 className="text-white mb-6">Support Our Parish</h1>
          <p className="text-xl text-gray-200">
            Your generosity helps us continue our mission of faith, worship, and
            service to our community
          </p>
        </div>
      </section>

      {/* Why Give Section */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-6 text-[#1e3a5f]">Why Your Gift Matters</h2>
          <p className="text-lg text-[#666666]">
            Your financial support enables St. Michael's Parish to celebrate the
            sacraments, educate our children in the faith, maintain our
            beautiful church, and serve those in need. Every gift, large or
            small, makes a meaningful difference in the life of our parish
            community.
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-[#f9f7f4]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="mb-6 text-[#1e3a5f]">Make a Donation</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Donation Type */}
              <div>
                <label className="block mb-4 text-[#2d2d2d]">
                  Donation Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setDonationType("one-time")}
                    className={`p-6 border-2 rounded-lg transition-all text-left ${
                      donationType === "one-time"
                        ? "border-[#8B2635] bg-[#8B2635]/5"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <DollarSign
                      className={`w-8 h-8 mb-3 ${
                        donationType === "one-time"
                          ? "text-[#8B2635]"
                          : "text-gray-400"
                      }`}
                    />
                    <h3 className="mb-2 text-[#1e3a5f]">One-Time Gift</h3>
                    <p className="text-sm text-[#666666]">
                      Make a single donation today
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDonationType("recurring")}
                    className={`p-6 border-2 rounded-lg transition-all text-left ${
                      donationType === "recurring"
                        ? "border-[#8B2635] bg-[#8B2635]/5"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Calendar
                      className={`w-8 h-8 mb-3 ${
                        donationType === "recurring"
                          ? "text-[#8B2635]"
                          : "text-gray-400"
                      }`}
                    />
                    <h3 className="mb-2 text-[#1e3a5f]">Recurring Gift</h3>
                    <p className="text-sm text-[#666666]">
                      Set up automatic monthly giving
                    </p>
                  </button>
                </div>
              </div>

              {/* Frequency (for recurring) */}
              {donationType === "recurring" && (
                <div>
                  <label className="block mb-4 text-[#2d2d2d]">Frequency</label>
                  <div className="grid grid-cols-3 gap-4">
                    {["weekly", "monthly", "yearly"].map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => setFrequency(freq)}
                        className={`px-6 py-3 rounded-lg transition-colors capitalize ${
                          frequency === freq
                            ? "bg-[#8B2635] text-white"
                            : "bg-gray-100 text-[#2d2d2d] hover:bg-gray-200"
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Amount Selection */}
              <div>
                <label className="block mb-4 text-[#2d2d2d]">
                  Select Amount
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                  {predefinedAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setAmount(amt);
                        setCustomAmount("");
                      }}
                      className={`px-4 py-3 rounded-lg transition-colors ${
                        amount === amt
                          ? "bg-[#8B2635] text-white"
                          : "bg-gray-100 text-[#2d2d2d] hover:bg-gray-200"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setAmount("custom")}
                    className={`px-4 py-3 rounded-lg transition-colors ${
                      amount === "custom"
                        ? "bg-[#8B2635] text-white"
                        : "bg-gray-100 text-[#2d2d2d] hover:bg-gray-200"
                    }`}
                  >
                    Custom
                  </button>
                </div>
                {amount === "custom" && (
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]">
                      $
                    </span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter amount"
                      min="1"
                      step="1"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B2635] focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              {/* Project Selection */}
              <div>
                <label className="block mb-4 text-[#2d2d2d]">Donate To</label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B2635] focus:border-transparent"
                >
                  {donationProjects.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Info Note */}
              <div className="bg-[#f9f7f4] rounded-lg p-6 border-l-4 border-[#8B2635]">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-6 h-6 text-[#8B2635] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[#1e3a5f] mb-2">
                      Secure Payment Processing
                    </h4>
                    <p className="text-sm text-[#666666]">
                      Your donation is secure and encrypted. You will be
                      redirected to our secure payment processor to complete
                      your gift. All donations are tax-deductible to the extent
                      allowed by law.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#8B2635] text-white rounded-full hover:bg-[#6d1d2a] transition-colors shadow-lg"
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="mb-8 text-[#1e3a5f] text-center">
          Where Your Donations Go
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {donationProjects.map((proj) => {
            const Icon = proj.icon;
            return (
              <div
                key={proj.id}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <div
                  className={`${proj.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-[#1e3a5f]">{proj.title}</h3>
                <p className="text-[#666666]">{proj.description}</p>
              </div>
            );
          })}
        </div>
      </section>
      {/* Other Ways to Give */}
      <section className="py-16 bg-[#f9f7f4]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="mb-8 text-[#1e3a5f] text-center text-4xl">
            Other Ways to Give
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="mb-2 text-[#1e3a5f]">Mail a Check</h3>
              <p className="text-[#666666]">
                Make checks payable to "St. Michael{"\u2019"}s Parish" and mail
                to:
                <br />
                123 Church Street, Springfield, IL 62701
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="mb-2 text-[#1e3a5f]">Envelope Collection</h3>
              <p className="text-[#666666]">
                Place your donation in the collection basket during Mass using
                the envelopes provided or available at the church entrance.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="mb-2 text-[#1e3a5f]">Stock or Securities</h3>
              <p className="text-[#666666]">
                Consider donating appreciated stock for potential tax benefits.
                Contact our parish office for account information.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-[#1e3a5f]">Planned Giving</h3>
              <p className="text-[#666666]">
                Leave a lasting legacy through your will or estate plans.
                Contact our pastor to discuss planned giving opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-16 bg-[#1e3a5f] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-white mb-6">Thank You for Your Support</h2>
          <p className="text-xl text-gray-200 mb-4">
            {'"'}Give, and it will be given to you. A good measure, pressed
            down, shaken together and running over, will be poured into your
            lap.{'"'}
          </p>
          <p className="text-lg text-[#d4af37]">- Luke 6:38</p>
        </div>
      </section>
    </div>
  );
}
