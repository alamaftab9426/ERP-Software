import React from 'react';
import {
  FiClock,
  FiCheckSquare,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";

const EmployeeDashboard = () => {
  const statCards = [
    {
      label: "ATTENDANCE STATUS",
      percent: "ON SHIFT",
      value: "Checked In (09:30 AM)",
      icon: <FiClock size={20} />,
    },
    {
      label: "PENDING TASKS",
      percent: "03 Due Today",
      value: "4 Active",
      icon: <FiCheckSquare size={20} />,
    },
    {
      label: "LEAVE BALANCE",
      percent: "This Year",
      value: "8.5 Days",
      icon: <FiCalendar size={20} />,
    },
    {
      label: "NET SALARY (MONTHLY)",
      percent: "Paid",
      value: "$ 3,200.00",
      icon: <FiDollarSign size={20} />,
    },
  ];

  const leaveSummary = [
    { name: "Casual Leave", count: 4, total: 10, color: "bg-[#1E8FA6]" },
    { name: "Sick Leave", count: 3, total: 6, color: "bg-[#2C7DA0]" },
    { name: "Paid Leave", count: 1.5, total: 12, color: "bg-[#89C2D9]" },
  ];
  const totalLeavesUsed = leaveSummary.reduce((a, l) => a + l.count, 0);

  const activeTasks = [
    { title: "Optimize GPS Sync Loop", project: "Mobile Tracker", priority: "High", status: "In-Progress" },
    { title: "Refactor Payslip PDF Generator", project: "Payroll Module", priority: "Medium", status: "Pending" },
    { title: "UI Testing on Geofencing Boundary", project: "Attendance App", priority: "High", status: "In-Progress" },
    { title: "Resolve Location Deviation Bug", project: "GPS Sync", priority: "Low", status: "Pending" },
  ];

  const priorityStyles = {
    "In-Progress": "bg-emerald-50 text-emerald-600",
    Pending: "bg-amber-50 text-amber-600",
  };

  const upcomingHolidays = [
    { name: "Independence Day", date: "15 Aug 2026" },
    { name: "Ganesh Chaturthi", date: "27 Aug 2026" },
    { name: "Company Anniversary", date: "05 Sep 2026" },
  ];

  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <h1 className="text-3xl font-semibold text-slate-800">My Portal</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of your shift timings, pending tasks, and payroll status</p>
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
                View Details →
              </button>
            </div>
          ))}
        </div>

        {/* WIDGETS ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Attendance History */}
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">My Today's Routing Timeline</h2>
            <div className="h-72 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 text-sm">
              GPS Route tracking map/timeline goes here
            </div>
          </div>

          {/* Active Tasks */}
          <div className="rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800">Assigned Tasks</h2>
              <button className="text-xs font-medium text-[#1E8FA6] hover:underline">
                View all
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {activeTasks.map((task, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{task.title}</p>
                    <p className="text-xs text-slate-400">{task.project} · Priority: {task.priority}</p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${priorityStyles[task.status]}`}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WIDGETS ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leave Limits & Category */}
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">My Leave Balance Distribution</h2>
            <div className="space-y-4">
              {leaveSummary.map((leave, i) => {
                const pct = Math.round((leave.count / leave.total) * 100);
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-slate-600">{leave.name}</span>
                      <span className="text-slate-400">{leave.count} / {leave.total} Days Used</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${leave.color}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Holidays */}
          <div className="rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 font-semibold text-slate-800">
                <FiCalendar size={16} />
                Upcoming Holidays
              </h2>
              <button className="text-xs font-medium text-[#1E8FA6] hover:underline">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {upcomingHolidays.map((holiday, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#1E8FA6] shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 font-medium">{holiday.name}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <FiClock size={11} />
                      {holiday.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;