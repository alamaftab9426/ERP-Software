import React from "react";
import { FiCheckSquare, FiAlertCircle, FiClock, FiMapPin, FiCamera } from "react-icons/fi";

const MyTasks = () => {
  const taskList = [
    {
      title: "Field Asset Verification at Salt Lake Center",
      deadline: "Today, 05:00 PM",
      priority: "High",
      status: "In-Progress",
      requireGPS: true,
      requireSelfie: true,
    },
    {
      title: "Upload Weekly Travel Expense Bills",
      deadline: "Tomorrow, 02:00 PM",
      priority: "Medium",
      status: "Pending",
      requireGPS: false,
      requireSelfie: false,
    },
    {
      title: "Inspect Geofencing Accuracy parameters",
      deadline: "18 Aug, 11:30 AM",
      priority: "High",
      status: "In-Progress",
      requireGPS: true,
      requireSelfie: false,
    },
  ];

  const priorityBadges = {
    High: "bg-rose-50 text-rose-600",
    Medium: "bg-amber-50 text-amber-600",
    Low: "bg-slate-50 text-slate-500",
  };

  return (
    <div>
      {/* Sticky Header */}
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <h1 className="text-3xl font-semibold text-slate-800">My Tasks</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review tasks assigned by your reporting manager and submit completion logs/proofs
        </p>
      </div>

      <div className="px-8 pb-8">
        <div className="space-y-4">
          {taskList.map((task, i) => (
            <div key={i} className="rounded-xl border border-slate-200 p-5 bg-white shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-slate-300 transition-colors">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${priorityBadges[task.priority]}`}>
                    {task.priority} Priority
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <FiClock size={11} />
                    {task.deadline}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-base">{task.title}</h3>
                
                {/* Security Proof Constraints */}
                <div className="flex items-center gap-3 pt-1">
                  {task.requireGPS && (
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <FiMapPin size={10} /> GPS Location Required
                    </span>
                  )}
                  {task.requireSelfie && (
                    <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <FiCamera size={10} /> Selfie Proof Required
                    </span>
                  )}
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  task.status === "In-Progress"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                }`}>
                  {task.status}
                </span>

                <button className="bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors">
                  Submit Proof
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTasks;