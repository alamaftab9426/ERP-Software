import React, { useState } from "react";
import {
  FiClock,
  FiMapPin,
  FiCamera,
  FiAlertTriangle,
  FiCheckCircle,
  FiCompass,
} from "react-icons/fi";

const AttendancePunch = () => {
  const [punchState, setPunchState] = useState("PUNCHED_OUT"); // PUNCHED_IN or PUNCHED_OUT
  const [selfieStatus, setSelfieStatus] = useState("NOT_CAPTURED"); // NOT_CAPTURED, CAPTURED

  // Static tracking diagnostics
  const gpsDiagnostics = {
    latitude: "22.572645",
    longitude: "88.363892",
    accuracy: "4.2 Meters",
    status: "Inside Geofence Radius (HQ Office)",
    mockAppDetected: "No Mock Apps",
  };

  return (
    <div>
      {/* Sticky Header */}
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <h1 className="text-3xl font-semibold text-slate-800">Punch In / Out</h1>
        <p className="text-sm text-slate-500 mt-1">
          Mark your daily shift attendance with GPS validation and Selfie match
        </p>
      </div>

      <div className="px-8 pb-8">
        {/* Geofence Status Badge */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-emerald-50/40 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div>
              <p className="text-sm font-semibold text-emerald-800">GEOFENCE MATCHED</p>
              <p className="text-xs text-emerald-600 mt-0.5">
                Current accuracy {gpsDiagnostics.accuracy}. You are inside the office premises.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-100/60 px-3 py-1.5 rounded-lg">
            Lat: {gpsDiagnostics.latitude} / Lon: {gpsDiagnostics.longitude}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Selfie Capture Module */}
          <div className="rounded-xl border border-slate-200 p-5 flex flex-col justify-between min-h-[400px]">
            <div>
              <h2 className="font-semibold text-slate-800 mb-1 flex items-center gap-2">
                <FiCamera size={18} className="text-[#2C7DA0]" />
                Selfie Verification
              </h2>
              <p className="text-xs text-slate-400">
                Anti-spoof face recognition requires a live selfie validation
              </p>
            </div>

            <div className="my-6 flex justify-center">
              <div className="w-52 h-52 rounded-full border-4 border-[#2C7DA0] bg-slate-50 flex items-center justify-center overflow-hidden relative">
                {selfieStatus === "CAPTURED" ? (
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                    alt="face matched preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <FiCamera size={42} className="text-slate-300 mx-auto mb-2" />
                    <span className="text-xs text-slate-400 font-semibold block">Camera Idle</span>
                  </div>
                )}
                {selfieStatus === "CAPTURED" && (
                  <span className="absolute bottom-3 bg-[#1E8FA6] text-white text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
                    <FiCheckCircle size={10} /> Face Matched (100%)
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setSelfieStatus(selfieStatus === "CAPTURED" ? "NOT_CAPTURED" : "CAPTURED")}
                className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <FiCamera size={16} />
                {selfieStatus === "CAPTURED" ? "Retake Selfie Image" : "Activate Camera & Capture"}
              </button>
            </div>
          </div>

          {/* RIGHT: Clock In/Out Actions & Diagnostics */}
          <div className="rounded-xl border border-slate-200 p-5 flex flex-col justify-between min-h-[400px]">
            <div>
              <h2 className="font-semibold text-slate-800 mb-1 flex items-center gap-2">
                <FiCompass size={18} className="text-[#2C7DA0]" />
                Shift Telemetry
              </h2>
              <p className="text-xs text-slate-400">
                System telemetry checks before marking Shift states
              </p>
            </div>

            {/* Diagnostics Table */}
            <div className="my-4 divide-y divide-slate-100">
              <div className="flex items-center justify-between py-2 text-sm">
                <span className="text-slate-500">Safe Device Binding</span>
                <span className="font-medium text-slate-800 flex items-center gap-1.5">
                  <FiCheckCircle className="text-emerald-500" size={14} /> Registered Device
                </span>
              </div>
              <div className="flex items-center justify-between py-2 text-sm">
                <span className="text-slate-500">Fake GPS Detection</span>
                <span className="font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs">
                  {gpsDiagnostics.mockAppDetected}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 text-sm">
                <span className="text-slate-500">Geofence Accuracy Status</span>
                <span className="font-medium text-slate-700">{gpsDiagnostics.status}</span>
              </div>
            </div>

            {/* Shift timings info */}
            <div className="bg-slate-50 p-4 rounded-lg text-xs text-slate-600 mb-4 border border-slate-100">
              <div className="flex justify-between py-1">
                <span className="font-medium">Assigned Shift:</span>
                <span className="font-semibold text-slate-800">General Shift (09:30 AM - 06:30 PM)</span>
              </div>
              <div className="flex justify-between py-1 mt-1 border-t border-slate-200/50 pt-1">
                <span className="font-medium">Grace Period Allowed:</span>
                <span className="font-semibold text-amber-600">15 Minutes (Late after 09:45 AM)</span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div>
              {punchState === "PUNCHED_OUT" ? (
                <button
                  onClick={() => setPunchState("PUNCHED_IN")}
                  disabled={selfieStatus === "NOT_CAPTURED"}
                  className={`w-full py-4 rounded-lg font-bold text-sm shadow-sm transition-colors text-white flex items-center justify-center gap-2 ${
                    selfieStatus === "NOT_CAPTURED"
                      ? "bg-slate-300 cursor-not-allowed"
                      : "bg-[#2C7DA0] hover:bg-[#256A8A]"
                  }`}
                >
                  <FiCheckCircle size={18} /> PUNCH IN SHIFT
                </button>
              ) : (
                <button
                  onClick={() => setPunchState("PUNCHED_OUT")}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-lg font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <FiAlertTriangle size={18} /> PUNCH OUT / END SHIFT
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePunch;