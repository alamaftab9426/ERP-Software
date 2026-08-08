import mongoose from "mongoose";

const subscriptionPlanSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    billingCycle: {
      type: String,
      enum: ["MONTHLY", "YEARLY"],
      default: "MONTHLY",
    },
    maxEmployees: {
      type: Number,
      required: true,
      default: 10, // Maximum employees allowed in this plan
    },
    features: {
      type: [String], // Example: ["ATTENDANCE", "PAYROLL", "LEAVE_MANAGEMENT"]
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const SubscriptionPlan = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);
export default SubscriptionPlan;