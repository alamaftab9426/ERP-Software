import React, { useState } from 'react'
import {
  FiSave,
  FiGlobe,
  FiMail,
  FiLock,
  FiBell,
  FiImage,
} from "react-icons/fi";

const tabs = ["General", "Security", "Notifications", "Billing"];

const SuperAdminSettings = () => {
  const [activeTab, setActiveTab] = useState("General");

  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Settings</h1>
            <p className="text-sm text-slate-500 mt-1">Manage platform-wide configuration and preferences</p>
          </div>

          <button className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <FiSave size={16} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* SIDE TABS */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-5 py-3.5 text-sm font-medium transition-colors border-l-2
                    ${activeTab === tab
                      ? "bg-[#1E8FA6]/10 text-[#1E8FA6] border-[#1E8FA6]"
                      : "text-slate-500 border-transparent hover:bg-slate-50"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* CONTENT */}
          <div className="lg:col-span-3">
            {activeTab === "General" && (
              <div className="rounded-xl border border-slate-200 p-6">
                <h2 className="flex items-center gap-2 font-semibold text-slate-800 mb-1">
                  <FiGlobe size={16} />
                  General Settings
                </h2>
                <p className="text-sm text-slate-400 mb-6">Basic platform identity and contact details</p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <FiImage size={22} />
                  </div>
                  <div>
                    <button className="text-sm font-medium px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                      Upload Logo
                    </button>
                    <p className="text-xs text-slate-400 mt-1.5">PNG or SVG, max 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Platform Name</label>
                    <input
                      type="text"
                      defaultValue="NexaMart"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Support Email</label>
                    <input
                      type="email"
                      defaultValue="support@nexamart.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Timezone</label>
                    <select className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30">
                      <option>(GMT+5:30) India Standard Time</option>
                      <option>(GMT+0:00) UTC</option>
                      <option>(GMT-5:00) Eastern Time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Default Currency</label>
                    <select className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30">
                      <option>USD ($)</option>
                      <option>INR (₹)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Security" && (
              <div className="rounded-xl border border-slate-200 p-6">
                <h2 className="flex items-center gap-2 font-semibold text-slate-800 mb-1">
                  <FiLock size={16} />
                  Security
                </h2>
                <p className="text-sm text-slate-400 mb-6">Control access and authentication policies</p>

                <div className="space-y-5">
                  {[
                    { title: "Two-Factor Authentication", desc: "Require 2FA for all super admin accounts", checked: true },
                    { title: "Force Password Reset", desc: "Ask company admins to reset password every 90 days", checked: false },
                    { title: "Login Alerts", desc: "Email alert on login from a new device", checked: true },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-slate-700">{item.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                      <button
                        className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${
                          item.checked ? "bg-[#1E8FA6]" : "bg-slate-200"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                            item.checked ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Notifications" && (
              <div className="rounded-xl border border-slate-200 p-6">
                <h2 className="flex items-center gap-2 font-semibold text-slate-800 mb-1">
                  <FiBell size={16} />
                  Notifications
                </h2>
                <p className="text-sm text-slate-400 mb-6">Choose what platform events you want to be notified about</p>

                <div className="space-y-5">
                  {[
                    { title: "New Company Signup", desc: "Notify when a new company registers", checked: true },
                    { title: "Subscription Expiry", desc: "Notify 3 days before a subscription expires", checked: true },
                    { title: "Payment Failed", desc: "Notify when a company's payment fails", checked: true },
                    { title: "Withdraw Requests", desc: "Notify on new withdraw requests", checked: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-slate-700">{item.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                      <button
                        className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${
                          item.checked ? "bg-[#1E8FA6]" : "bg-slate-200"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                            item.checked ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Billing" && (
              <div className="rounded-xl border border-slate-200 p-6">
                <h2 className="flex items-center gap-2 font-semibold text-slate-800 mb-1">
                  <FiMail size={16} />
                  Billing
                </h2>
                <p className="text-sm text-slate-400 mb-6">Payment gateway and invoicing details</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Payment Gateway</label>
                    <select className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30">
                      <option>Stripe</option>
                      <option>Razorpay</option>
                      <option>PayPal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Invoice Prefix</label>
                    <input
                      type="text"
                      defaultValue="NXM-INV-"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Billing Email</label>
                    <input
                      type="email"
                      defaultValue="billing@nexamart.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Tax Rate (%)</label>
                    <input
                      type="text"
                      defaultValue="18"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminSettings