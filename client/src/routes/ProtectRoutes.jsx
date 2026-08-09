import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectRoutes = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Jab tak /me call complete nahi hoti, kuch mat dikhao (flicker/redirect-loop avoid karne ke liye)
  if (loading) return null; // yahan chahe to spinner bhi laga sakte ho

  // Login hi nahi hai -> login page bhej do
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  const currentRole = (user?.role || "").toLowerCase();
  const formattedAllowedRoles = (allowedRoles || []).map((r) => r.toLowerCase());

  // allowedRoles nahi diya matlab koi bhi logged-in user allowed hai
  const hasAccess =
    formattedAllowedRoles.length === 0 || formattedAllowedRoles.includes(currentRole);

  if (!hasAccess) {
    if (currentRole.includes("super")) return <Navigate to="/super-admin/dashboard" replace />;
    if (currentRole.includes("admin")) return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/employee/dashboard" replace />;
  }

  return children;
};

export default ProtectRoutes;