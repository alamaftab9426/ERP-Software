import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";

// Admin Pages
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Branch from "../pages/Admin/Branch";
import Department from "../pages/Admin/Department";
import Designation from "../pages/Admin/Designation";
import RolePermission from "../pages/Admin/RolePermission";

import HREmployes from "../pages/Admin/HREmployes";
import HRAttendence from "../pages/Admin/HRAttendence";
import HRLeaves from "../pages/Admin/HRLeaves";
import HRShift from "../pages/Admin/HRShift";
import HRHolidays from "../pages/Admin/HRHolidays";
import HRPayrolls from "../pages/Admin/HRPayrolls";

import OPTask from "../pages/Admin/OPTask";
import OPExpenses from "../pages/Admin/OPExpenses";
import OPLivetracking from "../pages/Admin/OPLivetracking";

import Reports from "../pages/Admin/Reports";
import AdminSettings from "../pages/Admin/AdminSettings";



// Super Admin Pages
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import SuperAdminDashboard from "../pages/SuperAdmin/SuperAdminDashboard";
import SuperAdminCompnies from "../pages/SuperAdmin/SuperAdminCompnies";
import SubcriptionPlan from "../pages/SuperAdmin/SubcriptionPlan";
import ActiveSubscription from "../pages/SuperAdmin/ActiveSubcription";
import CompanyAdmins from "../pages/SuperAdmin/CompnyAdmins";
import Revenue from "../pages/SuperAdmin/Revenue";
import CompaniesReports from "../pages/SuperAdmin/CompaniesReports";
import AuditLogs from "../pages/SuperAdmin/AuditLogs";
import SuperAdminSettings from "../pages/SuperAdmin/SuperAdminSettings";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

        {/* Organization */}
        <Route path="organization">
          <Route path="branch" element={<Branch />} />
          <Route path="department" element={<Department />} />
          <Route path="designation" element={<Designation />} />
          <Route path="role-permission" element={<RolePermission />} />
        </Route>

        {/* HR */}
        <Route path="hr">
          <Route path="employees" element={<HREmployes />} />
          <Route path="attendance" element={<HRAttendence />} />
          <Route path="leaves" element={<HRLeaves />} />
          <Route path="shift" element={<HRShift />} />
          <Route path="holidays" element={<HRHolidays />} />
          <Route path="payroll" element={<HRPayrolls />} />
        </Route>

        {/* Operations */}
        <Route path="operations">
          <Route path="tasks" element={<OPTask />} />
          <Route path="expenses" element={<OPExpenses />} />
          <Route path="live-tracking" element={<OPLivetracking />} />
        </Route>

        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Super Admin */}
      <Route path="/super-admin" element={<SuperAdminLayout />}>
        <Route index element={<SuperAdminDashboard />} />
        <Route path="companies" element={<SuperAdminCompnies />} />
        <Route path="subcription-plan" element={<SubcriptionPlan />} />
        <Route path="active-subscriptions" element={<ActiveSubscription />} />
        <Route path="company-admins" element={<CompanyAdmins />} />
        <Route path="revenue" element={<Revenue />} />
        <Route path="companies-report" element={<CompaniesReports />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="settings" element={<SuperAdminSettings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

  );
}