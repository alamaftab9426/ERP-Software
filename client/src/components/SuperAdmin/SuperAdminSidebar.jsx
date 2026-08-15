import React, { useState } from 'react'
import {
  FiGrid,
  FiPackage,
  FiRepeat,
  FiUsers,
  FiShoppingBag,
  FiTag,
  FiCreditCard,
  FiSettings,
  FiChevronDown,
  FiFileText,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";


const sidebarMenu = [
 {
  label: "Dashboard",
  icon: FiGrid,
  path: "/super-admin",
},
  {
    label: "Company Management",
    icon: FiRepeat,
    children: [
      {
        label: "Companies",
        path: "/super-admin/companies",
      },
      { 
        label: "Subscription Plans" ,
        path: "/super-admin/subcription-plan"

      },
      { 
        label: "Active Subscriptions",
        path: "/super-admin/active-subscriptions"
       },
    ],
  },
  {
    label: "User Management",
    icon: FiUsers,
    children: [
      {
         label: "Company Admins",
         path: "/super-admin/company-admins"
         }
    ],
  },
  {
    label: "Reports",
    icon: FiFileText,

    children: [
      { 
        label: "Revenue",
        path: "/super-admin/revenue"
       },
        { 
          label: "Companies Report",
           path: "/super-admin/companies-report"
      },],

  },
{
  label: "Settings",
  icon: FiSettings,
  path: "/super-admin/settings",
},
{
  label: "Audit Logs",
  icon: FiTag,
  path: "/super-admin/audit-logs",
},
];

const SuperAdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [openGroups, setOpenGroups] = useState(() =>
    sidebarMenu
      .filter((item) => item.children?.some(() => item.active))
      .map((item) => item.label)
  );

  const toggleGroup = (label) => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
      setOpenGroups((prev) => (prev.includes(label) ? prev : [...prev, label]));
      return;
    }
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <aside
      className={`bg-[#0F1729] text-slate-300 fixed inset-y-0 left-0 flex flex-col transition-all duration-300 overflow-hidden
              ${sidebarOpen ? "w-64" : "w-20"}`}
    >
      {/* Logo */}
      <div className={`h-[76px] flex items-center bg-[#0B1220] shrink-0 ${sidebarOpen ? "justify-between px-6" : "justify-center px-2"}`}>
        {sidebarOpen ? (
          <div>
            <span className="text-2xl font-bold text-[#1E8FA6]">SUP</span>
            <span className="text-2xl font-bold text-white">ERADMIN</span>
          </div>
        ) : (
          <span className="text-xl font-bold text-[#1E8FA6]">SUPER</span>
        )}

        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5
                  ${sidebarOpen ? "" : "hidden"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 19l-7-7 7-7" />
            <path d="M18 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mx-auto mt-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 19l-7-7 7-7" />
            <path d="M18 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {sidebarOpen && (
        <div className="px-6 pt-6 pb-2 shrink-0">
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
            NAVIGATION
          </p>
        </div>
      )}

      <nav className="flex-1 mt-2 overflow-y-auto overflow-x-hidden">
        {sidebarMenu.map((item, i) => {
          const Icon = item.icon;
          const hasChildren = !!item.children;
          const isOpen = openGroups.includes(item.label);

     if (!hasChildren) {
  return (
    <NavLink
      key={i}
      to={item.path}
      className={({ isActive }) =>
        `relative w-full flex items-center text-sm
        ${sidebarOpen ? "gap-3 px-6 py-3" : "justify-center py-3"}
        ${
          isActive
            ? "bg-[#16213A] text-white"
            : "text-slate-400 hover:bg-[#16213A]/60 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-0 h-full w-1 bg-blue-500" />
          )}

          <Icon size={18} />

          {sidebarOpen && item.label}
        </>
      )}
    </NavLink>
  );
}

          // group with dropdown
          return (
            <div key={i}>
              <button
                type="button"
                title={!sidebarOpen ? item.label : undefined}
                onClick={() => toggleGroup(item.label)}
                className={`relative w-full flex items-center text-sm transition-colors
                      ${sidebarOpen ? "gap-3 px-6 py-3" : "justify-center py-3"}
                      text-slate-400 hover:bg-[#16213A]/60 hover:text-white`}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    <FiChevronDown
                      size={16}
                      className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </>
                )}
              </button>

              <div
                className="grid transition-all duration-300 ease-in-out"
                style={{
                  gridTemplateRows:
                    sidebarOpen && isOpen ? "1fr" : "0fr",
                  opacity: sidebarOpen && isOpen ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                 {item.children.map((child, ci) => (
                  <NavLink
                       key={ci}
                      to={child.path}
                      className={({ isActive }) =>
                      `relative w-full flex items-center text-sm py-2.5 pl-[52px] pr-6 transition-colors ${
                       isActive
                       ? "text-white bg-[#16213A]"
                      : "text-slate-500 hover:text-white"
                   }`
                   }>
                <span
                    className="absolute left-6 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-slate-600"/>
                      {child.label}
                   </NavLink>
                      ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  )
}

export default SuperAdminSidebar