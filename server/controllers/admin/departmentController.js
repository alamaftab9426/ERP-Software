import Department from "../../models/Department.js";
import mongoose from "mongoose";

// ==========================================
// 1. Create Department
// ==========================================
export const createDepartment = async (req, res) => {
  try {
    const { departmentName, departmentCode, description } = req.body;
    const companyId = req.user.companyId; 
    if (!departmentName || !departmentCode) {
      return res.status(400).json({
        success: false,
        message: "Department Name and Department Code are required.",
      });
    }
    const nameExists = await Department.findOne({
      companyId,
      departmentName: { $regex: new RegExp(`^${departmentName.trim()}$`, "i") },
      isDeleted: false,
    });

    if (nameExists) {
      return res.status(409).json({
        success: false,
        message: "A department with this name already exists in your company.",
      });
    }

    // Duplicate Code check inside the same company
    const codeExists = await Department.findOne({
      companyId,
      departmentCode: departmentCode.trim().toUpperCase(),
      isDeleted: false,
    });

    if (codeExists) {
      return res.status(409).json({
        success: false,
        message: "A department with this code already exists in your company.",
      });
    }

    // Create Department
    const department = await Department.create({
      companyId,
      departmentName: departmentName.trim(),
      departmentCode: departmentCode.trim().toUpperCase(),
      description: description || "",
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Department created successfully.",
      data: department,
    });
  } catch (error) {
    console.error("Error in createDepartment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { status, search } = req.query;

    let query = { companyId, isDeleted: false };
    if (status) {
      query.status = status.toUpperCase();
    }

    // Search by Name or Code
    if (search) {
      query.$or = [
        { departmentName: { $regex: search, $options: "i" } },
        { departmentCode: { $regex: search, $options: "i" } },
      ];
    }

    const departments = await Department.find(query)
      .select("-__v")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (error) {
    console.error("Error in getDepartments:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// ==========================================
// 3. Get Department By ID
// ==========================================
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const companyId = req.user.companyId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Department ID format.",
      });
    }

    const department = await Department.findOne({
      _id: id,
      companyId,
      isDeleted: false,
    }).select("-__v");

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    console.error("Error in getDepartmentById:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// ==========================================
// 4. Update Department details
// ==========================================
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentName, departmentCode, description } = req.body;
    const companyId = req.user.companyId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Department ID format.",
      });
    }

    const department = await Department.findOne({ _id: id, companyId, isDeleted: false });
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    // Name change validation (Duplicate check within company)
    if (departmentName && departmentName.trim().toLowerCase() !== department.departmentName.toLowerCase()) {
      const nameExists = await Department.findOne({
        companyId,
        departmentName: { $regex: new RegExp(`^${departmentName.trim()}$`, "i") },
        isDeleted: false,
        _id: { $ne: id },
      });

      if (nameExists) {
        return res.status(409).json({
          success: false,
          message: "Another department with this name already exists.",
        });
      }
      department.departmentName = departmentName.trim();
    }

    // Code change validation (Duplicate check within company)
    if (departmentCode && departmentCode.trim().toUpperCase() !== department.departmentCode) {
      const codeExists = await Department.findOne({
        companyId,
        departmentCode: departmentCode.trim().toUpperCase(),
        isDeleted: false,
        _id: { $ne: id },
      });

      if (codeExists) {
        return res.status(409).json({
          success: false,
          message: "Another department with this code already exists.",
        });
      }
      department.departmentCode = departmentCode.trim().toUpperCase();
    }

    if (description !== undefined) department.description = description.trim();

    const updatedDepartment = await department.save();

    return res.status(200).json({
      success: true,
      message: "Department details updated successfully.",
      data: updatedDepartment,
    });
  } catch (error) {
    console.error("Error in updateDepartment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// ==========================================
// 5. Update Status (ACTIVE/INACTIVE)
// ==========================================
export const updateDepartmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const companyId = req.user.companyId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Department ID format.",
      });
    }

    if (!status || !["ACTIVE", "INACTIVE"].includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Use ACTIVE or INACTIVE.",
      });
    }

    const updatedDepartment = await Department.findOneAndUpdate(
      { _id: id, companyId, isDeleted: false },
      { status: status.toUpperCase() },
      { new: true }
    ).select("-__v");

    if (!updatedDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Department status changed to ${status.toUpperCase()}.`,
      data: updatedDepartment,
    });
  } catch (error) {
    console.error("Error in updateDepartmentStatus:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// ==========================================
// 6. Soft Delete Department (isDeleted = true)
// ==========================================
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const companyId = req.user.companyId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Department ID format.",
      });
    }

    // Search and soft delete in a single query
    const deletedDepartment = await Department.findOneAndUpdate(
      { _id: id, companyId, isDeleted: false },
      { isDeleted: true, status: "INACTIVE" },
      { new: true }
    );

    if (!deletedDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department not found or already deleted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Department soft-deleted successfully.",
    });
  } catch (error) {
    console.error("Error in deleteDepartment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};