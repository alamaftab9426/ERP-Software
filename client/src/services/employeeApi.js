import api from "../api/axios";

export const createEmployeeApi = (data) => api.post("/admin/employee/employees-create", data);
export const getEmployeesApi = (params) => api.get("/admin/employee/employees-get", { params });
export const getEmployeeByIdApi = (id) => api.get(`/admin/employee/employees-get/${id}`);
export const updateEmployeeApi = (id, data) => api.put(`/admin/employee/employees-update/${id}`, data);
export const updateEmployeeStatusApi = (id, status) =>api.patch(`/admin/employee/employees-update-status/${id}`, { status });
export const deleteEmployeeApi = (id) => api.delete(`/admin/employee/employees-delete/${id}`);