import mongoose from "mongoose";
import SubscriptionPlan from "../../models/SubcriptionPlan.js";


export const createPlan = async (req, res) => {
  try {
    const { planName, price, billingCycle, maxEmployees, features } = req.body;

    if (!planName || price === undefined || !maxEmployees) {
      return res.status(400).json({
        success: false,
        message: "Plan name, price, and max employees are required fields.",
      });
    }

    // Check for duplicate plan name
    const planExists = await SubscriptionPlan.findOne({
      planName: planName.trim().toUpperCase(),
    });

    if (planExists) {
      return res.status(409).json({
        success: false,
        message: "A subscription plan with this name already exists.",
      });
    }

    const newPlan = await SubscriptionPlan.create({
      planName: planName.trim().toUpperCase(),
      price,
      billingCycle,
      maxEmployees,
      features: features || [],
    });

    return res.status(201).json({
      success: true,
      message: "Subscription plan created successfully.",
      data: newPlan,
    });
  } catch (error) {
    console.error("Error in createPlan:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getPlans = async (req, res) => {
  try {
    const { activeOnly } = req.query; 
    let query = {};

    if (activeOnly === "true") {
      query.isActive = true;
    }

    const plans = await SubscriptionPlan.find(query).sort({ price: 1 });

    return res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error) {
    console.error("Error in getPlans:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Plan ID format.",
      });
    }

    const plan = await SubscriptionPlan.findById(id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Subscription plan not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    console.error("Error in getPlanById:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { planName, price, billingCycle, maxEmployees, features, isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Plan ID format.",
      });
    }

    const plan = await SubscriptionPlan.findById(id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Subscription plan not found.",
      });
    }

    if (planName && planName.trim().toUpperCase() !== plan.planName) {
      const nameExists = await SubscriptionPlan.findOne({
        planName: planName.trim().toUpperCase(),
        _id: { $ne: id },
      });

      if (nameExists) {
        return res.status(409).json({
          success: false,
          message: "A subscription plan with this name already exists.",
        });
      }
      plan.planName = planName.trim().toUpperCase();
    }

    if (price !== undefined) plan.price = price;
    if (billingCycle) plan.billingCycle = billingCycle;
    if (maxEmployees) plan.maxEmployees = maxEmployees;
    if (features) plan.features = features;
    if (isActive !== undefined) plan.isActive = isActive;

    const updatedPlan = await plan.save();

    return res.status(200).json({
      success: true,
      message: "Subscription plan updated successfully.",
      data: updatedPlan,
    });
  } catch (error) {
    console.error("Error in updatePlan:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const togglePlanStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Plan ID format.",
      });
    }

    const plan = await SubscriptionPlan.findById(id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Subscription plan not found.",
      });
    }

    plan.isActive = !plan.isActive;
    await plan.save();

    return res.status(200).json({
      success: true,
      message: `Plan status toggled successfully. Active: ${plan.isActive}`,
      data: plan,
    });
  } catch (error) {
    console.error("Error in togglePlanStatus:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};