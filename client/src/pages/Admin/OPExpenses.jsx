import React from 'react'
import { FiSearch, FiPlus, FiEye, FiCheck, FiX, FiDollarSign } from "react-icons/fi";

const statCards = [
  { label: "TOTAL EXPENSES (THIS MONTH)", value: "$ 4,280.00" },
  { label: "PENDING APPROVAL", value: "6" },
  { label: "APPROVED (THIS MONTH)", value: "22" },
];

const expenses = [
  { employee: "Amit Singh", category: "Travel", amount: "$120.00", date: "01 Aug 2026", status: "Pending" },
  { employee: "Priya Verma", category: "Client Meeting", amount: "$80.00", date: "31 Jul 2026", status: "Approved" },
  { employee: "Rohit Sharma", category: "Software Subscription", amount: "$45.00", date: "30 Jul 2026", status: "Approved" },
  { employee: "Aditi Rao", category: "Travel", amount: "$210.00", date: "29 Jul 2026", status: "Rejected" },
  { employee: "Vikram Joshi", category: "Office Supplies", amount: "$36.00", date: "28 Jul 2026", status: "Pending" },
];

const statusStyles = {
  Approved: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Rejected: "bg-rose-50 text-rose-600",
};

const Expenses = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Expenses</h1>
            <p className="text-sm text-slate-500 mt-1">Review and approve employee expense claims</p>
          </div>
          <button className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <FiPlus size={16} />
            Add Expense
          </button>
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
                  <span className="text-white/50"><FiDollarSign size={20} /></span>
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
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left font-semibold px-6 py-3.5">Employee</th>
                  <th className="text-left font-semibold px-6 py-3.5">Category</th>
                  <th className="text-left font-semibold px-6 py-3.5">Amount</th>
                  <th className="text-left font-semibold px-6 py-3.5">Date</th>
                  <th className="text-left font-semibold px-6 py-3.5">Status</th>
                  <th className="text-right font-semibold px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expenses.map((e, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-full bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0 text-xs font-semibold">
                          {e.employee.split(" ").map((n) => n[0]).join("")}
                        </span>
                        <span className="font-medium text-slate-800">{e.employee}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{e.category}</td>
                    <td className="px-6 py-4 text-slate-800 font-medium">{e.amount}</td>
                    <td className="px-6 py-4 text-slate-500">{e.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[e.status]}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {e.status === "Pending" ? (
                          <>
                            <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                              <FiCheck size={15} />
                            </button>
                            <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors">
                              <FiX size={15} />
                            </button>
                          </>
                        ) : (
                          <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#1E8FA6] hover:bg-[#1E8FA6]/10 transition-colors">
                            <FiEye size={15} />
                          </button>
                        )}
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

export default Expenses