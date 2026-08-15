import LocationHistory from "../models/LocationHistory.js";
import Employee from "../models/Employee.js";
import { io } from "../server.js";

export const createLocationHistory = async (req, res) => {
  try {
    const {
      latitude,
      longitude,
      accuracy,
      speed,
      heading,
      timestamp,
    } = req.body;
    if (
      latitude == null ||
      longitude == null ||
      timestamp == null
    ) {
      return res.status(400).json({
        success: false,
        message:
          "latitude, longitude and timestamp are required.",
      });
    }
    //GPS COORDINATE VALIDATION

    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid latitude or longitude.",
      });
    }

    // ==========================================
    // 3. LOGGED-IN USER
    // ==========================================
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized. User information not found.",
      });
    }

    const userId = req.user._id;

    // ==========================================
    // 4. FIND EMPLOYEE
    // ==========================================
    const employee = await Employee.findOne({
      userId,
      companyId: req.user.companyId,
      isDeleted: false,
    }).lean();

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee profile not found.",
      });
    }

    // ==========================================
    // 5. VALIDATE TIMESTAMP
    // ==========================================
    const locationTimestamp = new Date(timestamp);

    if (Number.isNaN(locationTimestamp.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid timestamp.",
      });
    }

    // ==========================================
    // 6. SAVE LOCATION TO MONGODB
    // ==========================================
    const newLocation = await LocationHistory.create({
      companyId: employee.companyId,
      employeeId: employee._id,
      userId: employee.userId,

      latitude,
      longitude,

      accuracy:
        accuracy != null ? accuracy : null,

      speed:
        speed != null ? speed : null,

      heading:
        heading != null ? heading : null,

      timestamp: locationTimestamp,
    });

    // ==========================================
    // 7. REAL-TIME ADMIN UPDATE
    // ==========================================
    // io.to(`company:${employee.companyId}`).emit(
    //   "employee:location:update",
    //   {
    //     employeeId: employee._id,
    //     userId: employee.userId,

    //     employeeCode: employee.employeeCode,
    //     designation: employee.designation,

    //     latitude: newLocation.latitude,
    //     longitude: newLocation.longitude,

    //     accuracy: newLocation.accuracy,
    //     speed: newLocation.speed,
    //     heading: newLocation.heading,

    //     timestamp: newLocation.timestamp,
    //   }
    // );
    // ==========================================
// 7. REAL-TIME ADMIN UPDATE
// ==========================================

const roomName = `company:${employee.companyId}`;

const locationPayload = {
  employeeId: employee._id.toString(),
  userId: employee.userId.toString(),

  employeeCode: employee.employeeCode,
  designation: employee.designation,

  latitude: newLocation.latitude,
  longitude: newLocation.longitude,

  accuracy: newLocation.accuracy,
  speed: newLocation.speed,
  heading: newLocation.heading,

  timestamp: newLocation.timestamp,
};

console.log("====================================");
console.log("📍 LOCATION UPDATE RECEIVED");
console.log("EMPLOYEE:", employee.employeeCode);
console.log("LAT:", newLocation.latitude);
console.log("LNG:", newLocation.longitude);
console.log("ROOM:", roomName);
console.log("====================================");

io.to(roomName).emit(
  "employee:location:update",
  locationPayload
);

console.log(
  "📡 LOCATION EMITTED TO:",
  roomName
);

    // ==========================================
    // 8. RESPONSE
    // ==========================================
    return res.status(201).json({
      success: true,
      message: "Location recorded successfully",
      data: newLocation,
    });

  } catch (error) {
    console.error(
      "Error saving location history:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
// 2. GET LOCATION HISTORY
// Employee ka complete route/history
export const getEmployeeHistory = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { startDate, endDate } = req.query;
    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required.",
      });
    }
    let filter = {
      employeeId,
    };

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (
        Number.isNaN(start.getTime()) ||
        Number.isNaN(end.getTime())
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid startDate or endDate.",
        });
      }
      filter.timestamp = {
        $gte: start,
        $lte: end,
      };
    }
    const history = await LocationHistory.find(filter)
      .sort({ timestamp: 1 })
      .lean();
    return res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });

  } catch (error) {
    console.error(
      "Error fetching location history:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// 3. GET LATEST LOCATION
// Employee ki latest location
export const getLatestLocation = async (req, res) => {
  try {
    const { employeeId } = req.params;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required.",
      });
    }

    const latestLocation =
      await LocationHistory.findOne({
        employeeId,
      })
        .sort({ timestamp: -1 })
        .lean();

    if (!latestLocation) {
      return res.status(404).json({
        success: false,
        message:
          "Is employee ki koi location history nahi mili.",
      });
    }
    return res.status(200).json({
      success: true,
      data: latestLocation,
    });

  } catch (error) {
    console.error(
      "Error fetching latest location:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getCompanyLatestLocations = async (req, res) => {
  try {
    const companyId = req.user.companyId;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Company ID not found.",
      });
    }

    // Company ke saare active employees
    const employees = await Employee.find({
      companyId,
      status: "ACTIVE",
      isDeleted: false,
    })
      .select("_id userId employeeCode designation")
      .populate("userId", "name email")
      .lean();

    // Har employee ki latest location
    const locations = await Promise.all(
      employees.map(async (employee) => {
        const latestLocation = await LocationHistory.findOne({
          companyId,
          employeeId: employee._id,
        })
          .sort({ timestamp: -1 })
          .lean();

        return {
          employeeId: employee._id,
          userId: employee.userId?._id,
          employeeCode: employee.employeeCode,
          name: employee.userId?.name || "Unknown",
          email: employee.userId?.email || "",
          designation: employee.designation,

          location: latestLocation
            ? {
                latitude: latestLocation.latitude,
                longitude: latestLocation.longitude,
                accuracy: latestLocation.accuracy,
                speed: latestLocation.speed,
                heading: latestLocation.heading,
                timestamp: latestLocation.timestamp,
              }
            : null,
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    console.error("Error fetching company locations:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};