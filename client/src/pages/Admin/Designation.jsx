import React from 'react'
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiBriefcase, FiUsers } from "react-icons/fi";

const designations = [
  { title: "Software Engineer", department: "Engineering", level: "Mid", employees: 24, status: "Active" },
  { title: "Senior Software Engineer", department: "Engineering", level: "Senior", employees: 12, status: "Active" },
  { title: "Sales Executive", department: "Sales & Marketing", level: "Junior", employees: 16, status: "Active" },
  { title: "HR Manager", department: "Human Resources", level: "Manager", employees: 3, status: "Active" },
  { title: "Accountant", department: "Finance", level: "Mid", employees: 8, status: "Active" },
  { title: "Support Executive", department: "Customer Support", level: "Junior", employees: 19, status: "Inactive" },
];

const levelStyles = {
  Junior: "bg-slate-100 text-slate-500",
  Mid: "bg-[#2C7DA0]/10 text-[#2C7DA0]",
  Senior: "bg-[#1E8FA6]/10 text-[#1E8FA6]",
  Manager: "bg-amber-50 text-amber-600",
};

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600",
  Inactive: "bg-rose-50 text-rose-600",
};

const Designation = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Designation</h1>
            <p className="text-sm text-slate-500 mt-1">Manage job titles and role levels</p>
          </div>
          <button className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <FiPlus size={16} />
            Add Designation
          </button>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search designation..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6]"
            />
          </div>
          <select className="text-sm rounded-lg border border-slate-200 text-slate-600 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Sales & Marketing</option>
            <option>Human Resources</option>
          </select>
        </div>

        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left font-semibold px-6 py-3.5">Designation</th>
                  <th className="text-left font-semibold px-6 py-3.5">Department</th>
                  <th className="text-left font-semibold px-6 py-3.5">Level</th>
                  <th className="text-left font-semibold px-6 py-3.5">Employees</th>
                  <th className="text-left font-semibold px-6 py-3.5">Status</th>
                  <th className="text-right font-semibold px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {designations.map((d, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-lg bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0">
                          <FiBriefcase size={16} />
                        </span>
                        <span className="font-medium text-slate-800">{d.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{d.department}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${levelStyles[d.level]}`}>
                        {d.level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <FiUsers size={13} className="text-slate-400" />
                        {d.employees}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[d.status]}`}>
                        {d.status}
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

export default Designation