import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiPlus,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiX,
  FiLoader,
  FiAlertCircle,
  FiLock,
  FiUnlock,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

import {
  getEmployeesApi,
  createEmployeeApi,
  updateEmployeeApi,
  updateEmployeeStatusApi,
  deleteEmployeeApi,
} from "../../services/employeeApi";

// Department API Import (apne path ke hisab se Adjust kar lein)
import { getDepartmentsApi } from "../../services/departmentsApi";

const statusStyles = {
  ACTIVE: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  ON_LEAVE: "bg-amber-50 text-amber-600 border border-amber-200",
  INACTIVE: "bg-rose-50 text-rose-600 border border-rose-200",
};

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]); // Dynamic Departments State
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Modals State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);

  // Search & Filter State
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);

  // Form Data State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    employeeCode: "",
    designation: "",
    departmentId: "", // Dynamic
    joiningDate: "",
    gender: "Male",
    salary: "",
  });

  // Fetch Departments list for Dropdown
  const fetchDepartments = async () => {
    try {
      const res = await getDepartmentsApi();
      if (res.data.success) {
        // Backend response ke mutabiq data set karein
        setDepartments(res.data.data || res.data.departments || []);
      }
    } catch (err) {
      console.error("Fetch Departments Error:", err);
    }
  };

  // Fetch Employees List
  const fetchEmployees = async () => {
    setLoading(true);
    setFetchError(null);

    const params = {
      page,
      limit: 10,
      search: search || undefined,
      status: selectedStatus || undefined,
    };

    try {
      const res = await getEmployeesApi(params);
      if (res.data.success) {
        setEmployees(res.data.data);
        setTotalEmployees(res.data.pagination.totalEmployees);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (err) {
      console.error("Fetch Employees Error:", err);
      setFetchError(err?.response?.data?.message || "Failed to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments(); // Load departments list on mount
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [page, search, selectedStatus]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setEditingEmployeeId(null);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      employeeCode: "",
      designation: "",
      departmentId: departments.length > 0 ? departments[0]._id : "", // Automatically set first department
      joiningDate: new Date().toISOString().split("T")[0],
      gender: "Male",
      salary: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (emp) => {
    setIsEditMode(true);
    setEditingEmployeeId(emp._id);
    setFormData({
      name: emp.userId?.name || "",
      email: emp.userId?.email || "",
      mobile: emp.mobile || "",
      employeeCode: emp.employeeCode || "",
      designation: emp.designation || "",
      departmentId: emp.departmentId?._id || emp.departmentId || "",
      joiningDate: emp.joiningDate ? emp.joiningDate.split("T")[0] : "",
      gender: emp.gender || "Male",
      salary: emp.salary || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.departmentId) {
      Swal.fire({
        icon: "warning",
        title: "Department Required",
        text: "Please select a department.",
      });
      return;
    }

    setSubmitting(true);

    try {
      if (isEditMode) {
        const res = await updateEmployeeApi(editingEmployeeId, {
          name: formData.name,
          mobile: formData.mobile,
          designation: formData.designation,
          departmentId: formData.departmentId,
          salary: Number(formData.salary),
          gender: formData.gender,
        });

        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Employee details updated successfully.",
            confirmButtonColor: "#2C7DA0",
          });
          setIsModalOpen(false);
          fetchEmployees();
        }
      } else {
        const payload = {
          ...formData,
          salary: Number(formData.salary),
        };

        const res = await createEmployeeApi(payload);

        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Employee Created!",
            text: "Employee added successfully.",
            confirmButtonColor: "#2C7DA0",
          });
          setIsModalOpen(false);
          fetchEmployees();
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

  const handleStatusChange = async (emp) => {
    const nextStatus = emp.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    Swal.fire({
      title: "Change Status?",
      text: `Change status of ${emp.userId?.name} to ${nextStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2C7DA0",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Change",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateEmployeeStatusApi(emp._id, nextStatus);
          if (res.data.success) {
            Swal.fire({ icon: "success", title: "Updated", timer: 1500, showConfirmButton: false });
            fetchEmployees();
          }
        } catch (err) {
          Swal.fire({ icon: "error", title: "Failed", text: err?.response?.data?.message });
        }
      }
    });
  };

  const handleDeleteEmployee = async (emp) => {
    Swal.fire({
      title: "Delete Employee?",
      text: `Delete "${emp.userId?.name}" permanently? This will remove user login credentials too.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteEmployeeApi(emp._id);
          if (res.data.success) {
            Swal.fire({ icon: "success", title: "Deleted!", text: res.data.message });
            fetchEmployees();
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
            <h1 className="text-3xl font-semibold text-slate-800">Employees</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your organization's workforce</p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-[#2C7DA0] hover:bg-[#256A8A] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <FiPlus size={16} />
            Add Employee
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
              placeholder="Search by code, designation, mobile..."
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
              <option value="ON_LEAVE">On Leave</option>
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
            <button onClick={fetchEmployees} className="px-3 py-1 text-xs bg-rose-600 text-white rounded-lg">
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
                  <th className="text-left font-semibold px-6 py-3.5">Employee</th>
                  <th className="text-left font-semibold px-6 py-3.5">Contact</th>
                  <th className="text-left font-semibold px-6 py-3.5">Department</th>
                  <th className="text-left font-semibold px-6 py-3.5">Designation</th>
                  <th className="text-left font-semibold px-6 py-3.5">Status</th>
                  <th className="text-right font-semibold px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-400">
                      <FiLoader className="animate-spin inline-block mr-2" size={20} /> Loading employees...
                    </td>
                  </tr>
                ) : employees.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-400">
                      No employees found.
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => (
                    <tr key={emp._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="h-9 w-9 rounded-full bg-[#2C7DA0]/10 text-[#2C7DA0] flex items-center justify-center shrink-0 text-xs font-bold uppercase">
                            {emp.userId?.name ? emp.userId.name.slice(0, 2) : "EM"}
                          </span>
                          <div>
                            <span className="font-medium text-slate-800 block">{emp.userId?.name || "N/A"}</span>
                            <span className="text-xs text-slate-400 uppercase font-mono">Code: {emp.employeeCode}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-600 flex items-center gap-1.5 text-xs mb-1">
                          <FiMail size={12} className="text-slate-400" />
                          {emp.userId?.email || "N/A"}
                        </p>
                        <p className="text-slate-400 flex items-center gap-1.5 text-xs">
                          <FiPhone size={12} className="text-slate-400" />
                          {emp.mobile}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {emp.departmentId?.departmentName || emp.departmentId?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{emp.designation}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[emp.status] || statusStyles.ACTIVE}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => setViewEmployee(emp)} className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#1E8FA6] hover:bg-[#1E8FA6]/10">
                            <FiEye size={15} />
                          </button>
                          <button onClick={() => handleOpenEditModal(emp)} className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#2C7DA0] hover:bg-[#2C7DA0]/10">
                            <FiEdit2 size={15} />
                          </button>
                          <button onClick={() => handleStatusChange(emp)} className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50">
                            {emp.status === "ACTIVE" ? <FiLock size={15} /> : <FiUnlock size={15} />}
                          </button>
                          <button onClick={() => handleDeleteEmployee(emp)} className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50">
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
            <p className="text-xs text-slate-400">Showing {employees.length} of {totalEmployees} employees</p>
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
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                <h2 className="text-lg font-semibold text-slate-800">{isEditMode ? "Edit Employee" : "Add New Employee"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><FiX size={18} /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Rahul Sharma" className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 text-black" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email {isEditMode ? "(Disabled)" : "*"}</label>
                    <input type="email" name="email" required={!isEditMode} disabled={isEditMode} value={formData.email} onChange={handleChange} placeholder="rahul@company.com" className="w-full px-3.5 py-2 text-sm text-black rounded-lg border border-slate-200 disabled:bg-slate-100" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Employee Code {isEditMode ? "(Disabled)" : "*"}</label>
                    <input type="text" name="employeeCode" required={!isEditMode} disabled={isEditMode} value={formData.employeeCode} onChange={handleChange} placeholder="EMP-001" className="w-full px-3.5 py-2 text-sm text-black rounded-lg border border-slate-200 disabled:bg-slate-100" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                    <input type="text" name="mobile" required value={formData.mobile} onChange={handleChange} placeholder="+91 9876543210" className="w-full px-3.5 py-2 text-sm rounded-lg border text-black border-slate-200" />
                  </div>

                  {/* DYNAMIC DEPARTMENT DROPDOWN */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Department *</label>
                    <select
                      name="departmentId"
                      required
                      value={formData.departmentId}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border text-black border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E8FA6]/30 bg-white"
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.departmentName || dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Designation *</label>
                    <input type="text" name="designation" required value={formData.designation} onChange={handleChange} placeholder="Software Engineer" className="w-full px-3.5 py-2 text-sm rounded-lg border text-black border-slate-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Joining Date *</label>
                    <input type="date" name="joiningDate" required value={formData.joiningDate} onChange={handleChange} className="w-full px-3.5 py-2 text-sm rounded-lg border text-black border-slate-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Gender *</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3.5 py-2 text-sm rounded-lg border text-black border-slate-200">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Salary (Monthly)</label>
                    <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="50000" className="w-full px-3.5 py-2 text-sm rounded-lg border text-black border-slate-200" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                  <button type="submit" disabled={submitting} className="bg-[#2C7DA0] text-white text-sm px-5 py-2 rounded-lg font-medium">
                    {submitting ? "Saving..." : isEditMode ? "Update Details" : "Create Employee"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW DETAILS MODAL */}
      <AnimatePresence>
        {viewEmployee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewEmployee(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{viewEmployee.userId?.name}</h3>
                  <p className="text-xs font-mono text-slate-400">Code: {viewEmployee.employeeCode}</p>
                </div>
                <button onClick={() => setViewEmployee(null)} className="text-slate-400"><FiX size={18} /></button>
              </div>
              <div className="space-y-3 text-sm text-slate-600 divide-y divide-slate-100">
                <div className="pt-2 flex justify-between"><span>Email:</span><span className="font-semibold text-slate-800">{viewEmployee.userId?.email}</span></div>
                <div className="pt-2 flex justify-between"><span>Mobile:</span><span className="font-semibold text-slate-800">{viewEmployee.mobile}</span></div>
                <div className="pt-2 flex justify-between"><span>Designation:</span><span className="font-semibold text-slate-800">{viewEmployee.designation}</span></div>
                <div className="pt-2 flex justify-between"><span>Department:</span><span className="font-semibold text-slate-800">{viewEmployee.departmentId?.departmentName || viewEmployee.departmentId?.name || "N/A"}</span></div>
                <div className="pt-2 flex justify-between"><span>Gender:</span><span className="font-semibold text-slate-800">{viewEmployee.gender}</span></div>
                <div className="pt-2 flex justify-between"><span>Salary:</span><span className="font-semibold text-slate-800">₹{viewEmployee.salary}</span></div>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => setViewEmployee(null)} className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Employees;