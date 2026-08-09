import React, { useState } from "react";
import { FiCalendar, FiFileText, FiSend, FiInfo } from "react-icons/fi";

const ApplyLeave = () => {
  const [leaveType, setLeaveType] = useState("CL");

  return (
    <div>
      {/* Sticky Header */}
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <h1 className="text-3xl font-semibold text-slate-800">Apply Leave</h1>
        <p className="text-sm text-slate-500 mt-1">
          Submit leave applications for approval from your reporting manager
        </p>
      </div>

      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Application Form */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 p-5 bg-white shadow-sm">
            <h2 className="font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <FiFileText className="text-[#2C7DA0]" size={18} />
              New Leave Request Form
            </h2>

            <form className="space-y-5">
              {/* Leave Type */}
              <div>
                <label className="text-xs font-bold text-slate-500 tracking-wider block mb-2 uppercase">
                  Leave Type
                </label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#2C7DA0] text-slate-700 bg-slate-50"
                >
                  <option value="CL">Casual Leave (CL)</option>
                  <option value="SL">Sick Leave (SL)</option>
                  <option value="PL">Paid Leave / Privilege Leave (PL)</option>
                  <option value="LOP">Loss of Pay (LOP) / LWP</option>
                </select>
              </div>

              {/* Dates Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 tracking-wider block mb-2 uppercase">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#2C7DA0] text-slate-700 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 tracking-wider block mb-2 uppercase">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#2C7DA0] text-slate-700 bg-slate-50"
                  />
                </div>
              </div>

              {/* Leave Reason */}
              <div>
                <label className="text-xs font-bold text-slate-500 tracking-wider block mb-2 uppercase">
                  Reason for Leave
                </label>
                <textarea
                  rows="4"
                  placeholder="Provide brief details about the leave..."
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#2C7DA0] text-slate-700 bg-slate-50"
                />
              </div>

              {/* File Attachment (Optional) */}
              <div>
                <label className="text-xs font-bold text-slate-500 tracking-wider block mb-2 uppercase">
                  Attach Medical Certificate / Document (Only for SL)
                </label>
                <input
                  type="file"
                  disabled={leaveType !== "SL"}
                  className="w-full text-xs text-slate-500 border border-slate-200 rounded-lg p-2.5 cursor-pointer bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Submit Action */}
              <button
                type="button"
                className="w-full bg-[#2C7DA0] hover:bg-[#256A8A] text-white py-3.5 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <FiSend size={16} /> SUBMIT APPLICATION
              </button>
            </form>
          </div>

          {/* RIGHT: Guidelines Panel */}
          <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <FiInfo className="text-[#2C7DA0]" size={18} />
                Leave Guidelines
              </h3>
              <ul className="space-y-3.5 text-xs text-slate-500 leading-relaxed">
                <li>
                  <strong>Sick Leave (SL):</strong> Medical certificate attachment is mandatory if leave duration exceeds 2 days.
                </li>
                <li>
                  <strong>Casual Leave (CL):</strong> Must be applied at least 24 hours in advance to avoid auto-rejection.
                </li>
                <li>
                  <strong>Manager Context:</strong> Auto-approval is triggered if your reporting manager does not respond within 4 days.
                </li>
              </ul>
            </div>

            <div className="mt-6 border-t border-slate-200/60 pt-4 text-[11px] text-slate-400">
              Need instant updates? Check your <span className="text-[#2C7DA0] font-medium underline cursor-pointer">Leave Balance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeave;