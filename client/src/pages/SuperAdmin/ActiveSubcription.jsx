import React from 'react'
import {
  FiSearch,
  FiEye,
  FiXCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const subscriptions = [
  {
    company: "Acme Retail Pvt Ltd",
    plan: "Enterprise",
    amount: "$199/mo",
    startDate: "12 Jan 2026",
    endDate: "12 Aug 2026",
    autoRenew: true,
    status: "Active",
  },
  {
    company: "Bluewave Logistics",
    plan: "Pro",
    amount: "$79/mo",
    startDate: "03 Feb 2026",
    endDate: "03 Aug 2026",
    autoRenew: true,
    status: "Active",
  },
  {
    company: "Nimbus Foods",
    plan: "Basic",
    amount: "$29/mo",
    startDate: "18 Mar 2026",
    endDate: "18 Jul 2026",
    autoRenew: false,
    status: "Expiring Soon",
  },
  {
    company: "Orbit Traders",
    plan: "Pro",
    amount: "$79/mo",
    startDate: "27 Apr 2026",
    endDate: "27 Oct 2026",
    autoRenew: true,
    status: "Active",
  },
  {
    company: "Zenith Apparel",
    plan: "Enterprise",
    amount: "$199/mo",
    startDate: "09 May 2025",
    endDate: "09 May 2026",
    autoRenew: false,
    status: "Expired",
  },
  {
    company: "Skyline Electronics",
    plan: "Basic",
    amount: "$29/mo",
    startDate: "22 Jun 2026",
    endDate: "22 Dec 2026",
    autoRenew: true,
    status: "Active",
  },
];

const planStyles = {
  Enterprise: "bg-[#1E8FA6]/10 text-[#1E8FA6]",
  Pro: "bg-[#2C7DA0]/10 text-[#2C7DA0]",
  Basic: "bg-slate-100 text-slate-500",
};

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600",
  "Expiring Soon": "bg-amber-50 text-amber-600",
  Expired: "bg-rose-50 text-rose-600",
};

const ActiveSubscription = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">Active Subscriptions</h1>
          <p className="text-sm text-slate-500 mt-1">Track every company's live subscription and renewal status</p>
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* TOOLBAR */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search company..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6]"
            />
          </div>

          <div className="flex items-center gap-3">
            <select className="text-sm rounded-lg border border-slate-200 text-slate-600 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30">
              <option>All Plans</option>
              <option>Enterprise</option>
              <option>Pro</option>
              <option>Basic</option>
            </select>
            <select className="text-sm rounded-lg border border-slate-200 text-slate-600 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30">
              <option>All Status</option>
              <option>Active</option>
              <option>Expiring Soon</option>
              <option>Expired</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left font-semibold px-6 py-3.5">Company</th>
                  <th className="text-left font-semibold px-6 py-3.5">Plan</th>
                  <th className="text-left font-semibold px-6 py-3.5">Amount</th>
                  <th className="text-left font-semibold px-6 py-3.5">Start Date</th>
                  <th className="text-left font-semibold px-6 py-3.5">End Date</th>
                  <th className="text-left font-semibold px-6 py-3.5">Auto Renew</th>
                  <th className="text-left font-semibold px-6 py-3.5">Status</th>
                  <th className="text-right font-semibold px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscriptions.map((sub, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-lg bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0">
                          <HiOutlineOfficeBuilding size={18} />
                        </span>
                        <span className="font-medium text-slate-800">{sub.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${planStyles[sub.plan]}`}>
                        {sub.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{sub.amount}</td>
                    <td className="px-6 py-4 text-slate-500">{sub.startDate}</td>
                    <td className="px-6 py-4 text-slate-500">{sub.endDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          sub.autoRenew
                            ? "bg-[#1E8FA6]/10 text-[#1E8FA6]"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {sub.autoRenew ? "On" : "Off"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[sub.status]}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#1E8FA6] hover:bg-[#1E8FA6]/10 transition-colors">
                          <FiEye size={15} />
                        </button>
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#1E8FA6] hover:bg-[#1E8FA6]/10 transition-colors">
                          <FiRefreshCw size={15} />
                        </button>
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors">
                          <FiXCircle size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <p className="text-xs text-slate-400">Showing 1–6 of 36 subscriptions</p>
            <div className="flex items-center gap-1.5">
              <button className="h-8 w-8 rounded-lg border border-slate-200 text-slate-500 text-sm hover:bg-slate-50">‹</button>
              <button className="h-8 w-8 rounded-lg bg-[#2C7DA0] text-white text-sm">1</button>
              <button className="h-8 w-8 rounded-lg border border-slate-200 text-slate-500 text-sm hover:bg-slate-50">2</button>
              <button className="h-8 w-8 rounded-lg border border-slate-200 text-slate-500 text-sm hover:bg-slate-50">3</button>
              <button className="h-8 w-8 rounded-lg border border-slate-200 text-slate-500 text-sm hover:bg-slate-50">›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActiveSubscription