import mongoose from "mongoose";

const employeeLiveLocationSchema = new mongoose.Schema(
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
      unique: true,
      index: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },

      // GeoJSON format:
      // [longitude, latitude]
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    accuracy: {
      type: Number,
      default: 0,
    },

    speed: {
      type: Number,
      default: 0,
    },

    isOnline: {
      type: Boolean,
      default: false,
      index: true,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// GPS / nearby employee queries ke liye
employeeLiveLocationSchema.index({
  location: "2dsphere",
});

const EmployeeLiveLocation = mongoose.model(
  "EmployeeLiveLocation",
  employeeLiveLocationSchema
);

export default EmployeeLiveLocation;