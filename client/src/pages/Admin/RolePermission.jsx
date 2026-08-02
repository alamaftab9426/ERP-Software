import React from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiCheck } from "react-icons/fi";

const roles = [
  {
    name: "Admin",
    users: 3,
    description: "Full access to all HRMS and organization modules",
    permissions: ["Employees", "Attendance", "Leave", "Payroll", "Reports", "Settings"],
  },
  {
    name: "HR Manager",
    users: 5,
    description: "Manage employees, attendance and leave requests",
    permissions: ["Employees", "Attendance", "Leave"],
  },
  {
    name: "Manager",
    users: 12,
    description: "View team attendance and approve leave for their department",
    permissions: ["Attendance", "Leave"],
  },
  {
    name: "Employee",
    users: 108,
    description: "Access own profile, attendance and leave requests",
    permissions: ["Attendance (self)", "Leave (self)"],
  },
];

const RolesPermissions = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Roles & Permissions</h1>
            <p className="text-sm text-slate-500 mt-1">Define what each role can access across the system</p>
          </div>
          <button className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <FiPlus size={16} />
            Add Role
          </button>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role, i) => (
            <div key={i} className="rounded-xl border border-slate-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-slate-800 text-lg">{role.name}</h2>
                  <p className="text-sm text-slate-400 mt-1">{role.description}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#1E8FA6] hover:bg-[#1E8FA6]/10 transition-colors">
                    <FiEdit2 size={15} />
                  </button>
                  <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors">
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-400">
                <FiUsers size={13} />
                {role.users} users assigned
              </div>

              <div className="h-px bg-slate-100 my-5" />

              <p className="text-xs font-semibold tracking-widest text-slate-400 mb-3">PERMISSIONS</p>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((p, pi) => (
                  <span
                    key={pi}
                    className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full bg-[#1E8FA6]/10 text-[#1E8FA6]"
                  >
                    <FiCheck size={12} />
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RolesPermissions