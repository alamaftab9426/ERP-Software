import React from 'react'
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiMapPin, FiUsers } from "react-icons/fi";

const branches = [
  { name: "Head Office", city: "Lucknow", state: "Uttar Pradesh", employees: 42, manager: "Rahul Mehta", status: "Active" },
  { name: "West Zone Branch", city: "Mumbai", state: "Maharashtra", employees: 28, manager: "Sneha Kapoor", status: "Active" },
  { name: "South Zone Branch", city: "Bengaluru", state: "Karnataka", employees: 19, manager: "Karan Malhotra", status: "Active" },
  { name: "East Zone Branch", city: "Kolkata", state: "West Bengal", employees: 14, manager: "Aditi Rao", status: "Inactive" },
  { name: "North Zone Branch", city: "Delhi", state: "Delhi", employees: 25, manager: "Vivek Anand", status: "Active" },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600",
  Inactive: "bg-rose-50 text-rose-600",
};

const Branch = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Branch</h1>
            <p className="text-sm text-slate-500 mt-1">Manage all company branch locations</p>
          </div>
          <button className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <FiPlus size={16} />
            Add Branch
          </button>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search branch..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6]"
            />
          </div>
          <select className="text-sm rounded-lg border border-slate-200 text-slate-600 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left font-semibold px-6 py-3.5">Branch</th>
                  <th className="text-left font-semibold px-6 py-3.5">Location</th>
                  <th className="text-left font-semibold px-6 py-3.5">Manager</th>
                  <th className="text-left font-semibold px-6 py-3.5">Employees</th>
                  <th className="text-left font-semibold px-6 py-3.5">Status</th>
                  <th className="text-right font-semibold px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {branches.map((b, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-lg bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0">
                          <FiMapPin size={16} />
                        </span>
                        <span className="font-medium text-slate-800">{b.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{b.city}, {b.state}</td>
                    <td className="px-6 py-4 text-slate-600">{b.manager}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <FiUsers size={13} className="text-slate-400" />
                        {b.employees}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[b.status]}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#1E8FA6] hover:bg-[#1E8FA6]/10 transition-colors">
                          <FiEdit2 size={15} />
                        </button>
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors">
                          <FiTrash2 size={15} />
                        </button>
                      </div>
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

export default Branch