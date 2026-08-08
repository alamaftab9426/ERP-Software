import crypto from "crypto";
import mongoose from "mongoose";
import User from "../../models/User.js";
import Employee from "../../models/Emolyee.js";
import Department from "../../models/Department.js";

// ==========================================
// Create Employee & Return Password Setup Token / Link
// ==========================================
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

    const companyId = req.user.companyId; // verifyToken middleware se aayega

    // 1. Basic Validation
    if (
      !name ||
      !email ||
      !departmentId ||
      !employeeCode ||
      !designation ||
      !joiningDate ||
      !mobile ||
      !gender
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required employee fields.",
      });
    }

    // 2. Validate Department ID
    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Department ID format.",
      });
    }

    const departmentExists = await Department.findOne({
      _id: departmentId,
      companyId,
      isDeleted: false,
    });

    if (!departmentExists) {
      return res.status(404).json({
        success: false,
        message: "Target department not found in your company.",
      });
    }

    // 3. Duplicate Email Check (Universal Unique Check)
    const emailExists = await User.findOne({ email: email.toLowerCase() });
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered under another account.",
      });
    }

    // 4. Duplicate Employee Code Check inside this Company
    const codeExists = await Employee.findOne({
      companyId,
      employeeCode: employeeCode.trim().toUpperCase(),
      isDeleted: false,
    });

    if (codeExists) {
      return res.status(409).json({
        success: false,
        message: "Employee code already exists in your company.",
      });
    }

    // 5. Generate Password Setup Token & Expiry
    const setupToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 Hours Expiry

    // 6. Create User (Credentials Profile)
    const userCredentials = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: null, // Initial password setup se pehle null rahega
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
      });
      // 9. Return Complete Context (Clean Response)
      return res.status(201).json({
        success: true,
        message: "Employee account initialized successfully.",
        data: {
          employee: {
            id: employeeProfile._id,
            userId: userCredentials._id,
            name: userCredentials.name,
            email: userCredentials.email,
            employeeCode: employeeProfile.employeeCode,
            designation: employeeProfile.designation,
            department: departmentExists.departmentName,
            joiningDate: employeeProfile.joiningDate,
          },
          security: {
             // Development Only
            setupToken, // Direct Token
            expiresAt: expiry,
          },
        },
      });

    } catch (profileError) {
      // Rollback Auth profile if professional profile generation fails
      await User.findByIdAndDelete(userCredentials._id);
      throw new Error(`Profile initialization failed: ${profileError.message}`);
    }

  } catch (error) {
    console.error("Error in createEmployee:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
};