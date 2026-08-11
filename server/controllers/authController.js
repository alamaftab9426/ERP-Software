import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated. Please contact the administrator.",
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        companyId: user.companyId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    user.lastLogin = new Date();
    await user.save();
    res.cookie("accessToken", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
});

    // Response
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const setupPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;
    // Basic Validation
    if (!token || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // Find User by Token
    const user = await User.findOne({
      passwordSetupToken: token,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid setup token.",
      });
    }

    // Check Expiry
    if (user.passwordSetupTokenExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Setup token has expired.",
      });
    }

    // Prevent Reset Again
    if (user.isPasswordSet) {
      return res.status(400).json({
        success: false,
        message: "Password has already been set.",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.isPasswordSet = true;

    user.passwordSetupToken = null;
    user.passwordSetupTokenExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password created successfully. Please login.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
      },
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};