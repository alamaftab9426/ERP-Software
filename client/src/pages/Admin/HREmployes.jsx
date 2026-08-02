import React from 'react'
import { FiSearch, FiPlus, FiEye, FiEdit2, FiTrash2, FiMail, FiPhone } from "react-icons/fi";

const employees = [
  { name: "Rohit Sharma", email: "rohit@nexamart.com", phone: "+91 98765 43210", dept: "Engineering", designation: "Software Engineer", status: "Active" },
  { name: "Priya Verma", email: "priya@nexamart.com", phone: "+91 91234 56780", dept: "Sales & Marketing", designation: "Sales Executive", status: "Active" },
  { name: "Amit Singh", email: "amit@nexamart.com", phone: "+91 90000 11122", dept: "Operations", designation: "Support Executive", status: "On Leave" },
  { name: "Neha Gupta", email: "neha@nexamart.com", phone: "+91 99887 66554", dept: "Human Resources", designation: "HR Manager", status: "Active" },
  { name: "Vikram Joshi", email: "vikram@nexamart.com", phone: "+91 98123 45670", dept: "Finance", designation: "Accountant", status: "Active" },
  { name: "Kavita Desai", email: "kavita@nexamart.com", phone: "+91 97654 32109", dept: "Engineering", designation: "Senior Software Engineer", status: "Inactive" },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600",
  "On Leave": "bg-amber-50 text-amber-600",
  Inactive: "bg-rose-50 text-rose-600",
};

const Employees = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Employees</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your organization's workforce</p>
          </div>
          <button className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <FiPlus size={16} />
            Add Employee
          </button>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search employee..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6]"
            />
          </div>
          <div className="flex items-center gap-3">
            <select className="text-sm rounded-lg border border-slate-200 text-slate-600 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Sales & Marketing</option>
              <option>Operations</option>
            </select>
            <select className="text-sm rounded-lg border border-slate-200 text-slate-600 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30">
              <option>All Status</option>
              <option>Active</option>
              <option>On Leave</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left font-semibold px-6 py-3.5">Employee</th>
                  <th className="text-left font-semibold px-6 py-3.5">Contact</th>
                  <th className="text-left font-semibold px-6 py-3.5">Department</th>
                  <th className="text-left font-semibold px-6 py-3.5">Designation</th>
                  <th className="text-left font-semibold px-6 py-3.5">Status</th>
                  <th className="text-right font-semibold px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employees.map((e, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-full bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0 text-xs font-semibold">
                          {e.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                        <span className="font-medium text-slate-800">{e.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-600 flex items-center gap-1.5 text-xs mb-1">
                        <FiMail size={12} className="text-slate-400" />
                        {e.email}
                      </p>
                      <p className="text-slate-400 flex items-center gap-1.5 text-xs">
                        <FiPhone size={12} className="text-slate-400" />
                        {e.phone}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{e.dept}</td>
                    <td className="px-6 py-4 text-slate-600">{e.designation}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[e.status]}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#1E8FA6] hover:bg-[#1E8FA6]/10 transition-colors">
                          <FiEye size={15} />
                        </button>
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

          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <p className="text-xs text-slate-400">Showing 1–6 of 128 employees</p>
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

export default Employees