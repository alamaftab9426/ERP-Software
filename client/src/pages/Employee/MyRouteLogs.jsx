import React from "react";
import { FiMapPin, FiActivity, FiCompass, FiClock } from "react-icons/fi";

const MyRouteLog = () => {
  const routeLogs = [
    { time: "05:12 PM", type: "Periodic Auto Sync", battery: "68%", accuracy: "4.8 Meters", coordinates: "22.5726° N, 88.3639° E" },
    { time: "04:12 PM", type: "Periodic Auto Sync", battery: "72%", accuracy: "5.1 Meters", coordinates: "22.5732° N, 88.3644° E" },
    { time: "03:12 PM", type: "Periodic Auto Sync", battery: "78%", accuracy: "4.2 Meters", coordinates: "22.5719° N, 88.3621° E" },
    { time: "02:12 PM", type: "Periodic Auto Sync", battery: "81%", accuracy: "3.9 Meters", coordinates: "22.5711° N, 88.3609° E" },
    { time: "01:12 PM", type: "Periodic Auto Sync", battery: "85%", accuracy: "4.0 Meters", coordinates: "22.5701° N, 88.3591° E" },
  ];

  return (
    <div>
      {/* Sticky Header */}
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <h1 className="text-3xl font-semibold text-slate-800">My Route Log</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review your live tracking sync states, battery consumption health, and location points logged today
        </p>
      </div>

      <div className="px-8 pb-8">
        {/* Tracking summary metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-sm">
            <span className="text-xs font-semibold tracking-wider text-slate-400 block mb-1 uppercase">Today Travel Distance</span>
            <span className="text-2xl font-bold text-slate-800">18.4 Kilometers</span>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-sm">
            <span className="text-xs font-semibold tracking-wider text-slate-400 block mb-1 uppercase">Tracking Interval</span>
            <span className="text-2xl font-bold text-[#1E8FA6]">Every 5 Minutes</span>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-sm">
            <span className="text-xs font-semibold tracking-wider text-slate-400 block mb-1 uppercase">Sync Success Rate</span>
            <span className="text-2xl font-bold text-emerald-600">99.8%</span>
          </div>
        </div>

        {/* Sync Point List */}
        <div className="rounded-xl border border-slate-200 p-5 bg-white shadow-sm">
          <h2 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <FiActivity className="text-[#2C7DA0]" size={18} />
            Background GPS Coordinate Sync Logs
          </h2>

          <div className="relative border-l-2 border-slate-100 ml-4 space-y-6 py-2">
            {routeLogs.map((log, i) => (
              <div key={i} className="relative pl-6">
                {/* Timeline node */}
                <span className="absolute -left-1.5 top-1 h-3.5 w-3.5 rounded-full bg-[#2C7DA0] border-2 border-white flex items-center justify-center shadow-sm" />
                
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                      <FiClock size={13} className="text-slate-400" />
                      {log.time}
                    </p>
                    <p className="text-xs text-slate-400">{log.type} · Sync accuracy: <span className="text-slate-700 font-semibold">{log.accuracy}</span></p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="font-mono text-slate-500 flex items-center gap-1">
                      <FiMapPin size={12} className="text-slate-400" />
                      {log.coordinates}
                    </span>
                    <span className="font-semibold text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded">Battery: {log.battery}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRouteLog;