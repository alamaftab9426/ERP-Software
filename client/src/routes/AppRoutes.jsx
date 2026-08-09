import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import ProtectRoutes from "./ProtectRoutes";

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



// Employee Pages
import EmployeeLayout from "../layouts/EmloyeeLayout";
import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";
import AttendancePunch from "../pages/Employee/AttendancePunch";
import AttendanceLogs from "../pages/Employee/AttendanceLogs";
import ApplyLeaves from "../pages/Employee/ApplyLeaves";
import LeaveBalance from "../pages/Employee/LeaveBalance";
import HolidayCalenders from "../pages/Employee/HolidayCalenders";
import Mytasks from "../pages/Employee/MyTasks";
import ClaimExpense from "../pages/Employee/MyOPClaimExpense"
import MyRouteLogs from "../pages/Employee/MyRouteLogs";
import MyPayRolls from "../pages/Employee/MyTasks";
import Settings from "../pages/Employee/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />


      {/* Super Admin */}
      <Route
        path="/super-admin"
        element={
          <ProtectRoutes allowedRoles={["super_admin", "superadmin"]}>
            <SuperAdminLayout />
          </ProtectRoutes>
        }
      >
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



      {/* Admin  */}
      <Route
        path="/admin"
        element={
          <ProtectRoutes allowedRoles={["admin", "company_admin"]}>
            <AdminLayout />
          </ProtectRoutes>
        }
      >
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


      {/* Employee */}
      <Route
        path="/employee"
        element={
          <ProtectRoutes allowedRoles={["employee"]}>
            <EmployeeLayout />
          </ProtectRoutes>
        }
      >
        <Route index element={<EmployeeDashboard />} />

        <Route path="attendance">
          <Route path="punchin-punchout" element={<AttendancePunch />} />
          <Route path="attendancelog" element={<AttendanceLogs />} />
        </Route>

        <Route path="leaves">
          <Route path="apply-leaves" element={<ApplyLeaves/>} />
          <Route path="balance" element={<LeaveBalance />} />
          <Route path="holidays" element={<HolidayCalenders />} />  
        </Route>

        <Route path="my-tasks" element= {<Mytasks/>} ></Route>

         <Route path="operations">
          <Route path="expense-claim" element={<ClaimExpense />} />
          <Route path="my-routes" element={<MyRouteLogs />} /> 
        </Route>

        <Route path="payroll" element={<MyPayRolls />} /> 
        <Route path="settings" element={<Settings />} /> 
        
      </Route>



      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

  );
}