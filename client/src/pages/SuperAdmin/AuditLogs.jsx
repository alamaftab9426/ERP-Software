import React from 'react'
import {
  FiSearch,
  FiCalendar,
  FiDownload,
  FiUserPlus,
  FiRefreshCw,
  FiUserX,
  FiCreditCard,
  FiTrash2,
  FiLogIn,
} from "react-icons/fi";

const auditLogs = [
  {
    icon: <FiUserPlus size={15} />,
    action: "New company registered",
    target: "Orbit Traders",
    actor: "System",
    time: "Today, 11:42 AM",
    type: "Company",
  },
  {
    icon: <FiRefreshCw size={15} />,
    action: "Subscription upgraded to Pro",
    target: "Bluewave Logistics",
    actor: "Sneha Kapoor",
    time: "Today, 9:15 AM",
    type: "Subscription",
  },
  {
    icon: <FiUserX size={15} />,
    action: "Company admin removed",
    target: "Zenith Apparel",
    actor: "Super Admin",
    time: "Yesterday, 6:30 PM",
    type: "User",
  },
  {
    icon: <FiCreditCard size={15} />,
    action: "Withdraw request approved",
    target: "Acme Retail Pvt Ltd",
    actor: "Super Admin",
    time: "Yesterday, 3:12 PM",
    type: "Payment",
  },
  {
    icon: <FiLogIn size={15} />,
    action: "Login from new device",
    target: "Rahul Mehta",
    actor: "Rahul Mehta",
    time: "2 days ago",
    type: "Security",
  },
  {
    icon: <FiTrash2 size={15} />,
    action: "Subscription plan deleted",
    target: "Legacy Basic Plan",
    actor: "Super Admin",
    time: "3 days ago",
    type: "Subscription",
  },
  {
    icon: <FiUserPlus size={15} />,
    action: "New company registered",
    target: "Skyline Electronics",
    actor: "System",
    time: "4 days ago",
    type: "Company",
  },
];

const typeStyles = {
  Company: "bg-[#1E8FA6]/10 text-[#1E8FA6]",
  Subscription: "bg-[#2C7DA0]/10 text-[#2C7DA0]",
  User: "bg-amber-50 text-amber-600",
  Payment: "bg-emerald-50 text-emerald-600",
  Security: "bg-rose-50 text-rose-600",
};

const AuditLogs = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Audit Logs</h1>
            <p className="text-sm text-slate-500 mt-1">A complete trail of activity across the platform</p>
          </div>

          <button className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
            <FiDownload size={16} />
            Export
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
              placeholder="Search logs..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6]"
            />
          </div>

          <div className="flex items-center gap-3">
            <select className="text-sm rounded-lg border border-slate-200 text-slate-600 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30">
              <option>All Types</option>
              <option>Company</option>
              <option>Subscription</option>
              <option>User</option>
              <option>Payment</option>
              <option>Security</option>
            </select>
            <button className="flex items-center gap-2 text-sm font-medium px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              <FiCalendar size={15} />
              Last 7 days
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left font-semibold px-6 py-3.5">Activity</th>
                  <th className="text-left font-semibold px-6 py-3.5">Type</th>
                  <th className="text-left font-semibold px-6 py-3.5">Performed By</th>
                  <th className="text-left font-semibold px-6 py-3.5">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-lg bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0">
                          {log.icon}
                        </span>
                        <div>
                          <p className="text-slate-800 font-medium">{log.action}</p>
                          <p className="text-xs text-slate-400">{log.target}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeStyles[log.type]}`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{log.actor}</td>
                    <td className="px-6 py-4 text-slate-500">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <p className="text-xs text-slate-400">Showing 1–7 of 214 logs</p>
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

export default AuditLogs