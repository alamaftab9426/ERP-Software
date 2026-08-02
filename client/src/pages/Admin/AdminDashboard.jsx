import React from 'react'
import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiDollarSign,
  FiClock,
  FiCalendar,
} from "react-icons/fi";

const AdminDashboard = () => {

  const statCards = [
    {
      label: "TOTAL EMPLOYEES",
      percent: "+4%",
      value: "128",
      icon: <FiUsers size={20} />,
    },
    {
      label: "PRESENT TODAY",
      percent: "92%",
      value: "118",
      icon: <FiUserCheck size={20} />,
    },
    {
      label: "ON LEAVE",
      percent: "0%",
      value: "6",
      icon: <FiUserX size={20} />,
    },
    {
      label: "PAYROLL (MONTHLY)",
      percent: "+2%",
      value: "$ 48,200.00",
      icon: <FiDollarSign size={20} />,
    },
  ];

  const departments = [
    { name: "Engineering", count: 42, color: "bg-[#1E8FA6]" },
    { name: "Sales", count: 28, color: "bg-[#2C7DA0]" },
    { name: "Operations", count: 34, color: "bg-[#89C2D9]" },
    { name: "HR & Admin", count: 24, color: "bg-[#B8DCE6]" },
  ];
  const totalDept = departments.reduce((a, d) => a + d.count, 0);

  const leaveRequests = [
    { name: "Rohit Sharma", dept: "Engineering", days: "2 days", status: "Pending" },
    { name: "Priya Verma", dept: "Sales", days: "1 day", status: "Approved" },
    { name: "Amit Singh", dept: "Operations", days: "3 days", status: "Pending" },
    { name: "Neha Gupta", dept: "HR & Admin", days: "1 day", status: "Rejected" },
  ];

  const statusStyles = {
    Approved: "bg-emerald-50 text-emerald-600",
    Pending: "bg-amber-50 text-amber-600",
    Rejected: "bg-rose-50 text-rose-600",
  };

  const upcomingHolidays = [
    { name: "Independence Day", date: "15 Aug 2026" },
    { name: "Ganesh Chaturthi", date: "27 Aug 2026" },
    { name: "Company Anniversary", date: "05 Sep 2026" },
  ];

  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <h1 className="text-3xl font-semibold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of employees, attendance and payroll</p>
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
          {/* Attendance Overview */}
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Attendance Overview</h2>
            <div className="h-72 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 text-sm">
              Attendance chart goes here
            </div>
          </div>

          {/* Leave Requests */}
          <div className="rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800">Recent Leave Requests</h2>
              <button className="text-xs font-medium text-[#1E8FA6] hover:underline">
                View all
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {leaveRequests.map((req, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{req.name}</p>
                    <p className="text-xs text-slate-400">{req.dept} · {req.days}</p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[req.status]}`}
                  >
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WIDGETS ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department-wise employees */}
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Employees by Department</h2>
            <div className="space-y-4">
              {departments.map((dept, i) => {
                const pct = Math.round((dept.count / totalDept) * 100);
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-slate-600">{dept.name}</span>
                      <span className="text-slate-400">{dept.count} employees</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${dept.color}`}
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
  )
}

export default AdminDashboard