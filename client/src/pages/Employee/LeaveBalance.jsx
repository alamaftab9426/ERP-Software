import React from "react";
import { FiTrendingUp, FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";

const LeaveBalance = () => {
  const balances = [
    { type: "Casual Leave (CL)", available: 6.5, allocated: 12, used: 5.5, color: "bg-[#1E8FA6]" },
    { type: "Sick Leave (SL)", available: 4, allocated: 6, used: 2, color: "bg-[#2C7DA0]" },
    { type: "Paid Leave (PL)", available: 12, allocated: 15, used: 3, color: "bg-[#89C2D9]" },
  ];

  const leaveHistory = [
    { type: "Sick Leave (SL)", duration: "2 Days (10 Aug - 11 Aug)", appliedOn: "09 Aug 2026", status: "Approved" },
    { type: "Casual Leave (CL)", duration: "1 Day (18 Aug)", appliedOn: "14 Aug 2026", status: "Pending" },
    { type: "Casual Leave (CL)", duration: "1 Day (05 Aug)", appliedOn: "03 Aug 2026", status: "Rejected" },
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
        <h1 className="text-3xl font-semibold text-slate-800">Leave Balance</h1>
        <p className="text-sm text-slate-500 mt-1">
          Detailed metrics of your remaining leave quota, used allocations and requests history
        </p>
      </div>

      <div className="px-8 pb-8">
        {/* Symmetric Meter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {balances.map((b, i) => {
            const pct = Math.round((b.available / b.allocated) * 100);
            return (
              <div key={i} className="rounded-xl border border-slate-200 p-5 bg-white shadow-sm flex flex-col justify-between h-[200px]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{b.type}</span>
                  <span className="text-xs font-bold text-slate-400">{pct}% Left</span>
                </div>

                <div className="my-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-800">{b.available}</span>
                    <span className="text-sm text-slate-400">/ {b.allocated} Days</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full ${b.color}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Used: {b.used} Days</span>
                    <span>Available: {b.available} Days</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Request History Log Widget */}
        <div className="rounded-xl border border-slate-200 p-5 bg-white shadow-sm">
          <h2 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">
            Recent Requests Status
          </h2>

          <div className="divide-y divide-slate-100">
            {leaveHistory.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3.5">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{item.type}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Applied: {item.appliedOn} · Duration: {item.duration}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[item.status]}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveBalance;