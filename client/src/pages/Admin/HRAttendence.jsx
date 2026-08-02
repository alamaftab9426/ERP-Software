import React from 'react'
import { FiSearch, FiCalendar, FiDownload, FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";

const statCards = [
  { label: "PRESENT TODAY", value: "118", icon: <FiCheckCircle size={20} /> },
  { label: "ABSENT TODAY", value: "4", icon: <FiXCircle size={20} /> },
  { label: "ON LEAVE", value: "6", icon: <FiClock size={20} /> },
];

const attendance = [
  { name: "Rohit Sharma", dept: "Engineering", checkIn: "09:02 AM", checkOut: "06:14 PM", hours: "9h 12m", status: "Present" },
  { name: "Priya Verma", dept: "Sales & Marketing", checkIn: "09:15 AM", checkOut: "06:05 PM", hours: "8h 50m", status: "Present" },
  { name: "Amit Singh", dept: "Operations", checkIn: "—", checkOut: "—", hours: "—", status: "On Leave" },
  { name: "Neha Gupta", dept: "Human Resources", checkIn: "09:40 AM", checkOut: "—", hours: "—", status: "Late" },
  { name: "Vikram Joshi", dept: "Finance", checkIn: "—", checkOut: "—", hours: "—", status: "Absent" },
  { name: "Kavita Desai", dept: "Engineering", checkIn: "08:58 AM", checkOut: "06:20 PM", hours: "9h 22m", status: "Present" },
];

const statusStyles = {
  Present: "bg-emerald-50 text-emerald-600",
  Late: "bg-amber-50 text-amber-600",
  Absent: "bg-rose-50 text-rose-600",
  "On Leave": "bg-slate-100 text-slate-500",
};

const Attendance = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Attendance</h1>
            <p className="text-sm text-slate-500 mt-1">Daily check-in / check-out overview</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              <FiCalendar size={15} />
              Today
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
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-widest text-white/80">{c.label}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-white">{c.value}</span>
                  <span className="text-white/50">{c.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search employee..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6]"
            />
          </div>
          <select className="text-sm rounded-lg border border-slate-200 text-slate-600 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30">
            <option>All Status</option>
            <option>Present</option>
            <option>Late</option>
            <option>Absent</option>
            <option>On Leave</option>
          </select>
        </div>

        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left font-semibold px-6 py-3.5">Employee</th>
                  <th className="text-left font-semibold px-6 py-3.5">Department</th>
                  <th className="text-left font-semibold px-6 py-3.5">Check In</th>
                  <th className="text-left font-semibold px-6 py-3.5">Check Out</th>
                  <th className="text-left font-semibold px-6 py-3.5">Hours</th>
                  <th className="text-left font-semibold px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attendance.map((a, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-full bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0 text-xs font-semibold">
                          {a.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                        <span className="font-medium text-slate-800">{a.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{a.dept}</td>
                    <td className="px-6 py-4 text-slate-600">{a.checkIn}</td>
                    <td className="px-6 py-4 text-slate-600">{a.checkOut}</td>
                    <td className="px-6 py-4 text-slate-600">{a.hours}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[a.status]}`}>
                        {a.status}
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

export default Attendance