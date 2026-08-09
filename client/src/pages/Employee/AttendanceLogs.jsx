import React from "react";
import { FiCalendar, FiClock, FiMapPin, FiDownload } from "react-icons/fi";

const AttendanceLogs = () => {
  const attendanceRecords = [
    {
      date: "12 Aug 2026",
      day: "Wednesday",
      checkIn: "09:24 AM",
      checkOut: "06:35 PM",
      totalHours: "9 hrs 11 mins",
      status: "Present",
      coordinates: "22.5726° N, 88.3639° E",
    },
    {
      date: "11 Aug 2026",
      day: "Tuesday",
      checkIn: "09:47 AM",
      checkOut: "06:32 PM",
      totalHours: "8 hrs 45 mins",
      status: "Late",
      coordinates: "22.5728° N, 88.3641° E",
    },
    {
      date: "10 Aug 2026",
      day: "Monday",
      checkIn: "09:20 AM",
      checkOut: "06:40 PM",
      totalHours: "9 hrs 20 mins",
      status: "Present",
      coordinates: "22.5724° N, 88.3637° E",
    },
    {
      date: "09 Aug 2026",
      day: "Sunday",
      checkIn: "--",
      checkOut: "--",
      totalHours: "--",
      status: "Weekly Off",
      coordinates: "--",
    },
    {
      date: "08 Aug 2026",
      day: "Saturday",
      checkIn: "--",
      checkOut: "--",
      totalHours: "--",
      status: "On Leave",
      coordinates: "--",
    },
  ];

  const statusBadges = {
    Present: "bg-emerald-50 text-emerald-600",
    Late: "bg-amber-50 text-amber-600",
    "On Leave": "bg-purple-50 text-purple-600",
    "Weekly Off": "bg-slate-50 text-slate-400",
    Absent: "bg-rose-50 text-rose-600",
  };

  return (
    <div>
      {/* Sticky Header */}
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">Attendance Logs</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review your working hours logs, shift timings, and coordinate verification logs
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm self-start">
          <FiDownload size={16} /> Export PDF Report
        </button>
      </div>

      <div className="px-8 py-8">
        {/* Filters and Meta overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-xl border border-slate-200 p-4">
            <span className="text-xs font-semibold tracking-wider text-slate-400 block mb-1">TOTAL DAYS LOGGED</span>
            <span className="text-2xl font-bold text-slate-800">22 / 26 Days</span>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <span className="text-xs font-semibold tracking-wider text-slate-400 block mb-1">AVERAGE IN TIME</span>
            <span className="text-2xl font-bold text-slate-800">09:28 AM</span>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <span className="text-xs font-semibold tracking-wider text-slate-400 block mb-1">TOTAL LATE MARKS</span>
            <span className="text-2xl font-bold text-amber-600">02 Days</span>
          </div>
        </div>

        {/* Attendance Logs Table */}
        <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="px-6 py-4">Date & Day</th>
                <th className="px-6 py-4">Check-In</th>
                <th className="px-6 py-4">Check-Out</th>
                <th className="px-6 py-4">Total Hours</th>
                <th className="px-6 py-4">GPS Coordinates</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendanceRecords.map((log, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">{log.date}</p>
                    <p className="text-xs text-slate-400">{log.day}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <FiClock className="text-slate-400" size={13} />
                      {log.checkIn}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <FiClock className="text-slate-400" size={13} />
                      {log.checkOut}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{log.totalHours}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <FiMapPin className="text-slate-400" size={12} />
                      {log.coordinates}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusBadges[log.status]}`}>
                      {log.status}
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

export default AttendanceLogs;