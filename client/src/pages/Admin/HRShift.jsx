import React from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiClock, FiUsers } from "react-icons/fi";

const shifts = [
  { name: "General Shift", time: "09:00 AM – 06:00 PM", employees: 84, status: "Active" },
  { name: "Morning Shift", time: "06:00 AM – 02:00 PM", employees: 18, status: "Active" },
  { name: "Evening Shift", time: "02:00 PM – 10:00 PM", employees: 16, status: "Active" },
  { name: "Night Shift", time: "10:00 PM – 06:00 AM", employees: 10, status: "Inactive" },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600",
  Inactive: "bg-rose-50 text-rose-600",
};

const Shift = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Shift</h1>
            <p className="text-sm text-slate-500 mt-1">Manage work shift timings and assignments</p>
          </div>
          <button className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <FiPlus size={16} />
            Add Shift
          </button>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shifts.map((s, i) => (
            <div key={i} className="rounded-xl border border-slate-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-11 w-11 rounded-lg bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0">
                    <FiClock size={18} />
                  </span>
                  <div>
                    <h2 className="font-semibold text-slate-800">{s.name}</h2>
                    <p className="text-sm text-slate-500 mt-0.5">{s.time}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[s.status]}`}>
                  {s.status}
                </span>
              </div>

              <div className="h-px bg-slate-100 my-5" />

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <FiUsers size={14} className="text-slate-400" />
                  {s.employees} employees assigned
                </span>
                <div className="flex items-center gap-1">
                  <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#1E8FA6] hover:bg-[#1E8FA6]/10 transition-colors">
                    <FiEdit2 size={15} />
                  </button>
                  <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors">
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Shift