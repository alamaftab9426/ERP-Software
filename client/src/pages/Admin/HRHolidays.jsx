import React from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiCalendar } from "react-icons/fi";

const holidays = [
  { name: "Independence Day", date: "15 Aug 2026", day: "Saturday", type: "National" },
  { name: "Ganesh Chaturthi", date: "27 Aug 2026", day: "Thursday", type: "Festival" },
  { name: "Company Anniversary", date: "05 Sep 2026", day: "Saturday", type: "Company" },
  { name: "Gandhi Jayanti", date: "02 Oct 2026", day: "Friday", type: "National" },
  { name: "Diwali", date: "08 Nov 2026", day: "Sunday", type: "Festival" },
  { name: "Christmas", date: "25 Dec 2026", day: "Friday", type: "Festival" },
];

const typeStyles = {
  National: "bg-[#1E8FA6]/10 text-[#1E8FA6]",
  Festival: "bg-amber-50 text-amber-600",
  Company: "bg-[#2C7DA0]/10 text-[#2C7DA0]",
};

const Holiday = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Holiday</h1>
            <p className="text-sm text-slate-500 mt-1">Company holiday calendar for the year</p>
          </div>
          <button className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <FiPlus size={16} />
            Add Holiday
          </button>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left font-semibold px-6 py-3.5">Holiday</th>
                  <th className="text-left font-semibold px-6 py-3.5">Date</th>
                  <th className="text-left font-semibold px-6 py-3.5">Day</th>
                  <th className="text-left font-semibold px-6 py-3.5">Type</th>
                  <th className="text-right font-semibold px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {holidays.map((h, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-lg bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0">
                          <FiCalendar size={16} />
                        </span>
                        <span className="font-medium text-slate-800">{h.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{h.date}</td>
                    <td className="px-6 py-4 text-slate-500">{h.day}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeStyles[h.type]}`}>
                        {h.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
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
        </div>
      </div>
    </div>
  )
}

export default Holiday