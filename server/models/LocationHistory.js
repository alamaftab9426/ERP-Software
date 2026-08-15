import mongoose from "mongoose";

const locationHistorySchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    accuracy: {
      type: Number,
      default: null,
    },

    speed: {
      type: Number,
      default: null,
    },

    heading: {
      type: Number,
      default: null,
    },

    timestamp: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

locationHistorySchema.index({
  companyId: 1,
  employeeId: 1,
  timestamp: -1,
});

const LocationHistory = mongoose.model(
  "LocationHistory",
  locationHistorySchema
);

export default LocationHistory;