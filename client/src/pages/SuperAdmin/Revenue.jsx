import React from 'react'
import {
  FiDollarSign,
  FiTrendingUp,
  FiRepeat,
  FiDownload,
  FiCalendar,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const statCards = [
  {
    label: "TOTAL REVENUE",
    percent: "+8%",
    value: "$ 24,560.00",
    icon: <FiDollarSign size={20} />,
  },
  {
    label: "RECURRING (MRR)",
    percent: "+5%",
    value: "$ 6,120.00",
    icon: <FiRepeat size={20} />,
  },
  {
    label: "AVG. REVENUE / COMPANY",
    percent: "+2%",
    value: "$ 511.00",
    icon: <FiTrendingUp size={20} />,
  },
];

const revenueByPlan = [
  { name: "Enterprise", amount: "$ 12,780.00", pct: 52, color: "bg-[#1E8FA6]" },
  { name: "Pro", amount: "$ 7,940.00", pct: 32, color: "bg-[#2C7DA0]" },
  { name: "Basic", amount: "$ 3,840.00", pct: 16, color: "bg-[#89C2D9]" },
];

const transactions = [
  { company: "Acme Retail Pvt Ltd", plan: "Enterprise", amount: "$199.00", date: "01 Aug 2026", status: "Paid" },
  { company: "Bluewave Logistics", plan: "Pro", amount: "$79.00", date: "01 Aug 2026", status: "Paid" },
  { company: "Nimbus Foods", plan: "Basic", amount: "$29.00", date: "31 Jul 2026", status: "Failed" },
  { company: "Orbit Traders", plan: "Pro", amount: "$79.00", date: "30 Jul 2026", status: "Paid" },
  { company: "Skyline Electronics", plan: "Basic", amount: "$29.00", date: "29 Jul 2026", status: "Pending" },
];

const statusStyles = {
  Paid: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Failed: "bg-rose-50 text-rose-600",
};

const Revenue = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Revenue</h1>
            <p className="text-sm text-slate-500 mt-1">Track platform earnings and payment activity</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              <FiCalendar size={15} />
              This Month
            </button>
            <button className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
              <FiDownload size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((c, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-sm bg-[#2C7DA0]">
              <div className="px-6 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-widest text-white/80">{c.label}</span>
                  <span className="text-xs font-semibold text-white/80">{c.percent}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-white">{c.value}</span>
                  <span className="text-white/50">{c.icon}</span>
                </div>
              </div>
              <button className="w-full bg-[#256A8A] text-left px-6 py-3 text-sm text-white/90 hover:bg-[#1f5a76] transition-colors">
                View more →
              </button>
            </div>
          ))}
        </div>

        {/* WIDGETS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Revenue Trend</h2>
            <div className="h-72 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 text-sm">
              Revenue trend chart goes here
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Revenue by Plan</h2>
            <div className="space-y-4">
              {revenueByPlan.map((plan, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-slate-600">{plan.name}</span>
                    <span className="text-slate-400">{plan.amount}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full ${plan.color}`} style={{ width: `${plan.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left font-semibold px-6 py-3.5">Company</th>
                  <th className="text-left font-semibold px-6 py-3.5">Plan</th>
                  <th className="text-left font-semibold px-6 py-3.5">Amount</th>
                  <th className="text-left font-semibold px-6 py-3.5">Date</th>
                  <th className="text-left font-semibold px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((t, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-lg bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0">
                          <HiOutlineOfficeBuilding size={18} />
                        </span>
                        <span className="font-medium text-slate-800">{t.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{t.plan}</td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{t.amount}</td>
                    <td className="px-6 py-4 text-slate-500">{t.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[t.status]}`}>
                        {t.status}
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

export default Revenue