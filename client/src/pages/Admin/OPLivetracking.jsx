import React from 'react'
import { FiSearch, FiMapPin, FiClock } from "react-icons/fi";

const trackedEmployees = [
  { name: "Amit Singh", dept: "Operations", location: "MG Road, Bengaluru", status: "Active", lastUpdate: "2 min ago" },
  { name: "Rahul Yadav", dept: "Operations", location: "Andheri West, Mumbai", status: "Active", lastUpdate: "5 min ago" },
  { name: "Sunita Rawat", dept: "Sales & Marketing", location: "Connaught Place, Delhi", status: "Idle", lastUpdate: "18 min ago" },
  { name: "Manoj Kumar", dept: "Operations", location: "Salt Lake, Kolkata", status: "Offline", lastUpdate: "1 hour ago" },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600",
  Idle: "bg-amber-50 text-amber-600",
  Offline: "bg-slate-100 text-slate-500",
};

const statusDot = {
  Active: "bg-emerald-500",
  Idle: "bg-amber-500",
  Offline: "bg-slate-400",
};

const LiveTracking = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">Live Tracking</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time location of field employees</p>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MAP */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Map View</h2>
            <div className="h-[420px] rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 text-sm">
              Live map goes here
            </div>
          </div>

          {/* EMPLOYEE LIST */}
          <div className="rounded-xl border border-slate-200 p-5">
            <div className="relative mb-4">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search employee..."
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6]"
              />
            </div>

            <div className="space-y-3">
              {trackedEmployees.map((emp, i) => (
                <div key={i} className="rounded-lg border border-slate-100 p-3.5 hover:bg-slate-50/60 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="relative h-8 w-8 rounded-full bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center text-xs font-semibold shrink-0">
                        {emp.name.split(" ").map((n) => n[0]).join("")}
                        <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white ${statusDot[emp.status]}`} />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{emp.name}</p>
                        <p className="text-xs text-slate-400">{emp.dept}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyles[emp.status]}`}>
                      {emp.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-2">
                    <FiMapPin size={12} className="text-slate-400" />
                    {emp.location}
                  </p>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    <FiClock size={11} />
                    {emp.lastUpdate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveTracking