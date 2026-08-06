import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");

    const email= "admin@test.com";
  
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Super Admin already exists in database");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const superAdmin = new User({
      name: "Super Admin",
      email,
      password: hashedPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    });

    await superAdmin.save();

    console.log("\n=== SUPER ADMIN CREATED SUCCESSFULLY ===");
    console.log("Email: admin@test.com");
    console.log("Password: admin123");
    console.log("=================================\n");
  } catch (err) {
    console.error("Error creating super admin:", err);
  } finally {
    await mongoose.disconnect();
  }
};

createSuperAdmin();
