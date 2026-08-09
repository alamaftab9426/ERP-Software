import React from "react";
import { FiSettings, FiUser, FiLock, FiSmartphone, FiShield } from "react-icons/fi";

const MySettings = () => {
  const deviceBindingInfo = {
    model: "Google Pixel 7 Pro",
    os: "Android 13.0 (API 33)",
    deviceId: "F8B1-D4C2-A9E3-47B2",
    registeredOn: "15 Aug 2026",
    status: "Active & Secure",
  };

  return (
    <div>
      {/* Sticky Header */}
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <h1 className="text-3xl font-semibold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your security settings, update password, and view registered device tracking properties
        </p>
      </div>

      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Security Configuration Options */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Form 1: Password Configuration */}
            <div className="rounded-xl border border-slate-200 p-5 bg-white shadow-sm">
              <h2 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <FiLock className="text-[#2C7DA0]" size={18} />
                Update Login Password
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-2 uppercase">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full border border-slate-200 rounded-lg p-3 text-sm bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#2C7DA0]" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-2 uppercase">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full border border-slate-200 rounded-lg p-3 text-sm bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#2C7DA0]" />
                  </div>
                </div>
                <button type="button" className="bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-xs font-bold px-5 py-3 rounded-lg transition-colors shadow-sm ml-auto block">
                  Change Password Now
                </button>
              </form>
            </div>

            {/* Form 2: Personal Sync Settings */}
            <div className="rounded-xl border border-slate-200 p-5 bg-white shadow-sm">
              <h2 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <FiUser className="text-[#2C7DA0]" size={18} />
                My Profile Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Full Name</span>
                  <span className="font-semibold text-slate-800 mt-1 block">Ravi Kumar Verma</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Registered Email</span>
                  <span className="font-semibold text-slate-800 mt-1 block">ravi.verma@techsolutions.com</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Safe Device Verification Status Box */}
          <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <FiSmartphone className="text-[#2C7DA0]" size={18} />
                Registered Device Binding
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                To prevent attendance fraud, your tracking status is strictly bound to this unique hardware identifier.
              </p>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-200/50">
                  <span className="text-slate-500">Device Model</span>
                  <span className="font-semibold text-slate-800">{deviceBindingInfo.model}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200/50">
                  <span className="text-slate-500">Android OS Range</span>
                  <span className="font-semibold text-slate-800">{deviceBindingInfo.os}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200/50">
                  <span className="text-slate-500">Hardware UUID</span>
                  <span className="font-semibold font-mono text-slate-800">{deviceBindingInfo.deviceId}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3.5 text-emerald-800 text-xs flex items-center gap-2">
              <FiShield size={16} className="text-emerald-500" />
              <span className="font-bold">Security Status: Active and Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySettings;