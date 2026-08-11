import crypto from "crypto";
import mongoose from "mongoose";
import User from "../../models/User.js";
import Employee from "../../models/Emolyee.js"; // Aapke model path ke according
import Department from "../../models/Department.js";
import { sendSetupPasswordEmail } from "../../utils/nodemailer.js";

// 1. CREATE EMPLOYEE
export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      departmentId,
      employeeCode,
      designation,
      joiningDate,
      mobile,
      gender,
      salary,
    } = req.body;

    const companyId = req.user.companyId;

    if (!name || !email || !departmentId || !employeeCode || !designation || !joiningDate || !mobile || !gender) {
      return res.status(400).json({ success: false, message: "Please fill all required employee fields." });
    }

    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return res.status(400).json({ success: false, message: "Invalid Department ID format." });
    }

    const departmentExists = await Department.findOne({ _id: departmentId, companyId, isDeleted: false });
    if (!departmentExists) {
      return res.status(404).json({ success: false, message: "Department not found." });
    }

    const emailExists = await User.findOne({ email: email.toLowerCase() });
    if (emailExists) {
      return res.status(409).json({ success: false, message: "Email is already registered." });
    }

    const codeExists = await Employee.findOne({ companyId, employeeCode: employeeCode.trim().toUpperCase(), isDeleted: false });
    if (codeExists) {
      return res.status(409).json({ success: false, message: "Employee code already exists in your company." });
    }

    const setupToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 48 * 60 * 60 * 1000);

    // Create User Credentials
    const userCredentials = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: null,
      role: "EMPLOYEE",
      companyId,
      isPasswordSet: false,
      passwordSetupToken: setupToken,
      passwordSetupTokenExpires: expiry,
      isActive: true,
    });

    try {
      const employeeProfile = await Employee.create({
        companyId,
        userId: userCredentials._id,
        departmentId,
        employeeCode: employeeCode.trim().toUpperCase(),
        designation: designation.trim(),
        joiningDate: new Date(joiningDate),
        mobile: mobile.trim(),
        gender,
        salary: salary || 0,
        status: "ACTIVE",
      });

      // Send Email
      try {
        await sendSetupPasswordEmail({
          to: userCredentials.email,
          ownerName: userCredentials.name,
          companyName: req.user.companyName || "Your Company",
          setupToken,
        });
      } catch (mailErr) {
        console.error("Employee setup email error:", mailErr);
      }

      return res.status(201).json({
        success: true,
        message: "Employee created successfully. Password setup link sent to email.",
        data: employeeProfile,
      });

    } catch (profileError) {
      await User.findByIdAndDelete(userCredentials._id);
      throw new Error(`Profile initialization failed: ${profileError.message}`);
    }

  } catch (error) {
    console.error("Error in createEmployee:", error);
    return res.status(500).json({ success: false, message: error.message || "Internal Server Error." });
  }
};

// 2. GET ALL EMPLOYEES (With Search, Filter, Pagination)
export const getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;
    const { search, status, departmentId } = req.query;
    const companyId = req.user.companyId;

    let query = { companyId, isDeleted: { $ne: true } };

    if (status) query.status = status.toUpperCase();
    if (departmentId) query.departmentId = departmentId;

    if (search) {
      query.$or = [
        { employeeCode: { $regex: search, $options: "i" } },
        { designation: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ];
    }

    const totalEmployees = await Employee.countDocuments(query);
    const employees = await Employee.find(query)
      .populate("userId", "name email isActive")
      .populate("departmentId", "departmentName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      pagination: {
        totalEmployees,
        currentPage: page,
        totalPages: Math.ceil(totalEmployees / limit),
        limit,
      },
      data: employees,
    });
  } catch (error) {
    console.error("Error in getEmployees:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

// 3. GET EMPLOYEE BY ID
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const companyId = req.user.companyId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Employee ID format." });
    }

    const employee = await Employee.findOne({ _id: id, companyId })
      .populate("userId", "name email isActive")
      .populate("departmentId", "departmentName");

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found." });
    }

    return res.status(200).json({ success: true, data: employee });
  } catch (error) {
    console.error("Error in getEmployeeById:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

// 4. UPDATE EMPLOYEE
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mobile, designation, departmentId, salary, gender } = req.body;
    const companyId = req.user.companyId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Employee ID format." });
    }

    const employee = await Employee.findOne({ _id: id, companyId });
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found." });
    }

    if (name) {
      await User.findByIdAndUpdate(employee.userId, { name: name.trim() });
    }

    if (mobile) employee.mobile = mobile.trim();
    if (designation) employee.designation = designation.trim();
    if (departmentId) employee.departmentId = departmentId;
    if (salary !== undefined) employee.salary = salary;
    if (gender) employee.gender = gender;

    await employee.save();

    return res.status(200).json({ success: true, message: "Employee details updated successfully." });
  } catch (error) {
    console.error("Error in updateEmployee:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

// 5. UPDATE EMPLOYEE STATUS (ACTIVE / INACTIVE / ON_LEAVE)
export const updateEmployeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const companyId = req.user.companyId;

    if (!status || !["ACTIVE", "INACTIVE", "ON_LEAVE"].includes(status.toUpperCase())) {
      return res.status(400).json({ success: false, message: "Invalid status value." });
    }

    const targetStatus = status.toUpperCase();
    const employee = await Employee.findOneAndUpdate(
      { _id: id, companyId },
      { status: targetStatus },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found." });
    }

    // User account status sync
    await User.findByIdAndUpdate(employee.userId, { isActive: targetStatus === "ACTIVE" });

    return res.status(200).json({
      success: true,
      message: `Employee status updated to ${targetStatus}.`,
      data: employee,
    });
  } catch (error) {
    console.error("Error in updateEmployeeStatus:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

// 6. DELETE EMPLOYEE (Cascade Delete)
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const companyId = req.user.companyId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Employee ID format." });
    }

    const employee = await Employee.findOne({ _id: id, companyId });
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found." });
    }

    if (employee.userId) {
      await User.findByIdAndDelete(employee.userId);
    }

    await Employee.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Employee profile and associated user account deleted permanently.",
    });

  } catch (error) {
    console.error("Error in deleteEmployee:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};