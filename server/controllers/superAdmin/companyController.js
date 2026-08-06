import crypto from "crypto";
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
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, status } = req.query;
    let query = {};
    // Filter by Status (ACTIVE, INACTIVE, SUSPENDED)
    if (status) {
      query.status = status.toUpperCase();
    }
    // Search by Company Name or Company Code
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

export const updateCompanyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Expects: 'ACTIVE', 'INACTIVE', or 'SUSPENDED'

    if (!status || !["ACTIVE", "INACTIVE", "SUSPENDED"].includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Use ACTIVE, INACTIVE, or SUSPENDED.",
      });
    }

    const targetStatus = status.toUpperCase();
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
    const shouldUsersBeActive = targetStatus === "ACTIVE";
    
    await User.updateMany(
      { companyId: company._id },
      { isActive: shouldUsersBeActive }
    );
    return res.status(200).json({
      success: true,
      message: `Company and associated users have been marked as ${targetStatus}.`,
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

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }
    // 2. Delete Associated Users first (to prevent orphaned users)
    await User.deleteMany({ companyId: id });
    // 3. Delete the Company Document
    await Company.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Company and all associated accounts deleted successfully.",
    });
  } catch (error) {
    console.error("Error in deleteCompany:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};