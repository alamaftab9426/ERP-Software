import React from 'react'
import {
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiEdit2,
  FiEye,
  FiTrash2,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const companies = [
  {
    name: "Acme Retail Pvt Ltd",
    owner: "Rahul Mehta",
    email: "rahul@acmeretail.com",
    plan: "Enterprise",
    status: "Active",
    joined: "12 Jan 2026",
  },
  {
    name: "Bluewave Logistics",
    owner: "Sneha Kapoor",
    email: "sneha@bluewave.com",
    plan: "Pro",
    status: "Active",
    joined: "03 Feb 2026",
  },
  {
    name: "Nimbus Foods",
    owner: "Karan Malhotra",
    email: "karan@nimbusfoods.com",
    plan: "Basic",
    status: "Trial",
    joined: "18 Mar 2026",
  },
  {
    name: "Orbit Traders",
    owner: "Aditi Rao",
    email: "aditi@orbittraders.com",
    plan: "Pro",
    status: "Active",
    joined: "27 Apr 2026",
  },
  {
    name: "Zenith Apparel",
    owner: "Vivek Anand",
    email: "vivek@zenithapparel.com",
    plan: "Enterprise",
    status: "Suspended",
    joined: "09 May 2026",
  },
  {
    name: "Skyline Electronics",
    owner: "Pooja Nair",
    email: "pooja@skylineelec.com",
    plan: "Basic",
    status: "Active",
    joined: "22 Jun 2026",
  },
];

const planStyles = {
  Enterprise: "bg-[#1E8FA6]/10 text-[#1E8FA6]",
  Pro: "bg-[#2C7DA0]/10 text-[#2C7DA0]",
  Basic: "bg-slate-100 text-slate-500",
};

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600",
  Trial: "bg-amber-50 text-amber-600",
  Suspended: "bg-rose-50 text-rose-600",
};

const SuperAdminCompnies = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Companies</h1>
            <p className="text-sm text-slate-500 mt-1">Manage all registered companies on the platform</p>
          </div>

          <button className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <FiPlus size={16} />
            Add Company
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
              placeholder="Search companies..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6]"
            />
          </div>

          <div className="flex items-center gap-3">
            <select className="text-sm rounded-lg border border-slate-200 text-slate-600 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30">
              <option>All Plans</option>
              <option>Enterprise</option>
              <option>Pro</option>
              <option>Basic</option>
            </select>
            <select className="text-sm rounded-lg border border-slate-200 text-slate-600 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30">
              <option>All Status</option>
              <option>Active</option>
              <option>Trial</option>
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
                  <th className="text-left font-semibold px-6 py-3.5">Company</th>
                  <th className="text-left font-semibold px-6 py-3.5">Owner</th>
                  <th className="text-left font-semibold px-6 py-3.5">Plan</th>
                  <th className="text-left font-semibold px-6 py-3.5">Status</th>
                  <th className="text-left font-semibold px-6 py-3.5">Joined</th>
                  <th className="text-right font-semibold px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {companies.map((company, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-lg bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0">
                          <HiOutlineOfficeBuilding size={18} />
                        </span>
                        <span className="font-medium text-slate-800">{company.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-700">{company.owner}</p>
                      <p className="text-xs text-slate-400">{company.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${planStyles[company.plan]}`}>
                        {company.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[company.status]}`}>
                        {company.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{company.joined}</td>
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
            <p className="text-xs text-slate-400">Showing 1–6 of 48 companies</p>
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

export default SuperAdminCompnies