import React, { useState, useEffect } from "react";
import { FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaSpinner, FaCheckCircle } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios"; 
import { setupPasswordApi } from "../services/authApi"; 

const SetupPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });


  // Live Clock
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString("en-IN", { hour12: true });
  const dateStr = time.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!token) {
    Swal.fire({
      icon: "error",
      title: "Invalid Link",
      text: "Setup token is missing or invalid link.",
      confirmButtonColor: "#121A2E",
    });
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Password Mismatch",
      text: "Password and Confirm Password do not match!",
      confirmButtonColor: "#121A2E",
    });
    return;
  }

  setLoading(true);

  try {
    const res = await setupPasswordApi({
      token: token,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    if (res.data.success) {
      Swal.fire({
        icon: "success",
        title: "Password Created Successfully!",
        text: res.data.message || "Your password has been set. Please login.",
        confirmButtonColor: "#121A2E",
      }).then(() => {
        navigate("/login", { replace: true });
      });
    }
  } catch (err) {
    console.error("Setup Password Error:", err);
    const errorMsg =
      err?.response?.data?.message || "Link expired or invalid token.";

    Swal.fire({
      icon: "error",
      title: "Setup Failed",
      text: errorMsg,
      confirmButtonColor: "#121A2E",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen w-full flex bg-[#F4F6F9]">
      <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden bg-[#121A2E]">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#D9A94E] flex items-center justify-center font-bold text-[#121A2E]">
                W
              </div>
              <span className="text-white font-semibold tracking-wide text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                AI.ERP <span className="text-[#D9A94E]">SOFTWARE</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-4 max-w-xs leading-relaxed">
              Activate your admin account and set a strong password to get started.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center flex-1">
            <div className="relative w-20 h-20 rounded-full bg-[#D9A94E]/20 border border-[#D9A94E]/40 flex items-center justify-center shadow-lg">
              <FaCheckCircle className="text-[#D9A94E]" size={36} />
            </div>

            <div
              className="mt-6 text-white text-3xl tabular-nums tracking-wider"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Account Activation
            </div>
            <div className="text-slate-400 text-sm mt-1">{dateStr} · Secure Token Verification</div>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
            <p className="text-slate-300 text-xs">
              🔒 Encrypted setup link · One-time activation · Role-Based Access
            </p>
          </div>
        </div>
      </div>

      {/* ===== RIGHT PANEL — Password Setup Form ===== */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-10 justify-center">
            <div className="w-9 h-9 rounded-lg bg-[#D9A94E] flex items-center justify-center font-bold text-[#121A2E]">
              W
            </div>
            <span className="font-semibold text-lg text-[#121A2E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              AI.ERP<span className="text-[#D9A94E]">SOFTWARE</span>
            </span>
          </div>

          <h1
            className="text-2xl font-semibold text-[#121A2E]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Create Your Password
          </h1>
          <p className="text-slate-500 text-sm mt-2 mb-8">
            Set up a secure password for your company admin account.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-[#121A2E] mb-1.5">
                New Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border text-black border-slate-200 bg-white text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#D9A94E]/40 focus:border-[#D9A94E] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#121A2E] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter new password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border text-black border-slate-200 bg-white text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#D9A94E]/40 focus:border-[#D9A94E] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[#121A2E] text-white text-sm font-semibold
                hover:bg-[#1c2743] transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" size={15} />
                  <span>Activating Account...</span>
                </>
              ) : (
                "Set Password & Activate"
              )}
            </button>
          </form>

          <div className="flex items-center gap-2 text-xs text-slate-400 mt-8 justify-center">
            <FaShieldAlt size={12} />
            AES-encrypted · One-time link · Token verified
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupPasswordPage;