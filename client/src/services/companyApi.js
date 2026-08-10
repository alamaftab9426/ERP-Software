import api from "../api/axios";

// 1. Get All Companies (with Search, Status, Pagination)
export const getCompaniesApi = (params) => api.get("/company/companies-get", { params });

export const createCompanyApi = (data) => api.post("/company/companies-create", data);
// 2. Create New Company

// 3. Get Company By ID
export const getCompanyByIdApi = (id) => api.get(`/company/companies-get/${id}`);

// 4. Update Company Details
export const updateCompanyApi = (id, data) => api.put(`/company/companies-update/${id}`, data);

export const deleteCompanyApi = (id, data) => api.delete(`/company/companies-delete/${id}`, data);

// 5. Update Company Status (ACTIVE / INACTIVE / SUSPENDED)
export const updateCompanyStatusApi = (id, status) =>
  api.patch(`/company/companies-update-status/${id}/`, { status });