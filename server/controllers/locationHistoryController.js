import LocationHistory from "../models/LocationHistory.js";
import Employee from "../models/Employee.js";
import { io } from "../server.js";

// ======================================================
// 1. CREATE LOCATION HISTORY
// Employee GPS location save + Admin real-time update
// ======================================================

export const createLocationHistory = async (req, res) => {
  console.log("========================================");
  console.log("🔥 LOCATION CONTROLLER HIT");
  console.log("========================================");

  try {
    // ==================================================
    // 1. REQUEST DATA
    // ==================================================

    const {
      latitude,
      longitude,
      accuracy,
      speed,
      heading,
      timestamp,
    } = req.body;

    console.log("📦 LOCATION REQUEST BODY:", {
      latitude,
      longitude,
      accuracy,
      speed,
      heading,
      timestamp,
    });

    console.log("👤 USER ID:", req.user?._id);
    console.log("🏢 COMPANY ID:", req.user?.companyId);

    // ==================================================
    // 2. AUTH CHECK
    // ==================================================

    if (!req.user || !req.user._id) {
      console.log("❌ USER NOT FOUND IN REQUEST");

      return res.status(401).json({
        success: false,
        message:
          "Unauthorized. User information not found.",
      });
    }

    if (!req.user.companyId) {
      console.log("❌ COMPANY ID NOT FOUND");

      return res.status(401).json({
        success: false,
        message:
          "Unauthorized. Company information not found.",
      });
    }

    // ==================================================
    // 3. REQUIRED GPS DATA
    // ==================================================

    if (
      latitude == null ||
      longitude == null ||
      timestamp == null
    ) {
      console.log(
        "❌ REQUIRED LOCATION DATA MISSING"
      );

      return res.status(400).json({
        success: false,
        message:
          "latitude, longitude and timestamp are required.",
      });
    }

    // ==================================================
    // 4. GPS COORDINATE VALIDATION
    // ==================================================

    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      console.log(
        "❌ INVALID GPS COORDINATES:",
        {
          latitude,
          longitude,
        }
      );

      return res.status(400).json({
        success: false,
        message:
          "Invalid latitude or longitude.",
      });
    }

    // ==================================================
    // 5. TIMESTAMP VALIDATION
    // ==================================================

    const locationTimestamp =
      new Date(timestamp);

    if (
      Number.isNaN(
        locationTimestamp.getTime()
      )
    ) {
      console.log(
        "❌ INVALID TIMESTAMP:",
        timestamp
      );

      return res.status(400).json({
        success: false,
        message: "Invalid timestamp.",
      });
    }

    // ==================================================
    // 6. FIND EMPLOYEE
    // ==================================================

    console.log(
      "🔎 FINDING EMPLOYEE..."
    );

    const employee =
      await Employee.findOne({
        userId: req.user._id,
        companyId: req.user.companyId,
        isDeleted: false,
      }).lean();

    if (!employee) {
      console.log(
        "❌ EMPLOYEE PROFILE NOT FOUND"
      );

      return res.status(404).json({
        success: false,
        message:
          "Employee profile not found.",
      });
    }

    console.log(
      "✅ EMPLOYEE FOUND:",
      {
        employeeId:
          employee._id.toString(),

        employeeCode:
          employee.employeeCode,

        companyId:
          employee.companyId.toString(),
      }
    );

    // ==================================================
    // 7. SAVE LOCATION TO MONGODB
    // ==================================================

    const newLocation =
      await LocationHistory.create({
        companyId:
          employee.companyId,

        employeeId:
          employee._id,

        userId:
          employee.userId,

        latitude,
        longitude,

        accuracy:
          accuracy != null
            ? accuracy
            : null,

        speed:
          speed != null
            ? speed
            : null,

        heading:
          heading != null
            ? heading
            : null,

        timestamp:
          locationTimestamp,
      });

    console.log(
      "✅ LOCATION SAVED TO DATABASE"
    );

    console.log({
      locationId:
        newLocation._id.toString(),

      employeeId:
        employee._id.toString(),

      latitude:
        newLocation.latitude,

      longitude:
        newLocation.longitude,

      timestamp:
        newLocation.timestamp,
    });

    // ==================================================
    // 8. CREATE SOCKET ROOM
    // ==================================================

    const companyId =
      employee.companyId.toString();

    const employeeId =
      employee._id.toString();

    const userId =
      employee.userId.toString();

    const roomName =
      `company:${companyId}`;

    console.log(
      "🏢 SOCKET ROOM:",
      roomName
    );

    // ==================================================
    // 9. SOCKET PAYLOAD
    // ==================================================

    const locationPayload = {
      employeeId,
      userId,

      employeeCode:
        employee.employeeCode,

      designation:
        employee.designation,

      latitude:
        newLocation.latitude,

      longitude:
        newLocation.longitude,

      accuracy:
        newLocation.accuracy,

      speed:
        newLocation.speed,

      heading:
        newLocation.heading,

      timestamp:
        newLocation.timestamp,
    };

    console.log(
      "📡 SOCKET PAYLOAD:",
      locationPayload
    );

    // ==================================================
    // 10. CHECK ADMIN SOCKETS IN COMPANY ROOM
    // ==================================================

    let socketsInRoom = [];

    try {
      const roomSockets =
        await io
          .in(roomName)
          .fetchSockets();

      socketsInRoom =
        roomSockets.map(
          (socket) => socket.id
        );

      console.log(
        "👥 SOCKETS IN COMPANY ROOM:",
        roomName
      );

      console.log(
        socketsInRoom
      );

      console.log(
        "👥 SOCKET COUNT:",
        socketsInRoom.length
      );
    } catch (socketCheckError) {
      console.error(
        "❌ SOCKET ROOM CHECK ERROR:",
        socketCheckError
      );
    }

    // ==================================================
    // 11. EMIT REAL-TIME LOCATION
    // ==================================================

    console.log(
      "🚀 EMITTING LOCATION UPDATE..."
    );

    io.to(roomName).emit(
      "employee:location:update",
      locationPayload
    );

    console.log(
      "✅ LOCATION EMITTED SUCCESSFULLY"
    );

    console.log(
      "ROOM:",
      roomName
    );

    console.log(
      "EVENT:",
      "employee:location:update"
    );

    console.log(
      "========================================"
    );

    // ==================================================
    // 12. RESPONSE
    // ==================================================

    return res.status(201).json({
      success: true,
      message:
        "Location recorded successfully",

      data: newLocation,
    });

  } catch (error) {

    console.error(
      "========================================"
    );

    console.error(
      "❌ LOCATION CONTROLLER ERROR"
    );

    console.error(
      error
    );

    console.error(
      "========================================"
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const getEmployeeHistory = async (
  req,
  res
) => {
  try {

    const { employeeId } =
      req.params;

    const {
      startDate,
      endDate,
    } = req.query;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message:
          "Employee ID is required.",
      });
    }

    const filter = {
      employeeId,
    };

    // ================================================
    // DATE FILTER
    // ================================================

    if (startDate && endDate) {

      const start =
        new Date(startDate);

      const end =
        new Date(endDate);

      if (
        Number.isNaN(
          start.getTime()
        ) ||
        Number.isNaN(
          end.getTime()
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid startDate or endDate.",
        });
      }

      filter.timestamp = {
        $gte: start,
        $lte: end,
      };
    }

    // ================================================
    // FETCH HISTORY
    // ================================================

    const history =
      await LocationHistory.find(
        filter
      )
        .sort({
          timestamp: 1,
        })
        .lean();

    return res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });

  } catch (error) {

    console.error(
      "❌ Error fetching location history:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const getLatestLocation = async (
  req,
  res
) => {
  try {

    const { employeeId } =
      req.params;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message:
          "Employee ID is required.",
      });
    }

    const latestLocation =
      await LocationHistory.findOne({
        employeeId,
      })
        .sort({
          timestamp: -1,
        })
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
      "❌ Error fetching latest location:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const getCompanyLatestLocations = async (
  req,
  res
) => {
  try {

    const companyId =
      req.user.companyId;

    // ================================================
    // COMPANY CHECK
    // ================================================

    if (!companyId) {

      console.log(
        "❌ COMPANY ID NOT FOUND"
      );

      return res.status(400).json({
        success: false,
        message:
          "Company ID not found.",
      });
    }

    console.log(
      "🏢 GET COMPANY LATEST LOCATIONS:",
      companyId
    );

    // ================================================
    // GET ACTIVE EMPLOYEES
    // ================================================

    const employees =
      await Employee.find({
        companyId,

        status: "ACTIVE",

        isDeleted: false,
      })
        .select(
          "_id userId employeeCode designation"
        )
        .populate(
          "userId",
          "name email"
        )
        .lean();

    console.log(
      "👥 ACTIVE EMPLOYEES:",
      employees.length
    );

    // ================================================
    // GET LATEST LOCATION
    // ================================================

    const locations =
      await Promise.all(
        employees.map(
          async (employee) => {

            const latestLocation =
              await LocationHistory.findOne({
                companyId,

                employeeId:
                  employee._id,
              })
                .sort({
                  timestamp: -1,
                })
                .lean();

            return {

              employeeId:
                employee._id,

              userId:
                employee.userId?._id,

              employeeCode:
                employee.employeeCode,

              name:
                employee.userId?.name ||
                "Unknown",

              email:
                employee.userId?.email ||
                "",

              designation:
                employee.designation,

              location:
                latestLocation
                  ? {
                      latitude:
                        latestLocation.latitude,

                      longitude:
                        latestLocation.longitude,

                      accuracy:
                        latestLocation.accuracy,

                      speed:
                        latestLocation.speed,

                      heading:
                        latestLocation.heading,

                      timestamp:
                        latestLocation.timestamp,
                    }
                  : null,
            };
          }
        )
      );

    console.log(
      "📍 COMPANY LOCATION DATA READY:",
      locations.length
    );

    return res.status(200).json({
      success: true,

      count:
        locations.length,

      data:
        locations,
    });

  } catch (error) {

    console.error(
      "❌ Error fetching company locations:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
