import React, { createContext, useContext, useState, useEffect } from "react";
import { loginApi, logoutApi, getMeApi } from "../services/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await getMeApi();
        if (res.data.success) {
          setUser(res.data.user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    const res = await loginApi({ email, password });
    if (res.data.success) {
      setUser(res.data.user);
      setIsAuthenticated(true);
      return res.data.user; 
    }
    throw new Error(res.data.message || "Login failed");
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);