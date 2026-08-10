import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiEye,
  FiTrash2,
  FiX,
  FiLoader,
  FiAlertCircle,
  FiCheckCircle,
  FiSlash,
  FiFilter,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

// Import Modular API Calls
import {
  getCompaniesApi,
  createCompanyApi,
  updateCompanyApi,
  updateCompanyStatusApi,
  deleteCompanyApi,
} from "../../services/companyApi";

const planStyles = {
  Enterprise: "bg-teal-500/10 text-teal-700 border border-teal-200/80 font-bold",
  Pro: "bg-sky-500/10 text-sky-700 border border-sky-200/80 font-bold",
  Basic: "bg-slate-100 text-slate-600 border border-slate-200 font-semibold",
};

const statusConfig = {
  ACTIVE: {
    label: "Active",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dot: "bg-emerald-500",
  },
  INACTIVE: {
    label: "Inactive",
    badge: "bg-slate-100 text-slate-600 border-slate-200",
    dot: "bg-slate-400",
  },
  SUSPENDED: {
    label: "Suspended",
    badge: "bg-rose-50 text-rose-700 border-rose-200/80",
    dot: "bg-rose-500",
  },
  TRIAL: {
    label: "Trial",
    badge: "bg-amber-50 text-amber-700 border-amber-200/80",
    dot: "bg-amber-500",
  },
};

const SuperAdminCompnies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCompanyId, setEditingCompanyId] = useState(null);

  // View Details Modal State
  const [viewCompany, setViewCompany] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  // Filters & Search State
  const [search, setSearch] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCompanies, setTotalCompanies] = useState(0);

  // Modal Form State
  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    adminEmail: "",
    adminMobile: "",
    subscriptionPlan: "Basic",
    address: "",
    logo: "",
  });

  // Fetch Companies from Backend API
  const fetchCompanies = async () => {
    setLoading(true);
    setFetchError(null);

    const params = {
      page,
      limit: 10,
      search: search || undefined,
      status: selectedStatus || undefined,
    };

    try {
      const res = await getCompaniesApi(params);
      if (res.data.success) {
        setCompanies(res.data.data);
        setTotalCompanies(res.data.pagination.totalCompanies);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (err) {
      console.error("Fetch Companies Error:", err);
      const serverMsg =
        err?.response?.data?.message || err?.message || "Failed to load companies";
      setFetchError(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page, search, selectedStatus]);

  // Handle Form Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open Modal for Creating
  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setEditingCompanyId(null);
    setFormData({
      companyName: "",
      ownerName: "",
      adminEmail: "",
      adminMobile: "",
      subscriptionPlan: "Basic",
      address: "",
      logo: "",
    });
    setIsModalOpen(true);
  };

  // Open Modal for Editing
  const handleOpenEditModal = (company) => {
    setIsEditMode(true);
    setEditingCompanyId(company._id);
    setFormData({
      companyName: company.companyName || "",
      ownerName: company.ownerName || "",
      adminEmail: company.adminEmail || "",
      adminMobile: company.adminMobile || "",
      subscriptionPlan: company.subscriptionPlan || "Basic",
      address: company.address || "",
      logo: company.logo || "",
    });
    setIsModalOpen(true);
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditMode) {
        const res = await updateCompanyApi(editingCompanyId, {
          companyName: formData.companyName,
          ownerName: formData.ownerName,
          adminMobile: formData.adminMobile,
          subscriptionPlan: formData.subscriptionPlan,
          address: formData.address,
          logo: formData.logo,
        });

        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Company Updated!",
            text: res.data.message || "Company details have been updated successfully.",
            confirmButtonColor: "#2C7DA0",
          });
          setIsModalOpen(false);
          fetchCompanies();
        }
      } else {
        const res = await createCompanyApi(formData);

        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Company Created Successfully!",
            text: "Password setup email sent to company admin.",
            confirmButtonColor: "#2C7DA0",
          });
          setIsModalOpen(false);
          fetchCompanies();
        }
      }
    } catch (err) {
      console.error("Form Submit Error:", err);
      const errorMsg =
        err?.response?.data?.message || err?.response?.data?.error || "Operation failed.";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMsg,
        confirmButtonColor: "#2C7DA0",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Direct Status Switcher Handler (Active, Inactive, Suspended)
  const handleDirectStatusChange = async (company, newStatus) => {
    if (company.status === newStatus) return;

    Swal.fire({
      title: `Change Status to ${newStatus}?`,
      text: `Are you sure you want to update status for "${company.companyName}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: newStatus === "SUSPENDED" ? "#e11d48" : "#2C7DA0",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Update Status",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateCompanyStatusApi(company._id, newStatus);
          if (res.data.success) {
            Swal.fire({
              icon: "success",
              title: "Status Updated",
              text: res.data.message,
              timer: 1500,
              showConfirmButton: false,
            });
            fetchCompanies();
          }
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: err?.response?.data?.message || "Could not update status.",
            confirmButtonColor: "#2C7DA0",
          });
        }
      }
    });
  };

  // Permanent Delete Company Handler
  const handleDeleteCompany = async (company) => {
    Swal.fire({
      title: "Delete Company Permanently?",
      text: `Are you sure you want to delete "${company.companyName}"? This will permanently delete company data and user access.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete Permanently",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteCompanyApi(company._id);
          if (res.data.success) {
            Swal.fire({
              icon: "success",
              title: "Company Deleted",
              text: res.data.message || "Company deleted successfully.",
              confirmButtonColor: "#2C7DA0",
            });
            fetchCompanies();
          }
        } catch (err) {
          console.error("Delete Company Error:", err);
          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: err?.response?.data?.message || "Could not delete company.",
            confirmButtonColor: "#2C7DA0",
          });
        }
      }
    });
  };

  // Quick Stats Calculation
  const activeCount = companies.filter((c) => c.status === "ACTIVE").length;
  const suspendedCount = companies.filter((c) => c.status === "SUSPENDED").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/60 to-blue-50/30 text-slate-800">
      
      {/* HEADER SECTION */}
      <div className="sticky top-[76px] z-10 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Company Management
              </h1>
              <span className="bg-[#2C7DA0]/10 text-[#2C7DA0] text-xs font-bold px-2.5 py-1 rounded-full border border-[#2C7DA0]/20">
                Tenant Portal
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Oversee registered companies, subscriptions, and active statuses
            </p>
          </div>

          {/* Quick Header Stats */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200/80 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Total</span>
                <span className="font-bold text-slate-800 text-sm">{totalCompanies}</span>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div>
                <span className="text-emerald-600 block font-medium">Active</span>
                <span className="font-bold text-emerald-700 text-sm">{activeCount}</span>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div>
                <span className="text-rose-600 block font-medium">Suspended</span>
                <span className="font-bold text-rose-700 text-sm">{suspendedCount}</span>
              </div>
            </div>

            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 bg-gradient-to-r from-[#2C7DA0] to-[#1E8FA6] hover:opacity-95 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#2C7DA0]/20 active:scale-[0.98]"
            >
              <FiPlus size={18} />
              Add Company
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8 py-8 max-w-7xl mx-auto">
        
        {/* TOOLBAR (SEARCH & FILTERS) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company name, code, or admin..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]/20 focus:border-[#2C7DA0] bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
              <FiFilter size={14} />
              <span>Filters:</span>
            </div>

            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="text-xs sm:text-sm rounded-xl border border-slate-200 text-slate-700 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]/20 bg-slate-50/50 cursor-pointer font-medium"
            >
              <option value="">All Plans</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Pro">Pro</option>
              <option value="Basic">Basic</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs sm:text-sm rounded-xl border border-slate-200 text-slate-700 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]/20 bg-slate-50/50 cursor-pointer font-medium"
            >
              <option value="">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </div>

        {/* FETCH ERROR WARNING ALERT */}
        {fetchError && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <FiAlertCircle size={20} className="shrink-0 text-rose-600" />
              <div>
                <p className="font-bold text-xs sm:text-sm">Failed to Fetch Companies</p>
                <p className="text-xs text-rose-600 mt-0.5">{fetchError}</p>
              </div>
            </div>
            <button
              onClick={fetchCompanies}
              className="px-3.5 py-1.5 text-xs font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors shadow-xs"
            >
              Retry
            </button>
          </div>
        )}

        {/* TABLE CONTAINER */}
        <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 text-[11px] uppercase tracking-wider border-b border-slate-200">
                  <th className="font-bold px-6 py-4">Company</th>
                  <th className="font-bold px-6 py-4">Owner / Admin</th>
                  <th className="font-bold px-6 py-4">Plan</th>
                  <th className="font-bold px-6 py-4">Status & Switcher</th>
                  <th className="font-bold px-6 py-4">Created Date</th>
                  <th className="text-right font-bold px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center text-slate-400">
                      <FiLoader className="animate-spin inline-block mr-2" size={22} />
                      Loading company details...
                    </td>
                  </tr>
                ) : companies.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center text-slate-400">
                      No companies match your search filters.
                    </td>
                  </tr>
                ) : (
                  companies.map((company) => {
                    const statusObj = statusConfig[company.status] || statusConfig.ACTIVE;

                    return (
                      <tr key={company._id} className="hover:bg-slate-50/80 transition-colors group">
                        
                        {/* Company Name & Code */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2C7DA0]/10 to-[#1E8FA6]/20 text-[#2C7DA0] flex items-center justify-center shrink-0 font-bold overflow-hidden border border-[#2C7DA0]/20 shadow-xs">
                              {company.logo ? (
                                <img src={company.logo} alt="Logo" className="h-full w-full object-cover" />
                              ) : (
                                <HiOutlineOfficeBuilding size={20} />
                              )}
                            </span>
                            <div>
                              <span className="font-bold text-slate-900 block text-sm group-hover:text-[#2C7DA0] transition-colors">
                                {company.companyName}
                              </span>
                              <span className="text-[11px] text-slate-400 font-mono">
                                Code: {company.companyCode || "N/A"}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Owner & Admin */}
                        <td className="px-6 py-4">
                          <p className="text-slate-800 font-semibold">{company.ownerName}</p>
                          <p className="text-xs text-slate-400">{company.adminEmail}</p>
                        </td>

                        {/* Plan */}
                        <td className="px-6 py-4">
                          <span className={`text-[11px] px-2.5 py-1 rounded-full ${planStyles[company.subscriptionPlan] || planStyles.Basic}`}>
                            {company.subscriptionPlan || "Basic"}
                          </span>
                        </td>

                        {/* Direct Status Switcher Dropdown */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${statusObj.badge}`}>
                              <span className={`h-2 w-2 rounded-full ${statusObj.dot}`} />
                              {statusObj.label}
                            </span>

                            {/* Direct Status Dropdown Selector */}
                            <select
                              value={company.status}
                              onChange={(e) => handleDirectStatusChange(company, e.target.value)}
                              className="text-xs rounded-lg border border-slate-200 bg-white px-2 py-1 text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#2C7DA0] cursor-pointer hover:border-slate-300"
                              title="Change Status Directly"
                            >
                              <option value="ACTIVE">ACTIVE</option>
                              <option value="INACTIVE">INACTIVE</option>
                              <option value="SUSPENDED">SUSPENDED</option>
                            </select>
                          </div>
                        </td>

                        {/* Created Date */}
                        <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                          {new Date(company.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        {/* Action Buttons */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            
                            {/* View Profile */}
                            <button
                              onClick={() => setViewCompany(company)}
                              title="View Full Profile"
                              className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-[#1E8FA6] hover:bg-slate-100 transition-colors"
                            >
                              <FiEye size={16} />
                            </button>

                            {/* Edit Details */}
                            <button
                              onClick={() => handleOpenEditModal(company)}
                              title="Edit Details"
                              className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-[#2C7DA0] hover:bg-slate-100 transition-colors"
                            >
                              <FiEdit2 size={16} />
                            </button>

                            {/* Delete Permanently */}
                            <button
                              onClick={() => handleDeleteCompany(company)}
                              title="Delete Company Permanently"
                              className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                              <FiTrash2 size={16} />
                            </button>

                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
            <p className="text-xs text-slate-500 font-medium">
              Showing {companies.length} of {totalCompanies} companies
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-white disabled:opacity-40 transition-colors"
              >
                ‹ Previous
              </button>
              <span className="px-2 text-xs font-bold text-slate-700">
                Page {page} of {totalPages || 1}
              </span>
              <button
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-white disabled:opacity-40 transition-colors"
              >
                Next ›
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ===== FRAMER MOTION MODAL (ADD & EDIT) ===== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center font-bold">
                    {isEditMode ? <FiEdit2 size={20} /> : <HiOutlineOfficeBuilding size={22} />}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      {isEditMode ? "Edit Company Details" : "Add New Tenant Company"}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {isEditMode
                        ? "Update information for this company"
                        : "Enter details to register a new tenant"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Acme Retail Pvt Ltd"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]/20 focus:border-[#2C7DA0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Owner Name *
                    </label>
                    <input
                      type="text"
                      name="ownerName"
                      required
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Mehta"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]/20 focus:border-[#2C7DA0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Admin Email {isEditMode ? "(Disabled)" : "*"}
                    </label>
                    <input
                      type="email"
                      name="adminEmail"
                      required={!isEditMode}
                      disabled={isEditMode}
                      value={formData.adminEmail}
                      onChange={handleChange}
                      placeholder="admin@company.com"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]/20 focus:border-[#2C7DA0] disabled:bg-slate-100 disabled:text-slate-400 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Admin Mobile *
                    </label>
                    <input
                      type="text"
                      name="adminMobile"
                      required
                      value={formData.adminMobile}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]/20 focus:border-[#2C7DA0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subscription Plan
                    </label>
                    <select
                      name="subscriptionPlan"
                      value={formData.subscriptionPlan}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]/20 focus:border-[#2C7DA0] bg-white cursor-pointer"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Pro">Pro</option>
                      <option value="Enterprise">Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company Logo URL (Optional)
                    </label>
                    <input
                      type="text"
                      name="logo"
                      value={formData.logo}
                      onChange={handleChange}
                      placeholder="https://example.com/logo.png"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]/20 focus:border-[#2C7DA0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete office address..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0]/20 focus:border-[#2C7DA0] resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#2C7DA0] to-[#1E8FA6] text-white text-xs font-bold px-5 py-2 rounded-xl transition-all shadow-md shadow-[#2C7DA0]/20"
                  >
                    {submitting ? (
                      <>
                        <FiLoader className="animate-spin" size={16} />
                        {isEditMode ? "Updating..." : "Creating..."}
                      </>
                    ) : isEditMode ? (
                      "Update Details"
                    ) : (
                      "Create Company"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===== VIEW COMPANY PROFILE MODAL ===== */}
      <AnimatePresence>
        {viewCompany && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewCompany(null)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 z-10 border border-slate-100"
            >
              <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#2C7DA0]/10 to-[#1E8FA6]/20 text-[#2C7DA0] flex items-center justify-center font-bold text-xl border border-[#2C7DA0]/20 overflow-hidden">
                    {viewCompany.logo ? (
                      <img src={viewCompany.logo} alt="Logo" className="h-full w-full object-cover" />
                    ) : (
                      <HiOutlineOfficeBuilding size={24} />
                    )}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{viewCompany.companyName}</h3>
                    <p className="text-xs font-mono text-slate-400">Code: {viewCompany.companyCode || "N/A"}</p>
                  </div>
                </div>
                <button
                  onClick={() => setViewCompany(null)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
                >
                  <FiX size={18} />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 divide-y divide-slate-100">
                <div className="pt-2 flex justify-between">
                  <span className="font-semibold text-slate-500">Owner Name:</span>
                  <span className="font-bold text-slate-800">{viewCompany.ownerName}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="font-semibold text-slate-500">Admin Email:</span>
                  <span className="font-bold text-slate-800">{viewCompany.adminEmail}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="font-semibold text-slate-500">Admin Mobile:</span>
                  <span className="font-bold text-slate-800">{viewCompany.adminMobile || "N/A"}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="font-semibold text-slate-500">Plan:</span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${planStyles[viewCompany.subscriptionPlan]}`}>
                    {viewCompany.subscriptionPlan}
                  </span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="font-semibold text-slate-500">Status:</span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${statusConfig[viewCompany.status]?.badge}`}>
                    {viewCompany.status}
                  </span>
                </div>
                <div className="pt-2">
                  <span className="font-semibold text-slate-500 block mb-1">Address:</span>
                  <p className="text-xs bg-slate-50 p-3 rounded-xl text-slate-700 leading-relaxed border border-slate-200">
                    {viewCompany.address}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setViewCompany(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SuperAdminCompnies;