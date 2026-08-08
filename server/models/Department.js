import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    departmentName: {
      type: String,
      required: true,
      trim: true,
    },

    departmentCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

departmentSchema.index(
  {
    companyId: 1,
    departmentName: 1,
  },
  {
    unique: true,
  }
);

const Department = mongoose.model("Department", departmentSchema);

export default Department;