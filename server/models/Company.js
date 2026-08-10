import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    companyCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    ownerName: {
      type: String,
      required: true,
      trim: true,
    },

    adminEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

     adminMobile: {
     type: String,
     required: true,
     trim: true,
     minlength: 10,
     maxlength: 15,
    },

    subscriptionPlan: {
      type: String,
      enum: ["Basic", "Pro", "Enterprise"],
      default: "BASIC",
    },
    

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
      default: "ACTIVE",
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    logo: {
      type: String,
      default: "",
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

const Company = mongoose.model("Company", companySchema);

export default Company;