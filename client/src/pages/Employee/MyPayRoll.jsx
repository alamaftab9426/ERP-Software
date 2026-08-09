import React from "react";
import { FiDownload, FiDollarSign, FiFileText, FiClock } from "react-icons/fi";

const MyPayroll = () => {
  const payslips = [
    { month: "July 2026", issuedOn: "01 Aug 2026", basic: "$ 2,000.00", gross: "$ 3,500.00", net: "$ 3,200.00", status: "Paid" },
    { month: "June 2026", issuedOn: "01 Jul 2026", basic: "$ 2,000.00", gross: "$ 3,450.00", net: "$ 3,160.00", status: "Paid" },
    { month: "May 2026", issuedOn: "01 Jun 2026", basic: "$ 2,000.00", gross: "$ 3,400.00", net: "$ 3,120.00", status: "Paid" },
  ];

  return (
    <div>
      {/* Sticky Header */}
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <h1 className="text-3xl font-semibold text-slate-800">My Payroll</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review your gross structures, PF contributions, monthly salary sheets and download payslips
        </p>
      </div>

      <div className="px-8 pb-8">
        {/* Dynamic Salary Struct Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-xl border border-slate-200 p-5 bg-[#2C7DA0] text-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-white/80 uppercase">Basic Monthly Base</span>
              <FiDollarSign size={16} className="text-white/60" />
            </div>
            <p className="text-3xl font-bold mt-4">$ 2,000.00</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5 bg-[#1E8FA6] text-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-white/80 uppercase">Regular Allowances</span>
              <FiDollarSign size={16} className="text-white/60" />
            </div>
            <p className="text-3xl font-bold mt-4">$ 1,500.00</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5 bg-slate-800 text-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-white/80 uppercase">Standard Deductions (PF/Tax)</span>
              <FiDollarSign size={16} className="text-white/60" />
            </div>
            <p className="text-3xl font-bold mt-4">$ 300.00</p>
          </div>
        </div>

        {/* Payslip History */}
        <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="px-6 py-4">Billing Month</th>
                <th className="px-6 py-4">Release Date</th>
                <th className="px-6 py-4">Gross Earnings</th>
                <th className="px-6 py-4">Net Deposited</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payslips.map((slip, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-800 flex items-center gap-2">
                      <FiFileText className="text-[#2C7DA0]" size={15} />
                      {slip.month}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <FiClock className="text-slate-400" size={13} />
                      {slip.issuedOn}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{slip.gross}</td>
                  <td className="px-6 py-4 text-emerald-600 font-bold">{slip.net}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">
                      {slip.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-bold text-white bg-[#2C7DA0] hover:bg-[#256A8A] px-3.5 py-2 rounded transition-colors flex items-center gap-1 ml-auto shadow-sm">
                      <FiDownload size={12} /> Download PDF
                    </button>
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

export default MyPayroll;