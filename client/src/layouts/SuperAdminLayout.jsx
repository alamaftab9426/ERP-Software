import { useState } from "react";
import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "../components/SuperAdmin/SuperAdminSidebar";
import SuperAdminHeader from "../components/SuperAdmin/SuperAdminHeader";

export default function SuperAdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarWidth = sidebarOpen ? "16rem" : "5rem";

  return (
    <div className="min-h-screen bg-white flex">

      <SuperAdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}/>
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}>

        <SuperAdminHeader sidebarWidth={sidebarWidth} />
        <main className="mt-[76px] flex-1 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}