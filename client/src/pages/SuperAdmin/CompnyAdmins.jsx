import React from 'react'
import {
  FiSearch,
  FiPlus,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const companyAdmins = [
  {
    name: "Rahul Mehta",
    email: "rahul@acmeretail.com",
    phone: "+91 98765 43210",
    company: "Acme Retail Pvt Ltd",
    role: "Owner",
    status: "Active",
    lastLogin: "Today, 10:24 AM",
  },
  {
    name: "Sneha Kapoor",
    email: "sneha@bluewave.com",
    phone: "+91 91234 56780",
    company: "Bluewave Logistics",
    role: "Admin",
    status: "Active",
    lastLogin: "Yesterday, 6:12 PM",
  },
  {
    name: "Karan Malhotra",
    email: "karan@nimbusfoods.com",
    phone: "+91 90000 11122",
    company: "Nimbus Foods",
    role: "Owner",
    status: "Invited",
    lastLogin: "—",
  },
  {
    name: "Aditi Rao",
    email: "aditi@orbittraders.com",
    phone: "+91 99887 66554",
    company: "Orbit Traders",
    role: "Admin",
    status: "Active",
    lastLogin: "2 days ago",
  },
  {
    name: "Vivek Anand",
    email: "vivek@zenithapparel.com",
    phone: "+91 98123 45670",
    company: "Zenith Apparel",
    role: "Owner",
    status: "Suspended",
    lastLogin: "3 weeks ago",
  },
  {
    name: "Pooja Nair",
    email: "pooja@skylineelec.com",
    phone: "+91 97654 32109",
    company: "Skyline Electronics",
    role: "Admin",
    status: "Active",
    lastLogin: "Today, 8:45 AM",
  },
];

const roleStyles = {
  Owner: "bg-[#1E8FA6]/10 text-[#1E8FA6]",
  Admin: "bg-[#2C7DA0]/10 text-[#2C7DA0]",
};

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600",
  Invited: "bg-amber-50 text-amber-600",
  Suspended: "bg-rose-50 text-rose-600",
};

const CompanyAdmins = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Company Admins</h1>
            <p className="text-sm text-slate-500 mt-1">Manage admin users across all registered companies</p>
          </div>

          <button className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <FiPlus size={16} />
            Add Admin
          </button>
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* TOOLBAR */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search admin or company..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6]"
            />
          </div>

          <div className="flex items-center gap-3">
            <select className="text-sm rounded-lg border border-slate-200 text-slate-600 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30">
              <option>All Roles</option>
              <option>Owner</option>
              <option>Admin</option>
            </select>
            <select className="text-sm rounded-lg border border-slate-200 text-slate-600 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30">
              <option>All Status</option>
              <option>Active</option>
              <option>Invited</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left font-semibold px-6 py-3.5">Admin</th>
                  <th className="text-left font-semibold px-6 py-3.5">Contact</th>
                  <th className="text-left font-semibold px-6 py-3.5">Company</th>
                  <th className="text-left font-semibold px-6 py-3.5">Role</th>
                  <th className="text-left font-semibold px-6 py-3.5">Status</th>
                  <th className="text-left font-semibold px-6 py-3.5">Last Login</th>
                  <th className="text-right font-semibold px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {companyAdmins.map((admin, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-full bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0 text-xs font-semibold">
                          {admin.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                        <span className="font-medium text-slate-800">{admin.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-600 flex items-center gap-1.5 text-xs mb-1">
                        <FiMail size={12} className="text-slate-400" />
                        {admin.email}
                      </p>
                      <p className="text-slate-400 flex items-center gap-1.5 text-xs">
                        <FiPhone size={12} className="text-slate-400" />
                        {admin.phone}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <HiOutlineOfficeBuilding size={15} className="text-slate-400" />
                        <span className="text-slate-700">{admin.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${roleStyles[admin.role]}`}>
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[admin.status]}`}>
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{admin.lastLogin}</td>
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

          {/* PAGINATION */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <p className="text-xs text-slate-400">Showing 1–6 of 48 admins</p>
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

export default CompanyAdmins