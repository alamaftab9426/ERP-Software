import api from "../api/axios";

// 1. Create Department
export const createDepartmentApi = (data) => api.post("/admin/department/create", data);

// 2. Get All Departments (Search, Status, Pagination)
export const getDepartmentsApi = (params) => api.get("/admin/department/get-department", { params });

// 3. Get Department By ID
export const getDepartmentByIdApi = (id) => api.get(`/admin/department/get-departments/${id}`);

// 4. Update Department
export const updateDepartmentApi = (id, data) => api.put(`/admin/department/update-departments/${id}`, data);

// 5. Update Department Status (ACTIVE / INACTIVE)
export const updateDepartmentStatusApi = (id, status) =>api.patch(`/admin/department/update-departments/${id}/status`, { status });

// 6. Delete Department
export const deleteDepartmentApi = (id) => api.delete(`/admin/department/departments-delete/${id}`);