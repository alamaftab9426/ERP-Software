import React from 'react'
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiUsers,
} from "react-icons/fi";

const plans = [
  {
    name: "Basic",
    price: "$29",
    cycle: "/month",
    subscribers: 6,
    highlight: false,
    features: [
      "Up to 10 employees",
      "Attendance & leave tracking",
      "Basic reports",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "$79",
    cycle: "/month",
    subscribers: 18,
    highlight: true,
    features: [
      "Up to 100 employees",
      "Payroll management",
      "Advanced reports & exports",
      "Live tracking",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "$199",
    cycle: "/month",
    subscribers: 12,
    highlight: false,
    features: [
      "Unlimited employees",
      "Custom roles & permissions",
      "API access",
      "Dedicated account manager",
      "24/7 phone support",
    ],
  },
];

const SubscriptionPlans = () => {
  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Subscription Plans</h1>
            <p className="text-sm text-slate-500 mt-1">Manage pricing plans available to companies</p>
          </div>

          <button className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <FiPlus size={16} />
            Add Plan
          </button>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-xl overflow-hidden border ${
                plan.highlight
                  ? "border-[#1E8FA6] shadow-sm"
                  : "border-slate-200"
              }`}
            >
              {plan.highlight && (
                <div className="bg-[#1E8FA6] text-white text-xs font-semibold tracking-wide text-center py-1.5">
                  MOST POPULAR
                </div>
              )}

              <div className="p-6">
                <h2 className="font-semibold text-slate-800 text-lg">{plan.name}</h2>

                <div className="flex items-end gap-1 mt-3">
                  <span className="text-3xl font-bold text-slate-800">{plan.price}</span>
                  <span className="text-sm text-slate-400 mb-1">{plan.cycle}</span>
                </div>

                <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
                  <FiUsers size={13} />
                  {plan.subscribers} companies subscribed
                </div>

                <div className="h-px bg-slate-100 my-5" />

                <ul className="space-y-3">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <FiCheck size={16} className="text-[#1E8FA6] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 mt-6">
                  <button className="flex-1 flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                    <FiEdit2 size={14} />
                    Edit
                  </button>
                  <button className="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors">
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPlans