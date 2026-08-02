import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminHeader from "../components/Admin/AdminHeader";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarWidth = sidebarOpen ? "16rem" : "5rem";

  return (
    <div className="min-h-screen bg-white flex">

      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}/>
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}>

        <AdminHeader sidebarWidth={sidebarWidth} />

        <main className="mt-[76px] flex-1 bg-white">

        <Outlet />
          
        </main>
      </div>
    </div>
  );
}