import React from 'react'
import {
  FiDollarSign,
  FiUsers,
  FiFileText,
  FiClock,
} from "react-icons/fi";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const SuperAdminDashboard = () => {

  const statCards = [
    {
      label: "TOTAL COMPANIES",
      percent: "+12%",
      value: "48",
      icon: <HiOutlineOfficeBuilding size={20} />,
    },
    {
      label: "TOTAL REVENUE",
      percent: "+8%",
      value: "$ 24,560.00",
      icon: <FiDollarSign size={20} />,
    },
    {
      label: "ACTIVE SUBSCRIPTIONS",
      percent: "+5%",
      value: "36",
      icon: <BsGrid3X3GapFill size={18} />,
    },
    {
      label: "COMPANY ADMINS",
      percent: "0%",
      value: "48",
      icon: <FiUsers size={20} />,
    },
  ];

  const recentCompanies = [
    { name: "Acme Retail Pvt Ltd", plan: "Enterprise", status: "Active" },
    { name: "Bluewave Logistics", plan: "Pro", status: "Active" },
    { name: "Nimbus Foods", plan: "Basic", status: "Trial" },
    { name: "Orbit Traders", plan: "Pro", status: "Active" },
    { name: "Zenith Apparel", plan: "Enterprise", status: "Suspended" },
  ];

  const subscriptionPlans = [
    { name: "Enterprise", count: 12, color: "bg-[#1E8FA6]" },
    { name: "Pro", count: 18, color: "bg-[#2C7DA0]" },
    { name: "Basic", count: 6, color: "bg-[#89C2D9]" },
  ];
  const totalPlans = subscriptionPlans.reduce((a, p) => a + p.count, 0);

  const auditLogs = [
    { action: "New company registered", target: "Orbit Traders", time: "2h ago" },
    { action: "Subscription upgraded", target: "Bluewave Logistics", time: "5h ago" },
    { action: "Company admin removed", target: "Zenith Apparel", time: "1d ago" },
    { action: "Withdraw request approved", target: "Acme Retail Pvt Ltd", time: "2d ago" },
  ];

  const statusStyles = {
    Active: "bg-emerald-50 text-emerald-600",
    Trial: "bg-amber-50 text-amber-600",
    Suspended: "bg-rose-50 text-rose-600",
  };

  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <h1 className="text-3xl font-semibold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of all companies, subscriptions and activity</p>
      </div>

      <div className="px-8 pb-8">
        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {statCards.map((c, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden shadow-sm bg-[#2C7DA0]"
            >
              <div className="px-6 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-widest text-white/80">
                    {c.label}
                  </span>
                  <span className="text-xs font-semibold text-white/80">
                    {c.percent}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-white">
                    {c.value}
                  </span>
                  <span className="text-white/50">{c.icon}</span>
                </div>
              </div>
              <button className="w-full bg-[#256A8A] text-left px-6 py-3 text-sm text-white/90 hover:bg-[#1f5a76] transition-colors">
                View more →
              </button>
            </div>
          ))}
        </div>

        {/* WIDGETS ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Companies */}
          <div className="rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800">Recent Companies</h2>
              <button className="text-xs font-medium text-[#1E8FA6] hover:underline">
                View all
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {recentCompanies.map((company, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{company.name}</p>
                    <p className="text-xs text-slate-400">{company.plan} plan</p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[company.status]}`}
                  >
                    {company.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Analytics */}
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Revenue Analytics</h2>
            <div className="h-72 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 text-sm">
              Revenue chart goes here
            </div>
          </div>
        </div>

        {/* WIDGETS ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subscription Plans breakdown */}
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Subscription Plans</h2>
            <div className="space-y-4">
              {subscriptionPlans.map((plan, i) => {
                const pct = Math.round((plan.count / totalPlans) * 100);
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-slate-600">{plan.name}</span>
                      <span className="text-slate-400">{plan.count} companies</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${plan.color}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Audit Logs */}
          <div className="rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 font-semibold text-slate-800">
                <FiFileText size={16} />
                Recent Audit Logs
              </h2>
              <button className="text-xs font-medium text-[#1E8FA6] hover:underline">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {auditLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#1E8FA6] shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-700">
                      {log.action} <span className="font-medium text-slate-900">{log.target}</span>
                    </p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <FiClock size={11} />
                      {log.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminDashboard