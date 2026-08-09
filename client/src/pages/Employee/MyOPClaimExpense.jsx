import React, { useState } from "react";
import { FiDollarSign, FiPaperclip, FiSend, FiFileText } from "react-icons/fi";

const ClaimExpense = () => {
  const [expenseCategory, setExpenseCategory] = useState("TRAVEL");

  const recentClaims = [
    { title: "Client Meeting Client Fuel Reimbursement", amount: "$ 45.00", date: "10 Aug 2026", status: "Approved" },
    { title: "Team Lunch at Salt Lake Center", amount: "$ 120.00", date: "08 Aug 2026", status: "Pending" },
    { title: "Hotel stay during Nagpur site survey", amount: "$ 250.00", date: "02 Aug 2026", status: "Rejected" },
  ];

  const statusStyles = {
    Approved: "bg-emerald-50 text-emerald-600",
    Pending: "bg-amber-50 text-amber-600",
    Rejected: "bg-rose-50 text-rose-600",
  };

  return (
    <div>
      {/* Sticky Header */}
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <h1 className="text-3xl font-semibold text-slate-800">Claim Expense</h1>
        <p className="text-sm text-slate-500 mt-1">
          Submit reimbursement claims for travel, meals, or hotel stays with bill proofs
        </p>
      </div>

      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Expense Claim Form */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 p-5 bg-white shadow-sm">
            <h2 className="font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <FiFileText className="text-[#2C7DA0]" size={18} />
              Reimbursement Form
            </h2>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Expense Type */}
                <div>
                  <label className="text-xs font-bold text-slate-500 tracking-wider block mb-2 uppercase">
                    Expense Category
                  </label>
                  <select
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#2C7DA0] text-slate-700 bg-slate-50"
                  >
                    <option value="TRAVEL">Fuel & Travel Allowance</option>
                    <option value="FOOD">Food & Meals</option>
                    <option value="HOTEL">Hotel & Lodging</option>
                    <option value="MISC">Miscellaneous Bills</option>
                  </select>
                </div>

                {/* Amount */}
                <div>
                  <label className="text-xs font-bold text-slate-500 tracking-wider block mb-2 uppercase">
                    Total Amount ($)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter claimed amount..."
                    className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#2C7DA0] text-slate-700 bg-slate-50"
                  />
                </div>
              </div>

              {/* Date of Expense */}
              <div>
                <label className="text-xs font-bold text-slate-500 tracking-wider block mb-2 uppercase">
                  Date of Transaction
                </label>
                <input
                  type="date"
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#2C7DA0] text-slate-700 bg-slate-50"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-slate-500 tracking-wider block mb-2 uppercase">
                  Reason / Purpose Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe the business reason for this expense claim..."
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#2C7DA0] text-slate-700 bg-slate-50"
                />
              </div>

              {/* Bill Attachment Receipt */}
              <div>
                <label className="text-xs font-bold text-slate-500 tracking-wider block mb-2 uppercase">
                  Attach Bill / Receipt Proof (PDF/JPG)
                </label>
                <div className="border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 text-center cursor-pointer hover:border-[#2C7DA0] transition-colors">
                  <FiPaperclip size={24} className="text-slate-400 mx-auto mb-1.5" />
                  <span className="text-xs font-semibold text-slate-500 block">Click or Drag invoice files here</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-[#2C7DA0] hover:bg-[#256A8A] text-white py-3.5 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <FiSend size={16} /> SUBMIT CLAIM REQUEST
              </button>
            </form>
          </div>

          {/* RIGHT: Recent Status Logs */}
          <div className="rounded-xl border border-slate-200 p-5 bg-white shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">
                Recent Submissions
              </h2>
              <div className="divide-y divide-slate-100">
                {recentClaims.map((claim, i) => (
                  <div key={i} className="py-3 flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 max-w-[150px] truncate">{claim.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{claim.date} · <span className="font-semibold text-slate-700">{claim.amount}</span></p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyles[claim.status]}`}>
                      {claim.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-100 text-[11px] text-slate-400 leading-relaxed">
              * Reimbursement limits: Travel claims are approved as per $0.50/mile company policy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimExpense;