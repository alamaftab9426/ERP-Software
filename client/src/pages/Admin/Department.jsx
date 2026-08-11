import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiX,
  FiLoader,
  FiAlertCircle,
  FiLock,
  FiUnlock,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

import {
  getDepartmentsApi,
  createDepartmentApi,
  updateDepartmentApi,
  updateDepartmentStatusApi,
  deleteDepartmentApi,
} from "../../services/departmentsApi";

const statusStyles = {
  ACTIVE: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  INACTIVE: "bg-rose-50 text-rose-600 border border-rose-200",
};

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [viewDepartment, setViewDepartment] = useState(null);

  // Search & Filter States
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Pagination States
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDepartments, setTotalDepartments] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    departmentName: "",
    departmentCode: "",
    description: "",
  });

  // Fetch Departments
  const fetchDepartments = async () => {
    setLoading(true);
    setFetchError(null);

    const params = {
      page,
      limit: 10,
      search: search || undefined,
      status: selectedStatus || undefined,
    };

    try {
      const res = await getDepartmentsApi(params);
      if (res.data.success) {
        setDepartments(res.data.data);
        setTotalDepartments(res.data.pagination?.totalDepartments || res.data.data.length);
        setTotalPages(res.data.pagination?.totalPages || 1);
      }
    } catch (err) {
      console.error("Fetch Departments Error:", err);
      setFetchError(err?.response?.data?.message || "Failed to load departments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [page, search, selectedStatus]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setEditingDepartmentId(null);
    setFormData({
      departmentName: "",
      departmentCode: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (dept) => {
    setIsEditMode(true);
    setEditingDepartmentId(dept._id);
    setFormData({
      departmentName: dept.departmentName || "",
      departmentCode: dept.departmentCode || "",
      description: dept.description || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditMode) {
        const res = await updateDepartmentApi(editingDepartmentId, formData);
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: res.data.message || "Department details updated successfully.",
            confirmButtonColor: "#2C7DA0",
          });
          setIsModalOpen(false);
          fetchDepartments();
        }
      } else {
        const res = await createDepartmentApi(formData);
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Department Created!",
            text: res.data.message || "New department created successfully.",
            confirmButtonColor: "#2C7DA0",
          });
          setIsModalOpen(false);
          fetchDepartments();
        }
      }
    } catch (err) {
      console.error("Submit Error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.response?.data?.message || "Operation failed.",
        confirmButtonColor: "#2C7DA0",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (dept) => {
    const nextStatus = dept.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    Swal.fire({
      title: "Change Status?",
      text: `Change status of "${dept.departmentName}" to ${nextStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2C7DA0",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Change",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateDepartmentStatusApi(dept._id, nextStatus);
          if (res.data.success) {
            Swal.fire({ icon: "success", title: "Status Changed!", timer: 1500, showConfirmButton: false });
            fetchDepartments();
          }
        } catch (err) {
          Swal.fire({ icon: "error", title: "Failed", text: err?.response?.data?.message });
        }
      }
    });
  };

  const handleDeleteDepartment = async (dept) => {
    Swal.fire({
      title: "Delete Department?",
      text: `Are you sure you want to delete "${dept.departmentName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteDepartmentApi(dept._id);
          if (res.data.success) {
            Swal.fire({ icon: "success", title: "Deleted!", text: res.data.message });
            fetchDepartments();
          }
        } catch (err) {
          Swal.fire({ icon: "error", title: "Failed", text: err?.response?.data?.message });
        }
      }
    });
  };

  return (
    <div>
      {/* HEADER */}
      <div className="sticky top-[76px] z-[5] bg-white px-8 pt-8 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Department</h1>
            <p className="text-sm text-slate-500 mt-1">Manage departments across your organization</p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <FiPlus size={16} />
            Add Department
          </button>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* TOOLBAR */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search department by name or code..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6] bg-white"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-sm rounded-lg border border-slate-200 text-slate-600 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 bg-white cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>

        {/* ERROR ALERT */}
        {fetchError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiAlertCircle size={20} />
              <p className="text-sm font-semibold">{fetchError}</p>
            </div>
            <button onClick={fetchDepartments} className="px-3 py-1 text-xs bg-rose-600 text-white rounded-lg">
              Retry
            </button>
          </div>
        )}

        {/* TABLE */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                  <th className="text-left font-semibold px-6 py-3.5">Department Name</th>
                  <th className="text-left font-semibold px-6 py-3.5">Code</th>
                  <th className="text-left font-semibold px-6 py-3.5">Description</th>
                  <th className="text-left font-semibold px-6 py-3.5">Status</th>
                  <th className="text-right font-semibold px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-400">
                      <FiLoader className="animate-spin inline-block mr-2" size={20} /> Loading departments...
                    </td>
                  </tr>
                ) : departments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-400">
                      No departments found.
                    </td>
                  </tr>
                ) : (
                  departments.map((dept) => (
                    <tr key={dept._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="h-9 w-9 rounded-lg bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0">
                            <HiOutlineOfficeBuilding size={18} />
                          </span>
                          <span className="font-medium text-slate-800">{dept.departmentName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono font-semibold uppercase bg-slate-100 text-slate-600 px-2 py-1 rounded">
                          {dept.departmentCode || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 max-w-xs truncate">
                        {dept.description || "No description provided."}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[dept.status] || statusStyles.ACTIVE}`}>
                          {dept.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewDepartment(dept)}
                            title="View Profile"
                            className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#1E8FA6] hover:bg-[#1E8FA6]/10"
                          >
                            <FiEye size={15} />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(dept)}
                            title="Edit Department"
                            className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#2C7DA0] hover:bg-[#2C7DA0]/10"
                          >
                            <FiEdit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleStatusChange(dept)}
                            title={dept.status === "ACTIVE" ? "Deactivate" : "Activate"}
                            className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                          >
                            {dept.status === "ACTIVE" ? <FiLock size={15} /> : <FiUnlock size={15} />}
                          </button>
                          <button
                            onClick={() => handleDeleteDepartment(dept)}
                            title="Delete Department"
                            className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <p className="text-xs text-slate-400">Showing {departments.length} of {totalDepartments} departments</p>
            <div className="flex items-center gap-1.5">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className="h-8 w-8 rounded-lg border border-slate-200 text-slate-500 text-sm hover:bg-slate-50 disabled:opacity-50">‹</button>
              <span className="px-3 text-xs text-slate-600 font-medium">Page {page} of {totalPages || 1}</span>
              <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)} className="h-8 w-8 rounded-lg border border-slate-200 text-slate-500 text-sm hover:bg-slate-50 disabled:opacity-50">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                <h2 className="text-lg font-semibold text-slate-800">{isEditMode ? "Edit Department" : "Add New Department"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><FiX size={18} /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department Name *</label>
                  <input
                    type="text"
                    name="departmentName"
                    required
                    value={formData.departmentName}
                    onChange={handleChange}
                    placeholder="e.g. Engineering"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department Code *</label>
                  <input
                    type="text"
                    name="departmentCode"
                    required
                    value={formData.departmentCode}
                    onChange={handleChange}
                    placeholder="e.g. ENG"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6] uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief description of department..."
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 focus:border-[#1E8FA6] resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                  <button type="submit" disabled={submitting} className="bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm px-5 py-2 rounded-lg font-medium shadow-sm transition-colors">
                    {submitting ? "Saving..." : isEditMode ? "Update Department" : "Create Department"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW DETAILS MODAL */}
      <AnimatePresence>
        {viewDepartment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewDepartment(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-lg bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0">
                    <HiOutlineOfficeBuilding size={20} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{viewDepartment.departmentName}</h3>
                    <p className="text-xs font-mono text-slate-400">Code: {viewDepartment.departmentCode}</p>
                  </div>
                </div>
                <button onClick={() => setViewDepartment(null)} className="text-slate-400 hover:text-slate-600"><FiX size={18} /></button>
              </div>

              <div className="space-y-3 text-sm text-slate-600 divide-y divide-slate-100">
                <div className="pt-2 flex justify-between"><span>Status:</span><span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyles[viewDepartment.status]}`}>{viewDepartment.status}</span></div>
                <div className="pt-2">
                  <span className="font-semibold text-slate-500 block mb-1">Description:</span>
                  <p className="text-xs bg-slate-50 p-2.5 rounded-lg text-slate-600 leading-relaxed border border-slate-100">
                    {viewDepartment.description || "No description provided."}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button onClick={() => setViewDepartment(null)} className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Department;