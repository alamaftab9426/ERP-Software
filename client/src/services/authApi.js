import api from "../api/axios";

export const loginApi = (data) => api.post("/auth/login", data);
export const logoutApi = () => api.post("/auth/logout");
export const getMeApi = () => api.get("/auth/me");
export const setupPasswordApi = (data) => api.post("/auth/admin-setup-password", data);