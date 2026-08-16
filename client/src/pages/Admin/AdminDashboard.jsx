import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import AdminLiveEmployeeMap from "../../components/AdminLiveEmployeeMap";
import { getCompanyLatestLocationsApi } from "../../services/locationService";
import { useAuth } from "../../context/AuthContext";

import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiDollarSign,
} from "react-icons/fi";

const AdminDashboard = () => {
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

  const { user } = useAuth();

  const [employees, setEmployees] = useState([]);

  // =====================================================
  // 1. INITIAL EMPLOYEE LOCATIONS
  // =====================================================

  useEffect(() => {
    if (!user?.companyId) {
      console.log("⏳ Company ID not available yet");
      return;
    }

    const loadEmployeeLocations = async () => {
      try {
        console.log(
          "📡 Loading initial employee locations..."
        );

        const response =
          await getCompanyLatestLocationsApi();

        console.log(
          "📍 INITIAL EMPLOYEE LOCATIONS:",
          response.data
        );

        setEmployees(
          response.data?.data || []
        );
      } catch (error) {
        console.error(
          "❌ EMPLOYEE LOCATION ERROR:",
          error.response?.data ||
            error.message
        );
      }
    };

    loadEmployeeLocations();
  }, [user?.companyId]);

  // =====================================================
  // 2. ADMIN SOCKET
  // =====================================================

  useEffect(() => {
    if (!user?.companyId) {
      console.log(
        "⏳ Socket waiting for company ID..."
      );

      return;
    }

    if (!SOCKET_URL) {
      console.error(
        "❌ VITE_SOCKET_URL is missing"
      );

      return;
    }

    console.log(
      "🔌 CONNECTING ADMIN SOCKET:",
      SOCKET_URL
    );

    const socket = io(SOCKET_URL, {
      withCredentials: true,
    });

    // ===================================================
    // SOCKET CONNECT
    // ===================================================

    socket.on("connect", () => {
      console.log(
        "✅ ADMIN SOCKET CONNECTED:",
        socket.id
      );

      console.log(
        "🏢 JOINING COMPANY ROOM:",
        user.companyId
      );

      socket.emit(
        "join-company",
        user.companyId
      );
    });

    // ===================================================
    // COMPANY ROOM JOIN CONFIRMATION
    // ===================================================

    socket.on(
      "joined-company",
      (data) => {
        console.log(
          "✅ JOINED COMPANY ROOM:",
          data
        );
      }
    );

    // ===================================================
    // REAL-TIME EMPLOYEE LOCATION
    // ===================================================

    socket.on(
      "employee:location:update",
      (location) => {
        console.log(
          "🔥 REAL TIME LOCATION RECEIVED:",
          location
        );

        setEmployees(
          (previousEmployees) => {

            console.log(
              "👥 EMPLOYEES BEFORE UPDATE:",
              previousEmployees
            );

            return previousEmployees.map(
              (employee) => {

                const employeeId =
                  String(
                    employee.employeeId
                  );

                const incomingEmployeeId =
                  String(
                    location.employeeId
                  );

                // =====================================
                // SAME EMPLOYEE
                // =====================================

                if (
                  employeeId ===
                  incomingEmployeeId
                ) {

                  console.log(
                    "🎯 MATCHED EMPLOYEE:",
                    employee.name,
                    employee.employeeCode
                  );

                  console.log(
                    "📍 OLD LOCATION:",
                    employee.location
                  );

                  console.log(
                    "📍 NEW LOCATION:",
                    location.latitude,
                    location.longitude
                  );

                  return {
                    ...employee,

                    location: {
                      latitude:
                        Number(
                          location.latitude
                        ),

                      longitude:
                        Number(
                          location.longitude
                        ),

                      accuracy:
                        location.accuracy,

                      speed:
                        location.speed,

                      heading:
                        location.heading,

                      timestamp:
                        location.timestamp,
                    },
                  };
                }

                // =====================================
                // OTHER EMPLOYEES UNCHANGED
                // =====================================

                return employee;
              }
            );
          }
        );
      }
    );

    // ===================================================
    // SOCKET ERROR
    // ===================================================

    socket.on(
      "connect_error",
      (error) => {
        console.error(
          "❌ ADMIN SOCKET ERROR:",
          error
        );
      }
    );

    // ===================================================
    // SOCKET DISCONNECT
    // ===================================================

    socket.on(
      "disconnect",
      (reason) => {
        console.log(
          "🔌 ADMIN SOCKET DISCONNECTED:",
          reason
        );
      }
    );

    // ===================================================
    // CLEANUP
    // ===================================================

    return () => {
      console.log(
        "🧹 CLEANING ADMIN SOCKET"
      );

      socket.off("connect");
      socket.off("joined-company");
      socket.off(
        "employee:location:update"
      );
      socket.off("connect_error");
      socket.off("disconnect");

      socket.disconnect();
    };

  }, [user?.companyId, SOCKET_URL]);

  // =====================================================
  // REST OF YOUR DASHBOARD
  // =====================================================

  const statCards = [
    {
      label: "TOTAL EMPLOYEES",
      percent: "+4%",
      value: "128",
      icon: <FiUsers size={20} />,
    },
    {
      label: "PRESENT TODAY",
      percent: "92%",
      value: "118",
      icon: <FiUserCheck size={20} />,
    },
    {
      label: "ON LEAVE",
      percent: "0%",
      value: "6",
      icon: <FiUserX size={20} />,
    },
    {
      label: "PAYROLL (MONTHLY)",
      percent: "+2%",
      value: "$ 48,200.00",
      icon: <FiDollarSign size={20} />,
    },
  ];

  const departments = [
    { name: "Engineering", count: 42, color: "bg-[#1E8FA6]" },
    { name: "Sales", count: 28, color: "bg-[#2C7DA0]" },
    { name: "Operations", count: 34, color: "bg-[#89C2D9]" },
    { name: "HR & Admin", count: 24, color: "bg-[#B8DCE6]" },
  ];
  const totalDept = departments.reduce((a, d) => a + d.count, 0);

  const leaveRequests = [
    { name: "Rohit Sharma", dept: "Engineering", days: "2 days", status: "Pending" },
    { name: "Priya Verma", dept: "Sales", days: "1 day", status: "Approved" },
    { name: "Amit Singh", dept: "Operations", days: "3 days", status: "Pending" },
    { name: "Neha Gupta", dept: "HR & Admin", days: "1 day", status: "Rejected" },
  ];

  const statusStyles = {
    Approved: "bg-emerald-50 text-emerald-600",
    Pending: "bg-amber-50 text-amber-600",
    Rejected: "bg-rose-50 text-rose-600",
  };

  const upcomingHolidays = [
    { name: "Independence Day", date: "15 Aug 2026" },
    { name: "Ganesh Chaturthi", date: "27 Aug 2026" },
    { name: "Company Anniversary", date: "05 Sep 2026" },
  ];

  return (
    <div>
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4">
        <h1 className="text-3xl font-semibold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of employees, attendance and payroll</p>
      </div>

      <div className="px-8 pb-8">
        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {statCards.map((c, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden shadow-sm bg-[#2C7DA0]"
            >
              <div className="px-6 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-widest text-white/80">
                    {c.label}
                  </span>
                  <span className="text-xs font-semibold text-white/80">
                    {c.percent}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-white">
                    {c.value}
                  </span>
                  <span className="text-white/50">{c.icon}</span>
                </div>
              </div>
              <button className="w-full bg-[#256A8A] text-left px-6 py-3 text-sm text-white/90 hover:bg-[#1f5a76] transition-colors">
                View more →
              </button>
            </div>
          ))}
        </div>

        {/* WIDGETS ROW 1 */}
        <div className=" w-full mb-6">
       {/* LIVE EMPLOYEE TRACKING */}
      <div className="rounded-xl border border-slate-200 p-5">
         <AdminLiveEmployeeMap  employees={employees}/>
        </div>

        </div>

        {/* WIDGETS ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department-wise employees */}
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Employees by Department</h2>
            <div className="space-y-4">
              {departments.map((dept, i) => {
                const pct = Math.round((dept.count / totalDept) * 100);
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-slate-600">{dept.name}</span>
                      <span className="text-slate-400">{dept.count} employees</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${dept.color}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

       
          {/* Leave Requests */}
          <div className="rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800">Recent Leave Requests</h2>
              <button className="text-xs font-medium text-[#1E8FA6] hover:underline">
                View all
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {leaveRequests.map((req, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{req.name}</p>
                    <p className="text-xs text-slate-400">{req.dept} · {req.days}</p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[req.status]}`}
                  >
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard