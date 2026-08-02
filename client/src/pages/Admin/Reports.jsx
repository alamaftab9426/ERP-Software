import React from 'react'
import { FiDownload, FiCalendar, FiUsers, FiClock, FiDollarSign, FiTrendingUp } from "react-icons/fi";

const statCards = [
  { label: "AVG. ATTENDANCE", value: "92%", icon: <FiClock size={20} /> },
  { label: "LEAVE UTILIZATION", value: "68%", icon: <FiUsers size={20} /> },
  { label: "PAYROLL COST (MTD)", value: "$ 48,200.00", icon: <FiDollarSign size={20} /> },
];

const deptAttendance = [
  { name: "Engineering", pct: 95, color: "bg-[#1E8FA6]" },
  { name: "Sales & Marketing", pct: 89, color: "bg-[#2C7DA0]" },
  { name: "Operations", pct: 91, color: "bg-[#89C2D9]" },
  { name: "Human Resources", pct: 97, color: "bg-[#B8DCE6]" },
];

const reportLinks = [
  { title: "Attendance Report", desc: "Daily & monthly attendance summary" },
  { title: "Leave Report", desc: "Leave balance and history by employee" },
  { title: "Payroll Report", desc: "Salary breakdown and disbursement" },
  { title: "Expense Report", desc: "Approved and pending expense claims" },
];

const Reports = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Reports</h1>
            <p className="text-sm text-slate-500 mt-1">Insights across attendance, leave and payroll</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((c, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-sm bg-[#2C7DA0]">
              <div className="px-6 pt-5 pb-6">
                <span className="text-xs font-semibold tracking-widest text-white/80">{c.label}</span>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-white">{c.value}</span>
                  <span className="text-white/50">{c.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Headcount Trend</h2>
            <div className="h-64 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 text-sm">
              Headcount chart goes here
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Attendance by Department</h2>
            <div className="space-y-4">
              {deptAttendance.map((d, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-slate-600">{d.name}</span>
                    <span className="text-slate-400">{d.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full ${d.color}`} style={{ width: `${d.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {reportLinks.map((r, i) => (
            <div key={i} className="rounded-xl border border-slate-200 p-5 flex items-center justify-between hover:bg-slate-50/60 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-lg bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0">
                  <FiTrendingUp size={17} />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-800">{r.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{r.desc}</p>
                </div>
              </div>
              <FiDownload size={16} className="text-slate-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reports