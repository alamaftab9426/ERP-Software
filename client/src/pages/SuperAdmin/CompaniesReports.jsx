import React from 'react'
import {
  FiDownload,
  FiCalendar,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const statCards = [
  { label: "TOTAL COMPANIES", percent: "+12%", value: "48" },
  { label: "NEW THIS MONTH", percent: "+3", value: "5" },
  { label: "CHURNED THIS MONTH", percent: "-1", value: "1" },
];

const statusBreakdown = [
  { name: "Active", count: 36, color: "bg-emerald-500" },
  { name: "Trial", count: 8, color: "bg-amber-400" },
  { name: "Suspended", count: 4, color: "bg-rose-400" },
];
const totalStatus = statusBreakdown.reduce((a, s) => a + s.count, 0);

const companiesReport = [
  { company: "Acme Retail Pvt Ltd", plan: "Enterprise", employees: 64, revenue: "$2,388.00", signup: "12 Jan 2026", status: "Active" },
  { company: "Bluewave Logistics", plan: "Pro", employees: 38, revenue: "$948.00", signup: "03 Feb 2026", status: "Active" },
  { company: "Nimbus Foods", plan: "Basic", employees: 9, revenue: "$174.00", signup: "18 Mar 2026", status: "Trial" },
  { company: "Orbit Traders", plan: "Pro", employees: 27, revenue: "$632.00", signup: "27 Apr 2026", status: "Active" },
  { company: "Zenith Apparel", plan: "Enterprise", employees: 55, revenue: "$1,990.00", signup: "09 May 2025", status: "Suspended" },
  { company: "Skyline Electronics", plan: "Basic", employees: 12, revenue: "$203.00", signup: "22 Jun 2026", status: "Active" },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600",
  Trial: "bg-amber-50 text-amber-600",
  Suspended: "bg-rose-50 text-rose-600",
};

const planStyles = {
  Enterprise: "bg-[#1E8FA6]/10 text-[#1E8FA6]",
  Pro: "bg-[#2C7DA0]/10 text-[#2C7DA0]",
  Basic: "bg-slate-100 text-slate-500",
};

const CompaniesReports = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Companies Report</h1>
            <p className="text-sm text-slate-500 mt-1">Growth, status and usage breakdown across all companies</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              <FiCalendar size={15} />
              This Month
            </button>
            <button className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
              <FiDownload size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((c, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-sm bg-[#2C7DA0]">
              <div className="px-6 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-widest text-white/80">{c.label}</span>
                  <span className="text-xs font-semibold text-white/80">{c.percent}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-white">{c.value}</span>
                  <span className="text-white/50"><HiOutlineOfficeBuilding size={20} /></span>
                </div>
              </div>
              <button className="w-full bg-[#256A8A] text-left px-6 py-3 text-sm text-white/90 hover:bg-[#1f5a76] transition-colors">
                View more →
              </button>
            </div>
          ))}
        </div>

        {/* WIDGETS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Companies Growth</h2>
            <div className="h-72 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 text-sm">
              Growth trend chart goes here
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Status Breakdown</h2>
            <div className="space-y-4">
              {statusBreakdown.map((s, i) => {
                const pct = Math.round((s.count / totalStatus) * 100);
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-slate-600">{s.name}</span>
                      <span className="text-slate-400">{s.count} companies · {pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full rounded-full ${s.color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* REPORT TABLE */}
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Detailed Report</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left font-semibold px-6 py-3.5">Company</th>
                  <th className="text-left font-semibold px-6 py-3.5">Plan</th>
                  <th className="text-left font-semibold px-6 py-3.5">Employees</th>
                  <th className="text-left font-semibold px-6 py-3.5">Revenue Generated</th>
                  <th className="text-left font-semibold px-6 py-3.5">Signup Date</th>
                  <th className="text-left font-semibold px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {companiesReport.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-lg bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0">
                          <HiOutlineOfficeBuilding size={18} />
                        </span>
                        <span className="font-medium text-slate-800">{c.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${planStyles[c.plan]}`}>
                        {c.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{c.employees}</td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{c.revenue}</td>
                    <td className="px-6 py-4 text-slate-500">{c.signup}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompaniesReports