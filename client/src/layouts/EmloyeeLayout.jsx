import { useState } from "react";
import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../components/Emloyee/EmloyeeSidebar";
import EmployeeHeader from "../components/Emloyee/EmloyeeHeader";

export default function EmployeeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarWidth = sidebarOpen ? "16rem" : "5rem";

  return (
    <div className="min-h-screen bg-white flex">
      <EmployeeSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <EmployeeHeader sidebarWidth={sidebarWidth} />

        <main className="mt-[76px] flex-1 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}