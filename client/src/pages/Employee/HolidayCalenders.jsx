import React from "react";
import { FiCalendar, FiClock } from "react-icons/fi";

const HolidayCalendars = () => {
  const holidays = [
    { name: "Independence Day", date: "15 Aug 2026", day: "Saturday", type: "Gazetted" },
    { name: "Ganesh Chaturthi", date: "27 Aug 2026", day: "Thursday", type: "Restricted" },
    { name: "Company Anniversary", date: "05 Sep 2026", day: "Saturday", type: "Optional" },
    { name: "Gandhi Jayanti", date: "02 Oct 2026", day: "Friday", type: "Gazetted" },
    { name: "Diwali Festivities", date: "08 Nov 2026", day: "Sunday", type: "Gazetted" },
  ];

  return (
    <div>
      {/* Sticky Header */}
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <h1 className="text-3xl font-semibold text-slate-800">Holiday Calendar</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review upcoming official system holidays, optional leaves, and restricted calendar events
        </p>
      </div>

      <div className="px-8 pb-8">
        <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="px-6 py-4">Holiday Event Name</th>
                <th className="px-6 py-4">Date Details</th>
                <th className="px-6 py-4">Week Day</th>
                <th className="px-6 py-4 text-right">Holiday Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {holidays.map((h, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2C7DA0] shrink-0" />
                      <span className="font-semibold text-slate-800">{h.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar className="text-slate-400" size={13} />
                      {h.date}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{h.day}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      h.type === "Gazetted"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}>
                      {h.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HolidayCalendars;