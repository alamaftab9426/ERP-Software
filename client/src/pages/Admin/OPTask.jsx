import React from 'react'
import { FiPlus, FiCalendar, FiUser } from "react-icons/fi";

const columns = [
  {
    title: "To Do",
    color: "bg-slate-400",
    tasks: [
      { title: "Prepare Q3 sales report", assignee: "Priya Verma", due: "05 Aug" },
      { title: "Fix attendance sync bug", assignee: "Rohit Sharma", due: "06 Aug" },
    ],
  },
  {
    title: "In Progress",
    color: "bg-amber-400",
    tasks: [
      { title: "Client onboarding — Orbit Traders", assignee: "Aditi Rao", due: "04 Aug" },
      { title: "Design payroll export template", assignee: "Vikram Joshi", due: "07 Aug" },
      { title: "Update employee handbook", assignee: "Neha Gupta", due: "08 Aug" },
    ],
  },
  {
    title: "Review",
    color: "bg-[#2C7DA0]",
    tasks: [
      { title: "Warehouse inventory audit", assignee: "Amit Singh", due: "03 Aug" },
    ],
  },
  {
    title: "Done",
    color: "bg-emerald-500",
    tasks: [
      { title: "Monthly attendance report", assignee: "Neha Gupta", due: "01 Aug" },
      { title: "Vendor payment reconciliation", assignee: "Vikram Joshi", due: "31 Jul" },
    ],
  },
];

const Tasks = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Tasks</h1>
            <p className="text-sm text-slate-500 mt-1">Track team tasks across every stage</p>
          </div>
          <button className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <FiPlus size={16} />
            Add Task
          </button>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {columns.map((col, ci) => (
            <div key={ci} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2 mb-4 px-1">
                <span className={`h-2 w-2 rounded-full ${col.color}`} />
                <h2 className="text-sm font-semibold text-slate-700">{col.title}</h2>
                <span className="text-xs text-slate-400 ml-auto">{col.tasks.length}</span>
              </div>

              <div className="space-y-3">
                {col.tasks.map((task, ti) => (
                  <div key={ti} className="rounded-lg bg-white border border-slate-200 p-3.5 hover:shadow-sm transition-shadow">
                    <p className="text-sm font-medium text-slate-800 mb-3">{task.title}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <FiUser size={12} />
                        {task.assignee}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiCalendar size={12} />
                        {task.due}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks