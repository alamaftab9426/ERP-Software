import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();          // ye POST /api/auth/logout call karega, cookie clear hogi
    navigate("/", { replace: true }); // fir login page pe bhej do
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-white flex gap-2 bg-[#2C7DA0] hover hover:bg-[#1F5A76] py-1 px-6 rounded-full"
    >
      <FiLogOut size={18}  className='mt-1'/>
      Logout
    </button>
  );
};

export default LogoutButton;