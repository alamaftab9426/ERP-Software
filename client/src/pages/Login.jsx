import { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, user, isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [time, setTime] = useState(new Date());

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Helper: Role-based Redirection
  const redirectByRole = (userObject) => {
    const role = (userObject?.role || "").toLowerCase();

    console.log("🔀 [DEBUG] Redirecting User with Role:", role);

    if (role === "super_admin" || role === "superadmin") {
      navigate("/super-admin", { replace: true });
    } else if (role === "admin" || role === "company_admin" || role === "companyadmin") {
      navigate("/admin", { replace: true });
    } else if (role === "employee") {
      navigate("/employee", { replace: true });
    } else {
      navigate("/admin", { replace: true });
    }
  };

  // AUTO-REDIRECT: Agar pehle se logged in hai to workspace par bhejo
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("⚡ [DEBUG] User already authenticated. Auto-redirecting...");
      redirectByRole(user);
    }
  }, [isAuthenticated, user]);

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

  // Handle Submit with Debugging & SweetAlert2
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter both Email and Password.",
        confirmButtonColor: "#121A2E",
      });
      return;
    }

    setLoading(true);
    console.log("➡️ [DEBUG] Submitting Login Form:", { email: formData.email });

    try {
      // 1. Call Auth Context (Cookie-based Login)
      const loggedInUser = await login(formData.email, formData.password);

      console.log("✅ [DEBUG] Login Success! User Data Received:", loggedInUser);

      // 2. Success Alert
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${loggedInUser?.name || 'User'}!`,
        timer: 1000,
        showConfirmButton: false,
      });

      // 3. Instant Redirect by Role
      redirectByRole(loggedInUser);

    } catch (err) {
      console.error("❌ [DEBUG] Login Error Details:", err);

      const errorMsg = err?.response?.data?.message || "Invalid Email or Password!";

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMsg,
        confirmButtonColor: "#121A2E",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F4F6F9]">
      {/* ===== LEFT PANEL — product world: GPS check-in pulse ===== */}
      <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden bg-[#121A2E]">
        {/* subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Brand */}
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
              Attendance, payroll and field force — one workspace for your entire team.
            </p>
          </div>

          {/* Signature: geofence check-in pulse + live clock */}
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="relative w-56 h-56 flex items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#4CAF7D]/20 animate-ping [animation-duration:2.4s]" />
              <span className="absolute inline-flex h-2/3 w-2/3 rounded-full bg-[#4CAF7D]/25 animate-ping [animation-duration:2.4s] [animation-delay:0.4s]" />
              <span className="absolute inline-flex h-1/3 w-1/3 rounded-full bg-[#4CAF7D]/30 animate-ping [animation-duration:2.4s] [animation-delay:0.8s]" />
              <div className="relative w-16 h-16 rounded-full bg-[#4CAF7D] flex items-center justify-center shadow-lg shadow-[#4CAF7D]/40">
                <FaMapMarkerAlt className="text-[#121A2E]" size={26} />
              </div>
            </div>

            <div
              className="mt-8 text-white text-4xl tabular-nums tracking-wider"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {timeStr}
            </div>
            <div className="text-slate-400 text-sm mt-1">{dateStr} · Office Geofence Active</div>
          </div>

          {/* Live-feeling workforce glimpse */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Present Today", value: "132" },
              { label: "On Leave", value: "6" },
              { label: "Field Visits", value: "24" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/5 border border-white/10 px-3 py-3">
                <div className="text-white text-lg font-semibold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {s.value}
                </div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIGHT PANEL — the actual login form ===== */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile-only brand mark */}
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
            Sign in to your workspace
          </h1>
          <p className="text-slate-500 text-sm mt-2 mb-8">
            Enter your work email and password to continue.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#121A2E] mb-1.5">
                Work email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#D9A94E]/40 focus:border-[#D9A94E] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-[#121A2E]">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-[#B9862E] hover:text-[#8f6620]">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 bg-white text-sm
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

            {/* Remember device */}
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="w-4 h-4 rounded border-slate-300 text-[#D9A94E] focus:ring-[#D9A94E]/40 cursor-pointer"
              />
              Remember this device
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[#121A2E] text-white text-sm font-semibold
                hover:bg-[#1c2743] transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" size={15} />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="flex items-center gap-2 text-xs text-slate-400 mt-8 justify-center">
            <FaShieldAlt size={12} />
            AES-encrypted · Role-based access · JWT session
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;