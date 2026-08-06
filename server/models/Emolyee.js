import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    // Authentication User Reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Company Reference
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    // Employee Identity
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    // Personal Information
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      default: "",
      trim: true,
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },

    dob: {
      type: Date,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    // Organization
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },

    designationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
      default: null,
    },

    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      default: null,
    },

    reportingManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    employmentStatus: {
      type: String,
      enum: [
        "ACTIVE",
        "INACTIVE",
        "RESIGNED",
        "TERMINATED"
      ],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;