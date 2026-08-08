import crypto from "crypto";
import mongoose from "mongoose";
import Company from "../../models/Company.js";
import User from "../../models/User.js";

export const createCompany = async (req, res) => {
  try {
    const {
      companyName,
      ownerName,
      adminEmail,
      adminMobile,
      subscriptionPlan,
      address,
      logo,
    } = req.body;
    // Basic Validation
    if (
      !companyName ||
      !ownerName ||
      !adminEmail ||
      !adminMobile ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Duplicate Company Check
    const companyExists = await Company.findOne({
      companyName: {
        $regex: new RegExp(`^${companyName.trim()}$`, "i"),
      },
    });

    if (companyExists) {
      return res.status(409).json({
        success: false,
        message: "Company already exists.",
      });
    }

  
    // Duplicate Email Check
    const emailExists = await User.findOne({
      email: adminEmail.toLowerCase(),
    });

    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "Admin email is already registered.",
      });
    }

    // Generate Company Code (Temporary)
    const companyCode = crypto
      .randomUUID()
      .replace(/-/g, "")
      .substring(0, 8)
      .toUpperCase();

    // Generate Password Setup Token
    const setupToken = crypto.randomBytes(32).toString("hex");

    const expiry = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );
    const company = await Company.create({
      companyName: companyName.trim(),
      companyCode,
      ownerName: ownerName.trim(),
      adminEmail: adminEmail.toLowerCase(),
      adminMobile,
      subscriptionPlan,
      address,
      logo: logo || "",
      createdBy: req.user._id,
    });

    try {
      await User.create({
        name: ownerName.trim(),
        email: adminEmail.toLowerCase(),
        password: null,
        role: "ADMIN",
        companyId: company._id,
        isPasswordSet: false,
        passwordSetupToken: setupToken,
        passwordSetupTokenExpires: expiry,
        isActive: true,
      });

      return res.status(200).json({
        success: true,
        message:
          "Company created successfully. Password setup link will be sent to the company admin email.",

        data: {
          company: {
            id: company._id,
            companyName: company.companyName,
            companyCode: company.companyCode,
            ownerName: company.ownerName,
            adminEmail: company.adminEmail,
            adminMobile: company.adminMobile,
            subscriptionPlan: company.subscriptionPlan,
            status: company.status,
            address: company.address,
            logo: company.logo,
          },
          // Development Only
          setupToken,
          expiresAt: expiry,
        },
      });
    } catch (userError) {
      await Company.findByIdAndDelete(company._id);
      return res.status(500).json({
        success: false,
        message: "Failed to create company admin.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;
    const { search, status } = req.query;
    let query = {};
    if (status) {
      query.status = status.toUpperCase();
    }
    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: "i" } },
        { companyCode: { $regex: search, $options: "i" } },
      ];
    }
    const totalCompanies = await Company.countDocuments(query);
    const companies = await Company.find(query)
      .select("-__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(200).json({
      success: true,
      pagination: {
        totalCompanies,
        currentPage: page,
        totalPages: Math.ceil(totalCompanies / limit),
        limit,
      },
      data: companies,
    });
  } catch (error) {
    console.error("Error in getCompanies:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Company ID format.",
      });
    }
    // 2. Query execution
    const company = await Company.findById(id).select("-__v");
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.error("Error in getCompanyById:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      companyName,
      ownerName,
      adminMobile,
      subscriptionPlan,
      address,
      logo,
    } = req.body;

    // 1. Validation: Format Check
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Company ID format.",
      });
    }

    // 2. Find target company
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    // 3. Validation: Unique Name Check (Agar name change kiya ja raha hai)
    if (companyName && companyName.trim().toLowerCase() !== company.companyName.toLowerCase()) {
      const nameExists = await Company.findOne({
        companyName: { $regex: new RegExp(`^${companyName.trim()}$`, "i") },
        _id: { $ne: id }, // Apni khud ki ID ko chhod kar baki check karega
      });

      if (nameExists) {
        return res.status(409).json({
          success: false,
          message: "Another company with this name already exists.",
        });
      }
      company.companyName = companyName.trim();
    }

    // 4. Update allowed fields
    if (ownerName) company.ownerName = ownerName.trim();
    if (adminMobile) company.adminMobile = adminMobile.trim();
    if (subscriptionPlan) company.subscriptionPlan = subscriptionPlan;
    if (address) company.address = address.trim();
    if (logo !== undefined) company.logo = logo; // Empty string allowed h isliye undefined check kiya

    const updatedCompany = await company.save();

    return res.status(200).json({
      success: true,
      message: "Company details updated successfully.",
      data: {
        id: updatedCompany._id,
        companyName: updatedCompany.companyName,
        companyCode: updatedCompany.companyCode,
        ownerName: updatedCompany.ownerName,
        adminEmail: updatedCompany.adminEmail,
        adminMobile: updatedCompany.adminMobile,
        subscriptionPlan: updatedCompany.subscriptionPlan,
        status: updatedCompany.status,
        address: updatedCompany.address,
        logo: updatedCompany.logo,
      },
    });
  } catch (error) {
    console.error("Error in updateCompany:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const updateCompanyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Company ID format.",
      });
    }

    // 2. Validation: Status String Check
    if (!status || !["ACTIVE", "INACTIVE", "SUSPENDED"].includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Use ACTIVE, INACTIVE, or SUSPENDED.",
      });
    }

    const targetStatus = status.toUpperCase();

    // 3. Update Company status
    const company = await Company.findByIdAndUpdate(
      id,
      { status: targetStatus },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    // 4. Cascade Status to Users: Only 'ACTIVE' company keeps its users active
    const shouldUsersBeActive = targetStatus === "ACTIVE";
    
    await User.updateMany(
      { companyId: company._id },
      { isActive: shouldUsersBeActive }
    );

    return res.status(200).json({
      success: true,
      message: `Company status changed to ${targetStatus}. Associated user logins have been updated accordingly.`,
      data: company,
    });
  } catch (error) {
    console.error("Error in updateCompanyStatus:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};