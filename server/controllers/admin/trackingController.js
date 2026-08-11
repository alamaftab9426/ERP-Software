import EmployeeLiveLocation from "../../models/EmployeeLiveLocation";
import EmployeeLocationHistory from "../../models/EmployeeLocationHistory";
 

export const updateLocation = async (req, res) => {
    try {
        const { companyId, employeeId, latitude, longitude, accuracy, isOnline } = req.body;

        // Validation
        if (!companyId || !employeeId || latitude == null || longitude == null) {
            return res.status(400).json({ 
                success: false, 
                message: "companyId, employeeId, latitude, aur longitude required hain." 
            });
        }

        const locationData = {
            companyId,
            employeeId,
            latitude,
            longitude,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude] // GeoJSON format [Lng, Lat]
            },
            accuracy: accuracy || 0,
            isOnline: isOnline !== undefined ? isOnline : true,
            timestamp: new Date()
        };

        // A) History table me insert karo (Route tracking ke liye)
        await EmployeeLocationHistory.create(locationData);

        // B) Live Location table me UPSERT karo (Dashboard ke liye fast update)
        const liveLocation = await EmployeeLiveLocation.findOneAndUpdate(
            { employeeId },
            locationData,
            { upsert: true, new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Location updated successfully",
            data: liveLocation
        });

    } catch (error) {
        console.error("Tracking Error:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

export const getCompanyLiveLocations = async (req, res) => {
    try {
        const { companyId } = req.params;
        const liveLocations = await EmployeeLiveLocation.find({ companyId })
            .populate('employeeId', 'name email phone designation department') // Employee model se data merge
            .lean();

        return res.status(200).json({
            success: true,
            count: liveLocations.length,
            data: liveLocations
        });

    } catch (error) {
        console.error("Live Location Error:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// ==========================================
// 3. GET EMPLOYEE ROUTE HISTORY (Route Map Playback ke liye)
// ==========================================
export const getEmployeeHistory = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { startDate, endDate } = req.query; // Query params: ?startDate=2023-10-01&endDate=2023-10-02

        let query = { employeeId };

        // Agar Date Range filter di hai toh
        if (startDate && endDate) {
            query.timestamp = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        } else {
            // Default: Aaj ki location history (Start of Today to Now)
            const startOfToday = new Date();
            startOfToday.setHours(0, 0, 0, 0);
            query.timestamp = { $gte: startOfToday };
        }

        const history = await EmployeeLocationHistory.find(query)
            .sort({ timestamp: 1 }) // Purane se naya order (Path draw karne ke liye)
            .lean();

        return res.status(200).json({
            success: true,
            count: history.length,
            data: history
        });

    } catch (error) {
        console.error("History Error:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};